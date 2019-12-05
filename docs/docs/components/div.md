# &lt;div&gt;

## Summary

`<div>` is the base container component.

::: tip
* Don't add text in `<div>`directly. Use `<text>` instead.
* In Weex, `<div>` cannot scroll.
* Depth level of `<div>` should be controlled for better performance. We sugges lower than 14 depth level.
:::

## Child Components

`<div>` supports all kinds of components as it child including `<div>`.

## Styles

* **common styles**. Check out [common styles](../styles/common-styles.html).

## Events

* **common events**. Check out [common events](../events/common-events.html).

## Rax Example

`rax-view` is the component `<div>` of rax, which can run in web and weex.

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

[rax-view doc](https://rax.js.org/docs/components/view)

