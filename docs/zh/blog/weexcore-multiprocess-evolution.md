# WeexCore 多进程多线程架构演进

### 1. 背景
`Weex Android` 早在 2016 年时就采用了多线程的模型来提升 `Weex` 的渲染能力. `DomThread`, `JSThread`, `UIThread` . 去年双十一 `Weex` 进化成多进程模式来提升 `Weex` 的稳定性. 所以理论上来说, Weex 早就是多进程多线程的模式了, 为什么现在还在谈这个事情. 且听我慢慢重新介绍一些目前的 `WeexCore`

`WeexCore` 在今年三月份的时候, 加入了一个新的成员, 叫 `LayoutEngine`, 它的算法都沉到 c++ 层. 而且一同带下来的还有它的合作伙伴 `Parser`. 这样, `DOM 解析`和 `Layout` 全家桶就全部进入了 `JSThread`. 在减少一个线程的情况下, Weex 的渲染性能还能有所提升, 足以说明目前的 `LayoutEngine` 的强大.

演变过程大致如下图所示, 黄色 DOMParser 本来在一个独立的线程里, 现在和绿色块合成了一个线程.
![2018-12-07 at 13.18.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/f31103153fd160ae4723069f88c61e34.png)

再说说多进程, Weex 的 jsEngine 从 V8 切到了 JavaScriptCore. 但由于以下几个问题, 所以将 JSC 引擎放到了子进程里运行.
1. 在JSC引擎上线出现许多无定位的稳定性问题，威胁手淘等使用Weex的客户端的稳定性。
2. JSC容易耗TLS（Thread Local Storage），导致TLS slot耗尽，易引起其他模块的崩溃。
3. JSC引擎性能虽好，但是占用内存较大，在低端机容易引起内存吃紧，导致手淘进程被杀。

这套多进程架构在当时来看是非常完美的, 采用多进程模型切到 jscEngine, 既提升了渲染能力, 也提升了 Weex 的整体稳定性.

但这种模型在某些方面还是存在不足, 例如虽然是多进程, 但实际上还是单线程的运作模式, 且子进程无法主动向主进程发送消息. 而且 Native 定时器也无法友好的实现.

先说说为什么多进程下, 为什么还是单线程的模型.

![2018-12-07 at 11.29.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/872298694d6e7f1a311ade626da0f0f8.png)

如上图所示, 一块共享内存分为16份, 父进程(WeexCore) 写偶数块, 读奇数块. 子进程(JSS) 写奇数块, 读偶数块. 

初始化时, 父进程锁住 0 内存块. 子进程锁住 1 内存块, 子进程启动监听, 请求锁 0 内存块. 但此时 0 内存块被父进程锁着, 所以子进程请求锁 0 内存块失败, wait 父进程释放 0 内存块. 就这样, 两个进程因为互相竞争一块共享内存, 所以变相的成为单线程模式. 既同一时间只有一个进程能够保持活跃状态. 

这意味着当前模型下, **Weex 所有的操作入口只能是 Platform 层, 子进程只能响应父进程的任务, 不能主动的执行某个任务, 且父进程在执行 Layout 或 parser 操作时, JSEngine 是处于挂起的状态的.**

所以, WeexCore 的线程模型演变成下面这个样子.

![2018-12-07 at 12.23.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/cc6710bafd8edd87a577c72d89a764fb.png)

从架构上来说, 主要有以下几个变动
* 1. WeexCore 演变成消息驱动的线程异步交互模型.  
 -  新增 I/O Thread 来拓展原有单向的 IPC, 使子进程可主动的向父进程发送消息. I/O Thread 只用来任务转发, 相比之前还需 wait 任务执行完毕, 效率提升非常明显.
 -  新增 JS Thread 来专门的执行 js 任务. 不再受上层 Layout 和 Parser 任务的阻塞.
 - 针对 NativeTimer 新增一个 Timer 线程来做定时器计算, 这个后面会具体讲到.  

* 2. WeexCore 分层设计. IPC 可热插拔的自由切换  


### 2. 详解
#### 2.1. 消息驱动的异步通信模型
线程的异步通信模型可以避免线程间互不阻塞，提⾼高线程的并发性
![2018-12-07 at 12.36.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/937def357b6528b0d78f0e948560e5dc.png)

异步通信可以通过简单的控制线程共享的 volatile 变量或者信号量 mutex 和条件异步调⽤用到其他线程 的函数块，然⽽简单粗暴的使⽤用这些⽅式时，线程的边界会变得不明显或者代码块都充斥着锁和信号量的控制，如果数据需要线程公用，还需要对数据块上锁，导致死锁或异步能⼒下降，对本身代码的维护和程序的稳定性都有影响。
消息驱动的异步通信模型结是常用的线程循环模型，是一种非侵⼊式设计，消息结构耦合度底，线程中的循环实现灵活度高。尽管它也是基于上述的⽅式去进⾏线程切换，但相⽐起直接对⽅法⽤锁，或者直接利用 volatile，通过消息使代码块和数据边界明显，提⾼了程序的线程安全性，线程间互不阻塞，提⾼线程的并发性。它代表着⼀种设计哲学，但是这并不是代表它没有任何锁控制，只是可以把锁限制在⼀个极⼩的范围内。
技术要点
1. 跨平台、⾼高效、易易⽤用的消息驱动的异步通信模型。
2. 能适应当前 Weex 的线程模型——不不改变上层 Platform 层的线程模型，WeexCore 能兼容上层
的消息循环机制，例例如 Android Handler。

##### 2.1.1 总体设计
![2018-12-07 at 12.40.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/4545bcabcdac57acfe0be1692a8b9cc5.png)

上图是消息驱动框架的简要类关系图，整体的流程是创建或者依附到 Thread 环境，通过消息泵 MessagePump 完成线程切换，驱动消息循环体 MessageLoop 进⾏消息循环，在当前线程中执⾏来自于其他线程丢进池⼦中的消息。

- Thread ⽤用于构建当前线程环境，当模式是依附到 Android 或 iOS 的线程时，Thread 是⼀一个⽤用 来装载 MessageLoop 的壳⼦，不会新构建任何线程环境。
- MessageLoop 是真正进⾏消息执⾏和存储的对象。它实现了 MessagePump::Delegate 的接⼝，表示它能接受来⾃消息泵的驱动
- MessagePump 是⼀个消息泵，即驱动器，负责及时或定时切换线程环境，驱动消息循环，完成 消息从⼀个线程传递到另⼀个线程的执⾏的过程

##### 2.1.2 具体流程
下⾯将从 Thread 创建过程中相关对象的创建流程图、消息循环初始化流程图和消息驱动流程图上分 析，通过具体流程可以了解内部对跨平台和对当前 Weex 的上层线程模型的适配机制。

![2018-12-07 at 12.42.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/7d0c65a3a4b79ac3d990dfaa8f203be1.png)

上图是 Thread 创建过程中相关对象的创建流程图。当外界通过 new 创建 Thread 时，需要带上 MessageLoop::Type 的参数（关键：⽤于创建 MessagePump，启动时会根据类型判断是否要创建线 程环境）。ThreadImpl 是 Thread 的实现类，是真正⽤于创建 Thread 环境的对象，它是⼀个抽象类，它的⼦类后缀分别是 Android / iOS / Posix。这些⼦类分别代表了各个环境下的实现。Android 和 iOS 都是 Unix-like 系统，因此他们使⽤的都是 Posix 线程，但是在 pthread 的操作上会有不⼀致 的地⽅，例如 pthread_setname_np 在 Android 和 iOS 上传递的参数不⼀样。因此根据不同系统去 对应的对实现类做出调整。Thread 在初始化 Impl 时会根据宏定义确定初始化的 Impl ⼦类，从⽽做到平台适应。

ThreadImpl 持有⼀个维护消息队列的 MessageLoop，再初始化时也会⼀并创建。MessageLoop 中 持有⼀个驱动器 MessagePump，MessagePump 是⼀个接⼝类，具体实现类由 MessageLoop::Type 决定。MessageLoop::Type 具有两种类型，DEFAULT 指驱动器由默认的 Posix Thread ⽅式进⾏，PLATFORM 指驱动器由兼容 Android 或 iOS 的线程环境和消息循环⽅式实现（具体循环请继续向后）。

![2018-12-07 at 12.43.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/950b476fb53468ba2f309b73435a9e15.png)

上图是消息循环初始化流程图。当 Thread 创建完成后，需要通过 Thread::Start ⽅法完成内部消息循 环的构建流程。Thread::Start ⽅法会通过实现类 ThreadImpl::Run 完成，ThreadImplPosix 是 Android / iOS 的基类，基类中 Run ⽅法会对 MessageLoop::Type 进⾏判断：

- 如果是 PLATFORM ⽆需创建新的线程环境，⽽是直接依附到当前线程，紧接着调⽤ MessageLoop::Run
- 如果是 DEFAULT 类型，则需要通过 pthread_create 初始化线程环境，并在新线程中执⾏ MessageLoop::Run。这⾥有⼀个⼩点，为了确保外部执⾏完 Start 后可以执⾏抛消息操作 ，当 前线程会通过 WaitableEvent 同步等待新线程完成初始化。

MessageLoop 在这⾥的作⽤只是⽤于执⾏消息和存储消息，因此 MessageLoop::Run 并不会进⼊⽆ 限循环，它将这个动作交由驱动器 MessagePump 决定是进⼊⽆限循环还是依附上层。

- 在 MessagePumpPosix 情况下，必然是⼀个不依附与上层的新线程，整体的循环由⾃⼰把控， Run ⽅法内部通过信号量 mutex 和条件 condition 进⼊等待消息状态。
- 在 MessagePumpAndroid 情况下，Run ⽅法内部主要通过 jni ⽅法创建和绑定 java 层 SystemMessageHandler 对象，建⽴和上层 Android 消息循环机制的关联。
- 在 MessagePumpDarwin 情况下，Run ⽅法内部通过获取当前线程的 CFRunLoopRef 和创建 CFRunLoopSourceRef 对象，建⽴和上层 iOS 消息循环机制的关联。

到此消息循环的初始化流程完成，DEFAULT 类型进⼊了线程阻塞等待唤醒，⽽ PLATFORM 类型进⼊ 了等待来⾃ Android / iOS 的调度。

![2018-12-07 at 12.45.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/965358b8880bc1e1547654ca3f26b79a.png)

上图是消息驱动流程图。当外界在其他线程通过指定线程的 MessageLoop 进⾏ PostTask 传进来了⼀ 个任务 closure，内部会对 DelayedTaskQueue 上锁，确保安全的添加操作，此时 closure 会变成 DelayedTask 扔进池⼦⾥，释放锁。通知消息泵有消息进来：

- 如果是 MessagePumpPosix，将会通过 condiion::notify_one 唤醒对应线程，对应线程将进⼊ MessageLoop::DoWork
- 如果是 MessagePumpAndroid，将会通过 jni 到上层 SystemMessageHandler 的 scheduleWork ，向 Android handler 抛消息，切换到对应线程，再回调到底层的 MessageLoop::DoWork
- 如果是 MessagePumpDarwin，将对 CFRunLoopSourceRef 对象标记待处理，再通过 CFRunLoopWakeUp 唤醒线程，切换到对应线程，再回调到底层的 MessageLoop::DoWork

MessageLoop::DoWork 中⾸先对 DelayedTaskQueue 上锁，通过对⽐ DelayedTask 时间和当前时 间获取需要执⾏的 closure 列表，如果还有任务，则通知消息泵定时驱动，接着释放锁，执⾏ closure 列表。结束后如果是 MessagePumpPosix，则需阻塞当前线程，等待下次唤醒。

##### 2.1.3 closure 设计
![2018-12-07 at 12.47.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/1b94848aaa731b146228090093b5cc92.png)

closure 是⼀个任务的载体，它实际是⼀个 std::function。它在被扔进任务池⼦⾥⾯时，它的⽣命周 期就跟随着线程，除⾮它离开了执⾏队列被执⾏，那么它的⽣命周期将在执⾏后被销毁，否则未被执 ⾏的任务将在执⾏完后⾃动析构。⽽这个可以拷⻉的 function 是通过 CopyableLambda 实现的， CopyableLambda 通过创建⼀个指向数据的共享指针，然后创建⼀个可复制的 lambda 来捕获该共享 指针，然后将该可复制的 lambda 包装成 std::function 请求的签名，赋予 std::function 函数拷⻉的 功能，可供 MessageLoop 持有调度。

由于涉及了跨线程传递参数对象，因此参数对象尤其是指针的⽣命周期管理需要异常⼩⼼。 std::function ⽀持使⽤ lambda 表达式，在 lambda 表达式中要善⽤智能指针，确保指针的⽣命周期 在 task 结束仍然有效，例如使⽤ unique_ptr 将指针的⽣命周期转移交给 task。

##### 2.1.4 使⽤姿势
以 WeexCore 的例⼦为例，当 JSS 从 IO 线程向 WeexCore 发送了 CallNative 的指令，那么在 WeexCore 中回到 JS 线程的⽅式是：

```c++
WeexCoreManager::Instance()->script_thread()->message_loop()->PostTask(
weex::base::MakeCopyable([page_id = std::string(page_id), task = std::string(task), callback = std::string(callback)] {

// CallNative

}));
```

#### 2.2. WeexCore 分层设计
IPC 可热插拔, 单双进程自由切换

![2018-12-07 at 13.05.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/22195f7e61b2267f50dc78226d98aff3.png)

如图所示.

Weex 目前整体可以分为三层 
1. Platform(Android, iOS, ..)
2. WeexCore(Layout, Parser)
3. JSS(JSEngine 子进程).

我们在每个层面之间加入了一个 Bridge, 每个 Bridge 对应两个 Side. 每个 Side 对应三种模式
1. Multi Process: 多进程模式, 通过IPC 通信.
2. Multi So: 多 So 模式, 通过函数指针互相调用.
3. Simple: 内部模式, 可以互相调用.

例如目前 Weex 的多进程模式是 PlatformBridge 对应的Side 为 Simple,  ScriptBridge 的 side 都是 MultiProcess. 

如果 IPC 上移, 或者切换单进程不使用 IPC, 只需要切对应的 Side 即可. 

### 3. 效果

多线程架构完成之时, 测试同学进行了一次完整的性能测试, 在复杂的页面下,性能提升比较明显, 多线程架构上线之后, 通过线上埋点观察到性能也有了不小的提升.

多线程架构给 Weex 带来的不仅仅是性能上的提升, 个人认为高拓展性才是最大的收益.
例如 NativeTimer 和未来即将做的 Native DomAPI 在老的架构下是无法做出来的.

目前 Weex 的很多逻辑都沉入了 c 层, JSFramework 的能力也上浮到客户端来做, 
不久的将来 WeexCore 将做到平台无关,  JSFramework 全 Native 化, 欢迎有兴趣的同学一起来共建 WeexCore.
