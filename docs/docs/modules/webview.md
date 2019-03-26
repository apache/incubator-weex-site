# webview

`webview` module provides a series of web operation API like `goBack`, `goForward`, and `reload`. 

Usually used with the [`<web>` component](../components/web.html).

```javascript
var webElement = this.$el('webview');
var webview = weex.requireModule('webview');
webview.goBack(webElement.ref);
webview.goForward(webElement.ref);
webview.reload(webElement.ref);
```

# API

## goBack

Goes to the previous page in WebView's session history.

#### goBack(webElement)

* **@webElement**, the element ref of the `<web>` component.

## goForward

Goes to the next page in WebView's session history.

#### goForward(webElement)

* **@webElement**, the element ref of the `<web>` component.

## reload

Reloads the current web page.

#### reload(webElement)

* **@webElement**, the element ref of the `<web>` component.

[Demo](http://dotwe.org/vue/a3d902040b79ab38d1ffd753366fb939)
