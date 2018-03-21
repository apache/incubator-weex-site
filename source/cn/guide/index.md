---
title: 快速上手
type: guide
group: Overview
order: 1.1
version: 2.1
---

<!-- toc -->

## 什么是 Weex ？

> **Weex 是一个使用 Web 开发体验来开发高性能原生应用的框架。**

Weex 致力于使开发者能基于当代先进的 Web 开发技术，使用同一套代码来构建 Android、iOS 和 Web 应用。具体来讲，在集成了 WeexSDK 之后，你可以使用 JavaScript 和现代流行的前端框架来开发移动应用。

Weex 的结构是解耦的，渲染引擎与语法层是分开的，也不依赖任何特定的前端框架，目前主要支持 [Vue.js](https://vuejs.org/) 和 [Rax](https://alibaba.github.io/rax/) 这两个前端框架。

Weex 的另一个主要目标是跟进当代先进的 Web 开发和原生开发的技术，使生产力和性能共存。在开发 Weex 页面就像开发普通网页一样；在渲染 Weex 页面时和渲染原生页面一样。

## Overview

如果你只是想尝试 Weex，你并不需要安装任何东西。 Weex有一个[在线编写代码的平台](http://dotwe.org/vue/)，你可以在上面写单个页面的例子，而不需要任何配置。在平台上源代码应该用 Vue.js 的[单文件组件](https://vuejs.org/v2/guide/single-file-components.html) 语法来编写，在 Web 平台的渲染结果将显示在一个模拟的手机壳中。

这里有一个使用 Weex 和 Vue.js 开发的[最简单的例子](http://dotwe.org/vue/8da01827631b21150a12dd54d7114380)：

![Weex Example](../../guide/images/weex-example-yo.png)

这个例子在屏幕正中间渲染了一个单词 “Yo”。 如果你想在移动设备上预览渲染结果，你只需要安装[Weex playground app](http://weex.apache.org/cn/tools/playground.html) 或将 Weex SDK 集成到您自己的应用程序中，然后使用扫描网页右侧的二维码。

在源代码的 `<template>` 中，`<div>` 你应该很熟悉了，它在 Weex 平台上也是一个通用容器。但是 `<text>` 组件是由 Weex 特有的，它是一个块级的文本容器，可以用来渲染文字。

> 文本只能放在 `<text>` 标签里，否则将被忽略。

在 `<style>` 标签内，你可以写 CSS 来描述一个组件的样式，需要注意的是，这些样式在 Weex 里只能作用于当前组件。（强制 [**scoped**](https://vue-loader.vuejs.org/en/features/scoped-css.html)）。

### 原生组件

在上面的例子中，`<div>` 和 `<text>` 在移动端上渲染出来的都是原生组件，而不是 `HTMLElement`。

![Native Components](../../guide/images/native-component.png)

Weex 在 iOS 和 Android 上都实现了一个渲染引擎，并提供了一套基础的[内置组件](../references/components/)。基于这些组件，你可以用 js 封装更多的上层组件。

尽管 Weex 中的组件看起来很像 HTML 标签，但你无法使用所有 HTML 标签，只能使用内置组件和自定义组件。

在框架内部，Weex 使用的是原生系统提供的 Widget 来渲染的。尽管 Weex 强调每个跨平台的一致性，但我们仍然接受平台本身的行为和 UI 差异。 例如 [<switch> switch 组件](http://dotwe.org/vue/d96943452b6708422197c47920903823) 在 Android 和 iOS 上看起来是不同的（在 Web 端的外观模拟了 iOS）。

![Different switch](../../guide/images/different-switch.png)

除了内置组件以外，Weex 也支持你扩展更多原生组件，但是你需要在每个平台上实现它们，并保持其行为一致。最实用的方法是将现有的本地组件集成到 Weex 平台中。

### 原生模块

对于那些不依赖于 UI 的功能，Weex 推荐将它们包装到**模块**中，然后使用 `weex.requireModule('xxx')` 来引入。 这是使用 javascript 调用原生功能的一种方法，如网络，存储，剪贴板和页面导航等功能。这里有一个[使用 `stream` 模块获取 Vue.js 的 star 数](http://dotwe.org/vue/2ae062b6a04124a35bbe2da3b1e5c07b) 的例子。

同样，Weex 也提供了一套基础的[内置模块](../references/modules/)，也支持将已有的原生模块集成到 Weex 中。

关于如何扩展 Weex 的原生组件和原生模块，可以参考下列文档：

+ [扩展 Web 渲染器](./extend-web-render.html)
+ [扩展 Android](./extend-android.html)
+ [扩展 iOS](./extend-ios.html)

### 一次编写，处处运行

Weex 可以只编写一份代码，开发出三端都可用的页面。

在多个端中使用相同的源代码可以显著提高开发效率，并简化测试，构建和发布流程。在此基础上，Weex 可以将前端的打包、测试流程与手机端监控、发布系统结合起来，提高开发效率。

尽管 Weex 多端都是用的同一份代码，但是仍然支持针对特定的平台开发功能。Weex 提供了 `weex.config.env` 和 `WXEnvironment`（它们是相同的）来获得当前的运行时环境。你可以用 `WXEnvironment.platform` 来确定代码运行在哪个平台上。除了平台以外，`WXEnvironment` 还包含其他环境信息，如 *osVersion* 和 *deviceModel*，参考 *[Weex variable](../references/weex-variable.html)* 了解更多详细信息。

## 支持多个前端框架

前端框架对 Weex 而言只是一个语法层，它们和原生渲染器是解耦的。Weex 并没有强绑定与某个特定的前端框架，而是可以把渲染原生 UI 的能力赋予某些前端框架。

目前 Weex 将 [Vue.js](https://vuejs.org/) 和 [Rax](https://alibaba.github.io/rax/) 作为其内置的前端框架。你可以阅读 *[前端框架](./front-end-frameworks.html)* 这篇文档了解更多信息。

![Vue and Rax](../../guide/images/vue-rax.png)

+ **Vue.js** 是一套用于构建用户界面的渐进式框架。
+ **Rax** 兼容 React 接口的前端框架。

> Vue.js 和 Rax 都已经集成进了 Weex SDK，你不需要再额外引入。

然而 Weex 也不是只支持 Vue 和 Rax，你也可以把自己喜欢的前端框架集成到 Weex 中。有一个文档*[扩展前端框架](./advanced/extend-js-framework.html)*描述了如何实现，但是这个过程仍然非常复杂和棘手，你需要了解关于 js-native 之间通信和原生渲染引擎的许多底层细节。

## 创建一个 App

> 以下步骤假设您已经了解了 Node.js 和 npm 的基本知识。如果对它们不熟悉，可以访问 [https://docs.npmjs.com/](https://docs.npmjs.com/) 来了解更多关于 npm 的用法。

Weex 提供了一个命令行工具 [weex-toolkit](http://weex-project.io/tools/toolkit.html) 来帮助开发者使用 Weex。它可以用来快速创建一个空项目、初始化 iOS 和 Android 开发环境、调试、安装插件等操作。

目前 `weex-toolkit` 只支持创建 Vue.js 的项目。创建 Rax 的项目可以使用 `rax-cli`，参考 [Rax 的官方网站](https://alibaba.github.io/rax/) 了解其用法。

### 初始化

请确保你已经安装了 [Node.js](https://nodejs.org/)，然后全局安装 `weex-toolkit`。

```bash
npm install weex-toolkit -g
```

这条命令会向你命令行环境中注册一个 `weex` 命令。你可以用 `weex create` 命令来创建一个空的模板项目：

```bash
weex create awesome-app
```

命令执行完以后，在当前目录的 `awesome-app` 文件夹里就有了一个空的 **Weex + Vue.js** 项目。

### 开发

下一步就是进入刚刚创建的文件夹，并且安装依赖，然后执行 `npm start`：

```bash
cd awesome-app
npm install
npm start
```

然后工具会启动一个本地的 web 服务，监听 `8081` 端口。你可以打开 `http://localhost:8081` 查看页面在 Web 下的渲染效果。 源代码在 `src/` 目录中，你可以像一个普通的 Vue.js 项目一样来开发.

![Preview](../../guide/images/toolkit-preview.png)

除此之外，你还可以打开 `http://localhost:8081/preview.html` 开启一个预览页面，它会把 web 端的页面放在一个 iframe 中渲染，而且在右侧生成一个二维码。用 [Weex playground app](http://weex-project.io/playground.html) 扫描这个二维码可以看到页面在手机上渲染的真实效果。

### 编译和运行

默认情况下 `weex create` 命令并不初始化 iOS 和 Android 项目，你可以通过执行 `weex platform add` 来添加特定平台的项目。

```bash
weex platform add ios
weex platform add android
```

由于网络环境的不同，安装过程可能需要一些时间，请耐心等待。如果安装失败，请确保自己的网络环境畅通。

为了能在本地机器上打开 Android 和 iOS 项目，你应该配置好客户端的开发环境。对于 iOS，你应该安装并且配置好 [Xcode](https://developer.apple.com/xcode/)。对于 Android，你应该安装并且配置好 [Android Studio](https://developer.android.com/studio/index.html)。当开发环境准备就绪后，运行下面的命令，可以在模拟器或真实设备上启动应用：

```bash
weex run ios
weex run android
weex run web
```

### 调试

`weex-toolkit` 还提供了强大的调试功能，只需要执行：

```bash
weex debug
```

这条命令会启动一个调试服务，并且在 Chrome （目前只支持基于 V8 引擎的桌面浏览器） 中打开调试页面。详细用法请参考 [weex-toolkit 的文档](../tools/toolkit.html)。

## 下一步

当你看到这里的时候，我相信你已经了解了 Weex的基本知识。下一步是深入了解 Weex 的其他特性，并且亲自尝试。

如果你想现在就用 Weex：

+ [将 Weex 集成到已有应用](./integrate-to-your-app.html)
+ [配置开发环境](./set-up-env.html)
+ [手册](../references/)

如果你想了解 Weex 背后的原理：

+ [Weex 是如何工作的](../wiki/index.html)
+ [设计理念](../wiki/design-principles.html)
+ [和 Web 平台的差异](../wiki/platform-difference.html)

如果你想让 Weex 变得更好：

+ [Weex 的开发流程](../development-process.html)
+ [如何参与贡献](../contributing.html)

此外，Weex 是一个跨栈的技术，开发人员也是多样化的，学习一些前端开发、Vue.js、iOS 和 Android 的基本知识，会对你开发 Weex 有很大的帮助。
