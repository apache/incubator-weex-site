## 扩展 Web 组件
Vue.js 是一个独立的前端框架，在浏览器中渲染时不需要基于 Weex 容器。因此，针对 Weex 平台扩展 Vue.js 的 Web 端组件，和直接使用 Vue.js 开发一个 Web 组件是一样的。具体的组件编写方法可以参考其官方文档：[组件](https://cn.vuejs.org/v2/guide/docss.html) ，另外建议使用 `.vue` 格式的文件编写组件，使用方法参考：[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)。

## 扩展内置组件
目前我们提供了 [Vue Render For Apache Weex](https://github.com/weexteam/vue-render-for-apache-weex) 作为 Vue 2.x Web 端的渲染器。引入该库到项目里，即可使用 `weex.registerComponent` 来进行内置组件扩展，也可以使用 `Vue.component`，两者基本上是一致的。

::: tip
Vue Render For Apache Weex 是三方插件, 不由 Apache Weex 开发或维护。
:::

以扩展 `<sidebar>` 为例，首先应该编写组件自身的逻辑：
```vue
// sidebar.vue
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
然后在使用之前，全局注册 `<sidebar>` 组件：
```js
import Vue from 'vue'
import weex from 'weex-vue-render'
import Sidebar from './path/to/sidebar.vue'
weex.init(Vue)
// 全局注册 sidebar 组件
weex.registerComponent('sidebar', Sidebar)
// 或者使用 Vue.component
// Vue.component('sidebar', Sidebar)
```

在扩展 Weex 组件时，如果只使用了 Weex 提供的内置组件，并且使用的都是 Weex 支持的样式，那么就和普通的前端自定义组件无异，不需要 Native 端再有相应的实现。

如果在定制组件时使用了目前 Weex 不支持的标签或样式，还需要在 Android 和 iOS 中有相应的实现，否则会导致渲染异常。

## 扩展内置模块
引入了 `weex-vue-render` 这个库之后，在全局能获取到 `weex` 这个变量，其中提供了 `registerModule` 方法可以扩展内置模块。
### API格式
`registerModule`
  - `name`: {string} 必选，模块名称
  - `define`: {object} 必选，模块的定义
  - `meta`: {object} 可选，模块元数据。将非 iterable 的属性或方法注册到模块对象里，才需要用到这个参数，将 `{ registerType: 'assignment' }` 作为 meta 参数传入即可

### 扩展模块示例
下边的代码注册了一个名为 `guide` 的模块：
```js
weex.registerModule('guide', {
  greeting () {
    console.log('Hello, nice to meet you. I am your guide.')
  },
  farewell () {
    console.log('Goodbye, I am always at your service.')
  }
})
```
在 `weex` 上提供了 `require` 方法用于获取已注册的模块，直接传递模块名即可：
```js
// 获取模块
const guide = weex.requireModule('guide')

// 可以直接调用模块中的方法
guide.greeting()
guide.farewell()
```
上述模块使用方法在 Native 环境中依然有效，只不过模块中的方法是由 Native 提供的。