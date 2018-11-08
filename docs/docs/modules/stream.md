# stream

`stream` 模块提供了基本的网络请求能力，例如 GET 请求、POST 请求等，用于在组件的生命周期内与服务端进行交互。

## API

### fetch(options, callback[,progressCallback])

发起一个请求。

#### 参数

##### options {Object}

请求的配置选项，支持以下配置：

| 属性        | 说明                | 类型   | 是否必选 |
| ---------- | -------------      | -----  | ----- |
| `method` | HTTP 请求方法，值为 `GET`/`POST`/`PUT`/`DELETE`/`PATCH`/`HEAD` | string | 必选 |
| `url` | 请求的 URL | string | 必选 |
| `headers` | HTTP 请求头 | Object | 可选 |
| `type` | 响应类型：`json`，`text` 或是 `jsonp`(在 native 原生实现中其实与 `json` 相同) | string | 必选 |
| `body` | HTTP 请求体 | string | 可选 |

::: warning 注意
- `body` 参数仅支持 `string` 类型的参数，请勿直接传递 `JSON`，必须先将其转为字符串。
- `GET` 请求不支持 `body` 方式传递参数，请使用 URL 传参。
- 默认 `Content-Type` 是 `application/x-www-form-urlencoded`。
- 如果你需要通过 POST 发送 json 数据， 需要将 `Content-Type` 设为 `application/json`。
:::

##### callback(res) {Function}

响应结果回调，回调函数将收到如下的 `response` 对象：

| 属性        | 说明                | 类型   |
| ---------- | -------------      | -----  |
| `status` | 返回的状态码 | number |
| `ok` | 如果状态码在 200~299 之间就为 `true` | boolean |
| `statusText` | 状态描述文本 | string |
| `data` | 返回的数据，如果请求类型是 `json` 和 `jsonp`，则它就是一个 `object` ，否则是一个 `string`。 | `Object | string` |
| `headers` | HTTP 响应头 | Object | - |


##### progressCallback(res) {Function}

关于请求状态的回调，这个回调函数将在请求完成后就被调用，回调函数将收到如下的 `response` 对象：

| 属性        | 说明                | 类型   |
| ---------- | -------------      | -----  |
| `readyState` | 当前状态，`1`: 请求连接中；`2`: 返回响应头中；`3`: 正在加载返回数据 | number |
| `status` | 返回的状态码 | number |
| `length` | 已经接受到的数据长度. 你可以从响应头中获取总长度 | number |
| `statusText` | 状态描述文本 | string |
| `headers` | HTTP 响应头 | Object | - |

## Demo

- [HTTP method 示例](http://dotwe.org/vue/80b21a0fce98acdffad96c57b2eadd1d)
- [创建文章](http://dotwe.org/vue/6dd65122144d9ad26594c0f900c75cd4)，常见应用场景，发送 POST 请求。

  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1UWA7n4TpK1RjSZFGXXcHqFXa-750-1334.gif" />

- [热门动画列表](http://dotwe.org/vue/892bd1c977b61762baca8e02a65b6d97)，常见应用场景，通过 GET 请求获取数据。

  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1.Bg6nZbpK1RjSZFyXXX_qFXa-750-1334.gif" />