# storage

`storage` 是一个在前端比较常用的模块，可以对本地数据进行存储、修改、删除，并且该数据是永久保存的，除非手动清除或者代码清除。但是，`storage` 模块有一个限制就是浏览器端（H5）只能存储小于5M的数据，因为在 H5/Web 端的实现是采用 `HTML5 LocalStorage API`。而 Android 和 iOS 这块是没什么限制的。
storage 常用在一些被用户经常查询，但是又不频繁更新的数据，比如搜索历史、用户的订单列表等。搜索历史一般情况都是作为本地数据存储的，因此使用 storage 比较合适。而用户订单列表是需要本地存储和服务端器检索配合的场景。当一个用户下单后，会经常查阅个人的订单列表。但是，订单的列表数据不是频繁更新的，往往只有在收到货品时，才更新“已签收”，其余平时的状态是“已发货”。因此，可以使用 `storage` 存储订单列表，可以减少服务器的压力，例如减少 SQL 查询或者缓存的压力。当用户查看订单详情的时候，再更新数据状态。

# API

## setItem

该方法可以通过键值对的形式将数据存储到本地。同时可以通过该方法，更新已有的数据。

#### setItem(key, value, callback)
| 参数        | 说明                | 类型   |
| ---------- | -------------      | -----  | ----- |
| key    | 要存储的键，不允许是 `""` 或 `null` | string |
| value   | 要存储的值，不允许是 `""` 或 `null` | string |
| callback   | 执行操作成功后的回调<br>`e.result`：表示设置是否成功，如果成功返回 `"success"`<br>`e.data`：`undefined` 表示设置成功，`invalid_param` 表示 key/value 为 `""` 或者 `null` | function(e)  |

## getItem

传入键名返回对应的键值。

#### getItem(key, callback)
| 参数        | 说明                | 类型   |
| ---------- | -------------      | -----  | ----- |
| key    | 要获取的值的名称，不允许是 `""` 或 `null` | string |
| callback   | 执行操作成功后的回调<br>`e.result`：表示操作是否成功，如果成功返回 `"success"`<br>`e.data`：获取对应的键值字符串，如果没有找到则返回 `undefined` | function(e)  |

## removeItem

传入一个键名将会删除本地存储中对应的键值。

#### removeItem(key, callback)
| 参数        | 说明                | 类型   |
| ---------- | -------------      | -----  | ----- |
| key    | 要删除的值的名称，不允许是 `""` 或 `null` | string |
| callback   | 执行操作成功后的回调<br>`e.result`：表示删除是否成功，如果成功返回 `"success"`<br>`e.data`：`undefined` 表示删除成功| function(e)  |

## length

返回本地存储的数据中所有存储项数量的整数。

#### length(callback)
| 参数        | 说明                | 类型   |
| ---------- | -------------      | -----  | ----- |
| callback   | 执行操作成功后的回调<br>`e.result`：表示操作是否成功，如果成功返回 `"success"`<br>`e.data`：当前已存储项的数量| function(e)  |

## getAllKeys

返回一个包含全部已存储项键名的数组。

#### getAllKeys(callback)
| 参数        | 说明                | 类型   |
| ---------- | -------------      | -----  | ----- |
| callback   | 执行操作成功后的回调<br>`e.result`：表示操作是否成功，如果成功返回 `"success"`<br>`e.data`：所有键名组成的数组| function(e)  |

[示例](http://dotwe.org/vue/71d1dff37c54fa9bafab4d8cbe3d21e3)