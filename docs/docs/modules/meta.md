# meta

The meta module can be used to update meta information for a single page, such as the viewport of the container.

# API

## setViewport

The default width (viewport) of Weex container is 750px. The `setViewport` method can change the viewport of the page and only takes effect on the current page.

#### setViewport(options)

* **@options**
  * **`width`**, number value or `"device-width"` or `"device-height"` macros.
  * **`height`**, number value or `"device-width"` or `"device-height"` macros.
  * **`roundOffDeviation`** <Badge text="0.20.0+" type="warn" vertical="middle"/>, The default value is true, which means that the layout engine ignores the error caused by the decimal point in the layout; if there is a gap in the component splicing, you can set the `roundOffDeviation` to false, and the layout engine will automatically fill in the decimal point error.

::: tip
* Referance: W3C Spec [CSS Device Adaptation](https://drafts.csswg.org/css-device-adapt/#viewport-meta).
* The default unit of the width and height is `px`, other units are not supported.
* The viewport must be set before the page rendering starts. ** In other words, the `setViewport` method can only be used in the entry file, and before the `new Vue (...)` statement. If it's used in the component, the code is executed only when the component is being rendered, meanwhile, the page is already in the rendering process, set the viewport will not take effect again.
:::

#### Demo

The entry file:

```js
// entry.js

import App from './app.vue'
const meta = weex.requireModule('meta')

// The width of the viewport is set to 640px
meta.setViewport({
  width: 640,
  roundOffDeviation: false
})

App.el = '#root'
new Vue(App)
```

After configuring the width of the viewport to 640 in the entry.js, all the components in the current page will take 640px as full screen width.

Example component:

```html
<!-- app.vue -->
<template>
  <div>
    <div class="box750">
      <text class="text">750</text>
      <div class="box640">
        <text class="text">640</text>
        <div class="box480">
          <text class="text">480</text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .box750 {
    width: 750px;
    height: 750px;
    background-color: #EEEEEE;
  }
  .box640 {
    width: 640px;
    height: 640px;
    background-color: #CCCCCC;
  }
  .box480 {
    width: 480px;
    height: 480px;
    background-color: #AAAAAA;
  }
  .text {
    font-size: 50px;
  }
</style>
```

[Try it](http://dotwe.org/vue/7d0302fe499ab08afdb12a376c646b59). (The http://dotwe.org doesn't support to configure the entry file currently.)

Referance: [Set up development environment](../../guide/develop/setup-develop-environment.html).
