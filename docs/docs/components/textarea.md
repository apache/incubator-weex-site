# &lt;textarea&gt;

`<textarea>` 与 [`<input>`](./input.md) 组件类似，可用于接受用户输入数据，只不过 `<textarea>` 支持多行文本输入。 `<textarea>` 支持 `<input>` 支持的所有的事件。

```html
<template>
  <div class="wrapper">
    <textarea class="textarea" v-model="msg" placeholder="请输入内容."></textarea>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        msg: ''
      }
    }
  }
</script>
```

## 子组件

`<textarea>` 不支持子组件。

## 属性

| 参数        | 说明                | 类型   | 默认值 |
| ---------- | -------------      | -----  | ----- |
| `value` | 指定 `<textarea>` 的默认值 | string | - |
| `placeholder` | 指定 `<textarea>` 的默认提示文案 | string | - |
| `rows` | 指定组件的高度 | number | 2 |

::: warning 注意
当使用 `v-model` 指令绑定数据时，`value` 属性不生效，你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。详情可参考 [Vue 表单输入绑定](https://cn.vuejs.org/v2/guide/forms.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95)
:::

## 样式

除通用的样式外，`<textarea>` 还支持文本样式，其表现与 CSS 文本样式相同相同：

- 支持 `color` 样式。
- 支持 `font-size` 样式，默认值为 32。
- 支持 `font-style` 样式。
- 支持 `font-weight` 样式。
- 支持 `text-align` 样式。

此外，`<textarea>` 还支持以下伪类:

- `active`
- `focus`
- `disabled`
- `enabled`

## 事件

`<textarea>` 支持的事件与 `<input>` 一致：

- input 事件

  当输入字符时触发。 事件中 `Event` 对象有以下属性:

  | 属性        | 说明           | 类型   |
  | ---------- | ------------- | -----  |
  | `value` | 当前组件的值 | string |
  | `timestamp` | 事件发生时的时间戳，仅支持 Android。 | string |

- change 事件

  当用户输入完成时触发。通常在 blur 事件之后。事件中 `Event` 对象有以下属性:

  | 属性        | 说明           | 类型   |
  | ---------- | ------------- | -----  |
  | `value` | 当前组件的值 | string |
  | `timestamp` | 事件发生时的时间戳，仅支持 Android。 | string |

- focus 事件

  组件获得输入焦点。事件中 `Event` 对象有以下属性:

  | 属性        | 说明           | 类型   |
  | ---------- | ------------- | -----  |
  | `timestamp` | 事件发生时的时间戳，仅支持 Android。 | string |

- blur 事件

  组件失去输入焦点。事件中 `Event` 对象有以下属性:

  | 属性        | 说明           | 类型   |
  | ---------- | ------------- | -----  |
  | `timestamp` | 事件发生时的时间戳，仅支持 Android。 | string |

- return 事件

  键盘点击返回键时触发。事件中 `Event` 对象有以下属性:

  | 属性        | 说明           | 类型   |
  | ---------- | ------------- | -----  |
  | `value` | 当前组件的值 | string |
  | `returnKeyType` | 事件发生时的返回键类型 | string |

::: warning 注意
`<textarea>` 不支持 `click` 事件。 请监听 `input` 或 `change` 事件代替。
:::

## Demo

- [双向绑定](http://dotwe.org/vue/d884b0c18891a05d653253c0f0a94bc1)
- [事件监听](http://dotwe.org/vue/4e2ba256d993ec2186c388e9d80157ea)
- [创建文章](http://dotwe.org/vue/6dd65122144d9ad26594c0f900c75cd4)，`<textarea>` 常用于提交大量文本数据。

  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1UWA7n4TpK1RjSZFGXXcHqFXa-750-1334.gif" />
