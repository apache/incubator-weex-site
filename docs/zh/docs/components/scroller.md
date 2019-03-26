# &lt;scroller&gt;

## 简介

`<scroller>` 是一个容纳子组件进行横向或竖向滚动的容器组件。如果你的组件需要进行滚动，可以将 `<scroller>` 当作根元素或者父元素使用，否则页面无法滚动（ `<list>` 组件除外， `<list>` 默认可以滚动）。

::: warning
- 不允许相同方向的 `<list>` 或者 `<scroller>` 互相嵌套，换句话说就是嵌套的 `<list>` / `<scroller>` 必须是不同的方向。
- `<scroller>` 需要显式的设置其宽高，可使用 `position: absolute;` 定位或 `width`、`height` 设置其宽高值。
:::

```html
<template>
  <scroller class="scroller">
    <div class="row" v-for="row in rows" :key="row.id">
      <text class="text">{{row.name}}</text>
    </div>
  </scroller>
</template>

<script>
  const dom = weex.requireModule('dom')

  export default {
    data () {
      return {
        rows: []
      }
    },
    created () {
      for (let i = 0; i < 80; i++) {
        this.rows.push({id: i, name: 'row ' + i})
      }
    },
  }
</script>
```

## 子组件

`<scroller>` 支持任意类型的 Weex 组件作为其子组件。 其中，还支持以下两个特殊组件作为子组件：

- `<refresh>`: 用于添加下拉刷新的功能。详情请查看[`<refersh>`](./refresh.md)。
- `<loading>`: 用于添加上拉加载更多的功能。详情请查看[`<loading>`](./loading.md)。

## 属性

| 参数        | 说明                | 类型   | 默认值 |
| ---------- | -------------      | -----  | ----- |
| show-scrollbar | 控制是否出现滚动条 | boolean | true |
| scroll-direction | 控制滚动的方向 | string（horizontal 或者 vertical） | vertical |
| loadmoreoffset | 触发 `loadmore` 事件所需要的垂直偏移距离（设备屏幕底部与页面底部之间的距离）。当页面的滚动条滚动到足够接近页面底部时将会触发 `loadmore` 这个事件 | number | 0 |
| offset-accuracy | 控制 `scroll` 事件触发的频率，默认值为 10，表示两次 `scroll` 事件之间列表至少滚动了 10px。注意，将该值设置为较小的数值会提高滚动事件采样的精度，但同时也会降低页面的性能 | number | 10 |
| scrollToBegin | 控制 `scroll` 内容（layout）改变后，是否自动滚到初时位置。默认是true| string | true |



::: warning
`scroll-direction` 定义了 scroller 的滚动方向，样式表属性 `flex-direction` 定义了 scroller 的布局方向，两个方向必须一致。例如：
  - `scroll-direction` 的默认值是 `vertical`，`flex-direction` 的默认值是 `row`；
  - 当需要一个水平方向的 scroller 时，使用 `scroll-direction="horizontal"` 和 `flex-direction: row`;
  - 当需要一个竖直方向的 scroller 时，使用 `scroll-direction="vertical"` 和 `flex-direction: column`，由于这两个值均是默认值，当需要一个竖直方向的 scroller 时，这两个值可以不设置。
:::

`loadmoreoffset` 如图所示:
  <div style="text-align: center"><img src="https://img.alicdn.com/tfs/TB16QBaobvpK1RjSZFqXXcXUVXa-616-1917.jpg" width="300"></div>

## 事件

- `loadmore`

  如果滚动到底部将会立即触发这个事件，你可以在这个事件的处理函数中加载下一页的列表项，可通过 `loadmoreoffset` 属性设置触发偏移距离。

- `scroll`

  列表发生滚动时将会触发该事件，事件的默认触发频率为 10px，即列表每滚动 10px 触发一次，可通过属性 `offset-accuracy` 设置抽样率。事件中 `Event` 对象有以下属性:

  | 属性        | 说明           | 类型   |
  | ---------- | ------------- | -----  |
  | `contentSize` | 列表的内容尺寸 | Object |
  | `width` | 列表内容宽度 | number |
  | `height` | 列表内容高度 | number |
  | `contentOffset` | 列表的偏移尺寸 | Object |
  | `x` | x 轴上的偏移量 | number |
  | `y` | y 轴上的偏移量 | number |

- `scrollstart` <Badge text="0.17.0+" type="warn" vertical="middle"/>

  **H5 暂不支持该事件**，当列表开始滚动时触发，当前的内容高度和列表偏移会在 callback 中返回，示例参见 Demo。

- `scrollend` <Badge text="0.17.0+" type="warn" vertical="middle"/>

  **H5 暂不支持该事件**，与 `scrollstar` 类似，当列表结束滚动时触发，当前的内容高度和列表偏移会在 callback 中返回，示例参见 Demo。

## 扩展

### `scrollToElement(node, options)`

与 `<list>` 类似，`<scroller>` 支持滚动到某个指定的元素，可通过 `dom.scrollToElement()` 滚动到指定元素位置。更多信息可参考[dom module](../modules/dom.html)。

#### 参数

- ` {node}`：指定目标节点
- `options {Object}`：可选项，属性为：
  - `offset {number}`：一个到其可见位置的偏移距离，默认是 0

## 示例

- [scrollerstart 事件](http://dotwe.org/vue/6e3c7fb21976e80c2959f330ddd1b26a)
- [设置 scroller 事件触发频率](http://dotwe.org/vue/d896b0896293ec55c209729fdfc7bff2)
- [热门动画列表](http://dotwe.org/vue/892bd1c977b61762baca8e02a65b6d97)，使用 `<scroller>` 进行长列表渲染，支持 `loadmore` 自动加载数据及右下角回到顶部功能。

  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1.Bg6nZbpK1RjSZFyXXX_qFXa-750-1334.gif" />

- [简易电梯导航](http://dotwe.org/vue/dda3f021a788c0cc9c92c9fa89784192)，顶部为横向 `<scroller>` 作为楼层导航，点击可定位到对应楼层，常见于各类活动会场页面。

  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1Oo77nZbpK1RjSZFyXXX_qFXa-526-882.gif" />

- [聊天窗口](http://dotwe.org/vue/21d8b0a79c20e95139353d9cc8b634f5)，页面局部可滚动，底部输入框不可滚动。

  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB11_g_n7voK1RjSZPfXXXPKFXa-264-439.gif" />