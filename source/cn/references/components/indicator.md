---
title: <indicator>
type: references
group: 内置组件
order: 8.05
version: 2.1
---

# &lt;indicator&gt;

`<indicator>` 组件通常用于显示轮播图指示器效果，必须充当 [`<slider>`](./slider.html) 组件的子组件使用。

## 子组件

`<indicator>` 组件没有任何子组件。

## 样式

`<indicator>` 组件有一些私有样式，如下：

- `item-color {color}`：indicator指示点未被选中时的颜色，默认值为 `#CCCCCC`

- `item-selected-color {color}`：indicator指示点被选中时的颜色，默认值为 `#444444`

- `item-size {number}`：指示点的半径，默认为 `5px`

- 通用样式
  - 盒模型
  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](../common-style.html)

**注意 1：**

这里需要注意一点，`<indicator>` 的 `position` 不仅依赖 `top`、`left`、`bottom` 和 `right` 样式，同时会参考 `width` 和 `height` 样式。`<indicator>` 默认的宽高继承于 `<slider>`，如果 `<slider>` 未设置宽高，需要显式的给 `<indicator>` 设置宽高值。

**注意 2：**

`background-color` 不推荐使用，建议使用 `item-color` 和 `item-selected-color` 代替。


## 事件

支持所有通用事件。

- `click`
- `longpress`
- `appear`
- `disappear`

查看 [通用事件](../common-event.html)

## 约束

1. 不支持子组件，向 indicator 中添加的所有子元素都会被忽略。

## 示例

[查看完整示例](http://dotwe.org/vue/e1b4fd8a37ed4cafd8f5e161698754aa)
