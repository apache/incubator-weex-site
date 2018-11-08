# &lt;refresh&gt;
`<refresh>` 为容器提供下拉刷新功能。

::: warning 注意
* `<refresh>` 是 `<scroller>`、`<list>`、`<waterfall>` 的子组件，只能在被它们包含时才能被正确渲染。
:::

```vue{2}
<scroller>
  <refresh>
    <text>Refreshing...</text>
  </refresh>
  <div v-for="num in lists">
    <text>{{num}}</text>
  </div>
</scroller>
```

## 子组件
* 诸如 `<text>`、`<image>` 之类的任何组件，都可以放到 `<loading>` 进行渲染。
* 特殊子组件 `<loading-indicator>`: 只能作为 `<refresh>` 和 `<loading>` 的子组件使用，拥有默认的动画效果实现。
```vue{3}
<refresh>
  <text>Refreshing</text>
  <loading-indicator></loading-indicator>
</refresh>
```

## 属性
* `display`  
  控制 `<refresh>` 组件显示、隐藏。`display` 的设置必须成对出现，即设置 `display="show"`,必须有对应的 `display="hide"`。可选值为 `show / hide`，默认值为 `show`。

## 事件
* `refresh` 事件：当 `<scroller>`、`<list>`、`<waterfall>` 被下拉完成时触发。
* `pullingdown` 事件：当 `<scroller>`、`<list>`、`<waterfall>` 被下拉时触发。
  可以从 `event` 参数对象中获取以下数据：
  * `dy`: 前后两次回调滑动距离的差值
  * `pullingDistance`: 下拉的距离
  * `viewHeight`: refresh 组件高度
  * `type`: “pullingdown” 常数字符串

```vue
<refresh @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
  <text>Refreshing ...</text>
  <loading-indicator></loading-indicator>
</refresh>
```

## Demo
[基本用法](http://dotwe.org/vue/fccb7c6b9a9f4b7b1f3f7518344cf1bb)
<IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1EMM7nYvpK1RjSZPiXXbmwXXa-1242-2208.png" />