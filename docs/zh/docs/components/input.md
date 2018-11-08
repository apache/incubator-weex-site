# &lt;input&gt;

Weex 内置的 `<input>` 组件用来创建接收用户输入字符的输入组件。 `<input>` 组件的工作方式因 `type` 属性的值而异，比如 `text`， `password`，`url`，`email`，`tel` 等。

::: warning 注意
此组件不支持 `click` 事件。请监听 `input` 或 `change` 来代替 `click` 事件。
:::

## 子组件

不支持子组件。

## 属性

<style>
table td:first-child {
  white-space: nowrap;
}
.badge {
  margin-top: 10px;
}
</style>

| key                                                                         | 类型    | 描述                                                                                                              | 默认值 | 备注                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`                                                                      | string  | 控件的类型                                                                                                        | text   | type 值可以是 text，date，datetime，email， password，tel，time，url，number 。每个 type 值都符合 W3C 标准。<br /> 其中，date 和 time 会使用系统默认组件（Android + IOS）[查看示例](http://dotwe.org/vue/23ec083078356ef0e31618164e5a184b) |
| `value`                                                                     | string  | 组件的默认内容                                                                                                    |        |                                                                                                                                                                                                                                            |
| `placeholder`                                                               | string  | 提示用户可以输入什么。 提示文本不能有回车或换行                                                                   |        |                                                                                                                                                                                                                                            |
| `autofocus`                                                                 | boolean | 布尔类型的数据，表示是否在页面加载时控件自动获得输入焦点                                                          |        |                                                                                                                                                                                                                                            |
| `maxlength` <br /><Badge text="v0.7" type="warn" vertical="middle"/>        | nubmer  | 一个数值类型的值，表示输入的最大长度                                                                              |        |                                                                                                                                                                                                                                            |
| `return-key-type` <br /><Badge text="v0.11" type="warn" vertical="middle"/> | string  | 键盘返回键的类型（即手机输入法右下角回车按钮的地方）<br /><img src="https://img.alicdn.com/tfs/TB1GSs7n9zqK1RjSZFLXXcn2XXa-311-156.png" height="100px" width="200px" /> |        | 支持 defalut;go;next;search;send,done <br /> [查看示例](http://dotwe.org/vue/703c94a1db921df110a11ce33b42c0d7)                                                                                                                             |  |
| `singleline` <br /><Badge text="only android & ios" type="warning" />       | boolean | 控制内容是否只允许单行                                                                                            | true   |                                                                                                                                                                                                                                            |
| `max-length`                                                                | number  | 控制输入内容的最大长度                                                                                            |        | 字符串长度，即中英文字符长度都为 1                                                                                                                                                                                                         |
| `max`                                                                       | string  | 控制当 type 属性为 date 时选择日期的最大时间，格式为 yyyy-MM-dd                                                   |        |                                                                                                                                                                                                                                            |
| `min`                                                                       | string  | 控制当 type 属性为 date 时选择日期的最小时间，格式为 yyyy-MM-dd                                                   |        |                                                                                                                                                                                                                                            |

## 样式

#### placeholder-color {color}

placeholder 字符颜色。默认值是 `#999999`

#### 伪类

支持：

- `:active`
- `:focus`
- `:disabled`
- `:enabled`

#### 通用样式

支持所有通用样式

- 盒模型
- `flexbox` 布局
- `position`
- `opacity`
- `background-color`

查看 [组件通用样式](/guide/common-styles.html)

## 事件

#### input 事件

当输入字符时触发。 事件中 `event` 对象有以下属性:

| 属性        | 说明                                 | 类型   |
| ----------- | ------------------------------------ | ------ |
| `value`     | 当前组件的值                         | string |
| `timestamp` | 事件发生时的时间戳，仅支持 Android。 | string |

#### change 事件

当用户输入完成时触发。通常在 blur 事件之后。事件中 `event` 对象有以下属性:

| 属性        | 说明                                 | 类型   |
| ----------- | ------------------------------------ | ------ |
| `value`     | 当前组件的值                         | string |
| `timestamp` | 事件发生时的时间戳，仅支持 Android。 | string |

#### focus 事件

组件获得输入焦点。事件中 `event` 对象有以下属性:

| 属性        | 说明                                 | 类型   |
| ----------- | ------------------------------------ | ------ |
| `timestamp` | 事件发生时的时间戳，仅支持 Android。 | string |

#### blur 事件

组件失去输入焦点。事件中 `event` 对象有以下属性:

| 属性        | 说明                                 | 类型   |
| ----------- | ------------------------------------ | ------ |
| `timestamp` | 事件发生时的时间戳，仅支持 Android。 | string |

#### return 事件

键盘点击返回键时触发。事件中 `event` 对象有以下属性:

| 属性            | 说明                   | 类型   |
| --------------- | ---------------------- | ------ |
| `value`         | 当前组件的值           | string |
| `returnKeyType` | 事件发生时的返回键类型 | string |

::: warning 注意
不支持 `click` 事件。 请监听 `input` 或 `change` 事件代替。
:::

支持以下通用事件：

- longpress
- appear
- disappear

查看 [通用事件](/guide/common-events.html)

## 组件方法

#### focus() <Badge text="0.8+" type="warning" />

将 `input` 组件聚焦。

#### blur() <Badge text="0.9+" type="warning" />

从 `input` 组件中移除焦点并关闭软键盘（如果它具有焦点）。

#### setSelectionRange(selectionStart, selectionEnd) <Badge text="0.11+" type="warning" /><Badge text="only support android & ios" type="warning" />

设置文本选区

| key            | 类型   | 描述                 |
| -------------- | ------ | -------------------- |
| selectionStart | number | 设置文本选区的起始点 |
| selectionEnd   | number | 设置文本选区的起终点 |

#### getSelectionRange(function(params){}) <Badge text="0.11+" type="warning" /><Badge text="only support android & ios" type="warning" />

获取文本选区

| key                   | 类型   | 描述             |
| --------------------- | ------ | ---------------- |
| params.selectionStart | number | 文本选区的起始点 |
| params.selectionEnd   | number | 文本选区的起终点 |

#### setTextFormatter(params) <Badge text="0.18+" type="warning" /><Badge text="only support android & ios" type="warning" />

这是一个非常有用的特性，可以对 input 设置一组对输入的内容进行实时格式化的规则

| key                   | 类型   | 描述                                     |
| --------------------- | ------ | ---------------------------------------- |
| params.formatRule     | regexp | 格式化匹配的正则表达式                   |
| params.formatReplace  | regexp | 格式化匹配后用于替换的内容               |
| params.recoverRule    | regexp | 从格式化后的内容还原原始内容的正则表达式 |
| params.recoverReplace | regexp | 还原原始内容时用于替换的内容             |

- 详细用法参照 [示例(手机扫码查看)](http://dotwe.org/vue/bea3cb0cad697829d8d343552a2b7b77)

::: warning 约束
目前不支持 this.$el(id).value = '' 这种方式改写 input value。只支持在 `<input>` 组件的 input、change 事件中改写。
:::

## Demo

- [date + time 示例(手机扫码查看)](http://dotwe.org/vue/23ec083078356ef0e31618164e5a184b)

* [return-key-type 示例(手机扫码查看)](http://dotwe.org/vue/703c94a1db921df110a11ce33b42c0d7)

* [setTextFormatter 示例(手机扫码查看)](http://dotwe.org/vue/bea3cb0cad697829d8d343552a2b7b77)

* [其他示例集合](http://dotwe.org/vue/aec5342b15d3c01b3b427384a71b0874)
  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB10jc9nVzqK1RjSZFvXXcB7VXa-297-479.png" />
