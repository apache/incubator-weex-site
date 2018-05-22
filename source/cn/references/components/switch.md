---
title: <switch> (已废弃)
type: references
group: 内置组件
order: 8.22
version: 2.1
---

<span class="weex-version">v0.6.1+</span>

> **废弃:** 本组件已不推荐业务上使用。由于各端实现不一致且端上定制能力较弱，不适合作为内置组件实现，因此建议开发者通过 weex 上层能力自行定制该组件.

`<switch>` 是个类似 checkbox 的 UI

> **注意:** switch 组件的外观在三个平台（iOS, Android, Web）稍有不同，这和各平台的 UI 风格有关。

| Android | Web | iOS |
| -------- | --- | --- |
| ![Android](https://img.alicdn.com/tfs/TB1xIEqnfDH8KJjy1XcXXcpdXXa-314-242.png) | ![Web](https://img.alicdn.com/tfs/TB1ugX2k5qAXuNjy1XdXXaYcVXa-308-276.png) | ![iOS](https://img.alicdn.com/tfs/TB1t3X2k5qAXuNjy1XdXXaYcVXa-318-270.png) |

> **注意:** switch 不支持一些涉及布局的样式， 如 `width`, `height`, `margin` 等，下面有详细的样式不支持列表.

## 基本用法

```html
<switch></switch>
```

参考[示例](http://dotwe.org/vue/00f4b68b3a86360df1f38728fd0b4a1f).

## 特性

| Attribute     | Type   | Value                      | Default Value |
| ------------- | ------ | -------------------------- | ------------- |
| `checked`     | Boolean |   true / false            | false         |
| `disabled`    | Boolean |   true / false            | false         |


### `checked`

表示组件的选中状态。

### `disabled`

表示组件是否处于不可交互状态。


## 组件方法

无。

## 事件

- `change`：改变开关状态时触发该事件。

  事件中 event 对象属性：

  - `value`: 组件布尔值真或假。
  - `timestamp`: 事件的时间戳。

- 通用事件

  支持所有通用事件：

  - `click`
  - `longpress`
  - `appear`
  - `disappear`

  查看 [通用事件](/cn/wiki/common-events.html)

## 样式

> **注意:** 某些样式在 switch 组件上不能使用或使用无效，它们是：

- `width`
- `height`
- `min-width`
- `min-height`
- `margin` 和 `margin-xxx`
- `padding` 和 `padding-xxx`
- `border` 和 `border-xxx`

> **注意:** 如果 `<switch>` 的容器没有设置为 `align-items：flex-start`，则 Android 中的开关将被拉伸。

- 通用样式

  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

查看 [组件通用样式](/cn/wiki/common-styles.html)


## 使用说明

- 不要设置样式 `width` and `height`，因为它们用在 `<switch>` 上不会影响该组件的外观和布局.
- `<switch>` 不支持内嵌子组件.

## 示例

- [简单示例](http://dotwe.org/vue/00f4b68b3a86360df1f38728fd0b4a1f)
- [各种状态的 switch](http://dotwe.org/vue/9068f28ba80e871d89dabb9fccff5cc6)
