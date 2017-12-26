---
title: Front-End Frameworks
type: guide
group: Overview
order: 1.3
version: 2.1
---

<!-- toc -->

![Vue and Rax](./images/vue-rax.png)

## Front-end Frameworks in Weex

Front-end frameworks are just the syntax layer of weex, they are decoupled from native render engines. That is to say, Weex does not relay on any specific front-end frameworks. Currently, Weex mainly supports [Vue.js](https://vuejs.org/) and [Rax](https://alibaba.github.io/rax/), and those frameworks are already integrated into Weex SDK, you don't need to require them manually.

Front-end technologies seem flourishing and productive. ~~Test, build, debug, tools, 3td-party libs.~~

The DOM operations will convert into render directives and send to native render engine.

With the evolution of technology, even if Vue.js and React are not popular any more few years later, Weex can integrate the new widely-used front-end frameworks as well.

It is better to learn some basics of Vue.js or Rax before using Weex.

## Vue.js

Vue (pronounced /vjuː/, like view) is a progressive front-end framework for building user interfaces.

> **[Official Website](https://vuejs.org/)**

Weex integrates with the v2 version of Vue.js since WeexSDK [v0.10.0](https://github.com/alibaba/weex/releases/tag/v0.10.0) (2016/02/17). If there is no special instructions, the "*Vue.js*" or "*Vue*" in this article all refers to "Vue.js v2".

### Runtime-only Build

If you are familiar with Vue.js, you should know that there are two available builds of Vue.js: [the **Runtime + Compiler** build and the **Runtime-only** build](https://vuejs.org/v2/guide/installation.html#Standalone-vs-Runtime-only-Build). The difference between them is whether to include the compiler which is able to compile the `template` option at runtime.

Since the runtime-only builds are roughly 30% lighter-weight than their full-build counterparts, Weex is using the runtime-only build of Vue.js for better performance and less code size.

Specifically, the differences are as follows:

+ The [`template`](https://vuejs.org/v2/api/#template) option is not supported when defining a component.
+ Does not support using [`x-templates`](https://vuejs.org/v2/guide/components.html#X-Templates).
+ Does not support using [`Vue.compile`](https://vuejs.org/v2/api/#Vue-compile).

### Different Features

Vue.js was designed for the Web platform at the beginning. Although it can be based on Weex to develop native applications, there are still many differences between web and native. See [Platform Differences Between Weex and Web](../ platform-difference.html) for more details.

#### Platform

+ Weex is a multi-page app, the `Vue` instances are different in each pages.

#### DOM

Because there is no DOM on Android and iOS, the type of [`vm.$el`](https://vuejs.org/v2/api/#vm-el) property is not the DOM element (`HTMLElement`).

Do not manipulate the generated (DOM) elements manually.

#### Styles

+ Scoped styles by default, by force.
+ Single class selector.

#### Events

Event bubbling and capturing are not supported in Weex currently, therefore, [event modifiers](https://vuejs.org/v2/guide/events.html#Event-Modifiers) such as `.prevent`, ` .capture`, `.stop`, ` .self` are not supported on Weex native components.

Moreover, the [keyboard event modifiers](https://vuejs.org/v2/guide/events.html#Key-Modifiers) and [system modifier keys](https://vuejs.org/v2/guide/events.html#System-Modifier-Keys), such as `.enter`, `.tab`, `.ctrl`, `.shift` mostly are meaningless on mobile device, which are also not supported in Weex.

#### Supported Directives

| Directive | Supported | Notes |
| --------- | --------- | ----- |
| [v-text](https://vuejs.org/v2/api/#v-text) | Yes |  |
| [v-pre](https://vuejs.org/v2/api/#v-pre) | Yes |  |
| [v-html](https://vuejs.org/v2/api/#v-html) | No | No HTML parser in Weex, and it's not good practice. |
| [v-show](https://vuejs.org/v2/api/#v-show) | No | Not support `display: none;` yet. |
| [v-if](https://vuejs.org/v2/api/#v-if) | Yes |  |
| [v-else](https://vuejs.org/v2/api/#v-else) | Yes |  |
| [v-else-if](https://vuejs.org/v2/api/#v-else-if) | Yes |  |
| [v-for](https://vuejs.org/v2/api/#v-for) | Yes |  |
| [v-on](https://vuejs.org/v2/api/#v-on) | Yes |  |
| [v-once](https://vuejs.org/v2/api/#v-once) | Yes |  |
| [v-bind](https://vuejs.org/v2/api/#v-bind) | Yes |  |
| [v-model](https://vuejs.org/v2/api/#v-model) | Yes |  |
| [v-cloak](https://vuejs.org/v2/api/#v-cloak) | No | Only support single class selector. |

### weex-vue-render

The [weex-vue-render](https://github.com/weexteam/weex-vue-render) implement the built-in components and modules of Weex on the web.

### Single File Component

[Single file component](https://vuejs.org/v2/guide/single-file-components.html) (as known as the `*.vue` files) of Vue is a special file format with a `.vue` extension. The template inside will be compiled into the `render` function at build time.

Moreover, there are many [syntax highlight plugins](https://github.com/vuejs/awesome-vue#source-code-editing) for all kind of editors.

> It's a good practice to use single file component syntax in Weex.

Because of the platform difference and 利用 web 本身特性的性能, you have to compile your source file in two different ways:

+ For the web platform, you can compile source files in any official way, such as [Webpack](https://webpack.js.org/) + [vue-loader](https://vue-loader.vuejs.org/en/) or Browserify + vueify.
+ For Android and iOS platforms, you should use [weex-loader](https://github.com/weexteam/weex-loader) to compile the `*.vue` files.

#### Using weex-loader

[weex-loader](https://github.com/weexteam/weex-loader) is a [loader](http://webpack.github.io/docs/using-loaders.html) for webpack that can transform `*.vue` file into a plain javascript module for Android and iOS platform. All features and configurations of it are same with [vue-loader](https://vue-loader.vuejs.org/en/).

One thing should be noted that if the *entry* option of your Webpack config is a `*.vue` file, you also need to pass an additional `entry` parameter.

```js
const webpackConfig = {
  // Add the entry parameter for the .vue file
  entry: './path/to/App.vue?entry=true'

  /* ... */

  use: {
    loaders: [{
      // matches the .vue file path which contains the entry parameter
      test: /\.vue(\?^^]+)?$/,
      loaders: ['weex-loader']
    }]
  }
}
```

**You don't need to write those additional parameters if you are using `.js` file as entry file.** It's a good practice to using javascript file as the entry file of webpack config.

```Js
{
  entry: './path/to/entry.js'
}
```

## Rax

Rax is a front-end framework with React-compatible APIs.
