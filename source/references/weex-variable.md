---
title: Weex Variable
type: references
group: API
order: 2.5
version: 2.1
---

<!-- toc -->

Each page of Weex contains a `weex` variable in the js runtime context. It can be assessed directly just like a global object, but it's *readonly* and separated from different pages.

> NOTE: **The `weex` variable only exposed in the Vue framework. It's not available in Rax framework yet.**

## Properties and Methods

The type declaration of the Weex variable is:

```typescript
declare type Weex = {
  config: WeexConfigAPI;
  document: WeexDocument;
  requireModule: (name: string) => Object | void;
  supports: (condition: string) => boolean | void;
}
```

## `weex.config`

The `weex.config` contains all the environment information of current page.

```typescript
declare type WeexConfigAPI = {
  bundleUrl: string;
  bundleType?: string;
  env: WeexEnvironment;
}
```

+ `bundleUrl`: The URL of the js bundle in current page.
+ `bundleType`: <span class="api-version">v0.17+</span> The type of the js bundle, it indicates which framework is using for current js bundle, could be `"Vue"` or `"Rax"`.
+ `env`: Weex environment object.

### Weex Environment Object

Sometimes, you still need to write some platform specific codes for compatibility or enhancement. Weex provides `weex.config.env` and a global object `WXEnvironment` (they are strictly equal) to get the information of current runtime environment.

```js
weex.config.env === WXEnvironment
```

**Properties in Weex environment object**:

| Property       | Type   | Description |
| -------------- | ------ | ----------- |
| `platform`     | String | Current running platform, could be "Android", "iOS" or "Web". |
| `weexVersion`  | String | The version of Weex SDK. |
| `appName`      | String | Mobile app name or browser name. |
| `appVersion`   | String | The version of current app. |
| `osName`       | String | The OS name, could be "Android" or "iOS". |
| `osVersion`    | String | The version of current OS. |
| `deviceModel`  | String | Mobile phone device model. (native only) |
| `deviceWidth`  | Number | Screen resolution width. |
| `deviceHeight` | Number | Screen resolution height. |

[This example](http://dotwe.org/vue/ea2cff9039f3b0e406f8f7da10e874af) prints all properties in the Weex environment object.

## `weex.document`

The `weex.document` is the document object of current page, it can be used to create or manipulate the *Elements* in *DOM tree*. It's part of *Weex DOM API* specification which is NOT the same with the `document` object in the [W3C DOM API](https://www.w3.org/DOM/).

However, it's not a good practice to manipulate DOM directly when using modern front-end frameworks, such as Vue and Rax. Especially, **there is no actually DOM in Weex**, it was simulated on the native (Android or iOS).

This API is mainly used inside of the Vue and Rax framework to convert the virtual-dom into render directives and send them to native render engines of Weex. Not recommended for using it when developing pages.

## `weex.requireModule`

For those features which does not rely on the UI, Weex wraps them into **modules**. It is a way to access native capabilities in javascript. Except for the [built-in modules](./modules/), it's quite easy to integrate the existing native modules to Weex platform. After that, you can use `weex.requireModule` to require both customized and built-in modules.

```typescript
weex.requireModule(name: string): Object | void;
```

**Parameter:**

+ A case-sensitive module name.

**Return Value:**

+ If the module is registered, return a `Proxy` or plain object if the context doesn't support `Proxy`. You can use it to call the registered methods in the module.
+ If the module is unregistered, return `undefined`.

### Use Native Module

You can require a native module and use its APIs just like normal javascript functions. Here is [a simple example](http://dotwe.org/vue/cd7e97f7da08d6d4ca627fc127ab8828) of using the [`modal`](/examples/modal.html) module:

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

## `weex.supports`

> This API only available in <span class="api-version">v0.15+</span>.

As you may know, components and modules are extendable and configurable in Weex. So it could be various in different apps or running context. You can use `weex.supports` to detect whether a feature is supported in the current environment at runtime.

```typescript
weex.supports(condition: string): boolean | void;
```

**Parameter:**

+ A formatted condition string: `@{type}/{name}`.

The `type` must be `"component"` or `"module"`. The `name` could be a tag name, module name or the method name in specific module.

**Return Value:**

+ If the feature is supported, return `true`.
+ If the feature is unsupported, return `false`.
+ If not sure about whether this feature is supported, return `null`.

### Examples

Detects whether the specific component is supported:

```js
weex.supports('@component/slider') // true
weex.supports('@component/my-tab') // false
```

Detects whether the specific module is supported:

```js
weex.supports('@module/stream')  // true
weex.supports('@module/abcdef')  // false
```

Detects whether the method in specific module is supported:

```js
weex.supports('@module/dom.getComponentRect') // true
weex.supports('@module/navigator.jumpToPage') // false
```

Invalid input or unknown features:

```js
weex.supports('div') // null
weex.supports('module/*') // null
weex.supports('@stream/fetch') // null
weex.supports('getComponentRect') // null
```

## `weex.isRegisteredModule`

Detect whether the specific module or method is registered.

```js
weex.weex.isRegisteredModule(moduleName: string, methodName: string): boolean
```

It can only be used to check compatibility of a specific module or method.

```js
weex.isRegisteredModule('stream') // true
weex.isRegisteredModule('stream', 'fetch') // true
weex.isRegisteredModule('whatever', '- unknown -') // false
weex.isRegisteredModule('div') // false, not support components
```

## `weex.isRegisteredComponent`

Detect whether the specific component is registered.

```js
weex.weex.isRegisteredComponent(componentName: string): boolean
```

It can only be used to check compatibility of a specific component.

```js
weex.isRegisteredComponent('div') // true
weex.isRegisteredComponent('- unknown -') // false
weex.isRegisteredComponent('navigator') // false, not support modules
```
