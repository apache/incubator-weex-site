---
title: <cell>
type: references
group: 内置组件
order: 8.08
version: 2.1
---

# &lt;cell&gt;

用于定义列表中的子列表项，类似于 HTML 中的 `ul` 之于 `li`。Weex 会对 `<cell>` 进行高效的内存回收以达到更好的性能，该组件必须作为[`<list>`](./list.html) [`<recycler>`](./list.html) [`<waterfall.>`](./waterfall.html)组件的子组件, 这是为了优化滚动时的性能。

## 子组件

支持所有 Weex 的组件作为它的子组件。

## 属性
*  `keep-scroll-position {boolean}`: <span class="api-version">v0.11+</span> List 插入数据后是否保持上次滚动的位置

## 样式

**注意：**

由于 `<cell>` 本身是一个容器，其布局由 `<list>` 进行管理，你不能给 `<cell>` 设定`flex`值。 `<cell>`的宽度等于父组件 `<list>` 的宽度，并且 `<cell>` 高度自适应，指定 `margin` 样式也不起作用。

- 通用样式：支持所有通用样式

  - 盒模型
  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](../common-style.html)

## 事件

- 通用事件

  支持所有通用事件：

  - `click`
  - `longpress`
  - `appear`
  - `disappear`

  查看 [通用事件](../common-event.html)

## 示例

[cell 示例](http://dotwe.org/vue/d31c85e7cd2dc54fa098e920a5376c38)
