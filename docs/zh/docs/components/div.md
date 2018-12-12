# 简介

`<div>` 组件是用于包装其它组件的最基本容器。支持所有的通用样式、特性、flexbox 布局。其类似于 HTML 的 `<div>` 容器，

## 子组件

`<div>` 是基本容器组件，支持包括 `<div>` 在内的任何组件作为自己的子组件。

## 属性

* **通用属性**. 参见[通用属性](/wiki/common-attributes.html).

## 样式

* **通用样式**. 参见[通用样式](/wiki/common-styles.html).

## 事件

* **通用事件**. 参见[通用事件](/wiki/common-events.html).

## 其它

* 不能直接在 `<div>` 中添加文本。如果要展示文本，应该使用 `<text>` 组件。
* `<div>` 在 native 中不可滚动，即使显式设置高度也一样。
* `<div>` 为了有一个好的性能，嵌套层级不宜过深，建议 __深度<14层__ 。

## 例子

``` vue{2}
<template>
  <div>
    <text>Hello World!</text>
  </div>
</template>
```

- [运行case](http://dotwe.org/vue/57cc2dd8955b0ead3e5b46e3df2f58b9) （naitve 不可滚动）需要使用 [&lt;list&gt;](/docs/list.html)、[&lt;scroller&gt;](/docs/scroller.html) 组件实现。
