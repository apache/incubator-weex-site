# 事件冒泡 <Badge text="v0.13+" type="warn" vertical="middle"/>

::: warning 注意
目前仅 Weex Native（Android 和 iOS）支持，web 端 暂时不支持此项特性.
:::
如果你是个 web 开发者，你大概对浏览器事件冒泡机制已经很熟悉了，而且可能认为 Weex 默认会支持事件冒泡。然而，Weex 在 0.13 之前是不支持这一特性的，在 0.13 版本，Weex 提供了这项支持。

## 概念

以点击事件为例，比如一个点击事件发生在某个 `<video>` 元素上，这个元素有一个父元素（比如是个 `div` 元素），浏览器会执行两个处理阶段 - 捕获（capturing）阶段和冒泡（bubbling）阶段。在 web 开发中冒泡阶段会用的比较多，而捕获处理用的比较少。

在捕获阶段，浏览器检查当前元素的最外层父节点（在 web 上，比如，`<html>` 元素），如果它上面绑定了一个 click 事件处理器，那么先执行这个处理器。然后检查下一个元素，`<html>` 的子元素里是 `<video>` 祖先元素的那个元素，做同样的检测。一步步直到遇到当前点击的这个元素本身。

接下来是冒泡阶段，方向和捕获阶段相反：浏览器先检测当前被点击的元素上是否注册了点击事件处理器，如果有则执行它。接下来检测它的父元素，一步步向上，直到最外层 `<html>` 元素。

![](https://img.alicdn.com/tfs/TB1DF.3nZbpK1RjSZFyXXX_qFXa-960-452.png)

我们一般使用默认的事件注册机制，将事件处理注册在冒泡阶段，所以处理冒泡阶段的情况比较多。当我们想要停止事件冒泡，只需要调用事件对象的 `stopPropagation` 方法。标准事件对象包含 `stopPropagation` 方法，当执行事件处理器时调用该方法，会立即停止事件冒泡，这样事件冒泡处理链上的后续处理器就不会再执行下去。

Weex 在 0.13 版本 SDK 里实现了事件冒泡机制。注意事件冒泡默认是不开启的，你需要在模板根元素上加上属性 `bubble=true` 才能开启冒泡。

## 使用

事件冒泡默认不开启，需要手动添加 `bubble=true` 属性到根元素上。

```vue
<template>
  <!-- 开启事件冒泡机制. -->
  <div bubble="true">
    ...
  </div>
</template>
```

## 阻止冒泡

在事件处理函数里，可以通过调用 `event.stopPropagation` 方法阻止事件冒泡。这个方法和 [DOM 标准](https://dom.spec.whatwg.org/#dom-event-stoppropagation) 里的方法一致。注意 `event.stopPropagation` 和 `bubble=true` 的影响范围不同，前者仅针对当前冒泡到的元素以及其祖先层级有效，而对子元素无效。而后者相当于一个全局开关，开启以后对该根元素内部所有子元素都开启了事件冒泡效果。两者可以同时存在。

```js
{
  handleClick (event) {
    // 阻止继续冒泡.
    event.stopPropagation();
  }
}
```

::: warning 注意
需要注意的是: 为了兼容之前的版本，Weex 默认不会开启事件冒泡机制。需要在根元素的属性上，添加 `bubble="true"` 来开启冒泡机制。否则，将不会向上传播事件，保持与之前版本的效果相同。
:::

## Demo

- [开启事件冒泡](http://dotwe.org/vue/fa2957ce3e9eb47ad9ae1da22d845e95)
  使用 Weex playground App 扫描页面里的二维码，然后在打开页面中点击包含 ‘click me’ 文字的方框，会看到事件冒泡效果，即外层的组件依次显示事件成功冒泡到当前组件的提示。

- [阻止冒泡](http://dotwe.org/vue/2cc80e19c9b2430fb780234628065a69)
  使用 Weex playground App 扫描页面里的二维码，然后在打开页面中点击包含 ‘click me’ 文字的方框，可以看到事件冒泡被父组件中断了，不再冒泡到最外层组件。
