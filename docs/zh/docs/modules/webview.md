# webview

`webview` 模块提供了一系列的 [`<web>`](../components/web.html) 组件操作接口，例如 `goBack`、`goForward` 和 `reload`，一般与 `<web>` 组件一起使用，在 Weex 页面内渲染 web 页面。

## API

### goBack(webElement)

前往 WebView 历史记录的上一页。

#### 参数

| 属性        | 说明 |
| ---------- | ------------- |
| `webElement` | `<web>` 组件元素，可通过 `ref` 获取 |

```js
const webview = weex.requireModule('webview');

webview.goBack(this.$refs.webview);
```

### goForward(webElement)

前往 WebView 历史记录的下一页。

#### 参数

| 属性        | 说明 |
| ---------- | ------------- |
| `webElement` | `<web>` 组件元素，可通过 `ref` 获取 |

```js
const webview = weex.requireModule('webview');

webview.goForward(this.$refs.webview);
```

### reload(webElement)

刷新当前 Web 页面。

#### 参数

| 属性        | 说明 |
| ---------- | ------------- |
| `webElement` | `<web>` 组件元素，可通过 `ref` 获取 |

```js
const webview = weex.requireModule('webview');

webview.reload(this.$refs.webview);
```

## Demo

- [API 示例](http://dotwe.org/vue/196dcbdb6a5bcea519c239d50ae5012d)

- [仿浏览器](http://dotwe.org/vue/9877838e37d732dbe2639e3ec57f096a)

  <IPhoneImg imgSrc="http://g.alicdn.com/amte-fe/weex-fast-website/1.0.0/webview.png" />