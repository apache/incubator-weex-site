---
title: modal
type: references
group: Build-in Modules
order: 9.06
version: 2.1
---

# modal

Weex provides a series of message boxes: `toast`, `alert`, `confirm` and `prompt`.

## API
### toast(options)

A toast provides simple feedback about an operation in a small popup. For example, navigating away from an email before you send it triggers a "Draft saved" toast to let you know that you can continue editing later. Toasts automatically disappear after a timeout.

#### Arguments
- `options` (object): toast options.
 - `message` (string): the text message that the toast shows.
 - `duration` (number): the duration(seconds) that the toast shows.
   - For Android: If the duration is longer than 3, it will use a system defined variable called **LONG**, otherwise it will use another variable called **SHORT**
   - For iOS: It will show the toast during the specified time.

#### Basic Usage
```
var modal = weex.requireModule('modal')
modal.toast({
    message: 'This is a toast',
    duration: 0.3
})
```


### alert(options, callback)

An alert box is often used if you want to make sure information comes through to the user.
When an alert box pops up, the user will have to click "OK" to proceed.

#### Arguments

- `options` (object): alert box options.
 - `message` (string): the text message that the alert shows.
 - `okTitle` (string): the text of positive button, default is 'OK'.
 - `callback` (function): callback when complete.
  This method has a callback function whose arguments will be:
- `result` (string): the title text of the confirm button that clicked by user.

#### Basic Usage
```
var modal = weex.requireModule('modal')
modal.alert({
    message: 'This is a alert',
    duration: 0.3
}, function (value) {
    console.log('alert callback', value)
})
```


### confirm(options, callback)
A confirm box is often used if you want the user to verify or accept something.

When a confirm box pops up, the user will have to click either confirm or cancel button to proceed.

#### Arguments
- `options` (object): confirm box options.
  - `message` (string): the message that the confirm shows.
  - `okTitle` (string): the title of confirm button, default is 'OK'.
  - `cancelTitle` (string): the title of cancel button, default is 'Cancel'.
- `callback` (function): callback when complete.

This method has a callback function whose arguments will be:
- `result`(string): the title text of the button that clicked by user.

#### Basic Usage
```
var modal = weex.requireModule('modal')
modal.confirm({
    message: 'Do you confirm ?',
    duration: 0.3
}, function (value) {
    console.log('confirm callback', value)
})
```


### prompt(options, callback)

A prompt box is often used if you want the user to input a value before entering a page.
When a prompt box pops up, the user will have to click either confirm or cancel button to proceed after entering an input value.

#### Arguments
- `options` (object): some options.
  - `message` (string): the message that the prompt shows.
  - `okTitle` (string): the title text of confirm button, default is 'OK'.
  - `cancelTitle` (string): the title text of cancel button, default is 'Cancel'.
- `callback` (function): callback when complete.
  This method has a callback function whose arguments will be:
- `ret` (object): the argument will be a object, which has attributes `result` and `data`,  like `{ result: 'OK', data: 'hello world' }`
  - `result` (string): the title of the button that clicked by user.
  - `data` (string): the value of the text that entered by user.

#### Basic Usage
```
var modal = weex.requireModule('modal')
modal.prompt({
    message: 'This is a prompt',
    duration: 0.3
}, function (value) {
    console.log('prompt callback', value)
})
```


## Example

[Modal demo](http://dotwe.org/vue/a7dddfb24edb72be947fc4eec3803f1d)
