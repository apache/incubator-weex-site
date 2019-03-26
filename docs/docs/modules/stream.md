# stream

A series of stream api. It provides a network request.

# API

## fetch

Start a network request, use two callbacks to receive server's response data.

#### fetch(options, callback, progressCallback)

* **@options**, the request options, key value style dictionary.
    * **`method`**, string, the HTTP method `GET` or `POST`.
    * **`url`**, string, the request url.
    * **`headers`**, string, the HTTP request headers.
    * **`type`**, string, response type, 'json','text' or 'jsonp'(same as 'json' in native implementation)
    * **`body`**, string, the HTTP body.

::: warning
- The `body` parameter only supports arguments of type `string`. Do not use the `JSON` format directly, you must convert it to a string.
- The `GET` request does not support arguments as `body`. Please use the URL to set the parameters.
- The default value of `Content-Type` is `application/x-www-form-urlencoded`.
- If you need to send data in `JSON` format via POST, you need to set `Content-Type` to `application/json`.
:::

* **@callback**, a callback function whose argument is the response object of the request. Callback function will receive a `response` object.
    * **`status`**, number, response status code.
    * **`ok`**, boolean, true if status code is bewteen 200～299.
    * **`statusText`**, string, status text
    * **`data`**, string, response data. It's a object if request option is `json`/`jsonp`, or *(string)* in other type value.
    * **`headers`**, object, response headers.

* **@progressCallback**, function, a progress callback. This callback will be invoked before request finished.
    * **`readyState`**, number, current request state.'1':request connection opened;'2':response headers received.;'3':response data is loading;
    * **`status`**, number, response status code.
    * **`length`** number, bytes of data have received. You can read full length of response from 'headers'.
    * **`statusText`**, string, status text.
    * **`headers`**. object, response headers.

::: tip
- Default Content-Type is 'application/x-www-form-urlencoded'. (The type specified in fetch is the response type!)
- You need to set the Content-Type header to 'application/json' manually if you want to post the json body.
:::

**Demos**
- [Simple Demo](http://dotwe.org/vue/80b21a0fce98acdffad96c57b2eadd1d)
- [Post Demo](http://dotwe.org/vue/6dd65122144d9ad26594c0f900c75cd4)
- [Get Demo](http://dotwe.org/vue/892bd1c977b61762baca8e02a65b6d97)
