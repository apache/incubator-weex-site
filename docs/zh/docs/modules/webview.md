# webview

`webview` 模块提供了一系列的 [`<web>`](../components/web.html) 组件操作接口，例如 `goBack`、`goForward` 和 `reload`，一般与 `<web>` 组件一起使用，在 Weex 页面内渲染 web 页面。

```javascript
var webElement = this.$el('webview');
var webview = weex.requireModule('webview');
webview.goBack(webElement.ref);
webview.goForward(webElement.ref);
webview.reload(webElement.ref);
```

# API

## goBack

返回。

#### goBack(webElement)

* **@webElement**, `<web>` 组件元素，可通过 `ref` 获取

## goForward

前进

#### goForward(webElement)

* **@webElement**, `<web>` 组件元素，可通过 `ref` 获取

## reload

刷新

#### reload(webElement)

* **@webElement**, `<web>` 组件元素，可通过 `ref` 获取

**示例**
- [API 示例](http://dotwe.org/vue/196dcbdb6a5bcea519c239d50ae5012d)
- [仿浏览器](http://dotwe.org/vue/9877838e37d732dbe2639e3ec57f096a)