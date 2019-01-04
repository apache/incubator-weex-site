# &lt;recycle-list&gt; <Badge text="v0.18+" type="warning"/>

## Summary

`<recycle-list>`  is a new list container with the ability to recycle and reuse, which can greatly optimize memory usage and rendering performance.

> * Please refer to [Design.md](https://github.com/Hanks10100/weex-native-directive/blob/master/Design.md) for design ideas. For details, please refer to  [Implementation.md](https://github.com/Hanks10100/weex-native-directive/blob/master/Implementation.md)
> * This feature is partially dependent on the build tool, please ensure that the version of weex-loader is up to date (v0.7.2+)
> * Use the latest version of the playground app (SDK version 0.18.0+) to scan the code for native effects, or use dotwe.org to view the web preview directly.

## Child Component
`<recycle-list>` can only use `<cell-slot>` as its immediate child node, and other nodes are invalid.

### &lt;cell-slot&gt;
`<cell-slot>` Represents a template for each item in the list, which is only used to describe the structure of the template, and does not correspond to the actual node. The number of `<cell-slot>` only indicates the number of types of templates, and the number of real list items is determined by data.

<table>
  <thead><tr><th>Attributes</th><th style="width: 90%">Description</th></tr></thead>
  <tbody>
    <tr><td>case</td><td>The type of the current template is declared, and will only be rendered if the type in the data matches the current type. The semantics are consistent with the <code>case</code> in the programming language. Only one item will be matched in all templates, matching from top to bottom in the order of the template. Once the matching is successful, the next one will not be matched.</td></tr>
    <tr><td>default</td><td>Indicates that the current template is the default template type and does not require a value. If the data item does not match any <code>case</code> type, the rendering has a <code>default</code> template. If there are multiple <code>default</code>, only the first default template will be used.</td></tr>
    <tr><td>key</td><td>An optional attribute that specifies the key values in the list data that can be uniquely identified to optimize rendering performance.</td></tr>
  </tbody>
</table>

- warning attribute omission
  - If you don't write a `switch`, use the first template with or without `case` or `default`.
  - In the case of a `switch`, `case` and `default` must be written, otherwise the template will be ignored

## Attributes
* `for`
  In `<recycle-list>`, add the `for` attribute to describe how to loop through the list's data. The syntax is similar to Vue's `v-for` directive, but it loops through its own internal nodes, not the current node. Written:
  * `alias in expression`
  * `(alias, index) in expression`
* `switch`
  Adding a `switch` attribute to the `<recycle-list> `can be used to specify the field name for the region's molecular template type in the data. The semantics are consistent with the switch in the programming language, along with the `case` and `default` attributes in `<cell-slot>`
* If the `switch` attribute is omitted, only the first` <cell-slot>` will be treated as a template and the extra template will be ignored.

```html
<recycle-list for="(item, i) in longList" switch="type">
  <cell-slot case="A">
    <text>- A {{i}} -</text>
  </cell-slot>
  <cell-slot case="B">
    <text>- B {{i}} -</text>
  </cell-slot>
</recycle-list>
```

## Recyclable component
Subcomponents used in `<recycle-list>` will also be treated as templates, and the recyclable attribute will be added to the `<template> `tag when developing the component before it can be used in `<recycle-list>`.
```vue{1}
<template recyclable>
  <div>
    <text>...</text>
  </div>
</template>
<script>
  // ...
</script>
```
> Adding the `recyclable` property does not affect the functionality of the component itself, it can still be used in other normal components.

## Precautions
### Binding of attributes and text
When binding properties or text, only expressions are supported, function calls are not supported, and filters are not supported. You can refer to the expressions supported by[Implementation.md#支持的表达式](https://github.com/Hanks10100/weex-native-directive/blob/master/Implementation.md#%E6%94%AF%E6%8C%81%E7%9A%84%E8%A1%A8%E8%BE%BE%E5%BC%8F)。

For example, the following notation is not available：
```html
<div :prop="capitalize(card.title)">
  <text>{{ card.title | capitalize }}</text>
</div>
```
For this scenario, it is recommended to use the  [computed](https://vuejs.org/v2/guide/computed.html)  property.

Because the value of the template is implemented by the client, and the definition of the function is at the front end (filter can be considered as the syntactic sugar of the function in the template), if you take the communication once every time, the rendering performance will be greatly reduced.

#### `<slot> ` unavailable

The `<cell-slot>` function and `<slot> `are partially overlapping, and are more radical, conceptually conflicting, and there are many boundary conditions that cannot be fully supported. Do not use `<slot>` in `<cell-slot> `and its subcomponents.

### `v-once` does not optimize rendering performance

Different from the understanding in the front-end framework, the logic to implement multiplexing in the client will mark the state of the template node. Adding `v-once` can ensure that the node is only rendered once, but it does not necessarily optimize the rendering performance, but may drag Comparison efficiency when slow client multiplexing nodes.

### Style feature restrictions
*Plan support*. The binding style class name (v-bind:class) is not supported in the current version. For reasons and progress, please refer to  [#14](https://github.com/Hanks10100/weex-native-directive/issues/14).

### Two-way binding
*Plan support*. The `v-model` has not been tuned yet. Please do not use it for the time being.

### Subcomponent restrictions
* No Virtual DOM!
  The components used in `<recycle-list>` do not have Virtual DOM! Features related to Virtual DOM are also not supported. Try to process only the data during the development process, and do not operate the generated nodes.

  The following properties are no longer meaningful, please do not use:

  * `vm.$el`
  * `vm.$refs.xxx`
  * `vm.$vnode`
  * `vm.#slots`
  * `vm.#scopedSlots`

  The values in `vm.$refs` may be arrays, instances of subcomponents, DOM elements, which are commonly used in front ends. If not supported, the functionality of the `dom` module and `animation` module in Weex also has an effect.

  The technical solution is currently being discussed, some of the interfaces may be redesigned, or an interface designed for` <recycle-list>` will be available on `vm`.

* Component properties
  The properties of the current subcomponent do not support functions. (Discussing the implementation plan)

  ```html
  <sub-component :prop="item.xxx" />
  ```
  Because the subcomponent's attribute values need to be passed between the front end and the client, only serializable values are supported. The type of `item.xxx` can be an object, an array, a string, a number, a boolean, etc., and functions are not supported.

* Life cycle behavioral differences

  Since the rendering of the list has a recycling mechanism, whether the node is rendered or not is also related to the user's scrolling behavior, and the lifecycle behavior of the component may be inconsistent.

  Recyclable long lists do not render all nodes immediately, only when they are about to scroll into the visible area (and scrollable safe area), the semantics of the component lifecycle does not change, but the trigger is delayed.

  Suppose there are 100 pieces of data, one piece of data corresponds to one component. When the first screen is rendered, only the nodes of 8 data can be displayed. Only the first 8 components are created, and only the lifecycle of the first 8 components is triggered.

  - The component's `beforeCreate` and `created` will only fire when the component is about to be created and created.
  - Similarly, the component's `beforeMount` and `mounted` only the page is actually rendered to the component, and will only fire when it is about to be mounted and already mounted.

* Component custom event
  Plan support. Features such as `vm.$on`, `vm.$once`, `vm.$emit`, `vm.$off` are not fully tuned, the interface is available, but the behavior may be slightly different (parameters are missing), do not use it for the time being.

## Demo
```html
<recycle-list for="(item, i) in longList" switch="type">
  <cell-slot case="A">
    <text>- A {{i}} -</text>
  </cell-slot>
  <cell-slot case="B">
    <text>- B {{i}} -</text>
  </cell-slot>
</recycle-list>
```
If you have the following data:
```js
const longList = [
  { type: 'A' },
  { type: 'B' },
  { type: 'B' },
  { type: 'A' },
  { type: 'B' }
]
```
The following equivalent nodes are generated:
```html
<text>- A 0 -</text>
<text>- B 1 -</text>
<text>- B 2 -</text>
<text>- A 3 -</text>
<text>- B 4 -</text>
```
If you merge the templates into one, you can also omit the `switch` and `case` to further simplify the example:
```html
<recycle-list for="(item, i) in longList">
  <cell-slot>
    <text>- {{item.type}} {{i}} -</text>
  </cell-slot>
</recycle-list>
```
More demos：

**Template syntax**

* [Binding text](http://dotwe.org/vue/33688e1ad843fd2a1b9f1f27a3905b9c)（[normal list](http://dotwe.org/vue/99e44cbc137d4e3ab841c88fedd91d7c)）
* [Binding property `v-bind`](http://dotwe.org/vue/b4223fd71c93c89ba75a1876b0832772)（[normal list](http://dotwe.org/vue/a43685d00842f0558857b7942a74621a)）
* [Cycle `v-for`](http://dotwe.org/vue/7e34f1998a0a04ff11d4c30727b3e1b6)（[normal list](http://dotwe.org/vue/fbd22af052d8855a0da0d2eacee322e4)）
* [Multi-layer loop](http://dotwe.org/vue/a633e1932c67f59a4c1a6b84aba7c2d0)（[normal list](http://dotwe.org/vue/3368f34c62d58b083e9e6de22acafe4d)）
* [Conditional rendering `v-if`/`v-else`/`v-else-if`](http://dotwe.org/vue/96cc151e9798bfa43aa029767f66a68b)（[normal list](http://dotwe.org/vue/92bd285b3419f34fe16a72604e10b4ff)）
* [Binding event `v-on`](http://dotwe.org/vue/f3f72eb4e4e7b39223f174cf9a0d1875)（[normal list](http://dotwe.org/vue/88039631a296bd6d41271cd36727d914)）
* [One-time rendering `v-once`](http://dotwe.org/vue/fc6c08e80ebeebe4cde6f16af88eb3e8)（[normal list]list](http://dotwe.org/vue/e2dde8bf1fa3d121eea824087181ee19)）
* [Binding style](http://dotwe.org/vue/2bf86e5c2aaff1d1a0eec30abc3713b5)（[normal list](http://dotwe.org/vue/db6d50253d88f7670a69cf0225d3c893)）
* [loadmore](http://dotwe.org/vue/efeb1d42226b8b919df0a9a314ef0648)（[normal list](http://dotwe.org/vue/107b622dbf231a56b6da7ad49985bd17)）
* [Complex pressure test example](http://dotwe.org/vue/dc9ef31c0304e7d1d27f0d0baa677b57)（[normal list](http://dotwe.org/vue/da8361cd2f614a26e97ceec6316fe0d7)）
* [Unlimited list](http://dotwe.org/vue/1a2f6cd2edcd2edcd3a6d9906b7cfd6a)（[normal list](http://dotwe.org/vue/6e6dceed2accc3be39c61fac58dc4440)）

**Using subcomponents**
* [Pure static subcomponent](http://dotwe.org/vue/68e405753d8c3c2a8168185140ac08bb)（[normal list](http://dotwe.org/vue/d7ea3addbd445d7ef51151f84af64c01)）
* [no status, have props](http://dotwe.org/vue/89c177e6336ad7789ef500bc2daf61bb)（[normal list](http://dotwe.org/vue/451afc28c004b62cec9fa1c46e56c2d5)）
* [props update](http://dotwe.org/vue/37056065a0a2c104e73dd550f252fabc)（[normal list](http://dotwe.org/vue/778e93001e573ea0bbe9fc332a6a1e6c)）
* [Internal state](http://dotwe.org/vue/baeda092d257d91d8c9c216e91ba350a)（[normal list](http://dotwe.org/vue/a6e19f26653c890544c1036a7e9d2722)）
* [computed & watch](http://dotwe.org/vue/c9ab8a26fb10fb163891ac58b2322671)（[normal list](http://dotwe.org/vue/5e13c37f136fde456da311e5ddf17324)）
* [Remove component](http://dotwe.org/vue/c63e11f62c8f50d6120d56f97253a1b6)（[normal list](http://dotwe.org/vue/a9d299cbf2870c99b32df047ed0c4265)）
