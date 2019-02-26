# &lt;web&gt;

## 简介

`<web>` 用于在 WEEX 页面中显示由 src 属性指定的网页内容。

<div style="text-align: center"><img src="https://img.alicdn.com/tfs/TB161pxoiLaK1RjSZFxXXamPFXa-1465-758.png" width="850"></div>

`<web>` 可以使 H5 与 Native 元素相结合。

* 如图1：您可以整个页面铺满 Web 页面（快速兼容您之前的 H5 页面）
* 如图2：可以使用 Web 和其他 Weex 组件合成复杂页面
* 如图3：使用 Web 组合出多种效果（设置透明背景的 H5 页面，灵活配置各类 H5 活动资讯）

```vue
<template>
  <web src="https://www.taobao.com/"></web>
</template>
<script></script>

<style></style>
```

::: warning 注意
* `<web>` 不支持任何嵌套的子组件。
* `<web>` 必须指定 width 和 height 的样式属性，否则将不起作用。
* 您可以使用 [webview module](../modules/webview.html)来控制 `<web>`。
:::

## 属性

* **src** `[必选]`

要加载的网页内容的 URL。建议指定线上真实存在的 URL 地址。

## 事件

支持 appear 和 disappear 事件同时支持：

* **pagestart** 会在 Web 页面开始加载时调用。

    事件对象：
    - `url`: {String} 当前 Web 页面的 URL。

* **pagefinish** 会在 Web 页面完成加载时调用。

    事件对象：
    - `url`: {String} 当前 Web 页面的 URL。
    - `canGoBack`: {Boolean} 当前 Web 页面是否可以回退。
    - `canGoForward`: {Boolean} 当前 Web 页面是否可以前进。
    - `title`: {String} 当前 Web 页面的标题（仅限 iOS 平台）。

* **error** 会在 Web 页面加载失败时调用。

* **receivedtitle** 会在 Web 页面的标题发生改变时调用（仅限 Android 平台）。

```vue
<template>
  <div class="wrapper">
    <web @pagestart="onPageStart" @pagefinish="onPageFinish" @error="onError" src="https://www.taobao.com/"></web>
  </div>
</template>
<script>
  module.exports = {
    methods: {
      onPageStart: function(e) {
         // page start load
      },
      onPageFinish: function(e) {
         // page finish load
      },
      onError: function(e) {
         // page load error
      }
    }
  }
</script>

<style></style>
```

## 示例

* [体验示例](http://dotwe.org/vue/9f8a7be89a4ad881ff515145cc9306ea)

上述示例监听了 pagestart、pagefinish 及 error 事件，同时使用了  [webview module](../modules/webview.html) 提供的 API。