---
title: <loading>
type: references
group: 内置组件
order: 8.10
version: 2.1
---

# &lt;loading&gt;

### <span class="weex-version">v0.6.1+</span>

`<loading>` 为容器提供上拉加载功能，用法和属性与 `<refresh>` 类似。
> **注意：**`<loading>` 是 `<scroller>`、`<list>`、`<hlist>`、`<vlist>`、`<waterfall>` 的子组件，只能在被它们包含时才能被正确渲染。

 - 简单示例：

```
<list>
  ...
  ...
  <loading>
    ...
  </loading>
</list>
```
 - 查看 [完整示例](http://dotwe.org/vue/d1f0283206f66fec6549f7896e6c6164)

## 子组件

 - 诸如 `<text>`、`<image>` 之类的任何组件，都可以放到 `<loading>` 进行渲染。

 - 特殊子组件 `<loading-indicator>`: 只能作为 `<refresh>` 和 `<loading>` 的子组件使用，拥有默认的动画效果实现。

 - 简单示例：

```
<loading>
  <text>Loading</text>
  <loading-indicator></loading-indicator>
  ...
</loading>
```
 - 查看 [完整示例](http://dotwe.org/vue/d1f0283206f66fec6549f7896e6c6164)

## 属性

| 属性名           | 类型     | 值                          | 默认值     |
| ------------- | ------ | -------------------------- | ------- |
| `display` | String | show / hide             | show      |

### `display`

 - `show`：如果 `<loading>` 中包含 `<loading-indicator>`，则将其显示并开始默认动画。

 - `hide`：收起 loading view，如果 `<loading>` 中包含 `<loading-indicator>`，则将其视图隐藏。

> **注意：** `display` 的设置必须成对出现，即设置 `display="show"`,必须有对应的 `display="hide"`。

 - 简单示例：

 ```
 <template>
   <list>
     ...
     ...
     <loading @loading="onloading" :display="loadinging ? 'show' : 'hide'">
       ...
     </loading>
     ...
   </list>
 </template>

 <script>
   ...
   methods: {
     onloading (event) {
       this.loadinging = true
       setTimeout(() => {
         this.loadinging = false
       }, 2000)
     },
   }
 </script>
 ```
 - 查看 [完整示例](http://dotwe.org/vue/d1f0283206f66fec6549f7896e6c6164)

 - 支持所有通用属性。查看 [组件通用属性](../common-attrs.html)

## 样式

 - 支持所有通用样式。查看 [组件通用样式](../common-style.html)

## 事件

### `loading`

 - 当 `<scroller>`、`<list>`、`<hlist>`、`<vlist>`、`<waterfall>` 被上拉时触发。

 - 查看 [完整示例](http://dotwe.org/vue/d1f0283206f66fec6549f7896e6c6164)

## 示例

 - [完整示例](http://dotwe.org/vue/d1f0283206f66fec6549f7896e6c6164)
