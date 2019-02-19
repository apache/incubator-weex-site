# meta

meta 模块可用于声明单个页面的元信息，通常是一些页面级别的配置，如容器的显示宽度 (viewport) 等。默认情况下，应用无需修改此配置。

# API

## setViewport

Weex 容器默认的宽度 (viewport) 是 750px，通过 setViewport 方法可以改变页面的显示宽度，仅对当前页面生效。

#### setViewport(options)

* **@options**
  * **`width`**，number，具体数值或 `"device-width"` 和 `"device-height"` 宏。
  * **`height`**，number，具体数据或 `"device-width"` 和 `"device-height"` 宏。
  * **`roundOffDeviation`** <Badge text="0.20.0+ & Android Only" type="warn" vertical="middle"/>，表示layout引擎在布局时会忽略小数点导致的误差；若发现组件拼接处有缝隙，可以将 `roundOffDeviation` 设置为false，此时layout引擎将自动填补小数点误差，默认值为 true。

::: tip 注意
* 需要注意的是：只有在页面渲染开始之前设置 viewport 才会生效。 也就是说，setViewport 方法只能在入口文件中使用，而且要在 new Vue(...) 之前调用；如果是在组件中使用，就只有在渲染到该组件的时候才会执行相应的代码，此时页面已经处于渲染过程中，设置 viewport 将不会再生效。
* 宽度和高度的单位默认是 px，暂不支持其他单位。
:::

#### 示例

入口文件：

```javascript
// entry.js

import App from './app.vue';
const meta = weex.requireModule('meta');

// 配置 viewport 的宽度为 640px
meta.setViewport({
  width: 640,
  roundOffDeviation: false
});

App.el = '#root';
new Vue(App);
```

在入口文件中配置了 viewport 的宽度为 640 之后，当前页面中的所有组件都会以 640px 作为满屏宽度。

组件文件：

```vue
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
  background-color: #eeeeee;
}
.box640 {
  width: 640px;
  height: 640px;
  background-color: #cccccc;
}
.box480 {
  width: 480px;
  height: 480px;
  background-color: #aaaaaa;
}
.text {
  font-size: 50px;
}
</style>
```

[示例](http://dotwe.org/vue/76e5656fb735fcca0c78facbd1edcde3)。（由于 [http://dotwe.org](http://dotwe.org/vue) 目前还不支持配置入口文件，例子中的效果暂时无法在线查看。）
本地开发环境的搭建可以参考：[《搭建开发环境》](http://weex-project.io/cn/guide/set-up-env.html)。
