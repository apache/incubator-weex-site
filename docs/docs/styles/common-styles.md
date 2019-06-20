# Common Styles

All of weex tags share some common style rules

::: danger
The supported styles is listed below, and some component may support custom style, which you can check in the component's doc. Except for this, other styles are not supported.
:::

::: warning
Weex only supports `px` as length unit, `%`, `rem`, `em` are not supported.
:::

## Box Model
Weex box model based on the [CSS box model](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_mode), all of weex elements can be considered as boxes.  

![](https://img.alicdn.com/tfs/TB13u.4n5rpK1RjSZFhXXXSdXXa-377-340.png)

The term "box model" is used when talking about design and layout. The box model is essentially a box that wraps around every HTML element. It consists of margins, borders, paddings, and the actual content.

::: warning
Weex only supports `box-sizing:border-box`, in which box size includes `content`, `padding` and `border-width` and excludes `margin`
:::

::: warning
* On Android, Weex only supports `overflow:hidden`.
* On iOS, Weex supports `overflow:hidden` and `overflow:visible` and by default, it is `overflow:visible`.
:::

The following code snippets shows the basic usage of box model

```html
<template>
  <div>
    <image src="..." style="width: 400; height: 200; margin-left: 20;"></image>
  </div>
</template>
```

### width
`width`: `length` type, default value `auto`

### height
`height`: `length` type, default value `auto`

### padding
`padding` specifies the space between element content and the element border. One can use shorthand for four edges or specify the padding for one edge:
  * `padding: {length}`: padding for four edges, default value `0`,
  * `padding-left {length}`:  default value `0`
  * `padding-right {length}`: default value `0`
  * `padding-top {length}`: default value `0`
  * `padding-bottom {length}`: default value `0`

### border
::: warning Only for Android
It may cause crash with exception **Unable to create layer for xxx** if the length of border exceeds the maximum as your component makes the OpenGL memory zone OutOfMemory.

The maximum of the border length is device dependent, but you are in the danger zone if the length of your border is longer than the screen height.
:::
#### border-style
The `border-style` CSS property is a shorthand property that sets the line style for all four sides of an element's border. One can use shorthand for four edges or specify the style for one edge:
  * `border-style`: values `solid` | `dashed` | `dotted`, default value `solid`
  * `border-left-style`: values `solid` | `dashed` | `dotted`, default value `solid`
  * `border-top-style`: values `solid` | `dashed` | `dotted`, default value `solid`
  * `border-right-style`: values `solid` | `dashed` | `dotted`, default value `solid`
  * `border-bottom-style`: values `solid` | `dashed` | `dotted`, default value `solid`

#### border-width
The border-width shorthand CSS property sets the widths of all four sides of an element's border. One can use shorthand for four edges or specify the width for one edge:
  * `border-width`: `length` type, non-negative, default value `0`
  * `border-left-width`: `length` type, non-negative, default value `0`
  * `border-top-width`: `length` type, non-negative, default value `0`
  * `border-right-width`: `length` type, non-negative, default value `0`
  * `border-bottom-width`: `length` type, non-negative, default value `0`

#### border-color
The border-color shorthand CSS property sets the color of all sides of an element's border. One can use shorthand for four edges or specify the color for one edge:
  * `border-color`: `color` type, default value `#000000`
  * `border-left-color`: `color` type, default value `#000000`
  * `border-top-color`: `color` type, default value `#000000`
  * `border-right-color`: `color` type, default value `#000000`
  * `border-bottom-color`: `color` type, default value `#000000`

#### border-radius
`border-radius` property rounds the corners of an element's outer border edge. One can use shorthand for four corners or specify the radius for one corner:
  * `border-radius`: `length` type, default value `0` which means the corner is a right angle.
  * `border-bottom-left-radius`: `length` type, non-negative, default value `0`
  * `border-bottom-right-radius`: `length` type, non-negative, default value `0`
  * `border-top-left-radius`: `length` type, non-negative, default value `0`
  * `border-top-right-radius`: `length` type, non-negative, default value `0`

::: danger
`border-radius` defines the radius of a quarter ellipse that defines the shape of the corner of the outer border edge by definition, but weex may not render as expected if you need a smooth transition between different `border-radius` or `border-width` on adjoining sides.
:::

::: danger Only for Android
Although `overflow:hidden` is default on Android, a view **will not** clip its children according to `border-radius` unless all the following conditions meet.
  * The view type is `div`, `a`, `cell`, `refresh` or `loading`.
  * OS version is Android 4.3 or higher.
  * OS version is **not** Android 7.0
  * A view **does not** have `background-image` property nor OS version is Android 5.0 or higher.
:::

### margin
`margin` specifies the space around elements which is outside the border. One can use shorthand for four edges or specify the margin for one edge:
  * `margin: {length}`: margin for four edges, default value `0`,
  * `margin-left {length}`: margin for left edge, default value `0`
  * `margin-right {length}`: margin for left edge, default value `0`
  * `margin-top {length}`: margin for left edge, default value `0`
  * `margin-bottom {length}`: margin for bottom edge, default value `0`

## Flexbox
Weex box style model based on the CSS flexbox, ensures that elements behave predictably and the page layout can accommodates to different screen sizes and different display devices.

Flexbox consists of flex containers and flex items. If a weex element can containing other elements, it is a flex container.

::: warning
Only styles listed below is supported, other style like  `order` and `flex-flow` are not supported.
:::

### Flex container
Flexbox is the default and only style model in Weex, so you don't have to add `display: flex;` in a container.

#### direction
The `direction` CSS property sets the direction of text, flex-container. The default value is `lrt`
* `ltr`: Text and other elements go from left to right. This is the default value.
* `rtl`: Text and other elements go from right to left.

:::tip
Thought `direction` is not part of flexbox but have huge impact on flexbox.
:::

#### flex-direction
The `flex-direction` CSS property sets how flex items are placed in the flex container defining the main axis and the direction (normal or reversed).
* `row`: The flex container's main-axis is horizontal and defined to be the same as `direction`. The **main-start** and **main-end** points are the same as the `direction`.
* `row-reverse`: Behaves the same as `row` but the **main-start** and **main-end** points are permuted
* `column`: The flex container's main-axis is vertical. The **main-start** and **main-end** points is top and bottom.
* `column-reverse`: Behaves the same as column but the **main-start** and **main-end** are permuted.

#### flex-wrap
The `flex-wrap` CSS property sets whether flex items are forced onto one line or can wrap onto multiple lines. The default value is `nowrap`

* `nowrap`:The flex items are laid out in a single line which may cause the flex container to overflow. The cross-start is either equivalent to start or before depending flex-direction value. This is the default value.
* `wrap`:The flex items break into multiple lines. The cross-start is either equivalent to start or before depending flex-direction value and the cross-end is the opposite of the specified cross-start.
* `wrap-reverse`:Behaves the same as wrap but cross-start and cross-end are permuted.

#### justify-content
The CSS `justify-content` property defines how Weex distributes space between and around content items along the main-axis of a flex container. The default value is `flex-start`.

* `flex-start`: The items are packed flush to each other toward the edge of the alignment container depending on the flex container's **main-start** side.
* `flex-end`:The items are packed flush to each other toward the edge of the alignment container depending on the flex container's **main-end** side.
* `center`:The items are packed flush to each other toward the center of the alignment container along the main axis.
* `space-between`: The items are evenly distributed within the alignment container along the main axis. The spacing between each pair of adjacent items is the same. The first item is flush with the **main-start** edge, and the last item is flush with the **main-end** edge.

  <div style="width: 400px; margin: 20px 0;">
    <img width="400px" src="https://img.alicdn.com/tfs/TB1fQRmohnaK1RjSZFBXXcW7VXa-504-270.svg" />
  </div>

#### align-items
The CSS align-items property sets the align-self value on all direct children as a group. It controls the alignment of items on the cross Axis. The default value is `stretch`.

* `stretch`: Flex items are stretched such that the cross-size of the item's margin box is the same as the line while respecting width and height constraints.
* `flex-start`: The cross-start margin edges of the flex items are flushed with the cross-start edge of the line.
* `flex-end`: The cross-end margin edges of the flex items are flushed with the cross-end edge of the line.
* `center`: The flex items' margin boxes are centered within the line on the cross-axis.
- `align-items`: values `stretch` | `flex-start` | `center` | `flex-end`, default value `stretch`

  <div style="width: 400px; margin: 20px 0;">
    <img width="400px" src="https://img.alicdn.com/tfs/TB1AM8oohnaK1RjSZFtXXbC2VXa-1018-502.jpg" />
  </div>

### Flex item
#### flex
The flex property specifies the length of the flex item, relative to the rest of the flex items inside the same container. 

If all of the flex items set `flex: 1`, they will have equal width or height on direction of flex container's `flex-direction`. If there are two flex items, with one setting `flex: 1`, and the other setting `flex: 2`, the first one will take 1/3 container space, and the second one will take 2/3 container space. If all of flex items don't set `flex`, they will be aligned depending on the container's `justify-content` property.

The following code snippet show three `div` with the same `height`

```html
    <div style="width:300px; height:100px;">
      <div style="flex: 1;background-color:blue"></div>
      <div style="flex: 1;background-color:red"></div>
      <div style="flex: 1;background-color:yellow"></div>
    </div>
```

* `flex`: `number` type, default value `0`

### Examples

* [Vertical and horizontal alignment](http://dotwe.org/vue/505b5e8bdb6774bccb597a30f74492af)
* [Grid layout](http://dotwe.org/vue/4e1dcb58b31c266c4979fcbed04bb25b)
* [The same height div](http://dotwe.org/vue/5aa2fa9a1ed5ea250e553683ca710f7a)

## Position

we can use properties below to control placement of weex tag

- `position`: values `relative` | `absolute` | `fixed` | `sticky`, default value `relative`

`relative` means the item is positioned relative to its normal position. `absolute` means the item is positioned relative to its container. `fixed` keeps the elements position fixed when the page is scrolling. `sticky` keeps elements positioned inside the viewport as "stuck" at the top or "relative" at its original place depending on whether does it about to scroll out of the view.

- `top`: `number` type, default value `0`, upward offset value
- `bottom`: `number` type, default value `0`, downward offset value
- `left`: `number` type, default value `0`, leftward offset value
- `right`: `number` type, default value `0`, rightward offset value

:::warning Only for Android
If your `component` is bigger than its parent, it will be **partial** invisible as Weex on Android only supports `overflow:hidden`.

Ref the [demo](http://dotwe.org/vue/cb3436ea65283d2ab456641ba30133a4) to see more detail.
:::

### Examples

```html
<template>
  <div style="flex-direction: column;">
    <div style="height: 3000;">
      <image src="..." style="top: 50px; left: 50px;"></image>
    </div>
    <div style="height: 3000;">
      <image src="..." style="position: sticky;"></image>
    </div>
    <div style="height: 3000;">
      <image src="..." style="position: absolute; top: 50px; left: 50px;"></image>
    </div>
  </div>
</template>
```

## Transition
Now you can use the transition attribute in CSS to enhance the interactivity and visual experience of your application. The transition includes the layout animation, that is, LayoutAnimation, which now changes the layout and uses the fluent animation of the transition. Transition allows the CSS attribute values to transition smoothly over a certain time interval.

:::warning
Supported for v0.17.0 and higher.
:::

::: warning Only for Android
It may cause crash with exception **Unable to create layer for xxx** if the size ( *width or height* ) of your component with `transition-property` exceeds the maximum as your component makes the OpenGL memory zone OutOfMemory.

The maximum of the size for your component is device dependent, but you are in the danger zone if the size is bigger than screen's size.
:::

### Property

- ``transition-property``:Allows the name of the transitional animation to set the value of the different styles transition effect, the default value is empty, that does not perform any transition, the following table lists all the legitimate parameters of the property:

| Property        | Description                              |
| --------------- | ---------------------------------------- |
| width           | The transition is performed when the width of the component is involved in the animation |
| height          | The transition is performed when the height of the component is involved in the animation |
| top             | The transition is performed when the top of the component is involved in the animation |
| bottom          | The transition is performed when the bottom of the component is involved in the animation |
| left            | The transition is performed when the left of the component is involved in the animation |
| right           | The transition is performed when the right of the component is involved in the animation |
| backgroundColor | The transition is performed when the backgroundColor of the component is involved in the animation |
| opacity         | The transition is performed when the opacity of the component is involved in the animation |
| transform       | The transition is performed when the transform of the component is involved in the animation |

- ``transition-duration``:Specifies the duration of the transition transition (in milliseconds). The default value is 0, indicating that there is no animation.

- ``transition-delay``:Specifies the time interval (in milliseconds or seconds) between the request transition transition and the transition transition. The default value is 0, indicating that there is no delay, and the transition transition is performed immediately after the request.

- ``transition-timing-function``:Describes the velocity curve of the transition transition, which is used to make the transition transition smoother. The default is ease. The following table lists all the valid attributes:

| Property                       | Description                              |
| ------------------------------ | ---------------------------------------- |
| ease                         | The transition gradually slow down the transition effect |
| ease-in                      | The transition starts slowly and then becomes faster for the transition effect |
| ease-out                     | The transition starts quickly and then slows the transition effect |
| ease-in-out                  | The transition starts slowly, then goes fast and then slowly ends the transition effect |
| linear                       | The transition changes at constant speed |
| cubic-bezier(x1, y1, x2, y2) | Using the custom transition in the third-order Bessel function, the parameter values of the function must be between 0 and 1. For more information on three times Bessel, see [cubic-bezier](http://cubic-bezier.com/) and [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). |

### Example

```html
<style scoped>
    .panel {
        margin: 10px;
        top:10px;
        align-items: center;
        justify-content: center;
        border: solid;
        border-radius: 10px;

        transition-property: width,height,backgroundColor;
        transition-duration: 0.3s;
        transition-delay: 0s;
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1.0);
    }
</style>
```

## Transform
::: warning Only for Android
It may cause crash with exception **Unable to create layer for xxx** if the size ( *width or height* ) of your component with `transform` exceeds the maximum as your component makes the OpenGL memory zone OutOfMemory.

The maximum of the size for your component is device dependent, but you are in the danger zone if the size is bigger than screen's size.
:::

:::tip
Consider use `transition` instead, which supports all the style that `transform` supports except for `transform-origin` and `perspective`
:::

The CSS **transform** property lets you modify the coordinate space of the CSS visual formatting model. Using it, elements can be translated, rotated and scaled.

Currently supported format:

* translate( {<length/percentage>} [, {<length/percentage>}]?)
* translateX( {<length/percentage>})
* translateY( {<length/percentage>})
* scale: `number`
* scaleX: `number`
* scaleY: `number`
* rotate: `degree`
* rotateX: `degree` **v0.14+**
* rotateY: `degree` **v0.14+**
* perspective: `number`, supported for Android 4.1 and above. **v0.16+**
* transform-origin: number, percentage, keyword (top/left/right/bottom)

### Example

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
    transform: translate(150px,200px) rotate(20deg);
    transform-origin: 0 -250px;
    border-color:red;
    border-width:2px;
  }
  .title {font-size: 48px;}
</style>
```


## Pseudo class <span class="api-version">v0.9.5+</span>

Weex support four pseudo-classes: `active`, `focus`, `disabled`, `enabled`

All components support `active`, but only the input component and the textarea component support `focus`, `enabled`, `diabled`.

### Rule

- the high priority override low priority when rules take effect at the same time

   - such as: "input:active:enabled" will override "input:active"

- the interconnection rule as follow

  ![rule](https://img.alicdn.com/tps/TB1KGwIPpXXXXbxXFXXXXXXXXXX-400-205.png)

### Example

```html
<template>
  <div class="wrapper">
    <image :src="logoUrl" class="logo"></image>
  </div>
</template>

<style scoped>
  .wrapper {
    align-items: center;
    margin-top: 120px;
  }
  .title {
    font-size: 48px;
  }
  .logo {
    width: 360px;
    height: 82px;
    background-color: red;
  }
  .logo:active {
    width: 180px;
    height: 82px;
    background-color: green;
  }
</style>

<script>
  export default {
    props: {
      logoUrl: {
        default: 'https://alibaba.github.io/weex/img/weex_logo_blue@3x.png'
      },
      target: {
        default: 'World'
      }
    },
    methods: {
      update (e) {
        this.target = 'Weex';
      }
    }
  };
</script>
```

[Try it](http://dotwe.org/vue/df2c8f254620d6d30d0906ee75fe5b99)

## Linear-gradient <span class="api-version">v0.10+</span>

Weex support linear-gradient background, You can see [W3C description of the gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Using_CSS_gradients).

::: warning Only for Android
It may cause crash with exception **Unable to create layer for xxx** if the size ( *width or height* ) of your component with `background-image: linear-gradient` exceeds the maximum as your component makes the OpenGL memory zone OutOfMemory.

The maximum of the size for your component is device dependent, but you are in the danger zone if the size is bigger than screen's size.
:::

### Supported components

All components in Weex support gradients

### Usage

You can use linear gradient by `background-image` property.

```css
background-image: linear-gradient(to top,#a80077,#66ff00);
```

`radial-gradient` is not currently supported, do not use it.

Weex currently supports two color gradients. The direction of the gradient is as follows:

* to right
  From left to right
* to left
  From right to left
* to bottom
  From top to bottom
* to top
  From bottom to top
* to bottom right
  From the upper left corner to the lower right corner
* to top left
  From the lower right corner to the upper left corner

### Note

- `background-image` and `background-color` are set at the same time, `background-image` precedes `background-color`.
- Do not use shorthand property such as `background`.

### Example

```html
<template>
  <scroller style="background-color: #3a3a3a">
    <div class="container1" style="background-image:linear-gradient(to right,#a80077,#66ff00);">
      <text class="direction">to right</text>
    </div>
    <div class="container1" style="background-image:linear-gradient(to left,#a80077,#66ff00);">
      <text class="direction">to left</text>
    </div>
    <div class="container1" style="background-image:linear-gradient(to bottom,#a80077,#66ff00);">
      <text class="direction">to bottom</text>
    </div>
    <div class="container1" style="background-image:linear-gradient(to top,#a80077,#66ff00);">
      <text class="direction">to top</text>
    </div>
    <div style="flex-direction: row;align-items: center;justify-content: center">
      <div class="container2" style="background-image:linear-gradient(to bottom right,#a80077,#66ff00);">
        <text class="direction">to bottom right</text>
      </div>
      <div class="container2" style="background-image:linear-gradient(to top left,#a80077,#66ff00);">
        <text class="direction">to top left</text>
      </div>
    </div>
  </scroller>
</template>
<style>
  .container1 {
    margin: 10px;
    width: 730px;
    height: 200px;
    align-items: center;
    justify-content: center;
    border: solid;
    border-radius: 10px;
  }

  .container2 {
    margin: 10px;
    width: 300px;
    height: 300px;
    align-items: center;
    justify-content: center;
    border: solid;
    border-radius: 10px;
  }

  .direction {
    font-size: 40px;
    color: white;
  }
</style>
```

## Box-shadow <span class="api-version">v0.11+</span>

Weex supports box-shadow in iOS： `inset`,`offset-x`,`offset-y`, `blur-radius`,`color`


:::danger
box-shadow takes no effect on Android
:::

### Example

```html
<template>
  <div class="wrapper">
    <div style="width:400px; height:60px;background-color: #FFE4C4; box-shadow:20px  10px rgb(255, 69, 0);">
      <text class="title" style="text-align: center">Hello {{target}}</text>
    </div>
    <div style="margin-top: 80px;width:400px; height:60px;background-color: #FFE4C4; box-shadow: 20px  10px 5px rgba(255, 69, 0, 0.8);">
      <text class="title" style="text-align: center">Hello {{target}}</text>
    </div>
    <div style="margin-top: 80px;width:400px; height:60px;background-color: #FFE4C4; box-shadow:inset 20px  10px 5px rgba(255, 69, 0, 0.8);">
      <text class="title" style="text-align: center">Hello {{target}}</text>
    </div>
    <div style="margin-top: 80px;width:400px; height:60px;background-color: #FFE4C4; box-shadow:inset 20px  10px 5px rgb(255, 69, 0);">
      <text class="title" style="text-align: center">Hello {{target}}</text>
    </div>
    <div style="margin-top: 80px;width:400px; height:60px;background-color: #FFE4C4; box-shadow:20px  10px 5px black;">
      <text class="title" style="text-align: center">Hello {{target}}</text>
    </div>
    <div style="margin-top: 80px;width:400px; height:60px;background-color: #FFE4C4; box-shadow:20px  10px 5px #008B00;">
      <text class="title" style="text-align: center">Hello {{target}}</text>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {align-items: center; margin-top: 120px;}
  .title {font-size: 48px;}
</style>

<script>
  module.exports = {
    data: function () {
      return {
        logoUrl: 'https://alibaba.github.io/weex/img/weex_logo_blue@3x.png',
        target: 'World'
      };
    }
  };
</script>
```


## Accessibility


- role: show compoent‘s role [web define](https://www.w3.org/TR/html-aria/#allowed-aria-roles-states-and-properties)
	- button 
	- input `input`compoent default role is input
	- img `image` compoent default role is image
	- link
	- search
	- tab
	- text `text`compoent default role is text
- aria-hidden :hide compoent which is unnecessary for user
- aria-label  : configure the msg after the current element is focused

### Example

```
<text class='txt' role='text' aria-label='I am a text'>text</text>

<a class='a' role='link' href='http://xxx.xxx.xxx' aria-label='I am a link'></a>


<image class='img' aria-hidden='true' role='img' src="http://xxx.png" aria-label='I am a image，but you can not see me'></image>

```


## Other Common Style
* `opacity {number}`:Set the transparency of an element or the degree to which content behind an element is visible. The {number} range is **0** to **1**, **0** for fully transparent and **1** for fully opaque.
* `background-color {color}`: Set the background color of an element. The following color format is supported.
    * RGB, e.g. `rgb(250, 0, 0)`
    * RGBA, e.g. `rgba(255, 0, 0, 0.5)`
    * Hexadecimal color e.g. `#ff0000` or `#f00`
    * Keywords, include [basic keywords](https://drafts.csswg.org/css-color-3/#html4) and [extends keywords](https://drafts.csswg.org/css-color-3/#svg-color)

::: warning Only for Android
It may cause crash with exception **Unable to create layer for xxx** if the size ( *width or height* ) of your component with `background-color` exceeds the maximum as your component makes the OpenGL memory zone OutOfMemory.

The maximum of the size for your component is device dependent, but you are in the danger zone if the size is bigger than screen's size.
:::

## Simple Step

These up-to-down steps may help you to plan the whole style of weex pages.

1. overall style: divide the whole page to different parts
2. flex alignment: align boxes in every part of page
3. position box: place box, set offset
4. element specific style: set styles for certain element if needed
