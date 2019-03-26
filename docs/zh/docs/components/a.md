# &lt;a&gt;

## 简介

`<a>` 组件用于实现页面间的跳转。

::: tip
不可以在标签内部直接添加文本，需要使用 [`<text>`](./text.html) 标签来显示文本。
:::

```Html
<a href="http://dotwe.org/raw/dist/a5e3760925ac3b9d68a3aa0cc0298857.bundle.wx">
  <text>Jump</text>
</a>
```

## 属性

* **href** string. 待跳转的页面 URL，待跳转页面需要是一个 Weex 页面，否则会是一个未定义行为。

## 样式

* **通用样式**. 参见[通用样式](../styles/common-styles.html)

## 事件

* **通用事件**. 参见[通用事件](../events/common-events.html)

::: tip
`click` 事件的回调函数和 `href` 跳转的执行顺序**未被定义**，**不要**使用 `click` 来进行 `href` 跳转前的逻辑处理。
:::

## 示例

```Html
<a href="http://emas-ha-remote-log-poc.oss-cn-beijing.aliyuncs.com/eweex/app/biz-docs-com-mod/upload/271ccdca-db41-423d-981c-c7c6751ba479/show_1.js">
  <text>主会场</text>
</a> 
```

[示例](http://dotwe.org/vue/3b789771e48be92a70bd682f084b84b5)
