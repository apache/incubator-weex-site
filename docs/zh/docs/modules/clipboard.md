# clipboard

该模块提供的接口可以用于获取、设置剪切板内容，目前只支持字符串类型。

::: tip
* 只支持字符串类型。
* 只能在 iOS 和 Android 平台上生效。
:::

# API

## getString

从系统剪贴板获取内容

#### getString(callback)

* **@callback**，回调函数会返回 data，即字符串内容。

## setString

向系统剪贴板设置内容

#### setString(text)

* **@text**，要设置的文本。

[Demo](http://dotwe.org/vue/126d3cfc5533393e28943978b07aa5c1)
