---
title: <a>
type: references
group: 内置组件
order: 8.01
version: 2.1
---

`<a>` 用于实现页面间的跳转。

> **注意：** 除了本文档中注明的特性，`<a>` 的表现同 [`<div>`](./div.html) 一致。

> **注意：** 不能在 `<a>` 中直接添加匿名文本，请用 [`<text>`](./text.html) 包裹文本。

## 基本用法
用 `<a>` 将待跳转的元素包裹起来即可。

    <a href="http://dotwe.org/raw/dist/a5e3760925ac3b9d68a3aa0cc0298857.bundle.wx">
      <text>Jump</text>
    </a> 

参见[示例](http://dotwe.org/vue/1cec564d6e25c169a0a9a92db3a00955)。

## 属性
| 属性名           | 类型     | 值  | 默认值   |
| -------------   | ------  | --- | ------- |
| `href` | String | {URL}   | -   | -       |

### `href`
待跳转的页面URL，待跳转页面**需要**是一个Weex页面。如果待跳转页面是一个普通**HTML**，这会是一个**未定义**行为。

## 样式
`<a>` 支持[通用样式](../../wiki/common-styles.html)。

## 事件
`<a>`支持 [通用事件](../../wiki/common-events.html).

### `click`
> **注意：** `click` 事件的回调函数和 `href` 跳转的执行顺序**未被定义**。**不要**使用 `click` 来进行 `href` 跳转前的逻辑处理。

## 示例
* [`<a>` 的基本用法](http://dotwe.org/vue/1cec564d6e25c169a0a9a92db3a00955)。
