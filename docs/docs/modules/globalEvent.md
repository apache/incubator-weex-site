# globalEvent <Badge text="0.14" type="warn" vertical="middle"/>

`globalEvent` are used to listen for persistent events, such as changes in positioning information, gyroscopes, and so on. A global event is a secondary API that requires additional APIs to work with.

#### Built-in global events

You can specify the event name as `WXApplicationDidBecomeActiveEvent ` or `WXApplicationWillResignActiveEvent` to obtain application becoming foreground or background, so that you can pause your video or music at this time.

```javascript
var globalEvent = weex.requireModule('globalEvent');
globalEvent.addEventListener("WXApplicationDidBecomeActiveEvent", function (e) {
  console.log("WXApplicationDidBecomeActiveEvent");
});
```

* **WXApplicationDidBecomeActiveEvent**, fired while application did become foreground 
* **WXApplicationWillResignActiveEvent**, fired while application will become background

[Demo](http://dotwe.org/vue/5a774e8ce3766c88038cab6fe3331f5b)

::: warning
This feature only works on iOS and Android platforms, it doesn't work on Web. [Obtain your weex platform on weex page](/docs/api/weex-variable.html#weex-environment-object)
::: 

#### Fire a global event

Android
```java
Map<String,Object> params=new HashMap<>();
params.put("key","value");
mWXSDKInstance.fireGlobalEventCallback("geolocation", params);
```

iOS
```Objective-C
[weexInstance fireGlobalEvent:@"geolocation" params:@{@"key":@"value"}];
```

# API

## addEventListener

Register global event.

#### addEventListener(eventName, callback)

* **@eventName**, string, the name of the event you want to listen to.
* **@callback**, function, the callback function after executing this action.

```javascript
var globalEvent = weex.requireModule('globalEvent');
globalEvent.addEventListener("geolocation", function (e) {
	console.log("get geolocation")
});
```

## removeEventListener

Remove global event

#### removeEventListener(eventName)

* **@eventName**, the event name to unregister.

```javascript
var globalEvent = weex.requireModule('globalEvent');
globalEvent.removeEventListener("geolocation");
```
