---
title: webview
type: references
group: Build-in Modules
order: 9.12
version: 2.1
---

`webview` module provides a series of web operation API like `goBack`, `goForward`, and `reload`. Usually used with the [`<web>` component](../components/web.html).

## API

### goBack(webElement)

Goes to the previous page in WebView's session history.

**Arguments**

- `webElement`*(web)*: the element of the `<web>` component.

### goForward(webElement)

Goes to the next page in WebView's session history.

**Arguments**

- `webElement`*(web)*: the element of the `<web>` component.

### reload(webElement)

Reloads the current web page.

**Arguments**

- `webElement`*(web)*: the element of the `<web>` component.

## Examples

- Simple useage:

```js
var webElement = this.$el('webview');

var webview = weex.requireModule('webview');
webview.goBack(webElement.ref);
webview.goForward(webElement.ref);
webview.reload(webElement.ref);
```

- [Browser example](http://dotwe.org/vue/a3d902040b79ab38d1ffd753366fb939)
