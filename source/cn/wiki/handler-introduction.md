---
title: handler
type: wiki
group: 概念
order: 4.3
version: 2.1
---

### 什么是 handler
 hanlder(Android 中称为 adapter，以下称 handler) 是 WeexSDK engine 中一个 service 的概念，它可以被 component、module 和其他的 handler 实现中调用。

### handler 调用细节

 handler 提供了不同 App 和客户端解耦的能力，上层通过 interface(Android) 和 protocol(iOS) 约束方法，handler 的实现者，只需要实现该 handler 对应的接口声明的方法即可，调用者不关注 handler 具体的实现，只通过接口获得需要的数据或者调用对应的 handler 方法，每个 protocol(interface) 对应的 handler 在 app 生命周期期间只有一个实例。

### handler 和 module 的区别

- 在应用中的位置

   ![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/f027878afe0f3ff96444a32c3a92b230.png)  
 上图假设当前APP 中已经打开了三个 Weex 的页面，三个页面中都已经调用过 fetch module 的方法，每个页面都会动态的产生一个 fetch module class 的 Object，随着页面的销毁，页面持有的 module 也会被销毁。handler class 对应的 Object 只会有一个。

- 开发者使用
  handler 更多的是针对 native 开发同学来开发和使用，在其他的 component 和 module 中被调用。module 是由 native 开发同学完成之后提供给前端同学使用，可以暴露一些操作方法来实现一定的功能。

### 内置 handler
WeexSDK 内部的一些 handler 场景描述
 - navigationHandler

    WeexSDK 内部提供了一个默认的 navigation 的 handler，该 handler 是在 navigation Module 中调用 push 和 pop 的一些操作时候被调用。
	SDK 中提供了默认的导航操作Handler

 - imageLoaderHandler

    WeexSDK 图片组件需要从一个固定的 URI 中加载资源，这个加载行为也被封装到 image 的 handler 中，所以在接入 WeexSDK 时候，一定得提供图片 load 的handler。
	SDK 中未提供 load 图片 Handler

 - AppMonitorHandler
   
    该 handler 是 WeexSDK 在渲染过程中性能统计，module 调用统计时候会将数据同步到该 handler 中，可以实现该 handler 将对应的数据上传到监控平台做性能的监控。
	SDK 未提供 监控 Handler
 
 - JSEXceptionHandler

    JavaScript 在 runtime 可能会发生一些错误，首先由 JavaScript Engine 捕捉，然后抛出到 WeexSDK， WeexSDK 会通过 JSExceptionHandler 通知到外部调用。
	SDK 中未提供默认接受 JSException 的 Handler

 - URLRewriteHandler

	image、video、web组件都在加载 URL 的时候会进行 URL 的重写，重写的规则就是由 URLRewriteHandler 提供，在这里 Handler 里面，可以将特定的 URL，重写为本地 URL 或者其他路径。了解更多默认重写规则 [path](../guide/advanced/path.html)
	WeexSDK 默认提供重写规则
