## 简介

&lt;a&gt; 组件用于实现页面间的跳转。

## 属性

* **href** string. 待跳转的页面 URL，待跳转页面需要是一个 Weex 页面。如果待跳转页面是一个普通 HTML，这会是一个未定义行为

## 样式

* **通用样式**. 参见[通用样式](../styles/common-styles.html).

## 事件

* **通用事件**. 参见[通用事件](../events/common-events.html)

## 其它

- 不能直接在 `<a>` 中添加文本。
-  `click` 事件的回调函数和 `href` 跳转的执行顺序**未被定义**，**不要**使用 `click` 来进行 `href` 跳转前的逻辑处理。


## 示例

```Html
<a href="http://emas-ha-remote-log-poc.oss-cn-beijing.aliyuncs.com/eweex/app/biz-docs-com-mod/upload/271ccdca-db41-423d-981c-c7c6751ba479/show_1.js">
  <text>主会场</text>
</a> 
```

[运行case](http://dotwe.org/vue/3b789771e48be92a70bd682f084b84b5)
