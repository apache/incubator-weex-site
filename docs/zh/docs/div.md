---
sidebarDepth: 0
---
# &lt;div&gt;

`<div>` 组件是用于包装其它组件的最基本容器。支持所有的通用样式、特性、flexbox 布局。其类似于 HTML 的 `<div>` 容器，但不能直接在里面添加文本（字符串），如果要展示文本，应该使用 `<text>` 组件。

``` vue{2}
<template>
  <div>
    <text>Hello World!</text>
  </div>
</template>
```

::: warning 注意
* 不能直接在 `<div>` 中添加文本。
* `<div>` 在 native 中不可滚动，即使显式设置高度也一样。
* `<div>` 嵌套层级不可过深，否则容易引起性能问题，建议控制在 10 层以内。
:::

## 子组件
`<div>` 是基本容器组件，支持包括 `<div>` 在内的任何组件作为自己的子组件。

## Demo
[&lt;div&gt; 在native中不可滚动](http://dotwe.org/vue/57cc2dd8955b0ead3e5b46e3df2f58b9)  
滚动页面，需要使用 [&lt;list&gt;](/zh/docs/list.html)、[&lt;scroller&gt;](/zh/docs/scroller.html) 组件实现。