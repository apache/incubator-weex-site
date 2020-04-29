# Platform Difference with Web

Weex is a cross-platform solution. The web platform is just one of its runing environments, and it can also run on Android and iOS clients. The differences between the native platform and the web platform have some differences in functionality and development experience.

## No DOM in Weex

DOM (Document Object Model) is a concept in the Web. It is a programming interface for HTML and XML. Weex is a runtime environment that based on native applications, and native components are rendered in Android and iOS environments, not DOM Elements.

### DOM operation is not supported

The Web API is not supported, there are no objects such as `Element`, `Event`, `File`. For a detailed list, please refer to [Web APIs on MDN] (https://developer.mozilla.org/en-US/docs /Web/API). Selected elements are not supported, such as `document.getElementById` , `document.querySelector`; Of course, DOM API-based libraries (such as jQuery) are not supported.

### Limited event type

Weex supports binding events on tags, just like in browsers, but events in Weex are captured and triggered by native components. The behavior is different from the browser. The properties in the event are also difference from web.

+ Support for some event types of the web. For details, please refer to [《Common events》](../docs/events/common-events.html)。

+ It does not distinguish between the capture phase and the bubbling phase of an event, which is equivalent to a DOM level 0 event.

## No BOM in Weex

BOM (Browser Object Model) is an interface provided by the browser environment for javascript. Weex is not based on the browser runing on the native side and does not support the BOM interface provided by the browser.

### No `window` 、`screen` object

The `window` and `screen` objects in the browser are not provided in Weex and global variables are not supported. If you want to get the screen or environment information of your device, you can use the `WXEnvironment` variable.

+ `WXEnvironment`
  + `weexVersion`: WeexSDK Version.
  + `appName`: The name of application.
  + `appVersion`: The verison of application.
  + `platform`: The value maybe one of  `Web` 、`Android` 、`iOS`.
  + `osName`: The name of OS.
  + `osVersion`: The version of OS.
  + `deviceWidth`: The width of device.
  + `deviceHeight`: The height of device.

### No `document` object

In the browser, `document` indicates the currently active document model. This object is not available in Android and iOS environments, and DOM operations related to it are not supported.

### No `history` 、`location` 、`navigator` object

+ `history` The history of the current page is saved and a forward and backward action is provided.
+ `location` Recorded information about the current page URL.
+ `navigator` Recorded information in the current browser.

These interfaces are related to the implementation of the browser itself, which can control the forward and backward of the page and obtain status information. Although there are concepts of "history" and "navigation" in Android and iOS, but it is used for jumps between multiple administrative views. In other words, click "forward" and "backward" in the browser will still be in the same tab. In the native application, "forward" and "back" will actually jump to other pages.

Weex also provides the `navigator` module to manipulate page jumps. For details, please refer to [《navigation control》](../docs/modules/navigator.html).

## Ability to call mobile device native API

The mobile device native API can be called in Weex by using the registration and calling module. Some of these modules are built into Weex, such as clipboard , navigator , storage , and so on.

+ [《clipboard》](../docs/modules/clipboard.html)
+ [《navigator control》](../docs/modules/navigator.html)
+ [《storage》](../docs/modules/storage.html)

In order to maintain the versatility of the framework, Weex's built-in native modules are limited, but Weex provides the ability to extend native modules. For specific extension methods, please refer to [《iOS extend》](./extend/extend-ios.html) and[《Android extend》](./extend/extend-android.html)。

> Some interfaces also exist in the browser environment, but you should pay attention to browser compatibility when using them; for example, the clipboard function, for security reasons, most browsers restrict their use.
