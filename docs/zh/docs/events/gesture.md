# 手势 <Badge type="warning" text="该功能属于实验性功能" />

Weex 封装了原生的触摸事件以提供手势系统。使用手势类似于在 Weex 中使用事件，只需在节点上监听手势即可。

## 手势类型

目前，仅支持以下四种手势类型：

- touch: 当触摸到一个点，移动或从触摸面移开时触发 `touch` 手势。触摸手势很精准，它会返回所有详细的事件信息。所以，监听 `touch` 手势可能很慢，即使只移动一丁点也需要处理大量事件。有三种类型的 `touch` 手势：

  |type|描述|
  |---|---|
  |`touchstart`|将在触摸到触摸面上时触发|
  |`touchmove`|将在触摸点在触摸面移动时被触发|
  |`touchend`|将在从触摸面离开时被触发|
  |`stopPropagation` <Badge type="info" text="v0.18+" />|每个 touch 事件都会被传递过来, 可控制 touch 事件是否冒泡（返回 true）或者停止（返回 false）；用于解决事件冲突或者自定义手势|

  ![](https://img.alicdn.com/tfs/TB1rGU6n7voK1RjSZFNXXcxMVXa-251-282.gif)

  [试一下](http://dotwe.org/vue/3f03a4f64fd7e04db82bd42b555346a2)

* Pan：`pan` 手势也会返回触摸点在触摸面的移动信息，有点类似于 `touch` 手势。但是 `pan` 手势只会采样收集部分事件信息因此比 `touch` 事件要快得多，当然精准性差于 `touch`。`pan` 也有三种类型的手势，这些手势的意义与 `touch`s 完全一样：

  |type|描述|
  |---|---|
  |`panstart`|pan 开始 |
  |`panmove`|pan 移动事件|
  |`panend`|pan 结束事件|
  |`horizontalpan` <Badge type="info" text="v0.10+" />|手势的 `start/move/end` 状态保存在 `state` 特性中。目前该手势在 Android 下会与 click 事件冲突|
  |`verticalpan` <Badge type="info" text="v0.10+" />|手势的 `start/move/end` 状态保存在 `state` 特性中。目前该手势在 Android 下会与 click 事件冲突|
* Swipe: `swipe` 将会在用户在屏幕上滑动时触发，一次连续的滑动只会触发一次 `swipe` 手势。

  [试一下](http://dotwe.org/vue/2693655847d890fe96160cc7a955040b)

* LongPress: `LongPress`将会在触摸点连续保持 500 ms 以上时触发

  [试一下](http://dotwe.org/vue/a077a3cff49b1098f38349fd70f92de9)

`touch` 和 `pan` 非常接近，它们的特点可以总结成这样：
|type|描述|
|---|---|
|`Touch`|完整信息，精准、很慢|
|`Pan`|抽样信息，很快，不够精准|
开发者可以根据自己的情况选择合适的手势。

## 属性

以下属性可以在手势的回调中使用：

- `direction`: 仅在 `swipe` 手势中存在，返回滑动方向，返回值可能为 `up`, `left`, `bottom`, `right`

* `changedTouches`: 一个数组，包含了当前手势的触摸点的运动轨迹

### changedTouches

`changedTouches` 是一个数组，其子元素中包含以下属性：

|key|描述|
|---|---|
|`identifier`|触摸点的唯一标识符|
|`pageX`|触摸点相对于文档左侧边缘的 X 轴坐标|
|`pageY`|触摸点相对于文档顶部边缘的 Y 轴坐标|
|`screenX`|触摸点相对于屏幕左侧边缘的 X 轴坐标|
|`screenY`|触摸点相对于屏幕顶部边缘的 Y 轴坐标|
|`force`|屏幕收到的按压力度，值的范围为 0~1|

::: warning 注意
force 属性目前在支持 forceTouch iOS 设备才支持, iPhone 6s 及更新的 iOS 设备
:::

## 约束

目前，由于会触发大量事件冲突，Weex Android 还不支持在滚动类型的元素上监听手势，例如 `scroller`, `list` 和 `webview` 这三个组件。

## Demo

- [Touch](http://dotwe.org/vue/3f03a4f64fd7e04db82bd42b555346a2)
- [Swipe](http://dotwe.org/vue/2693655847d890fe96160cc7a955040b)
- [LongPress](http://dotwe.org/vue/a077a3cff49b1098f38349fd70f92de9)
