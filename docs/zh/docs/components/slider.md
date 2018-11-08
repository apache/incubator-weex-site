# &lt;slider&gt;

`<slider>` 组件用于在一个页面中展示多个图片，在前端，这种效果被称为 “轮播图”。常用来展示 banner 等效果。

::: warning
- `<slider>` 需要显式的设置其宽高样式，否则在 H5 端无法渲染。
:::

```html
<template>
  <slider class="slider" interval="3000" auto-play="true">
    <div class="frame" v-for="img in imageList">
      <image class="image" resize="cover" :src="img.src"></image>
    </div>
  </slider>
</template>
```

[示例](http://dotwe.org/vue/2a27381ed04ba28e303cce5a55bbb6b8)

## 子组件

`<slider>` 支持任意类型的 Weex 组件作为其子组件。 其中，还支持 `<indicator>` 作为子组件展示特殊效果。

### &lt;indicator&gt;

用于显示轮播图指示器效果，必须作为 `<slider>` 的子组件使用。

::: warning 提示
`<indicator>` 不支持子组件，向 `<indicator>` 中添加的所有子元素都会被忽略。
:::

`<indicator>` 组件除了支持 [通用样式](/guide/common-styles.html) 外，还有一些私有样式：

* `item-color {color}`：indicator 指示点未被选中时的颜色，默认值为 `#CCCCCC`
* `item-selected-color {color}`：indicator 指示点被选中时的颜色，默认值为 `#444444`
* `item-size {number}`：指示点的半径，默认为 `5px`

[可参考该示例](http://dotwe.org/vue/00aff16c6c1c9e9c1209d2db70b94b24)

::: warning 注意
* `<indicator>` 的 `position` 不仅依赖 `top`、`left`、`bottom` 和 `right` 样式，同时会参考 `width` 和 `height` 样式。`<indicator>` 默认的宽高继承于 `<slider>`，如果 `<slider>` 未设置宽高，需要显式的给 `<indicator>` 设置宽高值
* `background-color` 不推荐使用，建议使用 `item-color` 和 `item-selected-color` 代替
:::

## 属性

| 参数        | 说明                | 类型   | 默认值 |
| ---------- | -------------      | -----  | ----- |
| `auto-play` | 控制是否自动播放轮播 | boolean | false |
| `interval` | 值为毫秒数，此值设定 slider 切换时间间隔。当 auto-play 值为 true 时生效 | number | 3000 |
| `infinite` | 是否循环播放 | boolean | true |
| `offset-x-accuracy` | 控制 `scroll` 事件触发的频率，表示两次 `scroll` 事件之间触发的频率，取值范围为(0, 1]，表示相对控件宽度。注意，将该值设置为较小的数值会提高滚动事件采样的精度，但同时也会降低页面的性能。 | number | - |
| `index` | 设置当前展示的图片的索引 | number | - |
| `scrollable` | 设置是否可以通过滑动手势来切换 slider | boolean | true |
| `keep-index` | 设置 slider 中的数据发生变化后是否保持变化前的 index | boolean | true |

## 事件

- `change`

  当轮播索引改变时，触发该事件。事件中 `Event` 对象有以下属性:

  | 属性        | 说明           | 类型   |
  | ---------- | ------------- | -----  |
  | `index` | 当前的图片索引 | number |

- `scroll`

  列表发生滚动时将会触发该事件，事件的默认抽样率为 10px，即列表每滚动 10px 触发一次，可通过属性 `offset-x-accuracy` 设置抽样率。事件中 `Event` 对象属性：

  | 属性        | 说明           | 类型   |
  | ---------- | ------------- | -----  |
  | `offsetXRatio` | 表示当前页面的偏移比例，取值范围为 `[-1, 1]`，负值表示向左侧滚动，正值向右。例如，-0.2 表示当前 item 有 20% 的区域被滚动到 slider 左侧边界以外，0.3 表示当前 item 有 30% 的区域被滚动到 slider 右侧边界以外 | number |

## Demo

- [设置 scroll 事件触发频率](http://dotwe.org/vue/00aff16c6c1c9e9c1209d2db70b94b24)
- [自动播放与切换控制](http://dotwe.org/vue/7c9c0f5cc6e4571a962b8f0cf627fab3)

- [Ocean](http://dotwe.org/vue/c851d5fe09e54709a6128dbc5bf74a6e)，常见的轮播图应用场景。

  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1YqM9n9zqK1RjSZFHXXb3CpXa-750-1334.gif" />
