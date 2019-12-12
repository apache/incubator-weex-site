# webSocket

WebSockets is an advanced technology that makes it possible to open an interactive communication session between the user's H5/iOS/android and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply

::: warning
iOS and h5 provide  webSocket default handle. if you use webSocket in android environment. You should provide custom adapter implementation, source:
- [DefaultWebSocketAdapter.java](https://github.com/apache/incubator-weex-playground/blob/master/android/commons/src/main/java/org/apache/weex/commons/adapter/DefaultWebSocketAdapter.java);
- [DefaultWebSocketAdapterFactory.java](https://github.com/apache/incubator-weex-playground/blob/master/android/commons/src/main/java/org/apache/weex/commons/adapter/DefaultWebSocketAdapterFactory.java);
- refer:  [weex playground](https://github.com/apache/incubator-weex-playground)
:::

# API

## WebSocket

create websocket

#### WebSocket(url, protocol)

* **@url**, string, the URL to which to connect.
* **@protocol**, string, the websocket protocol.

```javascript
const ws = weex.requireModule('webSocket');
ws.WebSocket('ws://echo.websocket.org','');
```

## send

Transmits data to the server over the WebSocket connection

#### send(data)

* **@data**, string, a text string to send to the server.

```javascript
const ws = weex.requireModule('webSocket');
ws.WebSocket('ws://echo.websocket.org','');
ws.send('some message.');
```

## close

Closes the WebSocket connection or connection attempt, if any. If the connection is already CLOSED, this method does nothing.

#### close(code, reason)

* **@code**, number, the status code explaining why the connection is being closed.
* **@reason**, string, a string explaining why the connection is closing

```javascript
const ws = weex.requireModule('webSocket');
ws.WebSocket('ws://echo.websocket.org','');
ws.close();
```

## onopen

An event listener to be called when the WebSocket connection's readyState changes to OPEN; this indicates that the connection is ready to send and receive data.

#### onopen(options)

* **@options**, object, an empty object

```javascript
const ws = weex.requireModule('webSocket')
ws.WebSocket('ws://echo.websocket.org','');
ws.onopen(function(event) {
console.log('onopen', event);
});
```

## onmessage

An event listener to be called when a message is received from the server

#### onmessage(options)

* **@options**, object, the server message options.
  * **`data`**, string, the listener received message.

```javascript
const ws = weex.requireModule('webSocket')
ws.WebSocket('ws://echo.websocket.org','');
ws.onmessage(function(event) {
  console.log('onmessage', event);
});
```

## onclose

An event listener to be called when the WebSocket connection's readyState changes to CLOSED

#### onclose(options)

* **@options**, object, the CloseEvent is sent to clients using WebSockets when the connection is closed.
  * **`code`**, number, returns an unsigned short containing the close code send by the server.
  * **`reason`**, string, returns a string indicating the reason the server closed the connection.
  * **`wasClean`**, boolen, returns a Boolean that Indicates whether or not the connection was cleanly closed.

```javascript
const ws = weex.requireModule('webSocket')
ws.WebSocket('ws://echo.websocket.org','');
ws.onclose(function(event) {
  console.log('onclose', event);
});
```

## onerror

An event listener to be called when an error occurs.

#### onerror(options)

* **@options**, object, the error event.
  * **`data`**, string, the listener received error data.

```javascript
const ws = weex.requireModule('webSocket')
ws.WebSocket('ws://echo.websocket.org','');
ws.onerror(function(event) {
  console.log('onerror', event);
});
```

**Demos**

- [Demo](http://dotwe.org/vue/fe7bb8051d59593974d08e1fb4a6d357)
- [Chat Demo](http://dotwe.org/vue/354555978b45425df7fa4f7a9d0e315a)
