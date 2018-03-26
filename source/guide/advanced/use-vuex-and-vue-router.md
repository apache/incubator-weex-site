---
title: Use Vuex and vue-router
type: guide
group: Advanced Guide
order: 8.4
version: 2.1
---

<!-- toc -->

Vue.js has many peripheral technology products such as [Vuex](https://github.com/vuejs/vuex) and [vue-router](https://github.com/vuejs/vue-router), those libraries can also work well on Weex.

> **NOTE**: Weex is using native navigator to manage instance pages, the context of them are isolated. That means, Both Vuex and vue-router can only effect the single page, they can't share state between different pages.

## Using Vuex

> [Official Vuex documents](https://vuex.vuejs.org/en/)

![Vuex](//vuex.vuejs.org/en/images/vuex.png)

Vuex is a state management pattern + library for Vue.js applications. It's also a library implementation tailored specifically for Vue.js to take advantage of its granular reactivity system for efficient updates. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.

As a kind of state management library, Vuex is platform-independent, It also can be used in Weex. It also integrates with Vue's official [devtools extension](https://github.com/vuejs/vue-devtools) to provide advanced features on web platform, such as zero-config time-travel debugging and state snapshot export / import. (web platform only)

## Using vue-router

> [Official vue-router documents](https://router.vuejs.org/en/)

Creating a Single-page Application with Vue.js + vue-router is dead simple. With Vue.js, you are already composing our application with components. When adding vue-router to the mix, all you need to do is map your components to the routes and let vue-router know where to render them.

However, there are many differences between web and Android or iOS, some features of vue-router are limited in Weex.

### Router mode

vue-router provides three routing modes:

+ `hash`: uses the URL hash for routing. Works in all Vue-supported browsers, including those that do not support HTML5 History API. (**default**)
+ `history`: requires HTML5 History API and server config. See [HTML5 History Mode](https://router.vuejs.org/en/essentials/history-mode.html).
+ `abstract`: works in all JavaScript environments, e.g. server-side with Node.js.

You can pass the `mode` parameter when creating a router:

```js
new Router({
  mode: 'abstract',
  // ...
})
```

Obviously, `hash` mode and `history` mode are only available on the web, and have no effect in Weex. In other words, you can only use `abstract` mode in Android and iOS. However, vue-router will automatically be forced into `abstract` mode if no browser API is present. So, just **don't set the `mode` option, or set it to `abstract`**.

### Programmatic navigation

vue-router use `<router-link>` to create a navigation link, but in which, some features are based on the DOM events and it doesn't work well in the native environment. In Weex, you must use the [Programmatic Navigation](https://router.vuejs.org/en/essentials/navigation.html) to manage the router.

Here is a basic example using `<router-link>`:

```html
<!-- Can only be used on the web, it takes no effects on Android or iOS! -->
<template>
  <div>
    <router-link to="profile">
      <text>Profile</text>
    </router-link>
  </div>
</template>
```

For native platforms, you have to use the `router.push`:

```html
<template>
  <div>
    <text @click="jump">Profile</text>
  </div>
</template>

<script>
  import router from './path/to/router'
  export default {
    methods: {
      jump () {
        router.push('profile')
      }
    }
  }
</script>
```
