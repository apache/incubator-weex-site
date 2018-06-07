---
title: navigator
type: references
group: Build-in Modules
order: 9.07
version: 2.1
---

# Navigator 

<span class="weex-version">v0.6.1+</span>

As it's known to all that, we can navigate back and forth in the web browser using the navigation bar.
And The navigator module mimics the same behaviors in the iOS/Android application. Without such an ability, We will have to stay in the same page forever, so it is very important. Besides the navigation, the module can specify whether to apply animation or not during the transition.

## API
### push(options, callback)

Push a weex page onto the navigator stack, you can specify whether apply animation when pushing. And you can also specify a callback function to be executed after the operation is over.

**Arguments**

* options(object): some options.
  * url(string): The URL of the weex page to push.
  * animated(string): true, if the weex page is push through animation, otherwise, false. Default value is true.

* callback(object): the callback function to be called after executing this action.

**Example**

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

### pop(options, callback)

pop a weex page onto the navigator stack, you can specify whether apply animation when popping. And you can also specify a callback function to be executed after the operation is over.

**Arguments**

* options(object): some options.
  * animated(string): true if the weex page is pop through animation; otherwise, false. Default value is true.
* callback(object): the callback function after executing this action.

**Example**

```html
  	var navigator = weex.requireModule('navigator')
  	var modal = weex.requireModule('modal')
	navigator.pop({ animated: "true"
        }, event => {
          	modal.toast({ message: 'callback: ' + event })
        })
```

## Notice
Due to the differences in the behavior of the navigation in clients, the above interfaces need to be adapted. You can implement the above interfaces on the client side by seeing the description of the navigation protocol. 

In addtion，you can read [How to extend] (https://github.com/apache/incubator-weex-site/blob/master/source/guide/extend-ios.md) in iOS/Android to learn how to register  the implementation the protocol on the client.

[try it](http://dotwe.org/vue/f2daa25e32eec2a294d59a9144660cad)
