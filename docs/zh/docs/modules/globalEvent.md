# globalEvent <Badge text="0.14" type="warn" vertical="middle"/>

`globalEvent` 用于监听持久性事件，例如定位信息，陀螺仪等的变化。全局事件是需要额外 APIs 处理的次要 API。

#### 内置的全局事件

WeexSDK 对获取应用前后台事件做了支持，开发者可以在页面内监听对应的事件，获得应用被前后后这后台，以方便暂停音乐，视频等，只需要指定需要监听的事件名称和回调函数就可以，例如：

```javascript
var globalEvent = weex.requireModule('globalEvent');
globalEvent.addEventListener('WXApplicationDidBecomeActiveEvent', function(e) {
  console.log('WXApplicationDidBecomeActiveEvent');
});
```

* **WXApplicationDidBecomeActiveEvent**，应用被前台的时候触发
* **WXApplicationWillResignActiveEvent**，应用即将被后台时候触发

[示例](http://dotwe.org/vue/5a774e8ce3766c88038cab6fe3331f5b)

::: warning 注意
目前只有 platform 为 iOS 和 Android 才能支持。[获取当前 platform](/zh/docs/api/weex-variable.html#weex-environment-object)
:::

#### 触发全局事件

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

注册对一个全局事件的监听。

#### addEventListener(eventName, callback)

* **@eventName**，string，事件名称。
* **@callback**，function，回调方法。

```javascript
var globalEvent = weex.requireModule('globalEvent');
globalEvent.addEventListener("geolocation", function (e) {
  console.log("get geolocation")
});
```

## removeEventListener

取消对一个全局事件的监听。

#### removeEventListener(eventName)

* **@eventName**，string，事件名称。

```javascript
var globalEvent = weex.requireModule('globalEvent');
globalEvent.removeEventListener("geolocation");
```
