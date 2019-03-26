# 0x1 为什么要接入 WeexCore

在 iOS 接入 WeexCore 前，除了前端框架，iOS 与 Android 两个平台几乎没有共享的代码。从 Javascript 虚拟机开始，一直到最终绘制在屏幕上的系统 UI 组件，整个流程双端完全各自实现，除了 Layout 引擎。随着 Weex 不断演进，两端代码维护成本高，差异性大，进行跨平台融合势在必行。

与此同时 Weex 在进行渲染架构升级，将逻辑与界面分离，达到极致首屏渲染速度。新的架构直接在 WeexCore 上进行跨平台实现，并复用 WeexCore 的桥输出渲染指令。因此需要对 iOS 进行改造。

WeexCore 为了实现跨平台，使用 C++ 编写。其当前基本职责为：接收前端生成的渲染指令与对象数据，生成并维护 RenderPage (instance)、RenderObject（layout_node）；向平台层输出经过处理的平坦化的组件信息和排版数据，由平台层创建 Native View 进行展示与交互。WeexCore 当前的职责还比较简单，为了提升平台一致性、简化平台层代码，未来会将更多的逻辑，如线程管理、JS 引擎接口等移植到WeexCore 层。最终目标是在平台层仅保留供业务使用的接口，以及 Native 组件的实现。

# 0x2 iOS 接入前后架构

接入 WeexCore 前，iOS 已经使用了自主的 layout 引擎。其它逻辑均在 ObjC 层。Bundle 经过解析后，由 JSFramework 输出渲染指令和组件信息。通过 JavascriptCore 注册的方法传输给对应的 WeexInstance。每个 Instance 持有自己的 ComponentManager。由 ComponentManager 负责解析指令和组件，构建 Component Tree。此时 ComponentManager 拿到的指令还未平坦化，体现在：
* 组件和它的孩子节点信息是在一条指令中输出的，需要 ComponentManager 进行递归解析。
* Styles 数据里，CSS、自定义属性等融合在一起。

此外，在接入 WeexCore 前，ObjC 层除了需要维护 Component Tree 外，还需要建立并维护排版引擎使用的 Layout Tree。架构如下：

![Screen Shot 2018-08-03 at 15.00.43.png](https://cdn.nlark.com/yuque/0/2019/png/272593/1550801663181-91fc0fd3-8568-42f7-b026-83e56e5f2c7f.png)

接入 WeexCore 后，Layout 引擎下沉到 WeexCore 层，JSFramework 输出的渲染指令直接交给 WeexCore 中的 RenderManager。RenderManager 进行解析后，创建 RenderObject。RenderObject 直接是 LayoutNode 的子类，可由 LayoutEngine 处理。不需要像之前那样由上层 Component 创建并手工关联。RenderManager 将渲染指令平坦化，并输出相关 Action 到 Render Action Pool，再通过 PlatformBridge 传递给 ObjC 层的 ComponentManager。平坦化体现在：
* 组件及它的孩子被拆分成多条 AddElementAction 输出。
* Styles 被归类，如 CSS Layout 相关属性直接设置给 RenderObject（其父类为 LayoutNode），不再上传给平台层。Margin、Padding、其它属性被归类后上传平台层。

此外，Layout 驱动主要由 WeexCore 进行。ObjC 层需要依赖 iOS 平台接口，实现与屏幕刷新同步的 Layout   检测。Layout 引擎生成新的坐标，也产生 LayoutAction，通过 PlatformBridge 传递到平台层；平台层的同步检测信号，也通过 PlatformBridge 传递回 WeexCore。

架构图如下：

![Screen Shot 2018-08-03 at 16.54.25.png](https://cdn.nlark.com/yuque/0/2019/png/272593/1550801699138-b1bd32d9-8cea-4375-aec2-e23f81d7edd6.png)

初看两副架构图，当前的 WeexCore 还没有发挥出威力。未来，它将在 JSFramework 与平台层中间发挥越来越大的作用。

# 0x3 iOS 接入主要改造点

## 0x31 将前端渲染指令传给WeexCore

![Screen Shot 2018-08-03 at 16.57.39.png](https://cdn.nlark.com/yuque/0/2019/png/272593/1550801726358-df1c5c8e-8f4a-4c79-9ddd-a9dd2e791132.png?x-oss-process=image/resize,w_1492)

![Screen Shot 2018-08-03 at 16.57.48.png](https://cdn.nlark.com/yuque/0/2019/png/272593/1550801745140-2d132467-dc6d-4fd9-ac8a-8acdd6de1a24.png?x-oss-process=image/resize,w_1492)

相比于接入前，拿到前端渲染指令和数据后，不做逻辑，直接将数据透传给 WeexCore。此处涉及一次 OC 对象到 wson 数据的转换，未来可以优化。

## 0x32 实现 PlatformBridge，接收平坦化后的指令

![Screen Shot 2018-08-03 at 17.06.02.png](https://cdn.nlark.com/yuque/0/2019/png/272593/1550801778053-070004cb-8157-466c-846b-5e403c9364e3.png?x-oss-process=image/resize,w_1492)

以 AddElement 为例，WeexCore 回吐的每条指令，只对应一个 Element。数据经过平坦化，但是需要转换回 OC 对象，未来可以优化。

## 0x33 Layout 逻辑修改

Layout 逻辑修改是接入 WeexCore 最复杂的部分。

* 在原来的实现中，每个 WXComponent 被创建时，同时创建自己对应的 LayoutNode。平台层不但要维护 Component Tree，还要维护 Layout Tree。还要负责将 Styles 中 CSS 相关属性赋值给自己的 Node。在接入 WeexCore 后，每个 RenderObject 本身就是 LayoutNode。

* 为了支持 FixedComponent，在原来的实现中，额外引入了 RootLayoutNode，并将 Root Component 对应的 Node 添加为 RootLayoutNode 的子节点。在新的实现中，不再需要 RootLayoutNode，也不需要再创建任何额外的 LayoutNode。

* 在原来的实现中，对于 Scroller 类型的组件（Scroller、List、RecycleList等），为其创建了额外的 ScrollerLayoutNode。孩子组件都被添加到 ScrollerLayoutNode 中，本身的 LayoutNode 内容为空。当排版时，使用 LayoutNode 结果决定 Scroller 自己的位置，同时需要额外为 ScrollerLayoutNode 运行排版算法，决定所有孩子组件的位置。接入 WeexCore 后，不再需要这种 geek 的实现方式，同时大大减少了需要内部自排版的组件数目。

## 0x34 其它修改点

* iOS 平台上 recycler/waterfall 组件依赖 UICollectionView 实现。对于 waterfall 组件，可以通过 auto 属性灵活定义列数、列宽、间隔等属性，实现自适应效果。接入 WeexCore 后，相关计算下沉到 WeexCore 中，上层不再关心，只需要按照排版结果展示组件即可。

* Weex 支持 transition 动画，内部通过插值不断修改 layout 坐标实现动画效果，不受平台影响。因为接入 WeexCore 后 Styles 在底层被 WeexCore 分组，与 CSS 相关的布局信息不再上传到平台层。而 transition 动画起始值需要相关信息，故不能再从 Styles 中获取。与 Android 平台一致，从底层 RenderObject（也就是 LayoutNode）中获取。

* Styles 不再上传到平台层后，一些三方自定义 WXComponent 不能再从 Objective-C 类中取到原始 CSS 样式信息，因此 SDK 提供了一组获取 CSS 样式的[方法](https://weex.io/zh/guide/extend/extend-ios.html#%E8%8E%B7%E5%8F%96%E7%BB%84%E4%BB%B6%E7%9A%84-css-%E6%A0%B7%E5%BC%8F)。

# 0x4 To be continued...

WeexCore 将成为两个平台提升开发效率，提升运行效率，提升一致性的重要工具。诸多技术改造和新功能也在开发中，如：

* iOS/Android 共用的 JSEngine 将 DOM 指令直接输出给 WeexCore，iOS 不再对接系统 JSContext/JSValue，实现引擎层面的架构统一，同时做到 JSEngine 可替换。
* Eagle 高性能虚拟机将 DOM 指令输出给 WeexCore，由 WeexCore 输出渲染指令，上层对虚拟机是 Javascript 虚拟机还是 Eagle 虚拟机无感知。
* WeexCore 做到中间桥梁将渲染指令输出给 Native 组件或自绘组件，实现类似 Flutter 与浏览器的纯自绘页面，使 Weex 既可对接 iOS/Android 系统 UI 库，也可以对接任意自绘 UI 库。