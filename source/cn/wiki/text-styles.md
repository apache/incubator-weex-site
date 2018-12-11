---
title: 文本样式
type: wiki
group: 样式
order: 3.2
version: 2.1
---

<!-- toc -->

<span class="weex-version">v0.5+</span>

文本类组件共享一些通用样式, 这类组件目前包括 [`<text>`](../references/components/text.html)、[`<input>`](../references/components/input.html)和[`<richtext>`](../references/components/richtext.html)

## 属性

- `color {color}`：文字颜色，支持如下字段：
    * RGB（ `rgb(255, 0, 0)` ）
    * RGBA（ `rgba(255, 0, 0, 0.5)` ）
    * 十六进制（ `#ff0000` ）；精简写法的十六进制（ `#f00` ）
    * 色值关键字（`red`）
* `font-size {number}`：文字大小。
* `font-style {string}`：字体类别。可选值 `normal` | `italic`，默认为 `normal`。
* `font-weight {string}`<span class="api-version">v0.9+</span>：字体粗细程度
  * 可选值: `normal`, `bold`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`
  * normal 等同于 400, bold 等同于 700；
  * 默认值: `normal`；
  * iOS 支持 9 种 font-weight值；Android 仅支持 400 和 700, 其他值会设为 400 或 700
  * 类似 `lighter`, `bolder` 这样的值暂时不支持
* `text-decoration {string}`：字体装饰，可选值 `none` | `underline` | `line-through`，默认值为 `none`。
   >> 只有 `<text>`和`<richtext>`组件支持。
* `text-align {string}`：对齐方式。可选值 `left` | `center` | `right`，默认值为 `left`。目前暂不支持 `justify`, `justify-all`。
* `font-family {string}`：设置字体。这个设置 **不保证** 在不同平台，设备间的一致性。如所选设置在平台上不可用，将会降级到平台默认字体。如果需要加载自定义字体，请参考相关[文档](../references/modules/custom_font.html)。
* `text-overflow {string}`：设置内容超长时的省略样式。可选值 `clip` | `ellipsis`
    >> 只有 `<text>`和`<richtext>`组件支持。
* `lines {number}`: 正整数，指定最大文本行数，默认值为0，表示不限制最大行数。如果文本不够长，实际展示行数会小于指定行数。

## 其它参考
- [颜色关键字列表](./color-names.html)。
