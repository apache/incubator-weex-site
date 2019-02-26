# &lt;recycle-list&gt; <Badge text="v0.18+" type="warning"/>

## 简介

`<recycle-list>` 是一个新的列表容器，具有回收和复用的能力，可以大幅优化内存占用和渲染性能。
> * 设计思路请参考 [Design.md](https://github.com/Hanks10100/weex-native-directive/blob/master/Design.md)，具体的实现细节请参考 [Implementation.md](https://github.com/Hanks10100/weex-native-directive/blob/master/Implementation.md)
> * 该功能部分依赖于编译工具，请确保 weex-loader 的版本升级到最新（v0.7.2+）
> * 使用最新版的 playground app（SDK 版本 0.18.0 及以上）才可以扫码查看原生效果，也可以直接使用dotwe查看Web预览效果

## 子组件
`<recycle-list>` 只能使用 `<cell-slot>` 作为其直接子节点，使用其他节点无效。

### &lt;cell-slot&gt;
`<cell-slot>` 代表的是列表每一项的模板，它只用来描述模板的结构，并不对应实际的节点。`<cell-slot>` 的个数只表示模板的种类数，真实列表项的个数是由数据决定的。

<table>
  <thead><tr><th>属性</th><th style="width: 90%">说明</th></tr></thead>
  <tbody>
    <tr><td>case</td><td>声明了当前模板的类型，只有和数据中的类型与当前类型匹配时才会渲染，语义和编程语言里的 <code>case</code> 一致。<br>所有模板中最多只会匹配到一项，按照模板的顺序从上到下匹配，一旦匹配成功就不在继续匹配下一个。</td></tr>
    <tr><td>default</td><td>表示当前模板为默认模板类型，不需要指定值。如果数据项没有匹配到任何 <code>case</code> 类型，则渲染带有 <code>default</code> 模板。如果存在多个 <code>default</code>，则只会使用第一个默认模板。</td></tr>
    <tr><td>key</td><td>可选属性，用于指定列表数据中可以作为唯一标识的键值，可以优化渲染性能。</td></tr>
  </tbody>
</table>
- warning 属性的省略
  - 如果没写 `switch`，无论有没有写 `case` 或 `default`，都只使用第一个模板
  - 在写了 `switch` 的情况下，`case` 和 `default` 必须写一个，否则该模板将会被忽略


## 属性
* `for`  
  在 `<recycle-list>` 添加 `for` 属性即可描述如何循环展开列表的数据，语法和 Vue 的 `v-for` 指令类似，但是它循环的是自己内部的子节点，并不是当前节点。写法：
  * `alias in expression`
  * `(alias, index) in expression`
* `switch`  
  在 `<recycle-list>` 添加 `switch` 属性可以用来指定数据中用于区分子模板类型的字段名，语义和编程语言里的 switch 一致，配合 `<cell-slot>` 中的 `case` 和 `default` 属性一起使用。<br>如果省略了 `switch` 属性，则只会将第一个 `<cell-slot>` 视为模板，多余的模板将会被忽略。

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

## 可复用的组件
在 `<recycle-list>` 中使用的子组件也将被视为模板，在开发组件时给 `<template>` 标签添加 recyclable 属性，才可以用在 `<recycle-list>` 中。
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
> 添加了 `recyclable` 属性并不会影响组件本身的功能，它仍然可以用在其他正常的组件里。

## 注意事项
### 属性和文本的绑定
绑定属性或者文本时，仅支持表达式，不支持函数调用，也不支持使用 filter，可以参考 [Implementation.md#支持的表达式](https://github.com/Hanks10100/weex-native-directive/blob/master/Implementation.md#%E6%94%AF%E6%8C%81%E7%9A%84%E8%A1%A8%E8%BE%BE%E5%BC%8F)。

例如，下列写法不可用：
```html
<div :prop="capitalize(card.title)">
  <text>{{ card.title | capitalize }}</text>
</div>
```
针对这种场景，推荐使用 [computed](https://vuejs.org/v2/guide/computed.html) 属性来实现。  
因为模板的取值是由客户端实现的，而函数的定义在前端（filter 可以认为是在模板里调用函数的语法糖），如果每次取值都走一次通信的话，会大幅降低渲染性能。

### `<slot>`不可用
`<cell-slot>` 的功能和 `<slot>` 有部分重叠，而且更为激进，在概念上有冲突，存在很多边界情况无法完全支持。不要在 `<cell-slot>` 及其子组件里使用 `<slot>`。

### v-once 不会优化渲染性能
和前端框架中的理解不同，客户端里要实现复用的逻辑，会标记模板节点的状态，添加了 `v-once` 能保证节点只渲染一次，但是并不一定能优化渲染性能，反而可能会拖慢客户端复用节点时的比对效率。

### 样式功能的限制
*计划支持*。目前版本里还不支持绑定样式类名（`v-bind:class`），原因和进展可以参考 [#14](https://github.com/Hanks10100/weex-native-directive/issues/14)。

### 双向绑定
*计划支持*。`v-model` 还未调通，暂时不要使用。

### 子组件的限制
* 没有 Virtual DOM！
  使用在 `<recycle-list>` 中的组件没有 Virtual DOM！与 Virtual DOM 相关的功能也不支持。在开发过程中尽量只处理数据，不要操作生成后的节点。

  下列这些属性都不再有意义，请不要使用：
  * `vm.$el`
  * `vm.$refs.xxx`
  * `vm.$vnode`
  * `vm.#slots`
  * `vm.#scopedSlots`  

  `vm.$refs` 里的值可能是数组、子组件的实例、DOM 元素，在前端里比较常用，如果不支持，对 Weex 里的 `dom` 模块和 `animation` 模块的功能也有影响。

  目前正在讨论技术方案，部分接口可能会重新设计，或者是在 `vm` 上透出专为 `<recycle-list>` 设计的接口。

* 组件的属性
  目前子组件的属性不支持函数。（正在讨论实现方案）

  ```html
  <sub-component :prop="item.xxx" />
  ```
  因为子组件的属性值需要在前端和客户端之间传递，所以仅支持可序列化的值。`item.xxx` 的类型可以是对象、数组、字符串、数字、布尔值等，不支持函数。

* 生命周期的行为差异
  由于列表的渲染存在回收机制，节点渲染与否也与用户的滚动行为有关，组件的生命周期行为会有一些不一致。

  可回收长列表不会立即渲染所有节点，只有即将滚动到可视区域（以及可滚动的安全区域）内时才开始渲染，组件生命周期的语义没变，但是会延迟触发。

  假设有 100 条数据，一条数据了对应一个组件。渲染首屏时只能展示 8 条数据的节点，那就只有前 8 个组件被创建了，也只有前 8 个组件的生命周期被触发。

  * 组件的 `beforeCreate` 和 `created` 也只有在组件即将创建和创建完成时才会触发
  * 同理，组件的 `beforeMount` 和 `mounted` 也只有页面真正渲染到了该组件，在即将挂载和已经挂载时才会触发

* 组件的自定义事件  
  *计划支持*。`vm.$on`, `vm.$once`, `vm.$emit`, `vm.$off` 等功能还未完全调通，接口可用，但是行为可能有些差异（参数丢失），暂时不要使用。

## 示例
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
如果有如下数据：
```js
const longList = [
  { type: 'A' },
  { type: 'B' },
  { type: 'B' },
  { type: 'A' },
  { type: 'B' }
]
```
则会生成如下等价节点：
```html
<text>- A 0 -</text>
<text>- B 1 -</text>
<text>- B 2 -</text>
<text>- A 3 -</text>
<text>- B 4 -</text>
```
如果将模板合并成一个，也可以省略 `switch` 和 `case`，将例子进一步简化：
```html
<recycle-list for="(item, i) in longList">
  <cell-slot>
    <text>- {{item.type}} {{i}} -</text>
  </cell-slot>
</recycle-list>
```
更多示例：  

**模板语法**
* [绑定文本](http://dotwe.org/vue/33688e1ad843fd2a1b9f1f27a3905b9c)（[普通list](http://dotwe.org/vue/99e44cbc137d4e3ab841c88fedd91d7c)）
* [绑定属性 `v-bind`](http://dotwe.org/vue/b4223fd71c93c89ba75a1876b0832772)（[普通list](http://dotwe.org/vue/a43685d00842f0558857b7942a74621a)）
* [循环 `v-for`](http://dotwe.org/vue/7e34f1998a0a04ff11d4c30727b3e1b6)（[普通list](http://dotwe.org/vue/fbd22af052d8855a0da0d2eacee322e4)）
* [多层循环](http://dotwe.org/vue/a633e1932c67f59a4c1a6b84aba7c2d0)（[普通list](http://dotwe.org/vue/3368f34c62d58b083e9e6de22acafe4d)）
* [条件渲染 `v-if`/`v-else`/`v-else-if`](http://dotwe.org/vue/96cc151e9798bfa43aa029767f66a68b)（[普通list](http://dotwe.org/vue/92bd285b3419f34fe16a72604e10b4ff)）
* [绑定事件 `v-on`](http://dotwe.org/vue/f3f72eb4e4e7b39223f174cf9a0d1875)（[普通list](http://dotwe.org/vue/88039631a296bd6d41271cd36727d914)）
* [一次性渲染 `v-once`](http://dotwe.org/vue/fc6c08e80ebeebe4cde6f16af88eb3e8)（[普通list](http://dotwe.org/vue/e2dde8bf1fa3d121eea824087181ee19)）
* [绑定样式](http://dotwe.org/vue/2bf86e5c2aaff1d1a0eec30abc3713b5)（[普通list](http://dotwe.org/vue/db6d50253d88f7670a69cf0225d3c893)）
* [loadmore](http://dotwe.org/vue/efeb1d42226b8b919df0a9a314ef0648)（[普通list](http://dotwe.org/vue/107b622dbf231a56b6da7ad49985bd17)）
* [复杂压测例子](http://dotwe.org/vue/dc9ef31c0304e7d1d27f0d0baa677b57)（[普通list](http://dotwe.org/vue/da8361cd2f614a26e97ceec6316fe0d7)）
* [无限列表](http://dotwe.org/vue/1a2f6cd2edcd2edcd3a6d9906b7cfd6a)（[普通list](http://dotwe.org/vue/6e6dceed2accc3be39c61fac58dc4440)）

**使用子组件**
* [纯静态子组件](http://dotwe.org/vue/68e405753d8c3c2a8168185140ac08bb)（[普通list](http://dotwe.org/vue/d7ea3addbd445d7ef51151f84af64c01)）
* [无状态，有 props](http://dotwe.org/vue/89c177e6336ad7789ef500bc2daf61bb)（[普通list](http://dotwe.org/vue/451afc28c004b62cec9fa1c46e56c2d5)）
* [props 更新](http://dotwe.org/vue/37056065a0a2c104e73dd550f252fabc)（[普通list](http://dotwe.org/vue/778e93001e573ea0bbe9fc332a6a1e6c)）
* [有内部状态](http://dotwe.org/vue/baeda092d257d91d8c9c216e91ba350a)（[普通list](http://dotwe.org/vue/a6e19f26653c890544c1036a7e9d2722)）
* [computed & watch](http://dotwe.org/vue/c9ab8a26fb10fb163891ac58b2322671)（[普通list](http://dotwe.org/vue/5e13c37f136fde456da311e5ddf17324)）
* [移除组件](http://dotwe.org/vue/c63e11f62c8f50d6120d56f97253a1b6)（[普通list](http://dotwe.org/vue/a9d299cbf2870c99b32df047ed0c4265)）