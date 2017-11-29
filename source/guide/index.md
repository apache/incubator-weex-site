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

The structure of Weex is decoupled, the render engines are separated from the syntax layer. Weex doesn't rely on any specific front-end framework, it mainly supports [Vue.js](https://vuejs.org/) and [Rax](https://alibaba.github.io/rax/).

Another primary goal of Weex is to keep up with modern development technologies and platform capabilities both for web and native. Productivity and performance can coexist in Weex. Writing Weex pages feels the same like writing web pages. Rendering Weex pages is just the same as rendering native pages.

## Overview

If you just want to try Weex, You don't need to install anything. There is an [online playground](http://dotwe.org/vue/) of Weex, you can write single page examples on it without any configurations. The source code should be written in Vue.js [single file component](https://vuejs.org/v2/guide/single-file-components.html) syntax, and the render result of the web platform will be displayed in a mocked phone shell.

Here is an [example](http://dotwe.org/vue/8da01827631b21150a12dd54d7114380) written in Weex and Vue.js:

![Weex Example](./images/weex-example-yo.png)

This example renders a latter "Yo" in the center of the screen. If you want to preview the render result on the mobile device, you need to install the [Weex playground app](https://weex-project.io/playground.html) or integrate Weex SDK into your own app. Then scan your page's QR code with your playground app or your own app (with the QR scan feature to load scanned URL with Weex SDK), and you will see the rendered result on your device.

Within the `<template>` of the source code, You must be familiar with the `<div>` which is widely used on the web, and it's also the generic container on Weex. But the `<text>` component is provided by Weex, it's a block-level text container.

> The raw text node can only be placed in the `<text>` component, otherwise, it will be ignored.

Within the `<style>` tag, you can write CSS to describe the styles of a component, and those styles are [**scoped**](https://vue-loader.vuejs.org/en/features/scoped-css.html) forcibly in Weex.

### Native Components

In the example above, the `<div>` and the `<text>` is rendered into corresponding native views on the mobile device, which is not `HTMLElement`.

![Native Components](./images/native-component.png)

Weex implements render engines both on iOS and Android and provides a group of [built-in components](../references/components/) for basic usage. Based on these components, you can compose and wrap more custom components.

Although the components in Weex look like HTML tags, you are not able to use all of them, instead, you can only use the built-in components and your custom components.

Under the scene, Weex uses the native widgets. Although Weex emphasize the consistency on each mobile platform, we still embrace the platform's own behavior and UI differences. For example, [the `<switch>` component](http://dotwe.org/vue/d96943452b6708422197c47920903823) may look different on Android and iOS (the appearance on the web simulates iOS).

![Different switch](./images/different-switch.png)

If you want to use more native component other than the built-in components, you need to implement them on each platform and keep their behaviors to be consistent. The most practical way is to integrate the existing native components to Weex platform.

### Native Modules

For those features which does not rely on the UI, Weex wraps them into **modules**. You can use `weex.requireModule('xxx')` to require them. It is a way to access native capabilities in javascript, such as network, storage, clipboard, and navigator. For example, you can [use `stream` module to fetch the star count of Vue.js](http://dotwe.org/vue/2ae062b6a04124a35bbe2da3b1e5c07b).

Similarly, Weex also provides a group of [built-in modules](../references/modules/) for basic usage, and supports the integration of the existing native modules to Weex platform.

Here are some documents about how to extend native components and native modules for Weex:

+ [Extend Web Render](./extend-web-render.html)
+ [Extend Android](./extend-android.html)
+ [Extend iOS](./extend-ios.html)

### Write Once, Run Everywhere

Yes, Weex can build for Android, iOS and Web from a single codebase.

Using the same source code across different platforms can dramatically increase development productivity and simplify the testing, building, and publishing processes. On this basis, Weex can combine the front-end's packaging and testing process with the mobile's publishing and monitoring system to improve development efficiency.

> You can read *[How it works](../wiki/index.html)* and *[Design Principles](../wiki/design-principles.html)* to know more about the technologies and ideas behind Weex.

Although Weex uses a single codebase, you can still write platform specific codes. Weex provides `weex.config.env` and `WXEnvironment` (they are strictly equal) to get the current runtime environment. You can use `WXEnvironment.platform` to determine which platform the code is running on. Except for the *platform*, `WXEnvironment` also contains other environmental informations, such as *osVersion* and *deviceModel*, refer to *[Weex variable](../references/weex-variable.html)* for the complete list.

## Support Multiple Front-End Frameworks

Front-end frameworks are syntax layer of weex, they are decoupled from native render engines. Weex does not bind with any specific front-end frameworks, instead, it brings native capabilities to them.

Weex supports [Vue.js](https://vuejs.org/) and [Rax](https://alibaba.github.io/rax/) as its internal front-end framework.

![Vue and Rax](./images/vue-rax.png)

+ **Vue.js** is a progressive front-end framework for building user interfaces.
+ **Rax** is a front-end framework with React-compatible APIs.

> Vue.js and Rax are already integrated into Weex SDK, you don't need to require them manually.

However, Vue and Rax are not the only options, it's possible to integrate other your favorite front-end framework into Weex. There is a document *[Extend JS Framework](./advanced/extend-js-framework.html)* that describes how to implement it, but the process is still very complicated and tricky. To achieve it, you need to understand many underlying details about the js-native bridge and native render engines.

You can read *[Front-End Frameworks](./front-end-frameworks.html)* to learn more details.

## Create Your Own App

> The following steps assume you have already known the foundational knowledge of Node.js and npm. If you are not familiar with them, you can visit [https://docs.npmjs.com/](https://docs.npmjs.com/) to learn more about npm.

Weex provide a command line tool, the [weex-toolkit](http://weex-project.io/tools/toolkit.html), to help developers to get start easily. It can help you to create a starter project, setup iOS and Android development environments, debug, install plugins and so on.

Currently, the `weex-toolkit` only supports the creation of Vue.js project. The `rax-cli` maybe helpful if you want to use Rax. Please visit [Rax's official website](https://alibaba.github.io/rax/) for more details.

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

The next step is to navigate into the generated directory, install dependencies, and start.

```bash
cd awesome-app
npm install
npm start
```

It will start a web server on the `8081` port. You can open `http://localhost:8081` to see the render result on the web. The source code is located in `src/` folder. You can develop it as normal Vue.js project.

![Preview](./images/toolkit-preview.png)

Besides, You can also open `http://localhost:8081/preview.html` to preview the rendered result for web in iframe. You can also scan the QR code generated on the right using the [Weex playground app](http://weex-project.io/playground.html) then you'll see the rendered result on the mobile device.

### Build and Run

By default, the `weex create` command doesn't create the iOS and Android project, but you can use `weex platform add` to add them.

```bash
weex platform add ios
weex platform add android
```

Depends on your network environment, it may take a while, please be patient.

In order to develop the app on your local machine, you need to set up mobile development environments. For iOS, you should install [Xcode](https://developer.apple.com/xcode/). And for Android, you should install [Android Studio](https://developer.android.com/studio/index.html). When the development environments are ready, run the commands below to launch your app on the simulator or the device.

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

## Next Steps

I believe you've learned the basics of Weex when you reach here. The next step is to learn more advanced features of Weex and try it right away.

If you want to use weex right now:

+ [Integrate Weex to Your Existing App](./integrate-to-your-app.html)
+ [Set up Development Environment](./set-up-env.html)
+ [References](../references/)

If you want to know the technologies and ideas behind Weex:

+ [How it Works](../wiki/index.html)
+ [Design Principles](../wiki/design-principles.html)
+ [Platform Differences between Weex and Web](../wiki/platform-difference.html)

After getting acquainted with Weex, if you want to contribute to make it even better:

+ [Development Process](../development-process.html)
+ [How to Contribute](../contributing.html)

In addition, Weex is a cross-stack technology, developers are also diverse, learn some fundamental knowledge of front-end development, Vue.js, iOS and Android would be especially helpful.
