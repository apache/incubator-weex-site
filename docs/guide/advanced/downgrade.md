# Downgrade

"Downgrade" means to rendering Weex's pages as the normal web page.

Weex supports cross-platform (Android, iOS, Web), with different SDK but same APIs, under the hood, it's using platform capability to render pages. However with the iteration of the platforms and app, version fragmentation problem is inevitable. If you are using the feature which only supported in a higher version, you can let your page "downgrade" at the lower versions (The web renderer of Weex, or the "WebSDK", is implemented in Javascript, so it can be updated dynamically).

> “Downgrade” is not a technical limitation, but it's useful to handle real world problems.

## Emit Downgrade

In Weex, the "downgrade" behavior is emitted at the front-end and is implemented by the native. The trigger of it is by calling the `error` method of the `instanceWrap` module.

```js
const instanceWrap = weex.requireModule('instanceWrap')
instanceWrap.error(errorType, errorCode, message)
```

The `instanceWrap` only contains one API which is `error`, the arguments of it will be used to differentiate the type and reason of the downgrade behavior, they are not restrictions but conventions.

* `errorType`: `Number` Error type, usually be `1` when it was emitted at front-end.
* `errorCode`: `Number` Error code, the meaning are as follows:
  * `1001`: The version of os (Android or iOS) is not satisfied.
  * `1002`: The version of app is not satisfied.
  * `1003`: The version of WeexSDK is not satisfied.
  * `1004`: The device mode is not satisfied.
* `message`: `String` Error message.

> Calling the API anywhere in the page will trigger the downgrade immediately. It a common way to determine whether to downgrade at the beginning of the page by checking if environment meets the requirements.

## Useful Tools

### Npm module

* npm module: [https://www.npmjs.com/package/@weex-project/downgrade](https://www.npmjs.com/package/@weex-project/downgrade)
* source code: [https://github.com/weexteam/downgrade](https://github.com/weexteam/downgrade)

First install the `@weex-project/downgrade` package, the import it to your code.

```js
import downgrade from '@weex-project/downgrade'
```

The APIs of this package are as follows:

#### `force()`

Force downgrade. Will downgrade immediately once you call this API.

```js
downgrade.force()
```

#### `check(options)`

Check if the environment satisfies the `options`, return the diagnose result, and **will not emit downgrade.**

The format of `options` will be explained later, the return value is as follow:

* `isDowngrade`: Should downgrade or not. (It's `true` of the environment not satisfies the `options`)
* `errorType`: Error type, only exist when `isDowngrade` is `true`.
* `code`: Error code, only exist when `isDowngrade` is `true`.

```js
const result = downgrade.check({ ios: { osVersion: '<=9.0' } })
if (!result.isDowngrade) {
  // Do something
}
```

#### `condition(options)`

**Emit downgrade** when the environment is not satisfies the `options`.

```js
downgrade.condition({
  android: {
    appVersion: '<=7.8.0',
    weexVersion: '<0.16.0'
  }
})
```

### Webpack Plugin

Weex provides a Webpack plugin [`webpack-plugin-downgrade`](https://www.npmjs.com/package/webpack-plugin-downgrade) to inject downgrade codes to the generated file.

```js
// webpack.config.js
var DowngradePlugin = require('webpack-plugin-downgrade')

module.exports = {
  // other configs ...

  plugins: [
    new DowngradePlugin({ /* downgrade options */ })
  ]
}
```

Supported options as as follows:

* `force`: `Boolean` Whether to force downgrade.
* `condition`: `Object` The condition to emit downgrade.

```js
// Force downgrade
new DowngradePlugin({ force: true })

// Downgrade if the environment satisfies the condition
new DowngradePlugin({
  condition: {
    ios: {
      deviceModel: ['iPhone5,1']
    },
    android: {
      osVersion: '<=4.4',
      weexVersion: '<0.16.0'
    }
  }
})
```

## Downgrade Options

The downgrade configuration is a plain object which contains `ios` and `android` options, the config properties within them are the same. The page will be downgrade once any of the option is satisfied.

| Option | Data Format | Note |
| --- | ------- | --- |
| `osVersion` | Semantic Version | Version range of mobile OS (Android or iOS). |
| `appVersion` | Semantic Version | Version range of App. |
| `weexVersion` | Semantic Version | Version range of Weex SDK. |
| `deviceModel` | String Array | Device model list. |

```js
const options = {
  android: {
    // Downgrade if Android version is lower than 4.5
    osVersion: '<4.5',

    // Only downgrade in the v8.1.10 of App
    appVersion: '8.1.10'
  },

  ios: {
    // Downgrade in WeexSDK v0.18.2 or lower
    weexVersion: '<=0.18.2',

    // Downgrade in iPhone 5 or iPhone 5s
    deviceModel: [ 'iPhone5,1', 'iPhone6,1' ]
  }
}
```

### Semantic Version

In the npm package and Webpack plugin, they are using a simple version of [Semantic Versioning](https://semver.org/) to verify the version number, but **only supports `>`, `<`, `=`, `>=`, `<=` those five compare operator**

### Device Model

The device mode string in defined by mobile device manufacturer.
