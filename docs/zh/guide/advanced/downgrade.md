# 页面降级

“降级” 通常是指以普通 Web 页面的模式渲染 Weex 的页面。

Weex 本身是支持跨三种平台的（Android、iOS、Web），在不同平台中集成不同版本的 SDK 来实现原生渲染，然而随着平台和应用版本的迭代，会出现版本碎片化的情况。如果你使用了较高版本中的特性，但是又无法升级已经存在的低版本 App，就可以使用“降级”的方式在低版本 App 中以普通 Web 页面的模式来渲染（在 Web 模式中，渲染器或者说“SDK”也是用 Javascript 实现的，可以动态更新）。

> 降级是一个与业务属性相关的功能，这里仅提供一份建议和约定，而非技术限制。

## 触发降级

在 Weex 里，“降级”行为是在前端（页面代码）中触发的，由客户端来实现。触发方式是调用客户端提供的 `instanceWrap` 模块中的 `error` 方法来实现。

```js
const instanceWrap = weex.requireModule('instanceWrap')
instanceWrap.error(errorType, errorCode, message)
```

`instanceWrap` 模块仅包含 `error` 这一个接口，传递的参数主要用于区分降级的类型和原因，与具体业务场景相关，不做强限制，大致的约定如下。

* `errorType`: 【数字】 错误类型。由前端触发的降级通常约定为 `1`。
* `errorCode`: 【数字】 错误代码。
  * `1001`: 系统版本不满足条件。
  * `1002`: 应用版本不满足条件。
  * `1003`: WeexSDK 版本不满足条件。
  * `1004`: 设备型号不满足条件。
* `message`: 【字符串】 错误信息。

> 在页面代码任意位置调用了降级接口都会立即触发降级，比较常见的做法是在渲染页面之前，先判断环境信息是否满足需求，然后触发降级。

## 辅助工具

为了方便使用，Weex 提供了一系列辅助模块/插件来实现降级功能。

### Npm 模块

* npm 模块主页： [https://www.npmjs.com/package/@weex-project/downgrade](https://www.npmjs.com/package/@weex-project/downgrade)
* 源码地址： [https://github.com/weexteam/downgrade](https://github.com/weexteam/downgrade)

首先安装 `@weex-project/downgrade` 模块，然后在页面代码中引入，调用其中的接口即可触发降级。

```js
import downgrade from '@weex-project/downgrade'
```

提供的接口如下：

#### `force()`

强制降级。调用该接口可以无条件立即降级。

```js
downgrade.force()
```

#### `check(options)`

检查环境信息是否满足 `options` 的描述，返回校验结果，**并不会触发降级**。

`options` 的格式见下文详解，返回值的格式如下：

* `isDowngrade`: 是否应该降级（不满足 `options` 中的条件则为 `true`）。
* `errorType`: 错误类型，语义同上，仅 `isDowngrade` 为 `true` 时才包含。
* `code`: 错误代码，语义同上，仅 `isDowngrade` 为 `true` 时才包含。

```js
const result = downgrade.check({ ios: { osVersion: '<=9.0' } })
if (!result.isDowngrade) {
  // Do something
}
```

#### `condition(options)`

检查环境信息是否满足 `options` 的描述，**不满足条件则触发降级**。 `options` 的格式见下文详解，没有返回值。

```js
downgrade.condition({
  android: {
    appVersion: '<=7.8.0',
    weexVersion: '<0.16.0'
  }
})
```

### Webpack 插件

Weex 提供了一个 Webpack 插件 [`webpack-plugin-downgrade`](https://www.npmjs.com/package/webpack-plugin-downgrade) 支持在打包时注入触发降级的代码。

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

插件支持的配置项如下：

* `force`: `Boolean` 是否强制降级。
* `condition`: `Object` 满足特定条件时才触发降级。具体的配置项见下文详解。

```js
// 强制降级
new DowngradePlugin({ force: true })

// 满足某些条件时降级
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

## 降级配置项

降级配置项是一个普通的 JS 对象，包含 `ios` 和 `android` 两个字段，这两个字段内部的配置项的语义都是一样的。满足配置项中的任意一个条件就会触发降级。

| 字段 | 数据格式 | 含义 |
| --- | ------- | --- |
| `osVersion` | 语义化版本号 | 手机操作系统的版本范围 |
| `appVersion` | 语义化版本号 | App 应用的版本范围 |
| `weexVersion` | 语义化版本号 | WeexSDK 的版本范围 |
| `deviceModel` | 由设备机型字符串构成的数组 | 需要降级的机型列表 |

```js
const options = {
  // 在 Android 中的配置项
  android: {
    // 在低于 4.5 的安卓系统中降级
    osVersion: '<4.5',

    // 仅在 8.1.10 版本的 App 中降级
    appVersion: '8.1.10'
  },

  // 在 iOS 中的配置项
  ios: {
    // 在小于等于 WeexSDK 0.18.2 的版本中降级
    weexVersion: '<=0.18.2',

    // 在 iPhone 5 和 iPhone 5s 中降级
    deviceModel: [ 'iPhone5,1', 'iPhone6,1' ]
  }
}
```

### 语义化版本号

在辅助降级的工具包中，实现了简版的 [Semantic Versioning](https://semver.org/)（语义化版本号）来匹配版本，**仅支持使用 `>` 、 `<` 、 `=` 、 `>=` 、 `<=` 这五种比较符。**

### 设备型号

设备型号由手机设备厂商定义，降级配置项中需要列举出所有想要降级的设备型号。
