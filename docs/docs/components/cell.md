---
sidebarDepth: 0
---
# &lt;cell&gt;
用于定义列表中的子列表项，类似于 HTML 中的 `ul` 之于 `li`。Weex 会对 `<cell>` 进行高效的内存回收以达到更好的性能，该组件必须作为`<list>`、`<waterfall>`组件的子组件, 这是为了优化滚动时的性能。

```vue{3}
<template>
  <list>
    <cell v-for="num in lists">
      <text>{{num}}</text>
    </cell>
  </list>
</template>

<script>
  export default {
    data () {
      return {
        lists: ['A', 'B', 'C', 'D', 'E']
      }
    }
  }
</script>
```

::: warning 注意
* 由于 `<cell>` 本身是一个容器，其布局由 `<list>` 进行管理，你不能给 `<cell>` 设定 flex 值。
* `<cell>` 的宽度等于父组件 `<list>` 的宽度，并且 `<cell>` 高度自适应，指定 margin 样式也不起作用。
:::

## 子组件
支持所有 Weex 的组件作为它的子组件。

## Demo
[基本用法](http://dotwe.org/vue/3c649d5bb5b8ec434fbdce5c16c357c9)