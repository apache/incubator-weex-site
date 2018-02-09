---
title: <web>
type: references
group: 内置组件
order: 8.27
version: 2.1
---

<span class="weex-version">v0.5+</span>

`<web>` 用于在 weex 页面中显示由 `src` 属性指定的页面内容。您还可以使用 `webview` 模块来控制 WebView 的行为，例如回退、前进和重新加载，更多信息请参见 [webview module](../modules/webview.html)。

## 基本用法

> **注意：** `<web>` 不支持任何嵌套的子组件，并且必须指定 `width` 和 `height` 的样式属性，否则将不起作用。

```html
<web src="https://vuejs.org"></web>
```

参见[示例](http://dotwe.org/vue/81da1f0129dfc72e1666cfd4b90f20ae).

## 属性

| 属性  | 类型    | 值    | 默认值 |
| ----- | ------ | ----- | ----- |
| `src` | String | {URL} | -     |

### `src`

要加载的网页内容的 URL。您可以指定一个基于 bundle URL 的相对 URL，它将被重写为真实资源 URL（本地或远程）。另请参阅：[Path](../../guide/advanced/path.html)。

## 事件

只支持**[公共事件](../../wiki/common-events.html)**中的 `appear` 和 `disappear` 事件。

### pagestart

`pagestart` 事件，会在 Web 页面开始加载时调用。

**事件对象**：

- `url`: {String} 当前 Web 页面的 URL。

### pagefinish

`pagefinish` 事件，会在 Web 页面完成加载时调用。

**事件对象**：

- `url`: {String} 当前 Web 页面的 URL。
- `canGoBack`: {Boolean} 当前 Web 页面是否可以回退。
- `canGoForward`: {Boolean} 当前 Web 页面是否可以前进。
- `title`: {String} 当前 Web 页面的标题（仅限 iOS 平台）。

### error

`error` 事件，会在 Web 页面加载失败时调用。

### receivedtitle

`error` 事件，会在 Web 页面的标题发生改变时调用（仅限 Android 平台）。

**事件对象**：

- `url`: {String} 当前 Web 页面的 URL。

### 处理 `<web>` 事件

在 `<web>` 上绑定事件：

```html
<web @pagestart="onPageStart" @pagefinish="onPageFinish" @error="onError" src="https://vuejs.org"></web>
```

添加事件 handler：

```js
export default {
  methods: {
    onPageStart (event) {
      // page start load
    },
    onPageFinish (event) {
      // page finish load
    },
    onError (event) {
      // page load error
    },
  }
}
```

参见[示例](http://dotwe.org/vue/f9606de73fe386d554217371c4d60d03)。

## 样式

支持**[公共样式](../../wiki/common-styles.html)**。

## 使用注意事项

- 必须指定 `<web>` 的 `width` 和 `height` 样式。
- `<web>` 不能包含任何嵌套的子组件。
- 您可以使用 [webview module](../modules/webview.html) 来控制 `<web>` 组件，参见[示例](http://dotwe.org/vue/a3d902040b79ab38d1ffd753366fb939)。

## 示例

- [浏览器示例](http://dotwe.org/vue/a3d902040b79ab38d1ffd753366fb939)
