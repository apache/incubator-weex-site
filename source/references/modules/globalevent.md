---
title: globalEvent
type: references
group: Build-in Modules
order: 9.04
version: 2.1
---

# globalEvent
<span class="weex-version">v0.8+</span>

## Summary

`globalEvent` are used to listen for persistent events, such as changes in positioning information, gyroscopes, and so on. A global event is a secondary API that requires additional APIs to work with.

You can register events via `addEventListener`, which can be removed by `removeEventListener` when you do not need to listen for `globalEvent`.

*AUCTION*
- Only instance level is not application level .

## How to make your Module support global events
API development is complete, when the event needs to be sent, the need through the following methods:

```javascript
/**
  *
  * @param eventName eventName
  * @param params event params
  */
instance.fireGlobalEventCallback(eventName,params);
```

How to dispatch a global event in a weex-html5 component or module ? Just dispatch the event on the document element:

```javascript
var evt = new Event('some-type')
evt.data = { foo: 'bar' }
document.dispatchEvent(evt)
```

### Example

#### Android

```java
Map<String,Object> params=new HashMap<>();
params.put("key","value");
mWXSDKInstance.fireGlobalEventCallback("geolocation", params);
```
#### iOS

```Objective-C
[weexInstance fireGlobalEvent:@"geolocation" params:@{@"key":@"value"}];
```

## API

### addEventListener(String eventName, String callback)

register global event.

#### Arguments

* `eventName`*(string)*: The name of the event you want to listen to.
* `callback`*(function)*: the callback function after executing this action.

#### Example

```javascript
var globalEvent = weex.requireModule('globalEvent');
globalEvent.addEventListener("geolocation", function (e) {
	console.log("get geolocation")
});
```

### removeEventListener(String eventName)

remove global event

#### Arguments

* `eventName`*(string)*: You no longer need to listen for event names.

#### Example

```javascript
var globalEvent = weex.requireModule('globalEvent');
globalEvent.removeEventListener("geolocation");
```

## Built-in global event
<span class="weex-version">0.14</span>
### background or foreground event
You can specify the event name as `WXApplicationDidBecomeActiveEvent ` or `WXApplicationWillResignActiveEvent` to obtain application becoming foreground or background, so that you can pause your video or music at this time.For example

```
var globalEvent = weex.requireModule('globalEvent');
globalEvent.addEventListener("WXApplicationDidBecomeActiveEvent", function (e) {
  console.log("WXApplicationDidBecomeActiveEvent");
});
```

- `WXApplicationDidBecomeActiveEvent`   fired while application did become foreground 
- `WXApplicationWillResignActiveEvent`  fired while application will become background

[have a try at DotWe](http://dotwe.org/vue/5a774e8ce3766c88038cab6fe3331f5b)

> this feature only works on iOS and Android platforms, it doesn't work on Web. [Obtain your weex platform on weex page](../weex-variable.html#weex-environment-object)

