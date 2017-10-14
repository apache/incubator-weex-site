---
title: Get Started
type: guide
group: Overview
order: 1.1
version: 2.1
---

## What is Weex?

> Weex is A framework for building Mobile cross-platform UIs.

Weex enables developers to use web development experience to build both Android, iOS and web apps with a single codebase.

## Overview

Here is an example writing in Weex and Vue.js:

![Weex Example](./images/weex-example-yo.png)

This example is written in Vue.js [single file component](https://vuejs.org/v2/guide/single-file-components.html) syntax. Vue.js 2.0

You can see and edit this example at [Weex online playground](http://dotwe.org/vue/8da01827631b21150a12dd54d7114380). Use the [Weex playground app]() to scan the QR code on the right you will see the result rendered on your own phone.

### Native Component

![Native Component](./images/native-component.png)

In this example, the `<div>` and the `<text>` is rendered into corresponding native components.

### Write Once, Run Everywhere

You can read *[How it works](../wiki/index.html)* and *[Design Principles](../wiki/design-principles.html)* to know more about the technologies and ideas behind Weex.

### More Examples

## Support Multiple Front-End Frameworks

Vue.js 2.0 and Rax

![Vue and Rax](./images/vue-rax.png)

~~You can call it *"Weex VR"*, but it has nothing with the *Virtual Reality*.~~

Those frameworks are packaged into Weex SDK, you don't need to require them manually. upgrade.

Weex isn't binding with any specific front-end frameworks, the DOM operations will convert into render directives send to native render engine. Weex can give the ability of rendering native components to them.

## Create Your Own App

Weex offered a command line tool, [weex-toolkit](), to help developers to get start easily.

### Setup

Make sure you have already installed the [Node.js](https://nodejs.org/), and then install the `weex-toolkit` globally.

```bash
npm install weex-toolkit -g
```

It will add a `weex` command to your global path, run `weex --help` can see the manual of all its sub commands. The most useful command is `weex create [project-name]`:

```bash
weex create awesome-app
```

After doing that, you'll get a standard **Weex + Vue.js** project under the `awesome-app` folder.

> Currently, the `weex-toolkit` only supports to create Vue.js project. If you want to use Rax, the `rax-cli` maybe helpful, please go to [Rax's official website](https://alibaba.github.io/rax/) for more details.

### Develop


```bash
cd awesome-app
npm install
npm run start
```

It will start a web server on the `8080` port. You can open `http://localhost:8080/index.html` to see the result rendered on the web. Besides, You can also open the `http://localhost:8080/preview.html` to preview the web render result in iframe and with a QR code generated on the right, which you can use the [Weex plaground app]() to scan it to see the render result on the mobile.

![Preview]()

### Build and Run

```bash
weex platform add ios
weex platform add android
```

```bash
weex run ios
weex run android
```

### Debug

```bash
weex debug
```

## Next Steps

(read other documents)
