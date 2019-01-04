# 通用样式

所有 Weex 自带组件都支持以下通用样式规则。

::: danger
Weex所支持的通用样式已在本文档中全部列出，一些组件可能有自定义样式，请参考组件文档。除此之外的属性，均不被支持。
:::

::: warning
Weex 对于长度值目前只支持像素值，不支持相对单位（`em`、`rem`）。
:::

## 盒模型

Weex 盒模型基于 [CSS 盒模型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)，每个 Weex 元素都可视作一个盒子。我们一般在讨论设计或布局时，会提到「盒模型」这个概念。

![](https://img.alicdn.com/tfs/TB13u.4n5rpK1RjSZFhXXXSdXXa-377-340.png)

盒模型描述了一个元素所占用的空间。每一个盒子有四条边界：外边距边界 margin edge, 边框边界 border edge, 内边距边界 padding edge 与内容边界 content edge。这四层边界，形成一层层的盒子包裹起来，这就是盒模型大体上的含义。

::: warning
Weex 盒模型的 box-sizing 默认为 border-box，即盒子的宽高包含内容、内边距和边框的宽度，不包含外边距的宽度。
:::

::: warning
Weex 只支持 `overflow:hidden`.
:::

下面的例子显示了盒模型的基本用法

```html
<template>
  <div>
    <image src="..." style="width: 400; height: 200; margin-left: 20;"></image>
  </div>
</template>
```

### 宽度

`width {length}`：默认值 0

### 高度

`height {length}`：默认值 0

### 内边距
`padding {length}`：内边距，内容和边框之间的距离，默认值 0。与标准 CSS 类似，`padding` 支持简写，也可分解为以下四个：
  * `padding {length}`: 上、下、左、右四边内边距，默认值 0
  * `padding-left {length}`：左内边距，默认值 0
  * `padding-right {length}`：右内边距，默认值 0
  * `padding-top {length}`：上内边距，默认值 0
  * `padding-bottom {length}`：下内边距，默认值 0

### 边框
#### border-style
`border-width`设定边框样式，如果四个方向的边框样式不同，可分别设置：
  * `border-style {string}`
  * `border-left-style {string}`：可选值为 `solid` | `dashed` | `dotted`，默认值 `solid`
  * `border-top-style {string}`：可选值为 `solid` | `dashed` | `dotted`，默认值 `solid`
  * `border-right-style {string}`：可选值为 `solid` | `dashed` | `dotted`，默认值 `solid`
  * `border-bottom-style {string}`：可选值为 `solid` | `dashed` | `dotted`，默认值 `solid`

支持的值如下：
  * `solid`：实线边框，默认值 `solid`
  * `dashed`：方形虚线边框
  * `dotted`：圆点虚线边框

#### border-width
`border-width`：设定边框宽度，非负值, 默认值 0，如果四个方向的边框宽度不同，可分别设置：
  * `border-left-width {length}`：非负值, 默认值 0
  * `border-left-width {length}`：非负值, 默认值 0
  * `border-top-width {length}`：非负值, 默认值 0
  * `border-right-width {length}`：非负值, 默认值 0
  * `border-bottom-width {length}`：非负值, 默认值 0

#### border-color
`border-color`：设定边框颜色，默认值 `#000000`，如果四个方向的边框颜色不同，可分别设置：
  * `border-color {color}`：默认值 `#000000`
  * `border-left-color {color}`：默认值 `#000000`
  * `border-top-color {color}`：默认值 `#000000`
  * `border-right-color {color}`：默认值 `#000000`
  * `border-bottom-color {color}`：默认值 `#000000`

#### border-radius
`border-radius`：设置边框的圆角，默认值 0，如果四个方向的圆角弧度不同，可分别设置：
  * `border-radius {length}`: 非负值, 默认值 0
  * `border-bottom-left-radius {length}`：非负值, 默认值 0
  * `border-bottom-right-radius {length}`：非负值, 默认值 0
  * `border-top-left-radius {length}`：非负值, 默认值 0
  * `border-top-right-radius {length}`：非负值, 默认值 0

::: danger
`border-radius`和`border-width`定义了圆心角为90度的椭圆弧的长轴和半长轴的大小。如果邻接两边`border-radius`(或`border-width`不一致，weex绘制的边框曲线可能不够平滑。
:::

::: danger Android 兼容性
尽管 `overflow: hidden` 在 Android 上是默认行为，但只有下列条件都满足时，一个父 view 才会去剪切它的子 view。
  * 父view是 `div`, `a`, `cell`, `refresh` 或 `loading`。
  * 系统版本是 Android 4.3 或更高。
  * 系统版本不是 Andorid 7.0。
  * 父 view 没有 `background-image` 属性或系统版本是 Android 5.0 或更高。
:::

### 外边距
`margin {length}`：外边距，元素和元素之间的空白距离，默认值 0。与标准 CSS 类似，`margin` 支持简写，也可分解为四边：
  * `margin {length}`: 上、下、左、右四边外边距，默认值 0
  * `margin-left {length}`：左外边距，默认值 0
  * `margin-right {length}`：右外边距，默认值 0
  * `margin-top {length}`：上外边距，默认值 0
  * `margin-bottom {length}`：下外边距，默认值 0

## Flexbox
Weex 布局模型基于 CSS [`Flexbox`](http://www.w3.org/TR/css3-flexbox/)，以便所有页面元素的排版能够一致可预测，同时页面布局能适应各种设备或者屏幕尺寸。Flexbox 包含 flex 容器和 flex 成员项。如果一个 Weex 元素可以容纳其他元素，那么它就成为 flex 容器。

::: warning
文档中未说明的 flexbox 属性均不支持：如 `order`、`flex-flow` 等。
:::

### Flex 容器
在 Weex 中，Flexbox 是默认且唯一的布局模型，所以你不需要手动为元素添加 `display: flex;` 属性。

#### direction
`direction`决定了文字方向和**Flex容器**的基线方向。默认值为`ltr`。
* `ltr`: 文字和其他元素从左到右排布
* `rtl`: 文字和其他元素从右到左排布。

:::tip
尽管 `direction` 不是 Flexbox模型的一部分，但却对 Flexbox 模型有着影响。
:::

#### flex-direction
`flex-direction`定义了 flex 容器中 flex 成员项的排列方向，默认值为 `column`
  * `column`：从上到下排列。
  * `column-reverse`: 从下到上排布
  * `row`：如果存在`direction:ltr`，则从左到右排布；如果存在`direction:rtl`，则从右到左排布。
  * `row-reverse`: 排布方向与`flex-direction:row`相反

#### flex-wrap
`flex-wrap`属性决定了`Flex成员项`在一行还是多行分布，默认值为`nowrap`
* `nowrap`: `Flex成员项`在一行排布，排布的开始位置由`direction`指定。
* `wrap`：` Flex成员项`在多行排布，排布的开始位置由`direction`指定
* `wrap-reverse`: 行为类似于`wrap`，排布方向与其相反。
  
#### justify-content
定义了 flex 容器中 flex 成员项在主轴方向上如何排列以处理空白部分。可选值为 `flex-start` | `flex-end` | `center` | `space-between`，默认值为 `flex-start`。
  - `flex-start`：是默认值，所有的 flex 成员项都排列在容器的前部；
  - `flex-end`：则意味着成员项排列在容器的后部；
  - `center`：即中间对齐，成员项排列在容器中间、两边留白；
  - `space-between`：表示两端对齐，空白均匀地填充到 flex 成员项之间。

  <div style="width: 400px; margin: 20px 0;">
    <img width="400px" src="https://img.alicdn.com/tfs/TB1fQRmohnaK1RjSZFBXXcW7VXa-504-270.svg" />
  </div>

#### align-items
定义了 flex 容器中 flex 成员项在纵轴方向上如何排列以处理空白部分。可选值为 `stretch` | `flex-start` | `center` | `flex-end`，默认值为 `stretch`。
  - `stretch` 是默认值，即拉伸高度至 flex 容器的大小；
  - `flex-start` 则是上对齐，所有的成员项排列在容器顶部；
  - `flex-end` 是下对齐，所有的成员项排列在容器底部；
  - `center` 是中间对齐，所有成员项都垂直地居中显示。

  <div style="width: 400px; margin: 20px 0;">
    <img width="400px" src="https://img.alicdn.com/tfs/TB1AM8oohnaK1RjSZFtXXbC2VXa-1018-502.jpg" />
  </div>

### Flex 成员项
#### flex
flex 属性定义了 flex 成员项可以占用容器中剩余空间的大小。如果所有的成员项设置相同的值 `flex: 1`，它们将平均分配剩余空间。如果一个成员项设置的值为 `flex: 2`，其它的成员项设置的值为 `flex: 1`，那么这个成员项所占用的剩余空间是其它成员项的 2 倍。Flex 成员项暂不支持 `flex-shrink` 和 `flex-basis` 属性。
- `flex {number}`：值为 number 类型。**该属性不支持 `flex: <flex-grow> | <flex-shrink> | <'flex-basis>`** 的简写。

示例，使用 flexbox 实现水平居中与垂直居中：

### Examples
* [水平和竖直居中](http://dotwe.org/vue/505b5e8bdb6774bccb597a30f74492af)
* [Grid布局](http://dotwe.org/vue/4e1dcb58b31c266c4979fcbed04bb25b)
* [等高模块](http://dotwe.org/vue/5aa2fa9a1ed5ea250e553683ca710f7a)


## 定位

Weex 支持 `position` 定位，用法与 CSS position 类似。为元素设置 `position` 后，可通过 `top`、`right`、`bottom`、`left` 四个属性设置元素坐标。

- `position {string}`：

  设置定位类型。可选值为 `relative` | `absolute` | `fixed` | `sticky`，默认值为 `relative`。

  - `relative` 是默认值，指的是相对定位；
  - `absolute` 是绝对定位，以元素的容器作为参考系；
  - `fixed` 保证元素在页面窗口中的对应位置显示；
  - `sticky` 指的是仅当元素滚动到页面之外时，元素会固定在页面窗口的顶部。

- `top {number}`：距离上方的偏移量，默认为 0。
- `bottom {number}`：距离下方的偏移量，默认为 0。
- `left {number}`：距离左方的偏移量，默认为 0。
- `right {number}`：距离右方的偏移量，默认为 0。

**注意：**

1. Weex 目前不支持 `z-index` 设置元素层级关系，但靠后的元素层级更高，因此，对于层级高的元素，可将其排列在后面。
2. 如果定位元素超过容器边界，在 Android 下，超出部分将**不可见**，原因在于 Android 端元素 `overflow` 默认值为 `hidden`，但目前 Android 暂不支持设置 `overflow: visible`。

[示例](http://dotwe.org/vue/cb3436ea65283d2ab456641ba30133a4)

## Transition <Badge text="0.16+" type="warn" vertical="middle"/>

现在您可以在 CSS 中使用 `transition` 属性来提升您应用的交互性与视觉感受，`transition` 中包括布局动画，即 LayoutAnimation，现在布局产生变化的同时也能使用 `transition` 带来的流畅动画。`transition`允许 CSS 的属性值在一定的时间区间内平滑地过渡。

### 参数

- ``transition-property``：设置过渡动画的属性名，设置不同样式 `transition` 效果的键值对，默认值为空，表示不执行任何过渡效果，下表列出了所有合法的参数属性：

| 参数名             | 描述                             |
| --------------- | ------------------------------ |
| `width`          | 设置组件的宽度参与过渡动画   |
| `height`          | 设置组件的高度参与过渡动画   |
| `top`             | 设置组件的顶部距离参与过渡动画 |
| `bottom`          | 设置组件的底部距离参与过渡动画 |
| `left`            | 设置组件的左侧距离参与过渡动画 |
| `right`           | 设置组件的右侧距离参与过渡动画 |
| `background-color` | 设置组件的背景颜色参与过渡动画 |
| `opacity`         | 设置组件的不透明度参与过渡动画 |
| `transform`       | 设置组件的变换类型参与过渡动画 |

- `transition-duration`：指定过渡的持续时间 (单位是毫秒)，默认值是 `0`，表示没有动画效果。

- `transition-delay`：指定请求过渡操作到执行过渡之间的时间间隔 (单位是毫秒或者秒)，默认值是 `0`，表示没有延迟，在请求后立即执行过渡。

- `transition-timing-function`：描述过渡执行的速度曲线，用于使过渡更为平滑。默认值是 `ease`。下表列出了所有合法的属性：

| 属性名                            | 描述                                       |
| ------------------------------ | ---------------------------------------- |
| ease                         | transition 过渡逐渐变慢的过渡效果                    |
| ease-in                      | transition 过渡慢速开始，然后变快的过渡效果               |
| ease-out                     | transition 过渡快速开始，然后变慢的过渡效果               |
| ease-in-out                  | transition 过渡慢速开始，然后变快，然后慢速结束的过渡效果        |
| linear                       | transition 过渡以匀速变化                        |
| cubic-bezier(x1, y1, x2, y2) | 使用三阶贝塞尔函数中自定义 transition 变化过程，函数的参数值必须处于 0 到 1 之间。更多关于三次贝塞尔的信息请参阅 [cubic-bezier](http://cubic-bezier.com/) 和 [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). |

### 示例

```html
<style scoped>
  .panel {
    margin: 10px;
    top:10px;
    align-items: center;
    justify-content: center;
    border: solid;
    border-radius: 10px;
    transition-property: width, height, background-color;
    transition-duration: 0.3s;
    transition-delay: 0s;
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1.0);
  }
</style>
```

## Transform
::: tip
除了`perspective`和`transform-origin`，`transition`支持了`transform`的全部能力。
:::

目前支持的 transform 声明格式:

- `translateX({<length/percentage>})`：X 轴方向平移，支持长度单位或百分比。
- `translateY({<length/percentage>})`：Y 轴方向平移，支持长度单位或百分比。
- `translate({<length/percentage>} {<length/percentage>})`：X 轴和 Y 轴方向同时平移，`translateX` + `translateY` 简写。
- `scaleX(<number>)`：X 轴方向缩放，值为数值，表示缩放比例，**不支持百分比**。
- `scaleY(<number>)`：Y 轴方向缩放，值为数值，表示缩放比例，**不支持百分比**。
- `scale(<number>)`：X 轴和 Y 轴方向同时缩放，`scaleX` + `scaleY` 简写。
- `rotate(<angle/degree>)`：将元素围绕一个定点（由 `transform-origin` 属性指定）旋转而不变形的转换。指定的角度定义了旋转的量度。若角度为正，则顺时针方向旋转，否则逆时针方向旋转。
- `rotateX(<angle/degree>)`<Badge text="0.14+" type="warn" vertical="middle"/>：X 轴方向的旋转。
- `rotateY(<angle/degree>)`<Badge text="0.14+" type="warn" vertical="middle"/>：Y 轴方向的旋转。
- `perspective(<length>)`<Badge text="0.16+" type="warn" vertical="middle"/>：指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。z>0 的三维元素比正常大，而 z<0 时则比正常小，大小程度由该属性的值决定。**Android 4.1及以上版本支持**。详情可参考 [MDN 介绍](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)。
- `transform-origin {length/percentage/关键字(top/left/right/bottom)}:`：设置一个元素变形的原点，**仅支持 2D 坐标**。

### 示例

```HTML
<template>
  <div class="wrapper">
    <div class="transform">
     <text class="title">Transformed element</text>
    </div>
  </div>
</template>

<style>
  .transform {
    align-items: center;
    transform: translate(150px, 200px) rotate(20deg);
    transform-origin: 0 -250px;
    border-color:red;
    border-width:2px;
  }
  .title {font-size: 48px;}
</style>
```

::: warning
在 native 端，给组件设置 `transform` 变换后，如果需要恢复原效果，不能直接删除对应的 `transform` 属性，而需要重新设置一个 `transform` 将元素变换恢复。可对比以下两个示例：

- [手动恢复](http://dotwe.org/vue/2c800bd791ce68860981bb6f611ce2aa)
- [直接删除 transform](http://dotwe.org/vue/020c00fd633711107fd2b3cedd5018db)
:::

## 伪类 <Badge text="0.9.5" type="warn" vertical="middle"/>

Weex 支持四种伪类：`active`, `focus`, `disabled`, `enabled`

所有组件都支持 `active`, 但只有 `input` 组件和 `textarea` 组件支持 `focus`, `enabled`, `disabled`。

### 规则

- 同时生效的时候，优先级高覆盖优先级低

   - 例如：`input:active:enabled` 和 `input:active` 同时生效，前者覆盖后者

- 互联规则如下所示

  ![rule](https://img.alicdn.com/tfs/TB1nRs0nY2pK1RjSZFsXXaNlXXa-400-205.png)

[示例](http://dotwe.org/vue/df2c8f254620d6d30d0906ee75fe5b99)

## 线性渐变 <Badge text="0.10+" type="warn" vertical="middle"/>

Weex 支持线性渐变背景，具体介绍可参考 [CSS 渐变介绍](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Using_CSS_gradients)。

所有组件均支持线性渐变。

### 使用

你可以通过 `background-image` 属性创建线性渐变。

```css
background-image: linear-gradient(to top, #a80077, #66ff00);
```

目前暂不支持 `radial-gradient`（径向渐变）。

Weex 目前只支持两种颜色的渐变，渐变方向如下：

- `to right`：从左向右渐变
- `to left`：从右向左渐变
- `to bottom`：从上到下渐变
- `to top`：从下到上渐变
- `to bottom right`：从左上角到右下角
- `to top left`：从右下角到左上角

::: warning
- `background-image` 优先级高于 `background-color`，这意味着同时设置 `background-image` 和 `background-color`，`background-color` 被覆盖。
- `background` 不支持简写。
:::

[示例](http://dotwe.org/vue/5ca46fdb8520e5a1255533d390d41f63)

## 阴影(box-shadow) <Badge text="0.11+" type="warn" vertical="middle"/>

Weex 支持 `box-shadow` 属性用于设置元素阴影。

### 注意

::: warning
- 目前仅 iOS 支持 `box-shadow` 属性，Android 暂不支持，可以使用图片代替。
- 每个元素只支持设置一个阴影效果，不支持多个阴影同时作用于一个元素。
:::

### 参数

- `inset`（可选）

  默认阴影在边框外。使用 `inset` 后，阴影在边框内（即使是透明边框），背景之上内容之下。

- `<offset-x>`

  `px` 单位长度值，用来设置阴影偏移量。`<offset-x>` 设置水平偏移量，如果是负值则阴影位于元素左边。 `<offset-y>` 设置垂直偏移量，如果是负值则阴影位于元素上面。如果两者都是 0，那么阴影位于元素后面。这时如果设置了 `<blur-radius>` 或 `<spread-radius>` 则有模糊效果。

- `<offset-y>`

  `px` 单位长度值，用来设置阴影偏移量。`<offset-x>` 设置水平偏移量，如果是负值则阴影位于元素左边。 `<offset-y>` 设置垂直偏移量，如果是负值则阴影位于元素上面。如果两者都是 0，那么阴影位于元素后面。这时如果设置了 `<blur-radius>` 或 `<spread-radius>` 则有模糊效果。

- `<blur-radius>`

  设置模糊半径，`px` 单位长度值，值越大，模糊面积越大，阴影就越大越淡。不能为负值。默认为0，此时阴影边缘锐利。

- `<color>`

  设置阴影颜色，可参考 [CSS 颜色单位](./css-units.html#css-颜色单位)。

[示例](http://dotwe.org/vue/bc0324f47ea425f89d0e5102801ee856)

## 其他基本样式

- `opacity {number}`：取值范围为 [0, 1] 区间。默认值是 1，即完全不透明；0 是完全透明；0.5 是 50% 的透明度。
- `background-color {color}`：设定元素的背景色，可选值为色值，支持RGB（ `rgb(255, 0, 0)` ）；RGBA（ `rgba(255, 0, 0, 0.5)` ）；十六进制（ `#ff0000` ）；精简写法的十六进制（ `#f00` ）；色值关键字（`red`），默认值是 `transparent` 。

**注意：** [色值的关键字列表](./css-units.html#颜色关键字列表)。

## 上手样式

如果对于样式写法需要更多上手参考，可参考每个组件的文档中，都有常见的例子可供参考。

你可以按照以下步骤来规划 Weex 页面的样式。

1. 全局样式规划：将整个页面分割成合适的模块。
2. flex 布局：排列和对齐页面模块。
3. 定位盒子：定位并设置偏移量。
4. 细节样式处理：增加特定的具体样式。
