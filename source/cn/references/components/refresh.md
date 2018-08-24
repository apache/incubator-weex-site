---
title: <refresh>
type: references
group: 内置组件
order: 8.11
version: 2.1
---

# &lt;refresh&gt;

### <span class="weex-version">v0.6.1+</span>

`<refresh>` 为容器提供下拉刷新功能，用法和属性与 `<loading>` 类似。
> **注意：**`<refresh>` 是 `<scroller>`、`<list>`、`<hlist>`、`<vlist>`、`<waterfall>` 的子组件，只能在被它们包含时才能被正确渲染。

 - 简单示例：

```
<list>
  <refresh>
    ...
  </refresh>
  ...
</list>
```
 - 查看 [完整示例](http://dotwe.org/vue/b9fbd9b7a0b0aaa46e3ea46e09213539)

## 子组件

 - 诸如 `<text>`、`<image>` 之类的任何组件，都可以放到 `<refresh>` 进行渲染。

 - 特殊子组件 `<loading-indicator>`: 只能作为 `<refresh>` 和 `<loading>` 的子组件使用，拥有默认的动画效果实现。

 - 简单示例：

```
<refresh>
  <text>Refreshing</text>
  <loading-indicator></loading-indicator>
  ...
</refresh>
```
 - 查看 [完整示例](http://dotwe.org/vue/b9fbd9b7a0b0aaa46e3ea46e09213539)

## 属性

| 属性名           | 类型     | 值                          | 默认值     |
| ------------- | ------ | -------------------------- | ------- |
| `display` | String | show / hide             | show      |

### `display`

 - `show`：如果 `<refresh>` 中包含 `<loading-indicator>`，则将其显示并开始默认动画。

 - `hide`：收起 refresh view，如果 `<refresh>` 中包含 `<loading-indicator>`，则将其视图隐藏。

> **注意：** `display` 的设置必须成对出现，即设置 `display="show"`,必须有对应的 `display="hide"`。

 - 简单示例：

```
<template>
  <list>
    <refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
      ...
    </refresh>
    ...
  </list>
</template>

<script>
  ...
  methods: {
    onrefresh (event) {
      this.refreshing = true
      setTimeout(() => {
        this.refreshing = false
      }, 2000)
    },
  }
</script>
```
 - 查看 [完整示例](http://dotwe.org/vue/b9fbd9b7a0b0aaa46e3ea46e09213539)

 - 支持所有通用属性。查看 [组件通用属性](../common-attrs.html)

## 样式

 - 支持所有通用样式。查看 [组件通用样式](/cn/wiki/common-styles.html)

## 事件

### `refresh`

 - 当 `<scroller>`、`<list>`、`<hlist>`、`<vlist>`、`<waterfall>` 被下拉时触发。

### `pullingdown` <span class="weex-version">v0.6.1+</span>

 - 当 `<scroller>`、`<list>`、`<hlist>`、`<vlist>`、`<waterfall>` 被下拉时触发，可以从 `event` 参数对象中获取 dy, pullingDistance, viewHeight, type

  - dy: 前后两次回调滑动距离的差值
  - pullingDistance: 下拉的距离
  - viewHeight: refresh 组件高度
  - type: "pullingdown" 常数字符串


 - 简单示例：

```
<scroller>
  <refresh @refresh="onrefresh" @pullingdown="onpullingdown">
    ...
  </refresh>
  ...
</scroller>

<script>
  export default {
    methods: {
      onrefresh (event) {
        ...
      },
      onpullingdown (event) {
        console.log("dy: " + event.dy)
        console.log("pullingDistance: " + event.pullingDistance)
        console.log("viewHeight: " + event.viewHeight)
        console.log("type: " + type)
      }
    }
  }
</script>
```
 - 查看 [完整示例](http://dotwe.org/vue/b9fbd9b7a0b0aaa46e3ea46e09213539)

## 示例

 - [完整示例](http://dotwe.org/vue/b9fbd9b7a0b0aaa46e3ea46e09213539)
