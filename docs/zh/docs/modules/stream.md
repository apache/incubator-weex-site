# stream

`stream` 模块提供了基本的网络请求能力，例如 GET 请求、POST 请求等，用于在组件的生命周期内与服务端进行交互。

# API

## fetch

发起一个请求。

#### fetch(options, callback, progressCallback)

* **@options**, 请求的配置选项，支持以下配置
    * **`method`**, string, HTTP 请求方法，值为 `GET`/`POST`/`PUT`/`DELETE`/`PATCH`/`HEAD`
    * **`url`**, string, 请求的 URL | string
    * **`headers`**, string, HTTP 请求头
    * **`type`**, string, 响应类型：`json`，`text` 或是 `jsonp`(在 native 原生实现中其实与 `json` 相同)
    * **`body`**, string, HTTP 请求体

::: warning 注意
- `body` 参数仅支持 `string` 类型的参数，请勿直接传递 `JSON`，必须先将其转为字符串。
- `GET` 请求不支持 `body` 方式传递参数，请使用 URL 传参。
- 默认 `Content-Type` 是 `application/x-www-form-urlencoded`。
- 如果你需要通过 POST 发送 json 数据， 需要将 `Content-Type` 设为 `application/json`。
:::

* **@callback**, 响应结果回调，回调函数将收到如下的 `response` 对象：
    * **`status`**, number, 返回的状态码
    * **`ok`**, boolean, 如果状态码在 200-299 之间就为 true
    * **`statusText`**, string, 状态描述文本
    * **`data`**, string, 返回的数据，如果请求类型是 `json` 和 `jsonp`，则它就是一个 `object` ，否则是一个 `string`。
    * **`headers`**, object, rHTTP 响应头

* **@progressCallback**, function, a progress callback. This callback will be invoked before request finished.
    * **`readyState`**, number, 当前状态，`1`: 请求连接中；`2`: 返回响应头中；`3`: 正在加载返回数据
    * **`status`**, number, 返回的状态码
    * **`length`** number, 已经接受到的数据长度. 你可以从响应头中获取总长度
    * **`statusText`**, string, 状态描述文本
    * **`headers`**. object, HTTP 响应头

::: tip
- 默认的 Content-Type 为 'application/x-www-form-urlencoded'. `fetch` 方法中设置的 type 是响应类型。
- 如果要发送 JSON 数据，需要设置 Content-Type 为 'application/json'。
:::

**示例**
- [HTTP method 示例](http://dotwe.org/vue/80b21a0fce98acdffad96c57b2eadd1d)
- [Post 示例](http://dotwe.org/vue/6dd65122144d9ad26594c0f900c75cd4)，常见应用场景，发送 POST 请求。
- [Get 示例](http://dotwe.org/vue/892bd1c977b61762baca8e02a65b6d97)，常见应用场景，通过 GET 请求获取数据。
