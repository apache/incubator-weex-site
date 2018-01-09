---
title: Front-End Frameworks
type: guide
group: Overview
order: 1.3
version: 2.1
---

<!-- toc -->

Writing UIs in declarative way.

## Front-end Frameworks in Weex

![Vue and Rax](./images/vue-rax.png)

Front-end technologies seem flourishing and productive. ~~Test, build, debug, tools, 3td-party libs.~~

The structure of Weex is decoupled, it isn't relay on any specific front-end frameworks, the DOM operations will convert into render directives and send to native render engine.

With the evolution of technology, even if Vue.js and React are not popular any more few years later, Weex can integrate the new widely-used front-end frameworks as well.

## Vue.js

Using v2.x.x version of Vue.js.

> If there is no special instructions, when I mentioned *Vue.js*, it actually refers *Vue.js 2.x.x*.

### Runtime-only Build

When using vue-loader or vueify, templates inside *.vue files are pre-compiled into JavaScript at build time. You don’t really need the compiler in the final bundle, and can therefore use the runtime-only build.

Vue.js provides two available builds: the **Runtime + Compiler** build and the **Runtime-only** build. See its [official document](https://vuejs.org/v2/guide/installation.html#Standalone-vs-Runtime-only-Build) for more information.

Weex only required the runtime-only build of Vue.js for better performance and less code size.

The specific differences are:

+ The `template` attribute is not supported when defining a component.
+ Does not support using `x-templates`.
+ Does not support using `Vue.compile`.

### weex-vue-render

### Compile `*.vue` files


Because of the platform difference and 利用 web 本身特性的性能, you have to compile your source file in two different ways:

+ For the web, you can compile source files in any official way, such as Webpack + vue-loader or Browserify + vueify. and require the [weex-vue-render](https://www.npmjs.com/package/weex-vue-render), which is a group of Weex build-in components.
+ For Android and iOS, we've provided [weex-loader](https://github.com/weexteam/weex-loader) to compile the `*.vue` files. That is, use Webpack + weex-loader to generate the js bundle that is available for the native.

#### Using `weex-loader`

[weex-loader](https://github.com/weexteam/weex-loader) is a loader for Webpack, see the [official document](http://webpack.github.io/docs/using-loaders.html) to learn how to use it.

One more thing should be reminded is that if the *entry file* of your webpack config is a `.vue` file, you also need to pass an additional ` entry` parameter, usually set to `true`.

```Js
module.exports = {
  // Add the entry parameter for the .vue file
  entry: './path/to/App.vue?entry=true',

  // other configurations ...

  module: {
    loaders: [{

      // matches the .vue file path that contains the entry parameter
      test: /\.vue(\?^^]+)?$/,
      loaders: ['weex-loader']
    }]
  },
}
```

**You don't need to write those additional parameters if you are using `.js` file as entry file.** We recommend using javascript file as the entry file of webpack config.

### Restrictions

+ Scoped styles by default, by force.

Vue.js was designed for the Web platform at the beginning. Although it can be based on Weex to develop native applications, there are still many differences between web and native. See [Platform Differences Between Weex and Web](../ platform-difference.html) for more details.

Due to those differences, Weex doesn't support those features in Vue.js (mostly are DOM-related):

+ Event bubbling and capturing are not supported.
  + Event modifiers, such as `.prevent`,` .capture`, `.stop`,` .self` are meaningless in the native environment.
  + The keyboard event modifiers, like `.{KeyCode | keyAlias}` is also meaningless. (see [docs in Vue.js](https://vuejs.org/v2/guide/events.html#Key-Modifiers))
+ The `v-html` and `v-text` directives are not supported.
+ Not support `v-show`, `v-cloak` and `<keep-alive>`, because Weex doesn't support `display:none;` yet.
+ `vm.$el` is Weex Virtual-DOM Element, not the `HTMLElement`.
+ No need to call `vm.$mount` manually, the entry component will mount to the root view of the native container by default. No need `Vue.mount()`.

## Rax

Rax is a front-end framework with largely React-compatible APIs.
