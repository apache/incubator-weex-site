# &lt;waterfall&gt;

## 简介

`<waterfall>` 组件是提供瀑布流布局的核心组件。瀑布流，又称瀑布流式布局是比较流行的一种页面布局，视觉表现为参差不齐的多栏布局。随着页面滚动条向下滚动，这种布局还可以不断加载数据块并附加至当前尾部。
```vue
<template>
  <waterfall column-count="2" column-width="auto">
    <cell v-for="num in lists" >
      <text>{{num}}</text>
    </cell>
  </waterfall>
</template>
<script>
  export default {
    data () {
      return {
        lists: ['A', 'B', 'C', 'D', 'E']
      }
    }
  }
</script>

<style></style>
```

## 子组件
和 [`<list>`](./list.html)组件一样, `<waterfall>` 组件的子组件只能包括以下四种组件或是 `fix` 定位的组件，其他形式的组件将不能被正确渲染。
* [`<cell>`](./cell.html)：用于定义列表中的子列表项，类似于 HTML 中的 ul 之于 li。Weex 会对 `<cell>` 进行高效的内存回收以达到更好的性能。
* `<header>`：当 `<header>` 到达屏幕顶部时，吸附在屏幕顶部。
* [`<refresh>`](./refresh.html)：用于给列表添加下拉刷新的功能。
* [`<loading>`](./loading.html)：`<loading>` 用法与特性和 `<refresh>` 类似，用于给列表添加上拉加载更多的功能。

<div style="text-align: center"><img src="https://img.alicdn.com/tfs/TB1sa8bokvoK1RjSZFwXXciCFXa-621-678.png" width="600"></div>

## 属性
- **show-scrollbar** : `[可选]` 可选值为 true/ false，默认值为 true。控制是否出现滚动条。  `[H5无效]`
- **column-count**: `[可选]`描述瀑布流的列数
    - `auto`: 意味着列数是被其他属性所决定的(比如 column-width)
    - `<integer>`: 最佳列数，column-width 和 column-count 都指定非0值， 则 column-count 代表最大列数。
- **column-width** : `[可选]`描述瀑布流每一列的列宽
    - `auto`: 意味着列宽是被其他属性所决定的(比如 column-count)
    - `<length>`: 最佳列宽，实际的列宽可能会更宽(需要填充剩余的空间)， 或者更窄(如果剩余空间比列宽还要小)。 该值必须大于0
- **column-gap**: `[可选]`列与列的间隙. 如果指定了 `normal` ，则对应 `32`.
- **left-gap**: `[可选]`左边cell和列表的间隙. 如果未指定 ，则对应 `0` 需要 weex v0.19+.
- **right-gap**: `[可选]`右边cell和列表的间隙. 如果未指定，则对应 `0` 需要 weex v0.19+.

<div style="text-align: center"><img src="https://img.alicdn.com/tfs/TB1Mjk9n3TqK1RjSZPhXXXfOFXa-641-673.png" width="600"></div>

其他支持的属性参见 [List 组件属性部分](./list.html#%E5%B1%9E%E6%80%A7)

## 事件
支持所有通用事件：
- click：用于监听点击事件。（例如：一般绑定于子组件之上触发跳转）。
- longpress：用于监听长按事件（一般绑定于子组件之上例如：手机淘宝猜你喜欢瀑布流，长按可删除您不感兴趣的商品）。
- appear：用于监听子组件出现事件（一般绑定于子组件之上例如：监听最后一个元素出现，加载新的数据）
- disappear：用于监听子组件滑出屏幕事件（一般绑定于子组件之上）

## 示例
[体验示例](http://dotwe.org/vue/c2d4c7b54d92ac83bb2024ebbf3ccf92)

上述示例使用了4种子组件，同时点击不同的单元格，可体验 `<waterfall>` 不同属性间的区别。

[无限加载瀑布流](http://dotwe.org/vue/96dd413e3c33bca1b9203d3228aa0e80)

无限加载瀑布流，当瀑布流滑动到底部时请求新的瀑布流数据形成可无限滑动的瀑布流。可利用最后一个子组件 appear 时触发请求（例如上述示例代码），也可通过 loadmore 事件触发。


<IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1iEk9nVzqK1RjSZFCXXbbxVXa-544-960.gif" />
