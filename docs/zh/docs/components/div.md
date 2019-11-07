# &lt;div&gt;

## 简介

`<div>` 是通用容器。

::: tip
* 不要在 `<div>` 中直接添加文本，而要使用 `<text>` 组件。
* 在 Weex 中，`<div>` 不可滚动。
* 要控制 `<div>` 的层级，建议不要超过14层，否则会很影响页面性能。
:::

## 子组件

`<div>` 支持各种类型的子元素，包括 `<div>` 自己。

## 样式

* **通用样式** 支持所有[通用样式](../styles/common-styles.html)。

## 事件

* **通用事件** 支持所有[通用事件](../events/common-events.html)。

## Rax 示例

`rax-view` 是 `<div>` 组件的上层封装，抹平了 Web 和 Weex 的展现

```jsx
import { createElement, render } from 'rax';
import Driver from "driver-universal";
import View from "rax-view";

function App() {
  return <View
		style={{
		  width: '200rpx',
		  height: '200rpx',
		  backgroundColor: '#222831',
		}}
	/>;
}

render(<App />, document.body, { driver: Driver });
```

[rax-view 文档](https://rax.js.org/docs/components/view)

