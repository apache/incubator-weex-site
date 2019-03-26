# modal

`modal` 模块提供了以下展示消息框的 API：`toast`、`alert`、`confirm` 和 `prompt`。

# API

## toast

`toast()` 会在一个小浮层里展示关于某个操作的简单反馈。例如，在邮件发送前离开邮件编辑界面，可以触发一个“草稿已保存”的 toast，告知用户以后可以继续编辑。toast 会在显示一段时间之后自动消失。

#### toast(options)

* **@options**
  * **`message`**, string, 展示的内容.
  * **`duration`**, number, 持续时间（以秒为单位）

::: tip
* Android: 如果时间长度大于3s，将使用一个被称为**LONG**的系统变量，否则使用**SHORT**这个系统变量
* iOS: 持续的时间与duration相同
:::

```javascript
var modal = weex.requireModule('modal')
modal.toast({
    message: 'This is a toast',
    duration: 0.3
})
```

## alert

警告框经常用于确保用户可以得到某些信息。当警告框出现后，用户需要点击确定按钮才能继续进行操作。

#### alert(options, callback)

* **@options**
  * **`message`**, string，警告框内显示的文字信息
  * **`okTitle`**, string，确认按钮上显示的文字信息
* **@callback**, function，用户操作完成后的回调

```javascript
var modal = weex.requireModule('modal')
modal.alert({
  message: 'This is a alert',
  okTitle: '确认'
}, function () {
  console.log('alert callback')
})
```

## confirm

确认框用于使用户可以验证或者接受某些信息。当确认框出现后，用户需要点击确定或者取消按钮才能继续进行操作。

#### confirm(options, callback)

* **@options**
  * **`message`**, string，警告框内显示的文字信息
  * **`okTitle`**, string，确认按钮上显示的文字信息
  * **`cancelTitle`**, string，取消按钮上显示的文字信息
* **@callback**, function，用户操作完成后的回调，参数是按下按钮上的文字信息
  * **`result`**, string, 用户按下的按钮文字信息

```javascript
var modal = weex.requireModule('modal')
modal.confirm({
    message: 'Do you confirm ?',
    duration: 0.3
}, function (value) {
    console.log('confirm callback', value)
})
```

## prompt

提示框经常用于提示用户在进入页面前输入某个值。当提示框出现后，用户需要输入某个值，然后点击确认或取消按钮才能继续操作。

#### prompt(options, callback)

* **@options**
  * **`message`**, string，警告框内显示的文字信息
  * **`okTitle`**, string，确认按钮上显示的文字信息
  * **`cancelTitle`**, string，取消按钮上显示的文字信息
* **@callback**, function，用户操作完成后的回调<ul><li>`res.result`：用户按下的按钮上的文字信息</li><li>`res.data`：用户输入的文字信息</li></ul>

```javascript
var modal = weex.requireModule('modal')
modal.prompt({
    message: 'This is a prompt',
    duration: 0.3
}, function (value) {
    console.log('prompt callback', value)
})
```

[示例](http://dotwe.org/vue/a7dddfb24edb72be947fc4eec3803f1d)
