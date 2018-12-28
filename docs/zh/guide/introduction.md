# 什么是 Weex ？

<!-- toc -->

> **Weex 是一个使用 Web 开发体验来开发高性能原生应用的框架。**

Weex 致力于使开发者能基于通用跨平台的Web开发语言，构建 Android、iOS 和 Web 应用。具体来讲，在集成了 WeexSDK 之后，你可以使用 JavaScript语言来开发移动应用。

Weex渲染引擎与DSL语法层是分开的，也不强依赖任何特定的前端框架，目前支持 [Vue.js](https://vuejs.org/) 和 [Rax](https://alibaba.github.io/rax/) 这两个前端框架。

Weex 的另一个主要目标是跟进当代先进的 Web 开发和原生开发的技术，使生产力和性能共存。在开发 Weex 页面就像开发普通网页一样；在渲染 Weex 页面时和渲染原生页面一样。

## Overview

如果你只是想尝试 Weex，你并不需要安装任何东西。 Weex有一个[在线编写代码的平台](http://dotwe.org/vue/)，你可以在上面写单个页面的例子，而不需要任何配置。在平台上源代码应该用 Vue.js 的[单文件组件](https://vuejs.org/v2/guide/single-file-components.html) 语法来编写，在 Web 平台的渲染结果将显示在一个模拟的手机壳中。

这里有一个使用 Weex 和 Vue.js 开发的[最简单的例子](http://dotwe.org/vue/8da01827631b21150a12dd54d7114380)：

![Weex Example](../../guide/images/weex-example-yo.png)

这个例子在屏幕正中间渲染了一个单词 “Yo”。 如果你想在移动设备上预览渲染结果，你只需要安装[Weex playground app](../tools/playground.html) 或将 Weex SDK 集成到您自己的应用程序中，然后使用扫描网页右侧的二维码。

在源代码的 `<template>` 中，`<div>` 你应该很熟悉了，它在 Weex 平台上也是一个通用容器。但是 `<text>` 组件是由 Weex 特有的，它是一个块级的文本容器，可以用来渲染文字。

> 文本只能放在 `<text>` 标签里，否则将被忽略。

在 `<style>` 标签内，你可以写 CSS 来描述一个组件的样式，需要注意的是，这些样式在 Weex 里只能作用于当前组件。（强制 [**scoped**](https://vue-loader.vuejs.org/en/features/scoped-css.html)）。

### 原生组件

在上面的例子中，`<div>` 和 `<text>` 在移动端上渲染出来的都是原生组件，而不是 `HTMLElement`。

![Native Components](../../guide/images/native-component.png)

Weex 提供了一套基础的内置组件，比如

- [Text](../docs/components/text.html)
- [Image](../docs/components/image.html)
- [List](../docs/components/list.html)
- [RichText](../docs/components/richtext.html)

基于这些组件，你可以用 js 封装更多的上层组件。

尽管 Weex 中的组件看起来很像 HTML 标签，但你无法使用所有 HTML 标签，只能使用内置组件和自定义组件。

在框架内部，Weex 使用的是原生系统提供的 View 来渲染的。尽管 Weex 强调每个跨平台的一致性，但我们仍然接受平台本身的行为和 UI 差异。 例如 [<switch/> switch 组件](http://dotwe.org/vue/d96943452b6708422197c47920903823) 在 Android 和 iOS 上看起来是不同的（在 Web 端的外观模拟了 iOS）。

![Different switch](../../guide/images/different-switch.png)

除了内置组件以外，Weex 也支持你扩展更多原生组件，但是你需要在每个平台上实现它们，并保持其行为一致。最实用的方法是将现有的本地组件集成到 Weex 中。

### 原生模块

对于那些不依赖于 UI 的功能，Weex 推荐将它们包装到**模块**中，然后使用 `weex.requireModule('xxx')` 来引入。 这是使用 javascript 调用原生功能的一种方法，如网络，存储，剪贴板和页面导航等功能。这里有一个[使用 `stream` 模块获取 Vue.js 的 star 数](http://dotwe.org/vue/2ae062b6a04124a35bbe2da3b1e5c07b) 的例子。

同样，Weex 也提供了一套基础的内置模块,比如

- [storage](../docs/modules/storage.html)
- [navigator](../docs/modules/navigator.html)
- [animation](../docs/modules/animation.html)
- [websockets](../docs/modules/websockets.html)

也支持将已有的原生模块集成到 Weex 中。关于如何扩展 Weex 的原生组件和原生模块，可以参考下列文档：

+ [扩展 Web](../guide/extend/extend-web.html)
+ [扩展 Android](../guide/extend/extend-android.html)
+ [扩展 iOS](../guide/extend/extend-ios.html)

### 一次编写，处处运行

Weex 可以只编写一份代码，开发出三端都可用的页面。

在多个端中使用相同的源代码可以显著提高开发效率，并简化测试，构建和发布流程。在此基础上，Weex 可以将前端的打包、测试流程与手机端监控、发布系统结合起来，提高开发效率。

尽管 Weex 多端都是用的同一份代码，但是仍然支持针对特定的平台开发功能。Weex 提供了 `weex.config.env` 和 `WXEnvironment`（它们是相同的）来获得当前的运行时环境。你可以用 `WXEnvironment.platform` 来确定代码运行在哪个平台上。除了平台以外，`WXEnvironment` 还包含其他环境信息，如 *osVersion* 和 *deviceModel*，参考 *[Weex variable](../docs/api/weex-variable.html)* 了解更多详细信息。

## 支持多个前端框架

前端框架对 Weex 而言只是一个语法层，它们和原生渲染器是解耦的。Weex 并没有强绑定与某个特定的前端框架，而是可以把渲染原生 UI 的能力赋予某些前端框架。

目前 Weex 将 [Vue.js](https://vuejs.org/) 和 [Rax](https://alibaba.github.io/rax/) 作为其内置的前端框架。你可以阅读 *[前端框架](./front-end-frameworks.html)* 这篇文档了解更多信息。

![Vue and Rax](../../guide/images/vue-rax.png)

+ **Vue.js** 是一套用于构建用户界面的渐进式框架。
+ **Rax** 兼容 React 接口的前端框架。

> Vue.js 和 Rax 都已经集成进了 Weex SDK，你不需要再额外引入。

然而 Weex 也不是只支持 Vue 和 Rax，你也可以把自己喜欢的前端框架集成到 Weex 中。有一个文档*[扩展前端框架](../guide/extend/extend-framework.html)*描述了如何实现，但是这个过程仍然非常复杂和棘手，你需要了解关于 js-native 之间通信和原生渲染引擎的许多底层细节。

## 下一步

当你看到这里的时候，我相信你已经了解了 Weex的基本知识。下一步是深入了解 Weex 的其他特性，并且亲自尝试。

如果你想现在就用 Weex：

+ [创建一个 App](./develop/create-a-new-app.html)
+ [将 Weex 集成到Android应用](./develop/integrate-to-android-app.html)
+ [将 Weex 集成到iOS应用](./develop/integrate-to-iOS-app.html)
+ [配置开发环境](./develop/setup-develop-environment.html)

如果你想了解 Weex 背后的原理：

+ [Weex 是如何工作的](./work-principles.html)
+ [和 Web 平台的差异](./platform-difference.html)

如果你想让 Weex 变得更好：

+ [Weex 的开发流程](./contribute/development-process.html)
+ [如何参与贡献](./contribute/how-to-contribute.html)

此外，Weex 是一个跨栈的技术，开发人员也是多样化的，学习一些前端开发、Vue.js、iOS 和 Android 的基本知识，会对你开发 Weex 有很大的帮助。
