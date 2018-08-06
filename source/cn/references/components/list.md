---
title: <list>
type: references
group: 内置组件
order: 8.07
version: 2.1
---

# &lt;list&gt;

`<list>` 组件是提供垂直列表功能的核心组件，拥有平滑的滚动和高效的内存管理，非常适合用于长列表的展示。最简单的使用方法是在 `<list>` 标签内使用一组由简单数组 `repeat` 生成的 `<cell>` 标签填充。

## 子组件

`<list>` 组件支持更多高级功能，由以下子组件提供：

- `<cell>`

  用于定义列表中的子列表项，类似于 HTML 中的 `ul` 之于 `li`。Weex 会对 `<cell>` 进行高效的内存回收以达到更好的性能。

  使用文档请查看 [`<cell>`](./cell.html)。

- `header` <sup class="wx-v">0.6.1+</sup>

  当 `<header>` 到达屏幕顶部时，吸附在屏幕顶部。

- `<refresh>`

  用于给列表添加下拉刷新的功能。

  使用文档请查看 [`<refresh>`](./refresh.html)

- `<loading>`

  `<loading>` 用法与特性和 `<refresh>` 类似，用于给列表添加上拉加载更多的功能。

  使用文档请查看 [`<loading>`](./loading.html)

**注意：**

`<list>` 的子组件只能包括以上四种组件或是 `fix` 定位的组件，其他形式的组件将不能被正确的渲染。

## 特性
- `show-scrollbar {boolean}`：可选值为 true/ false，默认值为 true。控制是否出现滚动条。
- `loadmoreoffset {number}`：默认值为 0，触发 `loadmore` 事件所需要的垂直偏移距离（设备屏幕底部与 `<list>` 底部之间的距离）。当 `<list>` 的滚动条滚动到足够接近 `<list>` 底部时将会触发 `loadmore` 这个事件。
- `offset-accuracy {number}` <sup class="wx-v">0.11+</sup>：控制`onscroll`事件触发的频率，默认值为10，表示两次`onscroll`事件之间列表至少滚动了10px。注意，将该值设置为较小的数值会提高滚动事件采样的精度，但同时也会降低页面的性能。
-  `pagingEnabled {boolean}`：可选值为 true/ false，默认值为 false。控制是否每次滚动一个cell，并最终定位在元素中心位置，类似垂直的viewpage交互。则对应 `0`<span class="api-version">v0.20+</span>.[pagingEnabled示例]（http://dotwe.org/vue/1323c218072f17f10e14a5c336dac3c4）

  ![mobile_preview](../images/list_4.jpg)
  
## 样式

- 通用样式：支持所有通用样式

  - 盒模型
  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](/cn/wiki/common-styles.html)

## 事件

- `loadmore` <sup class="wx-v">0.5+</sup>：如果列表滚动到底部将会立即触发这个事件，你可以在这个事件的处理函数中加载下一页的列表项。
- `scroll` <sup class="wx-v">0.11+</sup>: 列表发生滚动时将会触发该事件，事件的默认抽样率为10px，即列表每滚动10px触发一次，可通过属性`offset-accuracy`设置抽样率。

  事件中 event 对象属性：
  - `contentSize {Object}`：列表的内容尺寸
    - `width {number}`: 列表内容宽度
    - `height {number}`: 列表内容高度
  - `contentOffset {Object}`: 列表的偏移尺寸
    - `x {number}`: x轴上的偏移量
    - `y {number}`: y轴上的偏移量
    
    [简单示例](http://dotwe.org/vue/edd19cdf2f03fbe857b76fadd65a08c3)

    ![mobile_preview](../images/list_demo.jpg)

    [滑动加载示例](http://dotwe.org/vue/2170622cc99895e5ad6af89d06355b84)

    [头部sticky示例](http://dotwe.org/vue/2ecfe0a1c7b820c9d9c9965e1a8cde19)

    [cell appear事件](http://dotwe.org/vue/ce0e953112b132e5897725b3149f3924)

- 通用事件

  支持所有通用事件：

  - `click`
  - `longpress`
  - `appear`
  - `disappear`

  查看 [通用事件](/cn/wiki/common-events.html)

## 扩展

### scrollToElement(node, options)

滚动到列表某个指定项是常见需求，`<list>` 拓展了该功能支持滚动到指定 `<cell>`。通过 `dom` module 访问，更多信息可参考 [dom module](../modules/dom.html) 。

### resetLoadmore() <sup class="wx-v">0.9+</sup>
在默认情况下，触发`loadmore`事件后，如果列表中内容没有发生变更，则下一次滚动到列表末尾时将不会再次触发`loadmore`事件，你可以通过调用`resetLoadmore()`方法来打破这一限制，调用该方法后，下一次滚动到列表末尾时将强制触发`loadmore`。

#### 参数

- `node {node}`：指定目标节点。
- `options {Object}`：
  - `offset {number}`：一个到其可见位置的偏移距离，默认是 0

## 约束

1. **不允许**相同方向的 `<list>` 或者 `<scroller>` 互相嵌套，换句话说就是嵌套的 `<list>`/`<scroller>` 必须是不同的方向。

  举个例子，**不允许**一个垂直方向的 `<list>` 嵌套的一个垂直方向的 `<scroller>` 中，但是一个垂直方向的 `<list>` 是可以嵌套的一个水平方向的 list 或者 `<scroller>` 中的。

2. `<list>` 为根节点时无需设置高度，但是内嵌 `<list>` 高度**必须可计算**，你可以使用 `flex` 或 `postion` 将 `<list>` 设为一个响应式高度（例如全屏显示）, 也可以显式设置 `<list>` 组件的 `height` 样式。

## 示例

[滑动加载](http://dotwe.org/vue/d31c85e7cd2dc54fa098e920a5376c38)
