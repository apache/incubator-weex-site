# &lt;input&gt;

## 简介

Weex 内置的 `<input>` 组件用来创建接收用户输入字符的输入组件。 `<input>` 组件的工作方式因 `type` 属性的值而异，比如 `text`， `password`，`url`，`email`，`tel` 等。

::: warning 注意
此组件不支持 `click` 事件。请监听 `input` 或 `change` 来代替 `click` 事件。
:::

## 子组件

`<input>` 不支持子组件。

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
| `maxlength` | nubmer  | 一个数值类型的值，表示输入的最大长度                                                                              |        |                                                                                                                                                                                                                                            |
| `return-key-type` | string  | 键盘返回键的类型（即手机输入法右下角回车按钮的地方）<br /><img src="https://img.alicdn.com/tfs/TB1GSs7n9zqK1RjSZFLXXcn2XXa-311-156.png" height="100px" width="200px" /> |        | 支持 defalut;go;next;search;send,done <br /> [查看示例](http://dotwe.org/vue/703c94a1db921df110a11ce33b42c0d7)                                                                                                                             |  |
| `singleline` | boolean | 控制内容是否只允许单行                                                                                            | true   |                                                                                                                                                                                                                                            |
| `max-length`                                                                | number  | 控制输入内容的最大长度                                                                                            |        | 字符串长度，即中英文字符长度都为 1                                                                                                                                                                                                         |
| `max`                                                                       | string  | 控制当 type 属性为 date 时选择日期的最大时间，格式为 yyyy-MM-dd                                                   |        |                                                                                                                                                                                                                                            |
| `min`                                                                       | string  | 控制当 type 属性为 date 时选择日期的最小时间，格式为 yyyy-MM-dd                                                   |        |                                                                                                                                                                                                                                            |
| `upriseOffset` <Badge text="v0.21+ & iOS" type="warn" vertical="middle"/> | number  | 当键盘弹起可能盖住输入框时，页面整体会上移。这个属性指定键盘上边缘与输入框下边缘的间隙。使用 iOS 系统坐标，默认是 20。 |    20    |                                                                                                                                                                                                                                            |
| `hideDoneButton` <Badge text="iOS" type="warn" vertical="middle"/> | number  | 隐藏键盘上面的完成栏 |    false    |                                                                                                                                                                                                                                            |

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

查看 [组件通用样式](/zh/docs/styles/common-styles.html)

## 事件

* **通用事件** 支持所有[通用事件](/zh/docs/events/common-events.html)。
* **input**. 当输入状态时，会不断触发。
  * @param value: 当前文本。
* **change**. 当用户完成了输入时触发。
  * @param value: 当前文本。
* **focus**. 当输入框获得焦点时触发。
* **blur**. 当输入框失去焦点时触发。
* **return**. 当用户点击了“回车”按钮时触发，会返回此时“回车”按钮的动作类型。
  * @param value: 当前文本。
  * @param returnKeyType, "default" | "go" | "next" | "search" | "send" | "done".
* **keyboard**. 当键盘弹起或收起时触发。
  * @param isShow: boolean, 显示或隐藏键盘。
  * @param keyboardSize: 键盘的尺寸，以前端使用的样式单位返回。

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

## 示例

- [date + time 示例(手机扫码查看)](http://dotwe.org/vue/23ec083078356ef0e31618164e5a184b)

* [return-key-type 示例(手机扫码查看)](http://dotwe.org/vue/703c94a1db921df110a11ce33b42c0d7)

* [setTextFormatter 示例(手机扫码查看)](http://dotwe.org/vue/bea3cb0cad697829d8d343552a2b7b77)

* [其他示例集合](http://dotwe.org/vue/aec5342b15d3c01b3b427384a71b0874)
  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB10jc9nVzqK1RjSZFvXXcB7VXa-297-479.png" />
