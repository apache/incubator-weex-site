# Navigator 

As it's known to all that, we can navigate back and forth in the web browser using the navigation bar.
And The navigator module mimics the same behaviors in the iOS/Android application. Without such an ability, We will have to stay in the same page forever, so it is very important. Besides the navigation, the module can specify whether to apply animation or not during the transition.

# API
## push

Push a weex page onto the navigator stack, you can specify whether apply animation when pushing. And you can also specify a callback function to be executed after the operation is over.

#### push(options, callback)

* **@options**
  * **`url`**, string, the URL of the weex page to push.
  * **`animated`** boolean, if the weex page is push through animation, otherwise, false. Default value is true.
* **@callback**, the callback function to be called after executing this action.

Demo
```html
var navigator = weex.requireModule('navigator')
var modal = weex.requireModule('modal')
var bundleUrl = weex.config.bundleUrl;
navigator.push({
  url: bundleUrl,
  animated: "true"
}, event => {
  modal.toast({ message: 'callback: ' + event })
})
```

## pop

Pop a weex page onto the navigator stack, you can specify whether apply animation when popping. And you can also specify a callback function to be executed after the operation is over.

#### pop(options, callback)

* **@options**
  * **`animated`**, boolean, true if the weex page is pop through animation; otherwise, false. Default value is true.
* **@callback**, the callback function after executing this action.

Demo
```html
var navigator = weex.requireModule('navigator')
var modal = weex.requireModule('modal')
navigator.pop({ animated: "true"}, event => {
      	modal.toast({ message: 'callback: ' + event })
})
```

::: tip
Due to the differences in the behavior of the navigation in clients, the above interfaces need to be adapted. You can implement the above interfaces on the client side by seeing the description of the navigation protocol. 

In addtion，you can read [How to extend] (https://github.com/apache/incubator-weex-site/blob/master/source/guide/extend-ios.md) in iOS/Android to learn how to register  the implementation the protocol on the client.
:::

[Demo](http://dotwe.org/vue/f2daa25e32eec2a294d59a9144660cad)
