---
title: webSocket
type: references
group: Build-in Modules
order: 9.11
version: 2.1
---

# webSocket
<span class="weex-version">v0.12+</span>

## Summary

WebSockets is an advanced technology that makes it possible to open an interactive communication session between the user's H5/iOS/android and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply

::: warning
- iOS and h5 provide  webSocket default handle. if you use webSocket in android environment . you should provide custom adapter implementation,source:
  - [DefaultWebSocketAdapter.java](https://github.com/apache/incubator-weex/blob/master/android/commons/src/main/java/com/alibaba/weex/commons/adapter/DefaultWebSocketAdapter.java);
  - [DefaultWebSocketAdapterFactory.java](https://github.com/apache/incubator-weex/blob/master/android/commons/src/main/java/com/alibaba/weex/commons/adapter/DefaultWebSocketAdapterFactory.java);
  - refer:  [weex playground](https://github.com/apache/incubator-weex/tree/master/android/playground)
:::

## API
### `WebSocket(url, protocol)`

create websocket

#### Arguments

- `url {string}`:The URL to which to connect;
- `protocol {string}`:the websocket protocol

```js
const ws = weex.requireModule('webSocket');

ws.WebSocket('ws://echo.websocket.org','');
```

### `send(data)`

Transmits data to the server over the WebSocket connection

#### Arguments

- `data {string}`:A text string to send to the server.

```js
const ws = weex.requireModule('webSocket');
ws.WebSocket('ws://echo.websocket.org','');

ws.send('some message.');
```

### `close(code,reason)`

Closes the WebSocket connection or connection attempt, if any. If the connection is already CLOSED, this method does nothing.

#### Arguments

- `code {number}`: the status code explaining why the connection is being closed.
- `reason {string}`:a string explaining why the connection is closing

```js
const ws = weex.requireModule('webSocket');
ws.WebSocket('ws://echo.websocket.org','');

ws.close();
```

### `onopen(options)`

An event listener to be called when the WebSocket connection's readyState changes to OPEN; this indicates that the connection is ready to send and receive data.

#### Arguments

- `options {object}`:an empty object

```js
const ws = weex.requireModule('webSocket')
ws.WebSocket('ws://echo.websocket.org','');

ws.onopen = function(event) {
  console.log('onopen', event);
}
```

### `onmessage(options)`

An event listener to be called when a message is received from the server

#### Arguments

- `options {object}`:the server message options
  - `data {string}`: The listener received message

  ```js
  const ws = weex.requireModule('webSocket')
  ws.WebSocket('ws://echo.websocket.org','');

  ws.onmessage = function(event) {
    console.log('onmessage', event);
  }
  ```

### `onclose(options)`

An event listener to be called when the WebSocket connection's readyState changes to CLOSED

#### Arguments

- `options {object}`:the CloseEvent is sent to clients using WebSockets when the connection is closed
  - `code {number}`: Returns an unsigned short containing the close code send by the server
  - `reason {string}`: Returns a string indicating the reason the server closed the connection
  - `wasClean {boolen}`: Returns a Boolean that Indicates whether or not the connection was cleanly closed.

  ```js
  const ws = weex.requireModule('webSocket')
  ws.WebSocket('ws://echo.websocket.org','');

  ws.onclose = function(event) {
    console.log('onclose', event);
  }
  ```

### `onerror(options)`

An event listener to be called when an error occurs.

#### Arguments

- `options {object}`:the error event
  - `data {string}`: The listener received error data

  ```js
  const ws = weex.requireModule('webSocket')
  ws.WebSocket('ws://echo.websocket.org','');

  ws.onerror = function(event) {
    console.log('onerror', event);
  }
  ```

### Example

- [Demo](http://dotwe.org/vue/6b7d6dc14320e3f04e0f203cb8bcc703)
- [Chat Demo](http://dotwe.org/vue/21d8b0a79c20e95139353d9cc8b634f5)

  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB11_g_n7voK1RjSZPfXXXPKFXa-264-439.gif" />
