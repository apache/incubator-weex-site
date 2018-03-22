---
title: <text>
type: references
group: 内置组件
order: 8.23
version: 2.1
---

`<text>` 是 Weex 内置的组件，用来将文本按照指定的样式渲染出来。`<text>` 只能包含文本值，你可以使用 `{% raw %}{{}}{% endraw %}` 标记插入变量值作为文本内容。

> **注意：** `<text>` 里直接写文本头尾空白会被过滤，如果需要保留头尾空白，暂时只能通过数据绑定写头尾空格。

> **注意：** `<text>`不支持子组件。

## 属性
* `value {string}`: 组件的值，与 `<text>` 标签中的文本内容相同。

## 样式
* 支持 **[通用样式](../../wiki/common-styles.html)。**
* `lines {number}`: 指定文本行数。默认值是 `0`， 代表不限制行数。
* 支持 **[文本样式](/cn/wiki/text-styles.html)。**
  * 支持 `color` 样式.
  * 支持 `font-size` 样式，默认值为`32`.
  * 支持 `font-style` 样式.
  * 支持 `font-weight` 样式.
  * 支持 `text-align` 样式.
  * 支持 `text-decoration` 样式.
  * 支持 `text-overflow` 样式.
  * 支持 `line-height`样式<sup class="wx-v">0.6.1+</sup>

## 事件
支持 **[通用事件](../../wiki/common-events.html)**.

## 自定义字体
`支持版本:v0.12.0`

支持ttf和woff字体格式的自定义字体, 可以通过调用 `dom` module 里面的 [addRule](../modules/dom.html#addRule)方法, 构建自定义的`font-family`使用, addRule 建议在 `beforeCreate` 或者更早时调用

## 示例
* [`<text>`的基本用法](http://dotwe.org/vue/9ac60ccb4d1aacbdbd608dd7107ad105)
* [自定义字体的使用方法](http://dotwe.org/vue/1cac4b398df5bb65ed21e83deceead1c)


