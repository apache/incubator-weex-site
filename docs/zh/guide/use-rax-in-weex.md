# 在 Weex 中使用 Rax

> **Rax 是一个兼容 React 接口的前端框架，请访问 [Rax 的官方网站](https://alibaba.github.io/rax/) 了解更多信息。**

[[toc]]

在 WeexSDK [v0.10.0](https://github.com/alibaba/weex/releases/tag/v0.10.0) （发布于 2016 年 2 月 17 日）以及后续的版本中，集成了 v2 版本的 Vue.js。Vue 是一套构建用户界面的渐进式框架，详情请参阅其[官方网站](https://cn.vuejs.org/)。

> 如果没有特别指示，文章中的 "Vue.js" 或者 "Vue" 都指的是 v2 版本的 Vue。

## 什么是 Rax

如果你习惯于 React 的书写方式，欢迎使用 Rax，Rax 是一款超轻量，高性能，易上手的前端解决方案。
一次开发多端运行，同时支持 Weex Web 小程序等不同端。

## 环境变量

Weex 提供 WXEnvironment 用来获取 Weex 运行的环境变量，Rax 页面可以通过 WXEnvironment 访问。
提供字段如下：

* platform (String) Current running platform, could be "Android", "iOS" or "Web".
* weexVersion (String) The version of Weex SDK.
* appName (String) Mobile app name or browser name.
* appVersion (String) The version of current app.
* osName (String) The OS name, could be "Android" or "iOS".
* osVersion (String) The version of current OS.
* deviceModel (String) Mobile phone device model. (native only)
* deviceWidth (Number) Screen resolution width.
* deviceHeight (Number) Screen resolution height.

Rax 环境中的全局变量 Weex 在 WeexSDK 0.15 版本之后提供

## Weex Rax Framework

Native 和 Web 天生就有很多差异，为了让开发者有更好的体验，大部分的差异是不需要让开发者去关心的。因此 Native 端通过 Framework 模拟出了大量 Web 端的标准全局 API。

常用 API 包括


| W3C API |||||
| -- | -- | -- | -- | -- |
| name | closed | atob | btoa | performance |
| document | location | navigator | screen | devicePixelRatio |
| fetch | setTimeout | clearTimeout | setInterval | clearInterval |
| requestAnimationFrame | cancelAnimationFrame | alert | open | close |
| postMessage | addEventListener | removeEventListener | dispatchEvent | onerror |
| Promise | Symbol | Map | Set | WeakMap |
| WeakSet | Headers | Response | Request | XMLHttpRequest |
| URL | URLSearchParams | FontFace | WebSocket | Event |
| CustomEvent | matchMedia | | | |

其中部分实现依赖 Weex Module 能力

* fetch 使用 @weex-module/stream
* setTimeout 使用 @weex-module/timer
* clearTimeout 使用 @weex-module/timer
* setInterval 使用 @weex-module/timer
* clearInterval 使用 @weex-module/timer
* requestAnimationFrame 使用 @weex-module/timer
* cancelAnimationFrame 使用 @weex-module/timer
* alert 使用 @weex-module/modal
* open 使用 @weex-module/navigator
* close 使用 @weex-module/navigator
* postMessage	使用 BroadcastChannel 能力
* addEventListener	跨页面监听使用 BroadcastChannel 能力，页面内监听使用内部的 Emitter
* onerror	使用 @weex-module/globalEvent

模块规范
| API | 描述 |
| -- | -- |
| define | 组件定义 |
| require | 组件依赖，支持 Rax 组件与 Weex 原生模块，注意 Weex 模块需要以 @weex-module/ 开头 |

其他 API

| API | 描述 |
| -- | -- |
| `__weex_document__` | createInstanceContext 过程中创建的 Document 实例 |
| `__weex_module_supports__` | weex.isRegisteredModule |
| `__weex_tag_supports__` | weex.isRegisteredComponent |
| `__weex_define__` | 组件定义 |
| `__weex_require__` | 组件依赖，支持 Rax 组件与 Weex 原生模块，注意 Weex 模块需要以  |@weex-module/ 开头
| `__weex_downgrade__` | 页面降级方法，依赖 @weex-module/instanceWrap |
| `__weex_env__` | WXEnvironment |
| `__weex_options__` | 创建 Instance 所传递的参数 |
| `__weex_data__` | 创建 Instance 所传递的数据 |
| `__weex_config__` | 同 __weex_options__ |

## 样式支持

Rax 样式在 Weex 端与 Weex 所提供能力相同，并无额外扩展样式。

## 使用组件

Rax 的基础组件内部实现抹平了各端的差异，在 Weex 端的实现是Weex 提供的基础组件。例如 rax-view 的实现是 div，rax-text 的实现是 text。

Rax 基础组件会将所有属性向下透传，并对核心逻辑进行多端的兼容。
示例：

```jsx
<list loadmoreoffset={...}>
	...
</list>
```

Weex 组件与 Rax 混用

```jsx
<View>
  <text>Hello Rax</text>
</View>
```

## 使用 Weex 模块

Rax 提供了多端兼容的 API [universal-api](https://rax.js.org/docs/api/introduce)。
但在某些特殊场景下，如果向自己引用原生模块的方法，可以按照如下方式使用

以 Weex Dom 模块为例

```jsx
let dom = require('@weex-module/dom');
dom.scrollToElement(someNode, {
  offset: 20,
});
```

或

```jsx
let dom = __weex_require__('@weex-module/dom');
dom.scrollToElement(someNode, {
  offset: 20,
});
```

## 页面降级

Rax 页面降级可以使用 Weex Module @weex-module/instanceWrap，
也可以使用更方便的辅助工具 @weex-project/downgrade

Rax Framework 中也提供了全局的降级方法 `__weex_downgrade__` 方便开发者使用

## 事件

组件通用事件与 Weex 通用事件相同，Rax 中需要以 on 开头驼峰方式命名

```jsx
<View onClick={() => {}}>
  ...
</View>
```

页面事件，需要通过 setNativeProps API 手动向 body 节点绑定

```jsx
let bodyProps = {
  onViewAppear: () => {},
  onViewDisAppear: () => {}
};
let weexDocument = typeof __weex_document__ === 'object' ? __weex_document__ : typeof document === 'object' ? document : {};
if (weexDocument && weexDocument.body) {
  setNativeProps(findDOMNode(weexDocument.body), bodyProps);
}
```

事件冒泡

```jsx
let bodyProps = {
  bubble: true,
};
let weexDocument = typeof __weex_document__ === 'object' ? __weex_document__ : typeof document === 'object' ? document : {};
if (weexDocument && weexDocument.body) {
  setNativeProps(findDOMNode(weexDocument.body), bodyProps);
}
```

阻止冒泡

```jsx
<View onClick={(event) => {
	event.stopPropagation();
}}>
  ...
</View>
```

## 事件通信

Weex 提供了页面间通信的能力 BroadcastChannel（weex v0.9+）, Rax 页面中可以通过 Window 的全局方法进行通信。

### 页面间通信

页面 A 发送消息

```jsx
window.postMessage('{hello:1}',  '*');
```

页面 B 接收消息

```jsx
window.addEventListener('message', (e) => {
  console.log('data is', e.data);
});
```

### 页面内消息广播

页面内发送消息

```jsx
window.dispatchEvent(new CustomEvent('eventName', { detail: 1 }));
```

页面内接收消息

```jsx
window.addEventListener('eventName', (event) => {
	const {detail} = event;
	// 业务逻辑
});
```
