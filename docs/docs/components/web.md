# &lt;web&gt;

## Summary

`<web>` is used to display web content that specified by `src` attribute in weex page. You also can use `webview` module to control WebView behavior such as goBack, goForward and reload, See [webview module](../modules/webview.html) for more information.

`<web>` is used to display the content of the web page specified by the src attribute in the WEEX page.

<div style="text-align: center"><img src="https://img.alicdn.com/tfs/TB161pxoiLaK1RjSZFxXXamPFXa-1465-758.png" width="850"></div>

`<web>` can combine H5 with Native elements.

* Figure 1: You can spread the entire page to the web page (fast compatibility with your previous H5 page)
* Figure 2: You can synthesize complex pages using the Web and other Weex components
* Figure 3: Using the Web to combine multiple effects (Set H5 page with transparent background, flexible configuration of various H5 activity information)

```vue
<template>
  <web src="https://www.taobao.com/"></web>
</template>
<script></script>

<style></style>
```

::: warning Note
* `<web>` does not support list, scroller, and slider components in the same direction nested scroll mode, which will cause scrolling conflicts;
* `<web>` does not support any nested subcomponents;
* `<web>` must specify style attributes for width and height, otherwise it will not work;
* You can use [webview module](../modules/webview.html) to control `<web>`;
* `<web>` is only used as a degraded unconventional scenario and is not recommended for a large number of normal Weex pages.

:::
## Basic Usage

> **Note:** `<web>` does not support any nested child components, and must specific `width` and `height` in style attribute, otherwise it won't work.

```html
<web src="https://vuejs.org"></web>
```

See the [example](http://dotwe.org/vue/81da1f0129dfc72e1666cfd4b90f20ae).

## Attributes

### **src**

A URL value for web content to be loaded. You can specify a URL which is relative to bundle URL, it will be rewritten to the real resource URL (local or remote). See also: [Path](../../guide/advanced/asset-path.html).

## Events

Only support `appear` and `disappear` event in **[common events](../events/common-events.html)**.

### pagestart

`pagestart` event handler will be called when the web content is start loading.

**Event object**:

- `url`: {String} URL of current web content.

### pagefinish

`pagefinish` event handler will be called when the web content is loaded.

**Event object**:

- `url`: {String} URL of current web content.
- `canGoBack`: {Boolean} Can current web content go back.
- `canGoForward`: {Boolean} Can current web content go forward.
- `title`: {String} Title of current web content (iOS platform only).

### error

`error` event handler will be called when the web content loaded failed.

### receivedtitle

`receivedtitle` event handler will be called when the title of web content had changed (Android platform only).

**Event object**:

- `url`: {String} URL of current web content.

### Handle `<web>` Events

Bind events on `<web>`:

```html
<web @pagestart="onPageStart" @pagefinish="onPageFinish" @error="onError" src="https://vuejs.org"></web>
```

Add event handler:

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

See the [example](http://dotwe.org/vue/f9606de73fe386d554217371c4d60d03).

## Styles

Support **[common styles](../styles/common-styles.html)**.

## Usage Notes

- The `width` and `height` in the styles of `<web>` must be specified.
- `<web>` can not have any nested child component.
- You can use [webview module](../modules/webview.html) to control `<web>` component, see the [example](http://dotwe.org/vue/a3d902040b79ab38d1ffd753366fb939).

## Examples

- [Browser example](http://dotwe.org/vue/a3d902040b79ab38d1ffd753366fb939)
