---
title: globalEvent
type: references
group: 内置模块
order: 9.04
version: 2.1
---

# 全局事件

<span class="weex-version">0.8</span>

`globalEvent` 用于监听持久性事件，例如定位信息，陀螺仪等的变化。全局事件是需要额外 APIs 处理的次要 API。你能通过 `addEventListener` 注册事件监听，当你不再需要的时候，也可以通过 `removeEventListener` 取消事件监听。

*提醒*

- 这是一个实例级别的事件，而非应用级别。

## 如何让你的模块支持全局事件

API 开发完成后，当需要发送事件时，需要通过以下方法：

```javascript
/**
  *
  * @param eventName eventName
  * @param params event params
  */
instance.fireGlobalEventCallback(eventName,params);
```

如何在 weex-html5 组件或模块中分发全局事件？只需在文档元素上分派事件：

```javascript
var evt = new Event('some-type')
evt.data = { foo: 'bar' }
document.dispatchEvent(evt)
```

**示例**

### Android

```java
Map<String,Object> params=new HashMap<>();
params.put("key","value");
mWXSDKInstance.fireGlobalEventCallback("geolocation",params);
```

### iOS

```object-c
[weexInstance fireGlobalEvent:@"geolocation" params:@{@"key":@"value"}];
```

## API

### `addEventListener(String eventName, String callback)`

注册全局事件。

#### 参数

- `eventName {string}`：需要监听的事件名称。
- `callback {Function}`：触发事件后的回调函数。

#### 示例

```javascript
var globalEvent = weex.requireModule('globalEvent');
globalEvent.addEventListener("geolocation", function (e) {
  console.log("get geolocation")
});
```

### `removeEventListener(String eventName)`

取消事件监听。

#### 参数

- `eventName {string}`：需要取消的事件名称。

#### 示例

```javascript
var globalEvent = weex.requireModule('globalEvent');
globalEvent.removeEventListener("geolocation");
```

## 已有的全局事件
<span class="weex-version">0.14</span>
### 应用前后事件
WeexSDK 对获取应用前后台事件做了支持，开发者可以在页面内监听对应的事件，获得应用被前后后这后台，以方便暂停音乐，视频等，只需要指定需要监听的事件名称和回调函数就可以，例如：

```
var globalEvent = weex.requireModule('globalEvent');
globalEvent.addEventListener("WXApplicationDidBecomeActiveEvent", function (e) {
  console.log("WXApplicationDidBecomeActiveEvent");
});
```
支持的事件名称

  - WXApplicationDidBecomeActiveEvent  应用被前台的时候触发
  - WXApplicationWillResignActiveEvent 应用即将被后台时候触发

在 [dotWe 上试一试](http://dotwe.org/vue/5a774e8ce3766c88038cab6fe3331f5b)

>>> 目前只有 platform 为 iOS 和 Android 才能支持。[获取当前 platform](../weex-variable.html#weex-environment-object)

