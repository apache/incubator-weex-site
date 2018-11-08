> Weex 是一个使用 Web 开发体验来开发高性能原生应用的框架。

Weex 致力于使开发者能基于当代先进的 Web 开发技术，使用同一套代码来构建 Android、iOS 和 Web 应用。具体来讲，在集成了 WeexSDK 之后，你可以使用 JavaScript 和现代流行的前端框架来开发移动应用。

Weex 的结构是解耦的，渲染引擎与语法层是分开的，也不依赖任何特定的前端框架，目前主要支持 [Vue.js](https://vuejs.org/) 和 [Rax](https://alibaba.github.io/rax/) 这两个前端框架。

Weex 的另一个主要目标是跟进当代先进的 Web 开发和原生开发的技术，使生产力和性能共存。在开发 Weex 页面就像开发普通网页一样；在渲染 Weex 页面时和渲染原生页面一样。

如果你只是想尝试 Weex，你并不需要安装任何东西。 Weex有一个[在线编写代码的平台](http://dotwe.org/vue/)，你可以在上面写单个页面的例子，而不需要任何配置。在平台上源代码应该用 Vue.js 的[单文件组件](https://vuejs.org/v2/guide/single-file-components.html)语法来编写，在 Web 平台的渲染结果将显示在一个模拟的手机壳中。

这里有一个使用 Weex 和 Vue.js 开发的[最简单的例子](http://dotwe.org/vue/8da01827631b21150a12dd54d7114380)：
<div style="text-align: center"><img src="https://img.alicdn.com/tfs/TB1Qg.3n5rpK1RjSZFhXXXSdXXa-2800-1600.png" width="100%"></div>
这个例子在屏幕正中间渲染了一个单词 “Yo”。 如果你想在移动设备上预览渲染结果，你只需要安装[Weex playground app](http://weex.apache.org/cn/tools/playground.html)，然后扫描网页右侧的二维码即可。

在源代码的 `<template>` 中，`<div>` 你应该很熟悉了，它在 Weex 平台上也是一个通用容器。但是 `<text>` 组件是 Weex 特有的，它是一个块级的文本容器，可以用来渲染文字。
::: warning 注意
文本只能放在 `<text>` 标签里，否则将被忽略。
:::
在 <code>&lt;style&gt;</code> 标签内，你可以写 CSS 来描述一个组件的样式。需要注意的是，这些样式在客户端里只能作用于当前组件（<code>&lt;style&gt;</code> 等同于 <code>&lt;style scoped&gt;</code>，强制 [scoped](https://vue-loader.vuejs.org/guide/scoped-css.html)），而在 Web 端不是强制 [scoped](https://vue-loader.vuejs.org/guide/scoped-css.html)的，所以为了统一，建议  <code>&lt;style scoped&gt;</code> 写法。

### 原生组件
在上面的例子中，`<div>` 和 `<text>` 在移动端上渲染出来的都是原生组件，而不是 `HTMLElement`。
<div style="text-align: center"><img src="https://img.alicdn.com/tfs/TB17hs1nVzqK1RjSZFoXXbfcXXa-2600-1600.png" width="100%"></div>
Weex 在 iOS 和 Android 上都实现了一个渲染引擎，并提供了一套基础的[内置组件](/zh/docs/)。基于这些组件，你可以用 js 封装更多的上层组件。

尽管 Weex 中的组件看起来很像 HTML 标签，但你无法使用所有 HTML 标签，只能使用内置组件和自定义组件。

在框架内部，Weex 使用的是原生系统提供的 Widget 来渲染的。尽管 Weex 强调每个跨平台的一致性，但我们仍然接受平台本身的行为和 UI 差异。

除了内置组件以外，Weex 也支持你扩展更多原生组件，但是你需要在每个平台上实现它们，并保持其行为一致。

### 原生模块
对于那些不依赖于 UI 的功能，Weex 推荐将它们包装到模块中，然后使用 `weex.requireModule('xxx')` 来引入。 这是使用 javascript 调用原生功能的一种方法，如网络，存储，剪贴板和页面导航等功能。这里有一个[使用 stream 模块获取 Vue.js 的 star 数](http://dotwe.org/vue/2ae062b6a04124a35bbe2da3b1e5c07b) 的例子。

同样，Weex 也提供了一套基础的[内置模块](/zh/docs/animation.html)，也支持将已有的原生模块集成到 Weex 中。

关于如何扩展 Weex 的原生组件和原生模块，可以参考下列文档：

- [扩展 Web](http://weex-project.io/cn/guide/extend-web-render.html)
- [扩展 Android](http://weex-project.io/cn/guide/extend-android.html)
- [扩展 iOS](http://weex-project.io/cn/guide/extend-ios.html)

### 一次编写，处处运行
Weex 可以只编写一份代码，开发出三端都可用的页面。

在多个端中使用相同的源代码可以显著提高开发效率，并简化测试，构建和发布流程。在此基础上，Weex 可以将前端的打包、测试流程与手机端监控、发布系统结合起来，提高开发效率。

尽管 Weex 多端都是用的同一份代码，但是仍然支持针对特定的平台开发功能。Weex 提供了 `weex.config.env` 和 `WXEnvironment`（它们是相同的）来获得当前的运行时环境。你可以用 `WXEnvironment.platform` 来确定代码运行在哪个平台上。除了平台以外，`WXEnvironment` 还包含其他环境信息，如 osVersion 和 deviceModel，参考 *[Weex variable](http://weex.apache.org/cn/references/weex-variable.html)* 了解更多详细信息。

## 支持框架
前端技术很繁荣，测试、打包、调试等工具都比较丰富，开发效率比原生开发要高很多。在大型项目中使用前端框架也是一个管理应用的好方法，这样更方便于长期维护。

然而，Weex 并不是一个前端框架。实际上，前端框架仅仅是 Weex 的语法层或称之为 DSL (Domain-specific Language)，它们与原生渲染引擎是分离的。换句话说，Weex 并不依赖于特定的前端框架，随着前端技术的发展，Weex 也可以集成更多广泛使用的前端框架。

目前 Weex 主要支持 [Vue.js](https://vuejs.org/) 和 [Rax](https://alibaba.github.io/rax/) 作为其内置的前端框架。这些框架已经集成到了 Weex SDK，你不需要再额外引入。
<div style="text-align: center"><img src="https://img.alicdn.com/tfs/TB1xck0n4TpK1RjSZFGXXcHqFXa-2445-1064.png" width="100%"></div>
