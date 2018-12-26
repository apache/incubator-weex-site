# What is Weex?

<!-- toc -->

> **Weex is a framework for building high-performance mobile applications with a modern web development experience.**

Weex enables developers to use modern web development experience to build Android, iOS, and web apps with a single codebase. In practice, you can use JavaScript and modern front-end frameworks to develop mobile apps after integrating the WeexSDK.

The structure of Weex is decoupled: the render engines are separated from the syntax layer. Weex does not rely on any specific front-end framework; however, Weex mainly supports [Vue.js](https://vuejs.org/) and [Rax](https://alibaba.github.io/rax/).

Another primary goal of Weex is to keep up with modern development technologies and platform capabilities both for web and native. Productivity and performance can coexist in Weex. Writing Weex pages feels the same as writing web pages. In fact, rendering Weex pages is the same as rendering native pages.

## Overview

If you just want to try Weex, you do not need to install anything. There is an [online playground](http://dotwe.org/vue/) for Weex wherein you can write single page examples without any installation or configuration. The source code should be written in Vue.js [single file component](https://vuejs.org/v2/guide/single-file-components.html) syntax (also known as the `*.vue` files), and the rendered result from editor pane will be displayed in a mock phone shell.

Here is an [example](http://dotwe.org/vue/8da01827631b21150a12dd54d7114380) written in Weex and Vue.js:

![Weex Example](./images/weex-example-yo.png)

This example renders a word "Yo" in the center of the screen. If you want to preview the rendered result on a mobile device, you need to install the [Weex playground app](/tools/playground.html), or integrate Weex SDK into your own app and scan your page's QR code with your playground app or your own app (with the QR scan feature to load scanned URL with Weex SDK). Thereafter, you will see the rendered result on your device.

Within the `<template>` of the source code, you will notice the `<div>` element, which is widely used on the web, and is also the generic container in Weex. The `<text>` component, however, is provided by Weex and is a block-level text container.

> The raw text node can only be placed in the `<text>` component, otherwise, it will be ignored.

Within the `<style>` tag, you can write CSS to describe the styles of a component, and those styles are [**scoped**](https://vue-loader.vuejs.org/en/features/scoped-css.html) forcibly in Weex.

### Native Components

In the example above, the `<div>` and the `<text>` elements are rendered into corresponding native views on the mobile device. As such, they do not implement the `HTMLElement` interface.

![Native Components](./images/native-component.png)

Weex implements render engines both on iOS and Android and provides a group of [built-in components](../references/components/) for basic usage. Based on these components, you can compose and wrap more custom components.

Although the components in Weex look like HTML tags, you are not able to use all of them, instead, you can only use the built-in components and your custom components.

Behind the scenes, Weex uses native widgets. Although Weex emphasizes consistency on each mobile platform, we still embrace the platform's own behavior and UI differences. For example, [the `<switch>` component](http://dotwe.org/vue/d96943452b6708422197c47920903823) may look different on Android and iOS (the appearance on the web simulates iOS).

![Different switch](./images/different-switch.png)

If you want to use additional native components, other than the built-in components provided by Weex, you need to implement them on each platform and keep their behaviors consistent. The most practical way is to integrate the existing native components to Weex platform. /_ need explanation _/

### Native Modules

For those features that do not rely on the UI, Weex wraps them into **modules**. You can use `weex.requireModule('xxx')` to require them. Weex modules provide easy access to native capabilities in JavaScript, such as network, storage, clipboard, and navigator. For example, you can [use `stream` module to fetch the star count of Vue.js](http://dotwe.org/vue/2ae062b6a04124a35bbe2da3b1e5c07b).

Similarly, Weex provides a group of [built-in modules](../references/modules/) for basic usage, and supports the integration of the existing native modules into the Weex platform.

Here are some documents about how to extend native components and native modules for Weex:

- [Extend Web Render](./extend-web-render.html)
- [Extend Android](./extend-android.html)
- [Extend iOS](./extend-ios.html)

### Write Once, Run Everywhere

Yes, Weex can build for Android, iOS, and Web apps from a single codebase.

Using the same source code across different platforms can dramatically increase development productivity and simplify the testing, building, and publishing processes. On this basis, Weex can combine the front-end's packaging and testing process with the mobile's publishing and monitoring system to improve development efficiency.

> You can read _[How it works](../wiki/index.html)_ and _[Design Principles](../wiki/design-principles.html)_ to know more about the technologies and ideas behind Weex.

Although Weex uses a single codebase, you can still write platform specific code. Weex provides `weex.config.env` and `WXEnvironment` (they are strictly equal) to get the current runtime environment. You can use `WXEnvironment.platform` to determine which platform the code is running on. Except for the _platform_, `WXEnvironment` contains other information pertaining to environment, such as _osVersion_ and _deviceModel_. Refer to _[Weex variable](../references/weex-variable.html)_ for the complete list.

## Support For Multiple Front-End Frameworks

Front-end frameworks are the syntax layer of Weex; therefore, they are decoupled from native render engines. Weex does not bind with any specific front-end frameworks, instead, Weex brings native capabilities to the front-end.

Weex supports [Vue.js](https://vuejs.org/) and [Rax](https://alibaba.github.io/rax/) as its internal front-end frameworks.

![Vue and Rax](./images/vue-rax.png)

- **Vue.js** is a progressive front-end framework for building user interfaces.
- **Rax** is a front-end framework with React-compatible APIs.

> Vue.js and Rax are already integrated into Weex SDK, you don't need to require them manually.

However, Vue and Rax are not the only options. It is entirely possible to integrate your favorite front-end framework into Weex! There is a document _[Extend JS Framework](./extend-js-framework.html)_ that describes how to integrate a different front-end framework, the process, however, is still complicated and tricky. You need to understand many underlying details about the js-native bridge and native render engines in order to successfully integrate an alternate front-end framework.

You can read _[Front-End Frameworks](./front-end-frameworks.html)_ for more details.


## Next Steps

At this point, you should have a general understanding of Weex. The next step is to explore and try the advanced features of Weex.

If you want to use weex right now:

- [Create new app](./develop/create-a-new-app.html)
- [Integrate Weex to Your Existing App](./integrate-to-your-app.html)
- [Set up Development Environment](./set-up-env.html)
- [References](../references/)

If you want to know the technologies and ideas behind Weex:

- [How it Works](../wiki/index.html)
- [Design Principles](../wiki/design-principles.html)
- [Platform Differences between Weex and Web](../wiki/platform-difference.html)

After getting acquainted with Weex, if you want to contribute to make it even better:

- [Development Process](../development-process.html)
- [How to Contribute](../contributing.html)

Considering that Weex is a cross-stack technology, fundamental knowledge of front-end development, Vue.js, iOS, and Android would be especially helpful.
