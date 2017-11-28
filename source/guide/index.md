---
title: Get Started
type: guide
group: Overview
order: 1.1
version: 2.1
---

<!-- toc -->

## What is Weex?

> **Weex is a framework for building high-performance mobile apps with modern web development experience.**

Weex dedicates to enable developers to use modern web development experience to build both Android, iOS and web applications with a single codebase. In practice, you can use javascript and modern front-end frameworks to develop mobile apps after integrating the WeexSDK.

The structure of Weex is decoupled, the render engines are separate from the syntax layer. Weex doesn't rely on any specific front-end frameworks, instead, both [Vue.js](https://vuejs.org/) and [Rax](https://alibaba.github.io/rax/) can be performed on Weex.

Another primary goal of Weex is to keep up with modern development technologies and platform capabilities both on web and native. Productivity and performance can coexist in Weex. When writing Weex pages, you feel the same with writing web pages. When rendering Weex pages, you feel the same with rendering native pages.

## Overview

If you just want to try Weex, You don't need to install anything. There is an [online playground](http://dotwe.org/vue/) of Weex, you can write single page examples on it without any configurations. The source code should be writing in Vue.js [single file component](https://vuejs.org/v2/guide/single-file-components.html) syntax, and the render result of the web platform will be displayed in the mock phone shell.

Here is an [example](http://dotwe.org/vue/8da01827631b21150a12dd54d7114380) written in Weex and Vue.js:

![Weex Example](./images/weex-example-yo.png)

This example rendered a latter "Yo" in the center of the screen. If you want to preview the render result on the real mobile device, you could install the [Weex playground app](https://weex-project.io/playground.html) or integrate Weex SDK into your own app. And then, scan the QR code on the right of the online playground you will see the result rendered on your own device.

Within the `<template>` of the source code, You must be familiar with the `<div>` which is widely used on the web, and it's also the generic container on Weex. But the `<text>` component is provided by Weex, it's a block-level text container.

> The raw text node can only be placed in the `<text>` component, otherwise, it will be ignored.

Within the `<style>` tag, you can write CSS to describe the styles of the component, and the styles are [**scoped**](https://vue-loader.vuejs.org/en/features/scoped-css.html) by force on Weex.

~~[Here is more examples written in Weex and Vue.js](https://hanks10100.github.io/weex-vue-examples/)~~.

### Native Components

In the example above, the `<div>` and the `<text>` is rendered into corresponding native views on the mobile device, not `HTMLElement`.

![Native Components](./images/native-component.png)

Weex implemented render engines in each end and provides a group of [built-in components](../references/components/) for basic usage. Based on these components, you can compose and wrap more custom components.

Although the components in Weex look like HTML tags, you can't use all HTML tags, you can only use the built-in components and your custom components.

Under the scene, Weex is using the native widgets. Although Weex emphasize the consistency of each end, we still embrace the platform's own behavior and UI differences. For example, [this `<switch>` component](http://dotwe.org/vue/d96943452b6708422197c47920903823) may look different on Android and iOS.

![Different switch](./images/different-switch.png)

If you want to use more native component other than the built-in components, you should have to implement it on each platform and be consistent. The most practical way is to integrate the existing native components to weex platform.

### Native Modules

For those features which don't rely on the UI, Weex wraps it into **modules**. You can use `weex.requireModule('xxx')` to require them. It is a way to access native capabilities in javascript, such as network, storage, clipboard, and navigator. For example, you can [use `stream` module to fetch the star count of Vue.js](http://dotwe.org/vue/2ae062b6a04124a35bbe2da3b1e5c07b).

Similarly, Weex also provides a group of [built-in modules](../references/modules/) for basic usage, and support to integrate the existing native modules to weex platform.

Here are some documents on how to extend native components and native modules of Weex:

+ [Extend Web Render](./extend-web-render.html)
+ [Extend Android](./extend-android.html)
+ [Extend iOS](./extend-ios.html)

### Write Once, Run Everywhere

Yes, Weex can build both Android, iOS and web apps with a single codebase.

balala.

You can read *[How it works](../wiki/index.html)* and *[Design Principles](../wiki/design-principles.html)* to know more about the technologies and ideas behind Weex.

## Support Multiple Front-End Frameworks

Front-end frameworks are the syntax layer of weex, they are decoupled with native render engines. Weex isn't binding with any specific front-end frameworks, instead, Weex can bring native capabilities to them.

Weex supports [Vue.js](https://vuejs.org/) and [Rax](https://alibaba.github.io/rax/) as its internal front-end framework.

![Vue and Rax](./images/vue-rax.png)

+ **Vue.js** is a progressive front-end framework for building user interfaces.
+ **Rax** is a front-end framework with largely React-compatible APIs.

> Vue.js and Rax are already integrated into Weex SDK, you don't need to require them manually.

However, Vue and Rax aren't the only options, it's possible to integrate your favorite front-end framework into Weex. There is a document *[Extend JS Framework](./advanced/extend-js-framework.html)* that describes how to implement it, but the process is still very complicated and tricky. To achieve it, you need to understand many underlying details about the js-native bridge and native render engines.

You can read *[Front-End Frameworks](./front-end-frameworks.html)* to learn more details.

## Create Your Own App

> The following steps assume you have already known the foundational knowledge of Node.js and npm. If you are not familiar with them, you can visit [https://docs.npmjs.com/](https://docs.npmjs.com/) to learn more about npm.

Weex provide a command line tool, the [weex-toolkit](http://weex-project.io/tools/toolkit.html), to help developers to get start easily. It can help you create a starter project, setup iOS and Android development environments, debug, install plugins and so on.

Currently, the `weex-toolkit` only supports to create the Vue.js project. The `rax-cli` maybe helpful if you want to use Rax. Please visit [Rax's official website](https://alibaba.github.io/rax/) for more details.

### Set up

Make sure you have already installed the [Node.js](https://nodejs.org/), and then install the `weex-toolkit` globally.

```bash
npm install weex-toolkit -g
```

It will add the `weex` command to your global path. Then you can use `weex create` to create a starter project:

```bash
weex create awesome-app
```

After doing that, you'll get a standard **Weex + Vue.js** project under the `awesome-app` folder of current path.

### Develop

The next step is get into the path, install dependencies, and start.

```bash
cd awesome-app
npm install
npm start
```

It will start a web server on the `8081` port.

You can open `http://localhost:8081` to see the render result on the web. Besides, You can also open `http://localhost:8081/preview.html` to preview the web render result in iframe and with a QR code generated on the right. Use the [Weex playground app](http://weex-project.io/playground.html) to scan it and you'll see the render result on the phone.

![Preview]()

The source code is located in `src/` folder. You can develop it as normal Vue.js project.

### Build and Run

By default, the `weex create` command doesn't create the iOS and Android project, but you can use `weex platform add` to add them.

```bash
weex platform add ios
weex platform add android
```

Depends on your network environment, it may take a while, please be patient.

In order to develop the app on your local machine, you need to set up mobile development environments. For iQS, you should install [Xcode](https://developer.apple.com/xcode/). And for Android, you should install [Android Studio](https://developer.android.com/studio/index.html). If the development environments are ready, run the commands below could launch your app on the simulator or real device.

```bash
weex run ios
weex run android
weex run web
```

### Debug

The `weex-toolkit` can also be used to debug your mobile apps. Just run:

```bash
weex debug
```

It'll start debug server and open a web page in Chrome (only support V8 engine). For more technical details of `weex-toolkit`, please refer to the [toolkit document](../tools/toolkit.html).
