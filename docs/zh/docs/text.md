# &lt;text&gt;

`<text>` 用来将文本按照指定的样式渲染出来。**`<text>` 只能包含文本，不支持其他子组件**，和 Vue 一样，你可以使用“Mustache”语法 (双大括号)  `{{}}` 进行文本插值，当数据改变时，插值处的内容会自动更新。


::: warning 注意
- 所有文本内容都必须放在 `<text>` 中，不能放在 `<div>` 等其他组件中。
- `<text>` 里直接写文本头尾空白会被过滤，如果需要保留头尾空白，暂时只能通过数据绑定写头尾空格。
:::

```html
<template>
  <div class="wrapper">
    <text class="text" >Weex 是一套简单易用的跨平台开发方案，能以 Web 的开发体验构建高性能、可扩展的原生应用。</text>
    <text class="text ellipsis">{{enText}}</text>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        enText: 'Weex is an cross-platform development solution that builds high-performance, scalable native applications with a Web development experience. '
      }
    }
  }
</script>
```

[示例](http://dotwe.org/vue/808aa57e344eb7a9b7012a8540efae9f)

## 子组件

`<text>` 不支持子组件。

## 属性

| 参数        | 说明                | 类型   | 默认值 |
| ---------- | -------------      | -----  | ----- |
| `value` | 文本内容，可直接将文本内容置于在 `<text>` 标签中 | string | - |

## 样式

除通用的样式外，`<text>` 还支持文本样式，其表现与 CSS 文本样式相同相同：

- 支持 `color` 样式。
- 支持 `font-size` 样式，默认值为 32。
- 支持 `font-style` 样式。
- 支持 `font-weight` 样式。
- 支持 `text-align` 样式。
- 支持 `text-decoration` 样式。
- 支持 `text-overflow` 样式。
- 支持 `line-height` 样式。

此外，`<text>` 还支持限制行数的样式 `lines`:

`lines {number}`: 指定文本行数，默认值是 0，代表不限制行数。

### 自定义字体

在 Weex 0.12 以上版本支持 `ttf` 和 `woff` 字体格式的自定义字体, 可以通过调用 `dom.addRule()` 方法, 构建自定义的 `font-family` 使用, `dom.addRule()` 建议在 `beforeCreate` 或者更早时调用。

```html
<template>
  <div style='flex-direction:row;margin-top:50px'>
    <text style='font-family:iconfont;font-size:80;color:blue'>&#xe603;</text>
    <text style='font-family:iconfont;font-size:80;color:green'>&#xe60c;&#xe62f;</text>
  </div>
</template>

<script>
  const domModule = weex.requireModule('dom');

  export default {
    beforeCreate: function() {
      //目前支持ttf、woff文件，不支持svg、eot类型,moreItem at http://www.iconfont.cn/
      domModule.addRule('fontFace', {
        'fontFamily': "iconfont",
        'src': "url('http://at.alicdn.com/t/font_522989_pchx71aqjd.ttf')"
      });
    }
  }
</script>
```

## Demo


- [自定义字体](http://dotwe.org/vue/6062cf0121e0dae5d05c7033ee93a5dc)

  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1aQM4n3DqK1RjSZSyXXaxEVXa-750-1334.png" />

- [热门动画列表](http://dotwe.org/vue/892bd1c977b61762baca8e02a65b6d97)，常见的图文混排场景，限制行数，设置文本多种样式等效果。

  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1.Bg6nZbpK1RjSZFyXXX_qFXa-750-1334.gif" />

- [Ocean](http://dotwe.org/vue/bf65efdb828c1c4e5613a0e7a6f7ee57)，场景的文章详情页，使用 `<text>` 文本样式渲染文章标题和正文。

  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1YqM9n9zqK1RjSZFHXXb3CpXa-750-1334.gif" />

- [聊天窗口](http://dotwe.org/vue/695ee4cba19d4d9c4dc845e113710dbc)，结合 `flex` 实现复杂的排版效果。

  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB11_g_n7voK1RjSZPfXXXPKFXa-264-439.gif" />