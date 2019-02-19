# &lt;loading&gt;

## 简介

`<loading>` 为容器提供上拉加载功能。

::: warning 注意
* `<loading>` 是 `<scroller>`、`<list>`、`<waterfall>` 的子组件，只能在被它们包含时才能被正确渲染。
:::

```vue{5}
<scroller>
  <div v-for="num in lists">
    <text>{{num}}</text>
  </div>
  <loading>
    <text>Loading</text>
  </loading>
</scroller>
```

## 子组件
* 诸如 `<text>`、`<image>` 之类的任何组件，都可以放到 `<loading>` 进行渲染。
* 特殊子组件 `<loading-indicator>`: 只能作为 `<refresh>` 和 `<loading>` 的子组件使用，拥有默认的动画效果实现。
  ```vue{3}
  <loading>
    <text>Loading</text>
    <loading-indicator></loading-indicator>
  </loading>
  ```

## 属性
* `display`  
  控制 `<loading>` 组件显示、隐藏。`display` 的设置必须成对出现，即设置 `display="show"`,必须有对应的 `display="hide"`。可选值为 `show / hide`，默认值为 `show`。

## 事件
`loading` 事件：当 `<scroller>`、`<list>`、`<waterfall>` 被上拉完成时触发。

```vue
<loading @loading="onloading" :display="loadinging ? 'show' : 'hide'">
  <text>Loading ...</text>
  <loading-indicator></loading-indicator>
</loading>
```

## 示例
[基本用法](http://dotwe.org/vue/1c303ff427e3a92fc8ef5846c00b35e5)
<IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1QYo8n9zqK1RjSZFpXXakSXXa-1242-2208.png" />