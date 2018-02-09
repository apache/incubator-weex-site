---
title: <recycle-list>
type: references
group: 内置组件
order: 8.09
version: 2.1
---

<!-- toc -->

`<recycle-list>` <span class="api-version">v0.18+</span> 是一个新的列表容器，具有回收和复用的能力，可以大幅优化内存占用和渲染性能。

> 设计思路请参考 [Design.md](https://github.com/Hanks10100/weex-native-directive/blob/master/Design.md)，具体的实现细节请参考 [Implementation.md](https://github.com/Hanks10100/weex-native-directive/blob/master/Implementation.md)。

## 基本用法

原有 `<list>` 和 `<cell>` 组件的功能不受影响，针对新功能提供了新的 `<recycle-list>` 和 `<cell-slot>` 组件。如果想利用列表回收和复用的特性，使用新组件即可。

> 该功能部分依赖与编译工具，请确保 `weex-loader` 的版本升级到最新（v0.7.2+）。

## `<recycle-list>`

`<recycle-list>` 是一个新的列表容器，只能使用 `<cell-slot>` 作为其直接子节点，使用其他节点无效。

### `for` 属性

在 `<recycle-list>` 添加 `for` 属性即可描述如何循环展开列表的数据，语法和 Vue 的 `v-for` 指令类似，但是它循环的是自己内部的子节点，并不是当前节点。

`for` 属性支持如下两种写法：

+ `alias in expression`
+ `(alias, index) in expression`

### `switch` 属性

在 `<recycle-list>` 添加 `switch` 属性可以用来指定数据中用于区分子模板类型的字段名，语义和编程语言里的 `switch` 一致，配合 `<cell-slot>` 中的 `case` 和 `default` 属性一起使用。

如果省略了 `switch` 属性，则只会将第一个 `<cell-slot>` 视为模板，多余的模板将会被忽略。

## `<cell-slot>`

`<cell-slot>` 代表的是列表每一项的**模板**，它只用来描述模板的结构，并不对应实际的节点。`<cell-slot>` 的个数只表示模板的种类数，真实列表项的个数是由数据决定的。

### `case` 属性

声明了当前模板的类型，只有和数据中的类型与当前类型匹配时才会渲染，语义和编程语言里的 `case` 一致。

所有模板中最多只会匹配到一项，按照模板的顺序从上到下匹配，一旦匹配成功就不在继续匹配下一个。

### `default` 属性

表示当前模板为默认模板类型，不需要指定值。如果数据项没有匹配到任何 `case` 类型，则渲染带有 `default` 模板。如果存在多个 `default`，则只会使用第一个默认模板。

### `key` 属性

可选属性，用于指定列表数据中可以作为唯一标识的键值，可以优化渲染性能。

### 属性的省略

+ 如果没写 `switch`，无论有没有写 `case` 或 `default`，都只使用第一个模板。
+ 在写了 `switch` 的情况下，`case` 和 `default` 必须写一个，否则该模板将会被忽略。

## 可复用的组件

在 `<recycle-list>` 中使用的子组件也将被视为模板，在开发组件时给 `<template>` 标签添加 `recyclable` 属性，才可以用在 `<recycle-list>` 中。

```html
<template recyclable>
  <div>
    <text>...</text>
  </div>
</template>
<script>
  // ...
</script>
```

> 添加了 `recyclable` 属性并不会影响组件本身的功能，它仍然可以用其他在正常的组件里。

## 实例

在上层语法中的使用方式如下：

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

### 使用子组件

在 `<recycle-list>` 中使用了组件 `<banner>`：

```html
<recycle-list for="(item, i) in labels">
  <cell-slot>
    <banner></banner>
  </cell-slot>
</recycle-list>
```

`<banner>` 组件的定义如下：

```html
<template recyclable>
  <text class="title">BANNER</text>
</template>
```

更多细节可以参考：[完整代码](http://dotwe.org/vue/4a7446690e2c87ec0d39d8ee4884fa19)。

## 注意事项

### 属性和文本的绑定

绑定属性或者文本时，仅支持表达式，不支持函数调用，也不支持使用 filter，可以参考 [Implementation.md#支持的表达式](https://github.com/Hanks10100/weex-native-directive/blob/master/Implementation.md#%E6%94%AF%E6%8C%81%E7%9A%84%E8%A1%A8%E8%BE%BE%E5%BC%8F)。

例如，下列写法不可用：

```html
<div :prop="capitalize(card.title)">
  <text>{{ card.title | capitalize }}</text>
</div>
```

> 针对这种场景，推荐使用 [`computed` 属性](https://vuejs.org/v2/guide/computed.html)来实现。

因为模板的取值是由客户端实现的，而函数的定义在前端（filter 可以认为是在模板里调用函数的语法糖），如果每次取值都走一次通信的话，会大幅降低渲染性能。

### `<slot>` 不可用

`<cell-slot>` 的功能和 [`<slot>`](https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots) 有部分重叠，而且更为激进，在概念上有冲突，存在很多边界情况无法完全支持。不要在 `<cell-slot>` 及其子组件里使用 `<slot>`。

### v-once 不会优化渲染性能

和前端框架中的理解不同，客户端里要实现复用的逻辑，会标记模板节点的状态，添加了 `v-once` 能保证节点只渲染一次，但是并不一定能优化渲染性能，反而可能会拖慢客户端复用节点时的比对效率。

### 样式功能的限制

> **计划支持**

目前版本里还不支持绑定样式类名（`v-bind:class`），原因和进展可以参考 [#14](https://github.com/Hanks10100/weex-native-directive/issues/14)。

### 双向绑定

> **计划支持**

`v-model` 还未调通，暂时不要使用。

### 子组件的限制

#### 没有 Virtual DOM！

使用在 `<recycle-list>` 中的组件没有 Virtual DOM！与 Virtual DOM 相关的功能也不支持。在开发过程中尽量只处理数据，不要操作生成后的节点。

下列这些属性都不再有意义，请不要使用：

+ `vm.$el`
+ `vm.$refs.xxx`
+ `vm.$vnode`
+ `vm.#slots`
+ `vm.#scopedSlots`

`vm.$refs` 里的值可能是数组、子组件的实例、DOM 元素，在前端里比较常用，如果不支持对 Weex 里的 [`dom` 模块](../modules/dom.html)和 [`animation` 模块](../modules/animation.html)的功能也有影响。目前正在讨论技术方案，部分接口可能会重新设计，或者是在 `vm` 上透出专为 `<recycle-list>` 设计的接口。

#### 组件的属性

目前子组件的属性不支持函数。（正在讨论实现方案）

```html
<sub-component :prop="item.xxx" />
```

因为子组件的属性值需要在前端和客户端之间传递，所以仅支持可序列化的值。`item.xxx` 的类型可以是对象、数组、字符串、数字、布尔值等，不支持函数。

#### 生命周期的行为差异

由于列表的渲染存在回收机制，节点渲染与否也与用户的滚动行为有关，组件的生命周期行为会有一些不一致。

可回收长列表不会立即渲染所有节点，只有即将滚动到可视区域（以及可滚动的安全区域）内时才开始渲染，组件生命周期的语义没变，但是会延迟触发。

假设有 100 条数据，一条数据了对应一个组件。渲染首屏时只能展示 8 条数据的节点，那就只有前 8 个组件被创建了，也只有前 8 个组件的生命周期被触发。

+ 组件的 `beforeCreate` 和 `created` 也只有在组件*即将创建*和*创建完成*时才会触发。
+ 同理，组件的 `beforeMount` 和 `mounted` 也只有页面真正渲染到了该组件，在*即将挂载*和*已经挂载*时才会触发。
+ 修改处于屏幕外的组件的数据，不一定会触发 `beforeUpdate` 和 `updated` 生命周期。（行为未定义，需要进一步排查）

#### 组件的自定义事件

> **计划支持**

`vm.$on`, `vm.$once`, `vm.$emit`, `vm.$off` 等功能还未完全调通，接口可用，但是行为可能有些差异（参数丢失），暂时不要使用。

## 更多例子

> Web 版本的 `<recycle-list>` 还正在开发，online playground 上暂时无法预览效果，使用最新版的 playground app（SDK 版本 0.18.0 及以上）才可以扫码查看原生效果。

**模板语法**

+ [绑定文本](http://dotwe.org/vue/5b25755d7371d16b3d000e0d173a5cab) ([普通 list](http://dotwe.org/vue/0f7f1c1f0a3271ed30a0c5adb6938976))
+ [绑定属性 `v-bind`](http://dotwe.org/vue/6455e2e8c1a717f9c09363ec9be663d1) ([普通 list](http://dotwe.org/vue/f6a37fbeb5d7abf2d8c4875862b49ebc))
+ [循环 `v-for`](http://dotwe.org/vue/966e644a4cbbbc401ab431889dc48677) ([普通 list](http://dotwe.org/vue/89921581f43493e6bbb617e63be267b6))
+ [多层循环](http://dotwe.org/vue/20a9681f9201ef1b7a68962fd9cb5eb5) ([普通 list](http://dotwe.org/vue/8a961f87c6db8e0aa221748d037b6428))
+ [条件渲染 `v-if`/`v-else`/`v-else-if`](http://dotwe.org/vue/a645db4b73bd7c1cde669f91c7f70f3a) ([普通 list](http://dotwe.org/vue/01a1ce5b9b868de7b0e4d193110471c8))
+ [绑定事件 `v-on`](http://dotwe.org/vue/34bb833828861bf37e9d0574241d7c82) ([普通 list](http://dotwe.org/vue/7cdb9f7819f31ea38219b8b61dc87a3f))
+ [一次性渲染 `v-once`](http://dotwe.org/vue/d515a48f5a4112bbe8d5ac80c315bb44) ([普通 list](http://dotwe.org/vue/502bbd141010d3d1019dd8cbcc538d71))
+ [绑定样式](http://dotwe.org/vue/d093c67d49c4e4388994fead4d1649d1) ([普通 list](http://dotwe.org/vue/fe129e413d8a7ea5c90fcf2b5e5894a8))
+ [loadmore](http://dotwe.org/vue/89c51e90246286ad921b2fd20ccae339) ([普通 list](http://dotwe.org/vue/16a6ea76882bc4802874131cc48fa82b))
+ [复杂压测例子](http://dotwe.org/vue/593bb4f3fa7ac1d5da5b2906fa4c8bb0) ([普通 list](http://dotwe.org/vue/07734d19b15e3528c2f7b68ba870126f))
+ [无限列表](http://dotwe.org/vue/720573134b13f1164fe38df867dd2835) ([普通 list](http://dotwe.org/vue/d1a5ab3ca315d4aae782af8b3032dc42))

**使用子组件**

+ [纯静态子组件](http://dotwe.org/vue/4a7446690e2c87ec0d39d8ee4884fa19) ([普通 list](http://dotwe.org/vue/1ab67bd0f19d5cf17fc358d73801f238))
+ [无状态，有 props](http://dotwe.org/vue/f716dfc90f7ec0f2ec142c45d814b76f) ([普通 list](http://dotwe.org/vue/42039b1ed8484c98051cc2fd1ee542bc))
+ [props 更新](http://dotwe.org/vue/3e4ba91f5333caa531a75cbdc54a8b70) ([普通 list](http://dotwe.org/vue/8cdc3565e66c86190c8f6cd6d0e4c20d))
+ [有内部状态](http://dotwe.org/vue/8b068a890470a8cbc737966d9e82d23a) ([普通 list](http://dotwe.org/vue/46076bc2bdd90d3e0b028994b053ef6d))
+ [computed & watch](http://dotwe.org/vue/56ae40a63d7b02bb7e55a1fbfbefeb76) ([普通 list](http://dotwe.org/vue/c96218775a65b405368025fa81be0609))
+ [移除组件](http://dotwe.org/vue/769285a865b9d2f4e8d8cb7e5340012c) ([普通 list](http://dotwe.org/vue/b217c818532cf2b1b488be8987d60efa))
