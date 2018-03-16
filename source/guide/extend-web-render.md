---
title: Extend Web Renderer
type: guide
group: Extend
order: 6.2
version: 2.1
---

<!-- toc -->

# Extend Web components

Vue.js is an independent front-end framework. In the browser, you can not use the Weex container for page rendering. So, the two things are the same: (1) for the Weex platform to expand Vue.js Web components. (2) directly using Vue.js to develop a Web component. The development of components can refer to its documentation: [component](https://vuejs.org/v2/guide/components.html). It is also recommended to use the `.vue` file to write components. How to use it: [Single file component](https://vuejs.org/v2/guide/single-file-components.html).

# Extend Web renderer's built-in components

Weex itself offers a lot of built-in components and modules, but also has the ability to expand horizontally. It allows developers to expand and customize themselves. But it is important to note that Weex is a cross-platform solution. When extending its built-in components or modules, you need to implement it on the three ends (Android, iOS, Web).

After Weex switches the kernel to Vue 2.x, it will be easier to extend the Vue component on the Web side.

We current use [weex-vue-render](https://github.com/weexteam/weex-vue-render) for Vue 2.x Web side rendering. Firstly import this library in your web page, then you can extend the render's built-in components using `weex.registerComponent` or `Vue.component`. Basically these two methods are doing the same thing.

## Example of extension for weex built-in components.

To extend `<sidebar>` as an example, you should first write the logic of the component itself:

```html
<!-- sidebar.vue -->
<template>
  <div class="sidebar">
    <slot></slot>
  </div>
</template>
<style scoped>
  .sidebar {
    /* ... */
  }
</style>
<script>
  export default {
    props: [],
    data () {
      return {}
    }
  }
</script>
```

And then register the `<sidebar>` component globally before using it:

```javascript
import Vue from 'vue'
import weex from 'weex-vue-render'
import Sidebar from './path/to/sidebar.vue'
weex.init(Vue)
// register the `<sidebar>` component globally
weex.registerComponent('sidebar', Sidebar)
// or:
// Vue.component('sidebar', Sidebar)
```

When you extend the Weex component, if you only use the built-in components provided by Weex and use the styles that Weex supports, it is no different from the normal custom component and does not need to be implemented at the Native side.

If you find a component that does not support labels and styles that are not supported by Weex, you will need to really extend the Weex component. At the same time, you also need to extend in the Android side and the iOS side, or will lead to rendering exception.

# Extend the Web module

In addition to the common components, Weex also provides a common module, you can easily call the native API. In general, the registered Weex module requires three ends to be implemented, otherwise it will affect its normal use.

## Register the module

If we import the `weex-vue-render` library, we can get the weex variable globally. You can register the module using the `registerModule`method.

## API format

+ `registerModule`

	1. `name`: {String} Required, module name.
	2. `define`: {Object} Required, module definition.
  3. `meta`: {Object} Optional, module meta info. Basically you won't need this except you want to pass a non iterable attribute or method from your module implementation object. In this case you should pass a `{ registerType: 'assignment' }` object to it. Otherwise only the iterables will be registered in the module.

## The example of register module

The following code registers a module called guide:

```javascript
weex.registerModule('guide', {
  greeting () {
    console.log('Hello, nice to meet you. I am your guide.')
  },
  farewell () {
    console.log('Goodbye, I am always at your service.')
  }
})
```

## Use the module

Weex provides the require method for getting registered modules. You only need to pass the module name directly:

```javascript
//import module
const guide = weex.requireModule('guide')
// use the methods of module
guide.greeting()
guide.farewell()
```

The above wording is as useful as the native end, except that the methods in the module are provided by Native.
