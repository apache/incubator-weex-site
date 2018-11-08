# &lt;a&gt;
`<a>` 组件用于实现页面间的跳转。

```html{1}
<a href="http://emas-ha-remote-log-poc.oss-cn-beijing.aliyuncs.com/eweex/app/biz-docs-com-mod/upload/271ccdca-db41-423d-981c-c7c6751ba479/show_1.js">
  <text>主会场</text>
</a> 
```
::: warning 注意
- 不能直接在 `<a>` 中添加文本。
-  `click` 事件的回调函数和 `href` 跳转的执行顺序**未被定义**，**不要**使用 `click` 来进行 `href` 跳转前的逻辑处理。
:::

## 属性
<table>
  <thead><tr><th style="width: 15%">属性名</th><th style="width: 55%">说明</th><th style="width: 15%">类型</th><th style="width: 15%">默认值</th></tr></thead>
  <tbody>
    <tr><td>href</td><td>待跳转的页面 URL，待跳转页面需要是一个 Weex 页面。如果待跳转页面是一个普通 HTML，这会是一个未定义行为</td><td>string</td><td>-</td></tr>
  </tbody>
</table>

## Demo

* [页面跳转](http://dotwe.org/vue/3b789771e48be92a70bd682f084b84b5)
<IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1scdtoiLaK1RjSZFxXXamPFXa-544-960.gif" />