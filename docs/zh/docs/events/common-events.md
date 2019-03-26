# 通用事件

Weex 提供了通过事件触发动作的能力，例如在用户点击组件时执行 JavaScript。下面列出了可被添加到 Weex 组件上以定义事件动作的属性：

## click

当组件上发生点击手势时被触发。

::: warning 注意
`<input>` 和 `<switch>` 组件目前不支持 click 事件，请使用 change 或 input 事件来代替。
:::

### 事件对象

| key       | value | 备注                              |
| --------- | ----- | --------------------------------- |
| type      | click |                                   |
| target    |       | 触发点击事件的目标组件            |
| timestamp |       | 触发点击事件时的时间戳(不支持 H5) |

[示例](http://dotwe.org/vue/ad62b385c6b3cb7d038539f137be79ad)

## longpress

如果一个组件被绑定了 `longpress` 事件，那么当用户长按这个组件时，该事件将会被触发。

### 事件对象

| key       | value     | 备注                              |
| --------- | --------- | --------------------------------- |
| type      | longpress |                                   |
| target    |           | 触发长按事件的目标组件            |
| timestamp |           | 长按事件触发时的时间戳(不支持 H5) |

[示例](http://dotwe.org/vue/ad62b385c6b3cb7d038539f137be79ad)

## Appear

如果一个位于某个可滚动区域内的组件被绑定了 `appear` 事件，那么当这个组件的状态变为在屏幕上可见时，该事件将被触发。

### 事件对象

| key       | value        | 备注                            |
| --------- | ------------ | ------------------------------- |
| type      | appear       |                                 |
| target    |              | 触发 Appear 事件的组件对象      |
| timestamp |              | 事件被触发时的时间戳(不支持 H5) |
| direction | `up`或`down` | 触发事件时屏幕的滚动方向        |

[示例](http://dotwe.org/vue/ad62b385c6b3cb7d038539f137be79ad)

## Disappear

如果一个位于某个可滚动区域内的组件被绑定了 `disappear` 事件，那么当这个组件被滑出屏幕变为不可见状态时，该事件将被触发。

### 事件对象

| key       | value        | 备注                            |
| --------- | ------------ | ------------------------------- |
| type      | disappear    |                                 |
| target    |              | 触发 Disappear 事件的组件对象   |
| timestamp |              | 事件被触发时的时间戳(不支持 H5) |
| direction | `up`或`down` | 触发事件时屏幕的滚动方向        |

[示例](http://dotwe.org/vue/ad62b385c6b3cb7d038539f137be79ad)

## stopPropagation

用于内嵌处理Native滑动冲突的情况，阻止Native事件进行冒泡传递。可结合shouldStopPropagationInterval和shouldStopPropagationInitResult属性来控制。

shouldStopPropagationInitResult  默认初始化false/true的结果。
shouldStopPropagationInterval  默认数字类型，控制touch频率，减少JS和Native通信次数，提升流畅性。可参考[Scroller内嵌List示例]

### 事件对象无

[Scroller内嵌List示例](http://dotwe.org/vue/48ddb2f7339d1fb116135900a2dbc8e5)

## Page

::: warning 注意
支持 iOS 和 Android，H5 暂不支持。
:::

Weex 通过 `viewappear` 和 `viewdisappear` 事件提供了简单的页面状态管理能力。

`viewappear` 事件会在页面就要显示或配置的任何页面动画被执行前触发，例如，当调用 `navigator` 模块的 `push` 方法时，该事件将会在打开新页面时被触发。`viewdisappear` 事件会在页面就要关闭时被触发。

与组件的 `appear` 和 `disappear` 事件不同的是，`viewappear` 和 `viewdisappear` 事件关注的是整个页面的状态，所以它们必须绑定到页面的根元素上。

特殊情况下，这两个事件也能被绑定到非根元素的`body`组件上，例如`wxc-navpage`组件。

### 事件对象

| key       | value                           | 备注                 |
| --------- | ------------------------------- | -------------------- |
| type      | `viewappear` 或 `viewdisappear` |                      |
| target    |                                 | 触发事件的组件对象   |
| timestamp |                                 | 事件被触发时的时间戳 |



## Demo

- [综合示例](http://dotwe.org/vue/ad62b385c6b3cb7d038539f137be79ad)
