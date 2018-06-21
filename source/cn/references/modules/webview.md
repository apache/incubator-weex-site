---
title: webview
type: references
group: 内置模块
order: 9.12
version: 2.1
---

`webview` 模块提供了一系列的 `<web>` 组件操作接口，例如 `goBack`、`goForward`、和 `reload`。一般与 [`<web>` 组件](../components/web.html)一起使用。

## API

### goBack(webElement)

前往 WebView 历史记录的上一页。

**参数**

- `webElement`*(web)*: `<web>` 组件元素。

### goForward(webElement)

前往 WebView 历史记录的下一页。

**参数**

- `webElement`*(web)*: `<web>` 组件元素。

### reload(webElement)

刷新当前 Web 页面。

**参数**

- `webElement`*(web)*: `<web>` 组件元素。

### postMessage(webElement, data)

向当前 Web 页面发送数据。(android weex_sdk:0.18.0-beta-3 开始支持)

**参数**

- `webElement`*(web)*: `<web>` 组件元素。
- `data {Object}`: 要发送的数据

## 示例

- 简单用法：

```js
var webElement = this.$el('webview');

var webview = weex.requireModule('webview');
webview.goBack(webElement.ref);
webview.goForward(webElement.ref);
webview.reload(webElement.ref);
webview.postMessage(webElement, {message: 'message to Web page'});

// Web 页面中接收数据
window.addEventListener('message', event => {
    console.log(event.data) // message to Web page
})
```

- [浏览器示例](http://dotwe.org/vue/a3d902040b79ab38d1ffd753366fb939)
