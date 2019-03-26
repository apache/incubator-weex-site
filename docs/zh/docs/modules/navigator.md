# navigator

众所周知，在浏览器里，我们可以通过前进或者回退按钮来切换页面，iOS/Android 的 `navigator` 模块就是用来实现类似的效果的。除了前进、回退功能，该模块还允许我们指定在切换页面的时候是否应用动画效果。

# API

## push

把一个weex页面URL压入导航堆栈中，可指定在页面跳转时是否需要动画，以及操作完成后需要执行的回调函数

#### push(options, callback)

* **@options**
  * **`url`**, string，要压入的 Weex 页面的 URL
  * **`animated`** boolean，页面压入时是否需要动画效果，默认是 “true”。
* **@callback**, 执行完该操作后的回调函数。

```javascript
var navigator = weex.requireModule('navigator')
navigator.push({
  url: 'http://dotwe.org/raw/dist/519962541fcf6acd911986357ad9c2ed.js',
  animated: "true"
}, event => {
  console.log('callback: ', event })
})
```

## pop

把一个 Weex 页面 URL 弹出导航堆栈中，可指定在页面弹出时是否需要动画，以及操作完成后需要执行的回调函数。

#### pop(options, callback)

* **@options**
  * **`animated`**, boolean，弹出页面时是否需要动画效果，默认是 “true”。
* **@callback**, 执行完该操作后的回调函数。

```javascript
var navigator = weex.requireModule('navigator')
navigator.pop({
  animated: "true"
}, event => {
  console.log('callback: ', event })
})
```
::: warning 注意
`animated` 二级参数目前仅支持字符串的 `"true"` 和 `"false"`，传入布尔值类型会导致程序崩溃，未来版本会修复这个问题
:::

[示例](http://dotwe.org/vue/5546f1dbd7537a6729cb03c687e885a8)
