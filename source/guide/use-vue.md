---
title: Use Vue.js on Weex
type: guide
group: Overview
order: 1.6
version: 2.1
---

<!-- toc -->

Weex integrated the v2 version of Vue.js since WeexSDK [v0.10.0](https://github.com/alibaba/weex/releases/tag/v0.10.0) is released at 2016/02/17. Vue (pronounced /vjuː/, like view) is a progressive front-end framework for building user interfaces. Please refer to its [official website](https://vuejs.org/) for more information.

> If there is no special instructions, the "Vue.js" or "Vue" in this article all refers to the v2 version of Vue.js.

## Runtime-only Build

If you are familiar with Vue.js, you should know that there are two available builds of Vue.js: [the **Runtime + Compiler** build and the **Runtime-only** build](https://vuejs.org/v2/guide/installation.html#Standalone-vs-Runtime-only-Build). The difference between them is whether to include the compiler which is able to compile the `template` option at runtime.

Since the runtime-only builds are roughly 30% lighter-weight than their full-build counterparts, Weex is using the runtime-only build of Vue.js for better performance and less code size.

Specifically, the differences are as follows:

+ The [`template`](https://vuejs.org/v2/api/#template) option is not supported when defining a component.
+ Does not support using [`x-templates`](https://vuejs.org/v2/guide/components.html#X-Templates).
+ Does not support using [`Vue.compile`](https://vuejs.org/v2/api/#Vue-compile).

## Platform Differences

Vue.js was designed for the Web platform at the beginning. Although it can be based on Weex to develop native applications, there are still many [platform differences between Weex and web](../wiki/platform-difference.html).

The key platform differences are context, DOM, styles and events.

### Context

Weex is mostly used to write multi-page applications, each page is a native *View* or *Activity* on mobile, and has its own context. In particular, the `Vue` instances are different in each pages, and even the "global" config of Vue (`Vue.config.xxx`) only affect the single page on Weex.

On this basis, some SPA (single-page application) technologies of Vue, such as [Vuex](https://vuex.vuejs.org/en/) and [vue-router](https://router.vuejs.org/en/) will also take effect within the single page. More colloquially, the "page" concept is virtual in SPA technologies, but it is real on Weex.

However, Vuex and vue-router are standalone libraries, they all have their own concept and usage scenario, you can still [use Vuex and vue-router](./advanced/use-vuex-and-vue-router.html) on Weex.

### DOM

Because there is no DOM (document object model) on Android and iOS, if you are manipulating and generating DOM elements manually, it may have some compatibility issues. It is a good practice to manipulate data and components instead of generated elements when you are using modern front-end frameworks.

Some DOM-related features, such as `v-html`, `vm.$el`, `template` option, may not have the same behavior on different platforms.

To be more specific, the type of [`vm.$el`](https://vuejs.org/v2/api/#vm-el) property is `HTMLElement` on the web, but it is not that type on mobile environments. Actually it's a special data structure defined by *Weex document object model*.

### Styles

The style sheet and CSS rules in managed by Weex js framework and native render engines. It would be very difficult and unnecessary to implement the whole CSSOM spec and support all CSS rules.

For performance reasons, **Weex only support single class selector currently, and only support a subset of CSS Rules**. Please refer to *[common styles](../wiki/common-styles.html)* and *[text styles](../wiki/text-styles.html)* for more details.

On Weex, styles are *[scoped](https://vue-loader.vuejs.org/en/features/scoped-css.html)* by force for each Vue component.

### Events

Event bubbling and capturing are not supported in Weex currently, therefore, [event modifiers](https://vuejs.org/v2/guide/events.html#Event-Modifiers) such as `.prevent`, ` .capture`, `.stop`, ` .self` are not supported on Weex native components.

Moreover, the [keyboard event modifiers](https://vuejs.org/v2/guide/events.html#Key-Modifiers) and [system modifier keys](https://vuejs.org/v2/guide/events.html#System-Modifier-Keys), such as `.enter`, `.tab`, `.ctrl`, `.shift` mostly are meaningless on mobile device, which are also not supported in Weex.

## The Web Renderer

If you want to render your page on the web, you need to require the [weex-vue-render](https://github.com/weexteam/weex-vue-render) to achieve it.

`weex-vue-render` is a web renderer for Vue DSL, it implemented the built-in components and built-in modules of Weex on the web. Please refer to [its repo](https://github.com/weexteam/weex-vue-render) for more details.

## Single File Component

[Single file component](https://vuejs.org/v2/guide/single-file-components.html) (as known as the `*.vue` files) of Vue is a special file format with a `.vue` extension. The template inside will be compiled into the `render` function at build time.

Moreover, there are a good deals of [syntax highlight plugins](https://github.com/vuejs/awesome-vue#source-code-editing) for all kind of editors.

> It's a good practice to use single file component syntax in Weex.

### Compile Targets

Because of the platform difference and to improve the performance on the web, the `*.vue` file should be compiled in two different ways:

+ For the web platform, you can compile source files in any official way, such as [Webpack](https://webpack.js.org/) + [vue-loader](https://vue-loader.vuejs.org/en/) or Browserify + vueify.
+ For Android and iOS platforms, you should use [weex-loader](https://github.com/weexteam/weex-loader) to compile the `*.vue` files.

Use different bundles for different platforms is to make good use of the platform original features and reduce compatibility code at build time. But the source code is still the same, the only difference is the way to compile it.

### Use weex-loader

[weex-loader](https://github.com/weexteam/weex-loader) is a [loader](https://webpack.js.org/concepts/loaders/#using-loaders) for webpack that can transform `*.vue` file into a plain javascript module for Android and iOS platform. All features and configurations of it are same with [vue-loader](https://vue-loader.vuejs.org/en/).

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

## Supported Features

### Global Config

> The Vue "Global" config only affect the single page on Weex, the configuration will not be shared between different Weex pages.

| Vue Global Config | Supported | Notes |
| -------------- | --------- | ----- |
| [Vue.config.silent](https://vuejs.org/v2/api/#silent)                               | <b class="tag-yes">Yes</b> | - |
| [Vue.config.optionMergeStrategies](https://vuejs.org/v2/api/#optionMergeStrategies) | <b class="tag-yes">Yes</b> | - |
| [Vue.config.devtools](https://vuejs.org/v2/api/#devtools)                           | <b class="tag-no">No</b>   | Only supported on the web. |
| [Vue.config.errorHandler](https://vuejs.org/v2/api/#errorHandler)                   | <b class="tag-yes">Yes</b> | - |
| [Vue.config.warnHandler](https://vuejs.org/v2/api/#warnHandler)                     | <b class="tag-yes">Yes</b> | - |
| [Vue.config.ignoredElements](https://vuejs.org/v2/api/#ignoredElements)             | <b class="tag-yes">Yes</b> | Not Recommended. |
| [Vue.config.keyCodes](https://vuejs.org/v2/api/#keyCodes)                           | <b class="tag-no">No</b>   | Useless on the mobile. |
| [Vue.config.performance](https://vuejs.org/v2/api/#performance)                     | <b class="tag-no">No</b>   | Same with *devtools*. |
| [Vue.config.productionTip](https://vuejs.org/v2/api/#productionTip)                 | <b class="tag-yes">Yes</b> | - |

### Global API

| Vue Global API | Supported | Notes |
| -------------- | --------- | ----- |
| [Vue.extend](https://vuejs.org/v2/api/#Vue-extend)       | <b class="tag-yes">Yes</b> | - |
| [Vue.nextTick](https://vuejs.org/v2/api/#Vue-nextTick)   | <b class="tag-yes">Yes</b> | - |
| [Vue.set](https://vuejs.org/v2/api/#Vue-set)             | <b class="tag-yes">Yes</b> | - |
| [Vue.delete](https://vuejs.org/v2/api/#Vue-delete)       | <b class="tag-yes">Yes</b> | - |
| [Vue.directive](https://vuejs.org/v2/api/#Vue-directive) | <b class="tag-yes">Yes</b> | - |
| [Vue.filter](https://vuejs.org/v2/api/#Vue-filter)       | <b class="tag-yes">Yes</b> | - |
| [Vue.component](https://vuejs.org/v2/api/#Vue-component) | <b class="tag-yes">Yes</b> | - |
| [Vue.use](https://vuejs.org/v2/api/#Vue-use)             | <b class="tag-yes">Yes</b> | - |
| [Vue.mixin](https://vuejs.org/v2/api/#Vue-mixin)         | <b class="tag-yes">Yes</b> | - |
| [Vue.version](https://vuejs.org/v2/api/#Vue-version)     | <b class="tag-yes">Yes</b> | - |
| [Vue.compile](https://vuejs.org/v2/api/#Vue-compile)     | <b class="tag-no">No</b>   | Weex is using the [runtime-only build](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only). |

### Options

| Vue Option | Supported | Notes |
| ---------- | --------- | ----- |
| [data](https://vuejs.org/v2/api/#data)                     | <b class="tag-yes">Yes</b> | - |
| [props](https://vuejs.org/v2/api/#props)                   | <b class="tag-yes">Yes</b> | - |
| [propsData](https://vuejs.org/v2/api/#propsData)           | <b class="tag-yes">Yes</b> | - |
| [computed](https://vuejs.org/v2/api/#computed)             | <b class="tag-yes">Yes</b> | - |
| [methods](https://vuejs.org/v2/api/#methods)               | <b class="tag-yes">Yes</b> | - |
| [watch](https://vuejs.org/v2/api/#watch)                   | <b class="tag-yes">Yes</b> | - |
| [el](https://vuejs.org/v2/api/#el)                         | <b class="tag-yes">Yes</b> | The value of `el` is meaningless on the mobile. |
| [template](https://vuejs.org/v2/api/#template)             | <b class="tag-no">No</b>   | Weex is using the [runtime-only build](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only). |
| [render](https://vuejs.org/v2/api/#render)                 | <b class="tag-yes">Yes</b> | Not Recommended. |
| [renderError](https://vuejs.org/v2/api/#renderError)       | <b class="tag-yes">Yes</b> | - |
| [directives](https://vuejs.org/v2/api/#directives)         | <b class="tag-yes">Yes</b> | - |
| [filters](https://vuejs.org/v2/api/#filters)               | <b class="tag-yes">Yes</b> | - |
| [components](https://vuejs.org/v2/api/#components)         | <b class="tag-yes">Yes</b> | - |
| [parent](https://vuejs.org/v2/api/#parent)                 | <b class="tag-yes">Yes</b> | Not Recommended. |
| [mixins](https://vuejs.org/v2/api/#mixins)                 | <b class="tag-yes">Yes</b> | - |
| [extends](https://vuejs.org/v2/api/#extends)               | <b class="tag-yes">Yes</b> | - |
| [provide/inject](https://vuejs.org/v2/api/#provide-inject) | <b class="tag-yes">Yes</b> | Not Recommended. |
| [name](https://vuejs.org/v2/api/#name)                     | <b class="tag-yes">Yes</b> | - |
| [delimiters](https://vuejs.org/v2/api/#delimiters)         | <b class="tag-yes">Yes</b> | Not Recommended. |
| [functional](https://vuejs.org/v2/api/#functional)         | <b class="tag-yes">Yes</b> | - |
| [model](https://vuejs.org/v2/api/#model)                   | <b class="tag-yes">Yes</b> | - |
| [inheritAttrs](https://vuejs.org/v2/api/#inheritAttrs)     | <b class="tag-yes">Yes</b> | - |
| [comments](https://vuejs.org/v2/api/#comments)             | <b class="tag-no">No</b>   | - |

### Lifecycle Hooks

Instance lifecycle hooks of Vue components will be emitted at particular stages, refer to the [lifecycle diagram](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram) of Vue component for more details.

| Vue Lifecycle Hook | Supported | Notes |
| ------------------ | --------- | ----- |
| [beforeCreate](https://vuejs.org/v2/api/#beforeCreate)   | <b class="tag-yes">Yes</b> | - |
| [created](https://vuejs.org/v2/api/#created)             | <b class="tag-yes">Yes</b> | - |
| [beforeMount](https://vuejs.org/v2/api/#beforeMount)     | <b class="tag-yes">Yes</b> | - |
| [mounted](https://vuejs.org/v2/api/#mounted)             | <b class="tag-yes">Yes</b> | Not exactly the same with web. |
| [beforeUpdate](https://vuejs.org/v2/api/#beforeUpdate)   | <b class="tag-yes">Yes</b> | - |
| [updated](https://vuejs.org/v2/api/#updated)             | <b class="tag-yes">Yes</b> | - |
| [activated](https://vuejs.org/v2/api/#activated)         | <b class="tag-no">No</b>   | Not support `<keep-alive>` yet. |
| [deactivated](https://vuejs.org/v2/api/#deactivated)     | <b class="tag-no">No</b>   | Not support `<keep-alive>` yet. |
| [beforeDestroy](https://vuejs.org/v2/api/#beforeDestroy) | <b class="tag-yes">Yes</b> | - |
| [destroyed](https://vuejs.org/v2/api/#destroyed)         | <b class="tag-yes">Yes</b> | - |
| [errorCaptured](https://vuejs.org/v2/api/#errorCaptured) | <b class="tag-yes">Yes</b> | New in Vue 2.5.0+, Weex SDK 0.18+ |

### Instance Properties

| Vue Instance Property | Supported | Notes |
| --------------------- | --------- | ----- |
| [vm.$data](https://vuejs.org/v2/api/#vm-data)               | <b class="tag-yes">Yes</b> | - |
| [vm.$props](https://vuejs.org/v2/api/#vm-props)             | <b class="tag-yes">Yes</b> | - |
| [vm.$el](https://vuejs.org/v2/api/#vm-el)                   | <b class="tag-yes">Yes</b> | The value is not `HTMLElement` on the mobile. |
| [vm.$options](https://vuejs.org/v2/api/#vm-options)         | <b class="tag-yes">Yes</b> | - |
| [vm.$parent](https://vuejs.org/v2/api/#vm-parent)           | <b class="tag-yes">Yes</b> | - |
| [vm.$root](https://vuejs.org/v2/api/#vm-root)               | <b class="tag-yes">Yes</b> | - |
| [vm.$children](https://vuejs.org/v2/api/#vm-children)       | <b class="tag-yes">Yes</b> | - |
| [vm.$slots](https://vuejs.org/v2/api/#vm-slots)             | <b class="tag-yes">Yes</b> | - |
| [vm.$scopedSlots](https://vuejs.org/v2/api/#vm-scopedSlots) | <b class="tag-yes">Yes</b> | - |
| [vm.$refs](https://vuejs.org/v2/api/#vm-refs)               | <b class="tag-yes">Yes</b> | - |
| [vm.$isServer](https://vuejs.org/v2/api/#vm-isServer)       | <b class="tag-yes">Yes</b> | Always `false`. |
| [vm.$attrs](https://vuejs.org/v2/api/#vm-attrs)             | <b class="tag-yes">Yes</b> | - |
| [vm.$listeners](https://vuejs.org/v2/api/#vm-listeners)     | <b class="tag-yes">Yes</b> | - |

### Instance Methods

| Vue Instance Method | Supported | Notes |
| ------------------- | --------- | ----- |
| [vm.$watch()](https://vuejs.org/v2/api/#vm-watch)             | <b class="tag-yes">Yes</b> | - |
| [vm.$set()](https://vuejs.org/v2/api/#vm-set)                 | <b class="tag-yes">Yes</b> | - |
| [vm.$delete()](https://vuejs.org/v2/api/#vm-delete)           | <b class="tag-yes">Yes</b> | - |
| [vm.$on()](https://vuejs.org/v2/api/#vm-on)                   | <b class="tag-yes">Yes</b> | - |
| [vm.$once()](https://vuejs.org/v2/api/#vm-once)               | <b class="tag-yes">Yes</b> | - |
| [vm.$off()](https://vuejs.org/v2/api/#vm-off)                 | <b class="tag-yes">Yes</b> | - |
| [vm.$emit()](https://vuejs.org/v2/api/#vm-emit)               | <b class="tag-yes">Yes</b> | - |
| [vm.$mount()](https://vuejs.org/v2/api/#vm-mount)             | <b class="tag-no">No</b>   | You don't need to mount Vue instance manually. |
| [vm.$forceUpdate()](https://vuejs.org/v2/api/#vm-forceUpdate) | <b class="tag-yes">Yes</b> | - |
| [vm.$nextTick()](https://vuejs.org/v2/api/#vm-nextTick)       | <b class="tag-yes">Yes</b> | - |
| [vm.$destroy()](https://vuejs.org/v2/api/#vm-destroy)         | <b class="tag-yes">Yes</b> | - |

### Directives

| Vue Directive | Supported | Notes |
| ------------- | --------- | ----- |
| [v-text](https://vuejs.org/v2/api/#v-text)       | <b class="tag-yes">Yes</b> | - |
| [v-html](https://vuejs.org/v2/api/#v-html)       | <b class="tag-no">No</b>   | No HTML parser in Weex, and it is not good practice. |
| [v-show](https://vuejs.org/v2/api/#v-show)       | <b class="tag-no">No</b>   | Not support `display: none;` yet. |
| [v-if](https://vuejs.org/v2/api/#v-if)           | <b class="tag-yes">Yes</b> | - |
| [v-else](https://vuejs.org/v2/api/#v-else)       | <b class="tag-yes">Yes</b> | - |
| [v-else-if](https://vuejs.org/v2/api/#v-else-if) | <b class="tag-yes">Yes</b> | - |
| [v-for](https://vuejs.org/v2/api/#v-for)         | <b class="tag-yes">Yes</b> | - |
| [v-on](https://vuejs.org/v2/api/#v-on)           | <b class="tag-yes">Yes</b> | Not support [event modifiers](https://vuejs.org/v2/guide/events.html#Event-Modifiers). |
| [v-bind](https://vuejs.org/v2/api/#v-bind)       | <b class="tag-yes">Yes</b> | - |
| [v-model](https://vuejs.org/v2/api/#v-model)     | <b class="tag-yes">Yes</b> | - |
| [v-pre](https://vuejs.org/v2/api/#v-pre)         | <b class="tag-yes">Yes</b> | - |
| [v-cloak](https://vuejs.org/v2/api/#v-cloak)     | <b class="tag-no">No</b>   | Only support single class selector. |
| [v-once](https://vuejs.org/v2/api/#v-once)       | <b class="tag-yes">Yes</b> | - |

### Special Attributes

| Vue Special Attribute | Supported | Notes |
| --------------------- | --------- | ----- |
| [key](https://vuejs.org/v2/api/#key)               | <b class="tag-yes">Yes</b> | - |
| [ref](https://vuejs.org/v2/api/#ref)               | <b class="tag-yes">Yes</b> | - |
| [slot](https://vuejs.org/v2/api/#slot)             | <b class="tag-yes">Yes</b> | - |
| [slot-scope](https://vuejs.org/v2/api/#slot-scope) | <b class="tag-yes">Yes</b> | New in Vue 2.5.0+, Weex SDK 0.18+ |
| [scope](https://vuejs.org/v2/api/#scope)           | <b class="tag-yes">Yes</b> | Not Recommended. |
| [is](https://vuejs.org/v2/api/#is)                 | <b class="tag-yes">Yes</b> | - |

### Built-In Components

| Vue Built-In Component | Supported | Notes |
| ---------------------- | --------- | ----- |
| [component](https://vuejs.org/v2/api/#component)               | <b class="tag-yes">Yes</b> | - |
| [transition](https://vuejs.org/v2/api/#transition)             | <b class="tag-no">No</b>   | The concept of *enter* and *leave* maybe different on the mobile, and Weex does not support `display: none;` yet. |
| [transition-group](https://vuejs.org/v2/api/#transition-group) | <b class="tag-no">No</b>   | Same with *transition*. |
| [keep-alive](https://vuejs.org/v2/api/#keep-alive)             | <b class="tag-no">No</b>   | Native components on the mobile can not be cached at front-end. |
| [slot](https://vuejs.org/v2/api/#slot)                         | <b class="tag-yes">Yes</b> | - |
