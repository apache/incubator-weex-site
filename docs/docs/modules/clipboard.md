# clipboard

Clipboard allows you to use methods `getString()` and `setString()` to access the system clipboard.

Not long ago, We're still suffering from such a situation that we got a verification code sent by SMS, and we had no way to get the code from the SMS text but to typed it by our hands. How frustrated it is! But now you can enable your app to get the code from the system clipboard by calling  `clipboard.getString()` .

::: tip
* Only support text.
* Only works on Android and iOS. NOT works for html5, for web security reason.
:::

# API

## getString

Reads from clipboard.

#### getString(callback)

* **@callback**, the callback function after executing this action. `data` is the return value.

## setString

Sets the text to clipboard, having the same effect as copying manually.

#### setString(text)

* **@text**, the text.

[Demo](http://dotwe.org/vue/126d3cfc5533393e28943978b07aa5c1)
