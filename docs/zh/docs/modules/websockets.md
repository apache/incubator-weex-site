# webSocket

`webSockets` 是一种创建持久性的连接，并进行双向数据传输的 HTTP 通信协议。Weex 提供了 `webSockets` 模块方便用户在 H5/iOS/Android 环境下与服务端创建 webSockets 链接进行通信。

::: warning 注意
h5 提供 WebSockets 的 protocol 默认实现，iOS 和 Android 需要自定义实现，Android 可参考:
- [DefaultWebSocketAdapter.java](https://github.com/apache/incubator-weex/blob/master/android/commons/src/main/java/com/alibaba/weex/commons/adapter/DefaultWebSocketAdapter.java)
- [DefaultWebSocketAdapterFactory.java](https://github.com/apache/incubator-weex/blob/master/android/commons/src/main/java/com/alibaba/weex/commons/adapter/DefaultWebSocketAdapterFactory.java)
- 集成例子参考 [weex playground](https://github.com/apache/incubator-weex/tree/master/android/playground)
:::

# API

## WebSocket

创建 WebSockets，并连接服务器。

#### WebSocket(url, protocol)

* **@url**, string, 表示要连接的 URL
* **@protocol**, string, WebSockets 协议名字字符串

```javascript
const ws = weex.requireModule('webSocket');
ws.WebSocket('ws://echo.websocket.org','');
```

## send

通过 WebSockets 连接向服务器发送数据。

#### send(data)

* **@data**, string, 要发送到服务器的数据

```javascript
const ws = weex.requireModule('webSocket');
ws.WebSocket('ws://echo.websocket.org','');
ws.send('some message.');
```

## close

关闭 WebSockets 的链接。

#### close(code, reason)

* **@code**, number, 关闭连接的状态号
* **@reason**, string, 关闭的原因

```javascript
const ws = weex.requireModule('webSocket');
ws.WebSocket('ws://echo.websocket.org','');
ws.close();
```

## onopen

一个用于连接打开事件的事件监听器，该事件表明这个连接已经准备好接受和发送数据。`onopen` 接受一个函数作为 EventListener，这个监听器会接受一个 `type` 为 "open" 的事件对象。

#### onopen(options)

标准 event 对象，无特殊属性。

```javascript
const ws = weex.requireModule('webSocket')
ws.WebSocket('ws://echo.websocket.org','');
ws.onopen = function(event) {
  console.log('onopen', event);
}
```

## onmessage

一个用于消息事件的事件监听器，当有消息到达的时触发。`onmessage` 接受一个函数作为 EventListener，这个监听器会接受一个 `type` 为 "message" 的事件对象。

#### onmessage(options)

* **@options**, object.
  * **`data`**, string, 监听器接收的到的消息

```javascript
const ws = weex.requireModule('webSocket')
ws.WebSocket('ws://echo.websocket.org','');
ws.onmessage = function(event) {
  console.log('onmessage', event);
}
```

## onclose

一个用于连接关闭事件的事件监听器，当连接关闭时触发。`onclose` 接受一个函数作为 EventListener，这个监听器会接受一个 `type` 为 "close" 的事件对象。

#### onclose(options)

* **@options**, object
  * **`code`**, number, 服务器返回关闭的状态码
  * **`reason`**, string, 服务器返回的关闭原因
  * **`wasClean`**, boolen, 是否完全关闭

```javascript
const ws = weex.requireModule('webSocket')
ws.WebSocket('ws://echo.websocket.org','');
ws.onclose = function(event) {
  console.log('onclose', event);
}
```

## onerror

一个用于 error 事件的事件监听器，当错误发生时触发。`onerror` 接受一个函数作为 EventListener，这个监听器会接受一个 `type` 为 "error" 的事件对象。

#### onerror(options)

* **@options**, object
  * **`data`**, string, 监听器接收的到的消息

```javascript
const ws = weex.requireModule('webSocket')
ws.WebSocket('ws://echo.websocket.org','');
ws.onerror = function(event) {
  console.log('onerror', event);
}
```

**Demos**

- [事件示例](http://dotwe.org/vue/6b7d6dc14320e3f04e0f203cb8bcc703)
- [聊天窗口](http://dotwe.org/vue/21d8b0a79c20e95139353d9cc8b634f5)，webSockets 常用于在线聊天等实时通信场景。
