# modal

Weex provides a series of message boxes: `toast`, `alert`, `confirm` and `prompt` via modal module.

# API

## toast

A toast provides simple feedback about an operation in a small popup. For example, navigating away from an email before you send it triggers a "Draft saved" toast to let you know that you can continue editing later. Toasts automatically disappear after a timeout.

#### toast(options)

* **@options**
  * **`message`**, string, the text message that the toast shows.
  * **`duration`**, number, the duration(seconds) that the toast shows.

::: tip
* For Android: If the duration is longer than 3, it will use a system defined variable called **LONG**, otherwise it will use another variable called **SHORT**
* For iOS: It will show the toast during the specified time.
:::

Demo
```javascript
var modal = weex.requireModule('modal')
modal.toast({
    message: 'This is a toast',
    duration: 0.3
})
```

## alert

An alert box is often used if you want to make sure information comes through to the user.
When an alert box pops up, the user will have to click "OK" to proceed.

#### alert(options, callback)

* **@options**
  * **`message`**, string: the text message that the alert shows.
  * **`okTitle`**, string: the text of positive button, default is 'OK'.
* **@callback**, function: callback when complete.

Demo
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

A confirm box is often used if you want the user to verify or accept something.
When a confirm box pops up, the user will have to click either confirm or cancel button to proceed.

#### confirm(options, callback)

* **@options**
  * **`message`**, string: the text message that the alert shows.
  * **`okTitle`**, string: the text of positive button, default is 'OK'.
  * **`cancelTitle`**, string, the title of cancel button, default is 'Cancel'.
* **@callback**, function: callback when complete.
  * **`result`**, string, the title text of the confirm button that clicked by user.

Demo
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

A prompt box is often used if you want the user to input a value before entering a page.
When a prompt box pops up, the user will have to click either confirm or cancel button to proceed after entering an input value.

#### prompt(options, callback)

* **@options**
  * **`message`**, string: the text message that the alert shows.
  * **`okTitle`**, string: the text of positive button, default is 'OK'.
  * **`cancelTitle`**, string, the title of cancel button, default is 'Cancel'.
* **@callback**, function: callback when complete.
  * **`ret`**, object, the argument will be an object, which contains button clicked by user or text typed by user. Attributes `result` and `data`, like `{ result: 'OK', data: 'hello world' }`

Demo
```javascript
var modal = weex.requireModule('modal')
modal.prompt({
    message: 'This is a prompt',
    duration: 0.3
}, function (value) {
    console.log('prompt callback', value)
})
```

[Modal Demos](http://dotwe.org/vue/a7dddfb24edb72be947fc4eec3803f1d)
