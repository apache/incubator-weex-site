# storage

`storage` is a series of apis, support add, modify and delete stored data.

::: warning
There is NO same-origin-policy in weex storage moudle. Any one can access any key, even can change the value. So be careful of your usage.
:::

# API

## setItem

When passed a key and a value, it will saved into the storage,
or update the value if the key already exists.

#### setItem(key, value, callback)

* **@key**, string, the name of the key you want to store. "" or null is not allowed.
* **@value**, string, the name of the value you want to store."" or null is not allowed.
* **@callback**, function, the callback function after executing this action.

## getItem

When passed a key, will return that key's value.

#### getItem(key, callback)

* **@key**, string, the name of the key you want to retrieve the value of."" or null is not allowed.
* **@callback**, function, the callback function after executing this action.

## removeItem

When passed a key, will remove that key and value from the storage.

#### removeItem(key, callback)

* **@key**, string, the name of the key you want to remove."" or null is not allowed.
* **@callback**, function, the callback function after executing this action.

```javascript
var storage = weex.requireModule('storage');
storage.removeItem('foo', function(e) {
  // callback. 'e' is an object that contains 'result' and 'data'.
  // e.result will return 'success' or 'failed' according to the executing result.
  // e.data will always return 'undefined' in this function if success.
});
```

## length

Returns an integer representing the number of key-value items stored in the storage.

#### length(callback)

* **@callback**, the callback function after executing this action.

## getAllKeys

Returns an array that contains all keys stored in the storage.

#### getAllKeys(callback)

* **@callback**, the callback function after executing this action.

[Demo](http://dotwe.org/vue/3fdd3e2d1646ca41199d80c7be799858)
