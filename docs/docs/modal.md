---
pageClass: page-module-modal
---
# modal
`modal` 模块提供了以下展示消息框的 API：`toast`、`alert`、`confirm` 和 `prompt`。

## API
### modal.toast(options)
`toast()` 会在一个小浮层里展示关于某个操作的简单反馈。例如，在邮件发送前离开邮件编辑界面，可以触发一个“草稿已保存”的 toast，告知用户以后可以继续编辑。toast 会在显示一段时间之后自动消失。

``` js{2}
var modal = weex.requireModule('modal')
modal.toast({
  message: 'This is a toast',
  duration: 0.3
})
```

| 参数        | 说明                | 类型   | 默认值  |
| ---------- | -------------      | -----  | ----- |
| options.message    | 展示的内容           | string | -     |
| options.duration   | 持续时间（以秒为单位） | number | 0.8   |
::: warning 参数duration
* Android: 如果时间长度大于3s，将使用一个被称为**LONG**的系统变量，否则使用**SHORT**这个系统变量
* iOS: 持续的时间与duration相同
:::

### modal.alert(options, callback)
警告框经常用于确保用户可以得到某些信息。当警告框出现后，用户需要点击确定按钮才能继续进行操作。

``` js{2}
var modal = weex.requireModule('modal')
modal.alert({
  message: 'This is a alert',
  okTitle: '确认'
}, function () {
  console.log('alert callback')
})
```


| 参数        | 说明                | 类型   | 默认值  |
| ---------- | -------------      | -----  | ----- |
| options.message    | 警告框内显示的文字信息 | string | -     |
| options.okTitle   | 确认按钮上显示的文字信息 | string | OK   |
| callback   | 用户操作完成后的回调 | function | -   |

### modal.confirm(options, callback)
确认框用于使用户可以验证或者接受某些信息。当确认框出现后，用户需要点击确定或者取消按钮才能继续进行操作。

``` js{2}
var modal = weex.requireModule('modal')
modal.confirm({
  message: 'Do you confirm ?',
  okTitle: '确认',
  cancelTitle: '取消'
}, function (value) {
  console.log('confirm callback', value)
})
```

| 参数        | 说明                | 类型   | 默认值  |
| ---------- | -------------      | -----  | ----- |
| options.message    | 警告框内显示的文字信息 | string | -     |
| options.okTitle   | 确认按钮上显示的文字信息 | string | OK   |
| options.cancelTitle | 取消按钮上显示的文字信息 | string | Cancel |
| callback   | 用户操作完成后的回调，参数 `res` 是按下按钮上的文字信息 | function(res)  |  -  |

### modal.prompt(options, callback)
提示框经常用于提示用户在进入页面前输入某个值。当提示框出现后，用户需要输入某个值，然后点击确认或取消按钮才能继续操作。

``` js{2}
var modal = weex.requireModule('modal')
modal.confirm({
  message: 'Do you confirm ?',
  okTitle: '确认',
  cancelTitle: '取消'
}, function (value) {
  console.log('confirm callback', value)
})
```

| 参数        | 说明                | 类型   | 默认值  |
| ---------- | -------------      | -----  | ----- |
| options.message    | 警告框内显示的文字信息 | string | -     |
| options.okTitle   | 确认按钮上显示的文字信息 | string | OK   |
| options.cancelTitle | 取消按钮上显示的文字信息 | string | Cancel |
| callback   | 用户操作完成后的回调<ul><li>`res.result`：用户按下的按钮上的文字信息</li><li>`res.data`：用户输入的文字信息</li></ul>| function(res)  |  -  |

## Demo
[基本用法](http://dotwe.org/vue/4be1c3b956fe0b5628388c34c2ca6320)
<IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1lR8cogHqK1RjSZFkXXX.WFXa-544-960.gif" />