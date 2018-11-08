# 实例变量

## 说明

每个 Weex 页面的 JS 上下文中都有一个相互独立的 `weex` 变量，它可以像全局变量一样使用，不过它在不同页面中是隔离而且*只读*的。

> **注意： `weex` 实例变量只在 Vue 框架中暴露了，目前还不支持在 Rax 框架中使用。**

Weex 实例变量的有如下属性：

- `config`：Weex 当前环境信息
- `document`：当前页面的文档模型对象
- `requireModule()`：引用自定义或者内置模块的方法
- `supports()`<Badge text="0.15" type="warn" vertical="middle"/>：在运行期检测某个功能在当前环境中是否可用的方法
- `isRegisteredModule()`：检测某个特定的模块或者接口是否可用
- `isRegisteredComponent()`：检测某个特定的组件是否可用

其类型定义如下：

```typescript
declare type Weex = {
  config: WeexConfigAPI;
  document: WeexDocument;
  requireModule: (name: string) => Object | void;
  supports: (condition: string) => boolean | void;
  isRegisteredModule: (moduleName: string, methodName: string) => boolean | void;
  isRegisteredComponent: (componentName: string) => boolean | void;
}
```

## `weex.config`

该变量包含了当前 Weex 页面的所有环境信息。

```typescript
declare type WeexConfigAPI = {
  bundleUrl: string;
  bundleType?: string;
  env: WeexEnvironment;
}
```

+ `bundleUrl`: 当前页面 js bundle 的 URL 地址。
+ `bundleType`: <Badge text="0.17" type="warn" vertical="middle"/> 页面 js bundle 的类型，它表示的是当前页面是用那种框架开发的，可以是 `"Vue"` 或者 `"Rax"`。
+ `env`: Weex 环境变量。

### Weex 环境变量

有时候为了兼容性或者为了增强某个端上的能力，需要编写平台特异的代码。Weex 提供了 `weex.config.env` 和全局的 `WXEnvironment` 变量（它们是等价的）来获取当前执行环境的信息。

```js
weex.config.env === WXEnvironment
```

**Weex 环境变量中的字段**:

| 字段名          | 类型    | 描述 |
| -------------- | ------ | ----------- |
| `platform`     | String | 当前运行平台，可能是 `Android`, `iOS` 或 `Web` |
| `weexVersion`  | String | 当前 Weex SDK 版本号 |
| `appName`      | String | 当前应用名或浏览器名（Web） |
| `appVersion`   | String | 当前应用版本 |
| `osName`       | String | 系统 OS 名称，可能是 `Android` 或 `iOS` |
| `osVersion`    | String | 当前系统 OS 版本 |
| `deviceModel`  | String | 手机 device model (H5 没用) |
| `deviceWidth`  | Number | 设备屏幕宽度 |
| `deviceHeight` | Number | 设备屏幕高度 |

[这个例子](http://dotwe.org/vue/ea2cff9039f3b0e406f8f7da10e874af) 打印出了 Weex 环境对象中的所有值。

## `weex.document`

`weex.document` 是当前页面的文档模型对象，可以用来创建和操作 DOM 树中元素。它是 Weex DOM API 规范的一部分，但是它和 [W3C 的 DOM 规范](https://www.w3.org/DOM/)中的 `document` 对象是不同的。

而且，在使用了现代化的前端框架（如 Vue 和 Rax）的情况下，直接操作 DOM 并不是最佳实践。更何况**在 Weex 平台里并不一定有真实的 DOM**，在 Android 和 iOS 端上都是模拟出来的。

这个接口主要是用在 Vue 和 Rax 框架内部，用于将 virtual-dom 转换成渲染执行，并且发送给 Weex 客户端的渲染引擎。不建议在开发页面时使用。

## `weex.requireModule()`

对于那些不依赖 UI 交互的原生功能，Weex 将其封装成**模块**，这是一种通过 javascript 调用原生能力的方法。除了[内置模块](/docs/animation.html)以外，将已有的原生模块移植到 Weex 平台也很方便。你可以使用 `weex.requireModule` 接口引用自定义的或者内置的模块。

```typescript
weex.requireModule(name: string): Object | void;
```

**参数：**

+ 大小写敏感的模块名。

**返回值：**

+ 如果模块已经注册了，返回一个 `Proxy` 对象（如果环境不支持 `Proxy` 则返回一个普通对象），可以使用这个对象调用客户端注册的方法。
+ 如果模块未注册，返回 `undefined`。

### 使用原生模块

你可以像使用不同 javascript 函数一样使用原生注册的接口。这里是一个简单的[使用 modal 模块的例子](http://dotwe.org/vue/cd7e97f7da08d6d4ca627fc127ab8828)：

```html
<template>
  <div><text>Toast</text></div>
</template>
<script>
  const modal = weex.requireModule('modal')
  modal.toast({
    message: 'I am a toast.',
    duration: 3
  })
</script>
```

## `weex.supports()`<Badge text="0.15" type="warn" vertical="middle"/>

你应该了解 Weex 的组件和模块都是可以注册和配置的，这样导致了在不同环境中组件和模块的支持情况不一样。你可以使用 `weex.supports()` 接口在运行期检测某个功能在当前环境中是否可用。

```typescript
weex.supports(condition: string): boolean | void;
```

**参数：**

+ 特定格式的字符串：`@{type}/{name}`。

`type` 必须是 `"component"` 和 `"module"` 之一。`name` 可以是标签名、模块名，也可以指定模块中的某个方法名（和模块名用 `.` 隔开）。

**返回值：**

+ 支持该特性，则返回 `true`。
+ 不支持该特性，则返回 `false`。
+ 参数格式错误或无法确定是否支持，则返回 `null`。

### 使用范例

检测某个组件是否可用：

```js
weex.supports('@component/slider') // true
weex.supports('@component/my-tab') // false
```

检测某个模块是否可用：

```js
weex.supports('@module/stream')  // true
weex.supports('@module/abcdef')  // false
```

检测某个模块是否包含某个方法：

```js
weex.supports('@module/dom.getComponentRect') // true
weex.supports('@module/navigator.jumpToPage') // false
```

无效的输入：

```js
weex.supports('div') // null
weex.supports('module/*') // null
weex.supports('@stream/fetch') // null
weex.supports('getComponentRect') // null
```

## `weex.isRegisteredModule()`

检测某个特定的模块或者接口是否可用。

```typescript
weex.isRegisteredModule(moduleName: string, methodName: string): boolean
```

这个接口只能用于检测特定模块和方法的兼容性，不支持检测组件。

```js
weex.isRegisteredModule('stream') // true
weex.isRegisteredModule('stream', 'fetch') // true
weex.isRegisteredModule('whatever', '- unknown -') // false
weex.isRegisteredModule('div') // false, not support components
```

## `weex.isRegisteredComponent`

检测某个特定的组件是否可用。

```typescript
weex.isRegisteredComponent(componentName: string): boolean
```

这个接口只能用于检测组件的兼容性，不支持检测模块。

```js
weex.isRegisteredComponent('div') // true
weex.isRegisteredComponent('- unknown -') // false
weex.isRegisteredComponent('navigator') // false, not support modules
```
