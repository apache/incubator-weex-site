# &lt;richtext&gt; <Badge text="v0.20+" type="warning"/>

## 简介

富文本组件可以内嵌 `<span>` `<a>` `<image> `。同时它也支持 `<span>` `<a>` `<image> ` 的嵌套。

只有 `<span>`, `<a>` and `<image>` 可以包含在 `<richtext>` 标签里。`<span>` and `<a>` 会被显示为 `display:inline`，而 `<image>` 会被显示为 `display:inline-block`。

`<richtext>` 的子节点分两种类型。
* `<span>` and `<a>` 可以再包含孩子节点。
* `<image>` 不能再包含孩子节点。

富文本组件内部树形结构不能超过255层，超过的层会被忽略。

注意事项
* `<a>` 标签在 iOS 上恒定为 `color:blue` 蓝色样式，它孩子节点也会被应用为该样式，见下面样例。Android 上无此限制。
* `<image>` 标签必须指定 `width` 和 `height`.
* 在图片下载完成前，`<image>` 会保持空白状态，目前不支持显示占位图。
* 富文本组件自身不能嵌套。

## 属性

富文本组件的子节点支持的属性如下。

#### image

* **src**. 图片链接。
* **pseudo-ref**. 开发者指定的索引，会被传给回调方法 **itemclick**。

#### a

* **herf**. Herf。

#### span

`<span>` 不支持任何属性，文本需要包在 `<span>` 里面，例如 `<span>Hello World</span>`。

## 样式

富文本和它下面的 `<span>`, `<a>`, `<image>` 只支持有限的样式。

* `<span>`, `<a>` 和 `<richtext>`
    * 可以被继承
        * color
        * font-family
        * font-size
        * font-style
        * font-weight
        * line-height
    * 不可被继承
        * background-color
* `<span>`
    * 可以被继承
        * text-decoration: none | underline | line-through, 默认值是 none
* `<richtext>`
    * 不可被继承
        * lines: 最大行数，必须为正数。
* `<image>`
    * 不可被继承
        * width
        * height

## 事件

* **通用事件** 支持所有[通用事件](../events/common-events.html)。
* **itemclick**. 触发时机
   * `img` 被点击
   * 没有任何父节点是 `a`
   * 如果第二个条件不满足，Weex 会尝试打开 `a` 标签指定的链接。
   * `img` 的 **pseudo-ref** 会作为参数传回来。

## 示例

[示例](http://dotwe.org/vue/f748b0cee3991522a66d4376b66a4f2a)