---
pageClass: page-vue-in-weex
---
自2016年2月17日发布 WeexSDK v0.10.0 后， Weex 集成了 v2 版本的 [Vue](https://vuejs.org/)。
> 如果没有特别指示，文章中的 “Vue.js” 或者 “Vue” 都指的是 v2 版本的 Vue。

## 只含有运行时的构建版本
如果你熟悉 Vue.js，你应该知道 Vue.js 有两种构建版本: [运行时 + 编译器 与 只包含运行时](https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6)。它们之间的区别在于编译器是否需要能够在运行时编译 `template` 选项。由于运行时构建版本比完整版本的构建版本轻约30%，为了更好的性能和更少的代码尺寸，Weex用的是只包含运行时的方式构建 Vue。

具体来说，差异如下：

- 定义组件时不支持 `template` 选项
- 不支持使用 `x-templates`
- 不支持使用 `Vue.compile`

## 平台的差异
Vue.js 最初是为 Web 平台设计的。虽然可以基于 Weex 开发原生应用程序，但是仍然存在许多差异。与 Web 平台的主要差异是: 上下文、DOM、样式和事件。
### Weex 环境中没有 DOM
DOM（Document Object Model），即文档对象模型，是 HTML 和 XML 文档的编程接口，是 Web 中的概念。Weex 的运行环境以原生应用为主，在 Android 和 iOS 环境中渲染出来的是原生的组件，不是 DOM Element。
#### 不支持 DOM 操作
既然原生环境中不支持 Web API，没有 `Element` 、`Event` 、`File` 等对象，详细列表可以参考 [Web APIs on MDN](https://developer.mozilla.org/en-US/docs/Web/docs)。不支持选中元素，如 `document.getElementById` 、 `document.querySelector` 等；当然也不支持基于 DOM API 的程序库（如 jQuery）。
#### 有限的事件类型
Weex 支持在标签上绑定事件，和在浏览器中的写法一样，但是 Weex 中的事件是由原生组件捕获并触发的，行为和浏览器中有所不同，事件中的属性也和 Web 中有差异。
- 并不支持 Web 中所有的事件类型，详情请参考《通用事件》。
- 不区分事件的捕获阶段和冒泡阶段，相当于 DOM 0 级事件。

### Weex 环境中没有 BOM
BOM（Browser Object Model），即浏览器对象模型，是浏览器环境为 javascript 提供的接口。Weex 在原生端没有并不基于浏览器运行，不支持浏览器提供的 BOM 接口。
#### 没有 window 、screen 对象
Weex 中并未提供浏览器中的 `window` 和 `screen` 对象，不支持使用全局变量。如果是想要获取设备的屏幕或环境信息，可以使用 `WXEnvironment` 变量。
- `WXEnvironment`
  - `weexVersion`: WeexSDK 的版本
  - `appName`: 应用的名称
  - `appVersion`: 应用的版本
  - `platform`: 运行平台，可能的值是 `Web` 、`Android` 、`iOS` 之一
  - `osName`: 系统的名称
  - `osVersion`: 系统版本
  - `deviceWidth`: 设备宽度
  - `deviceHeight`: 设备高度
#### 没有 history 、location 、navigator 对象
- `history` 保存了当前页面的历史记录，并且提供了前进后退操作
- `location` 记录了当前页面 URL 相关的信息
- `navigator` 记录了当前浏览器中的信息

这些接口与浏览器自身的实现有关，可以控制页面的前进后退并且获取状态信息。虽然在 Android 和 iOS 中也有“历史”和“导航”的概念，但是它是用于多个管理视图之间的跳转的。换句话说，在浏览器中执行“前进”、“后退”仍然会处于同一个页签中，在原生应用中“前进”、“后退”则会真实的跳转到其他页面。

此外 Weex 也提供了 `navigator` 模块来操作页面的跳转，使用方法参考 [内置模块-navigator](/zh/docs/navigator.html)。

### 能够调用移动设备原生 API
在 Weex 中能够调用移动设备原生 API，使用方法是通过注册、调用模块来实现。其中有一些模块是 Weex 内置的，如 [clipboard](/zh/docs/clipboard.html) 、 [navigator](/zh/docs/navigator.html) 、[storage](/zh/docs/storage.html) 等。

为了保持框架的通用性，Weex 内置的原生模块有限，不过 Weex 提供了横向扩展的能力，可以扩展原生模块，具体的扩展方法请参考[《iOS 扩展》](http://weex.apache.org/cn/guide/extend-ios.html) 和[《Android 扩展》](http://weex.apache.org/cn/guide/extend-android.html)。
::: warning 提示
有些接口在浏览器环境中也存在，不过在使用时应该注意浏览器的兼容性；如剪贴板功能，出于安全性考虑，绝大多数浏览器都限制其使用。
:::


## Web 渲染器
如果你想在网络上呈现你的页面，你需要 [weex-vue-render](https://github.com/weexteam/weex-vue-render) 来实现它。  

`weex-vue-render` 是 Vue DSL 的 Web 渲染器， 它在 Web 上实现了 Weex 的内置组件和内置模块。

## 单文件组件
Vue 中的[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)（即*.vue文件）是一种特殊的文件格式，扩展名为 `.vue`。这个模板会在构建时编译到 `render` 函数里。
> 在 Weex 中使用单个文件组件语法是一种很好的做法。

### 编译目标
因为平台的差异以及为了提高网络性能，`*.vue` 文件需要用两种不同的方式来编译：
- 对于 Web 平台来说，你可以用任何正式的方式来编译源文件，例如 使用 Webpack + vue-loader 或者 Browserify + vueify 来编译 `*.vue` 文件。
- 对于安卓与 iOS 平台来说， 你需要使用 [weex-loader](https://github.com/weexteam/weex-loader) 来编译 `*.vue` 文件。

不同的平台使用不同的 js 构建产物，可以充分利用平台原有的特性，减少构建时的兼容性代码。但是源代码仍然是一样的，唯一的区别是编译它的方法。

### 使用 weex-loader
[weex-loader](https://github.com/weexteam/weex-loader) 是一个 webpack 的 loader，它能把 `*.vue` 文件转化为简单的 javascript 模块用于安卓以及 iOS 平台。

需要注意的是，如果你的 Webpack 配置的 `entry` 选项是一个 `*.vue` 文件的话，你仍需要传递一个额外的 `entry` 参数。
```js{3}
const webpackConfig = {
  // Add the entry parameter for the .vue file
  entry: './path/to/App.vue?entry=true',
  use: {
    loaders: [{
      // matches the .vue file path which contains the entry parameter
      test: /\.vue(\?^^]+)?$/,
      loaders: ['weex-loader']
    }]
  }
}
```
如果你现在用的是 `.js` 文件做入口文件，你不需要写那些额外的参数。推荐 webpack 配置的入口文件使用 javascript 文件。
```js
{
  entry: './path/to/entry.js'
}
```

## 支持的功能

### 全局配置
::: warning 注意
Vue “全局”配置只会影响 Weex 上的单一页面，配置不会在不同的 Weex 页面之间共享。
:::
| Vue 全局配置 | 是否支持 | 说明 |
| ---------- | --------- | ---- |
| [Vue.config.silent](https://cn.vuejs.org/v2/docs/#silent) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.config.optionMergeStrategies](https://cn.vuejs.org/v2/docs/#optionMergeStrategies) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.config.devtools](https://cn.vuejs.org/v2/docs/#devtools) | <span style="color: #900">不支持</span> | 只在 Web 环境下支持 |
| [Vue.config.errorHandler](https://cn.vuejs.org/v2/docs/#errorHandler) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.config.warnHandler](https://cn.vuejs.org/v2/docs/#warnHandler) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.config.ignoredElements](https://cn.vuejs.org/v2/docs/#ignoredElements) | <span style="color: #3eaf7c">支持</span> | 不推荐 |
| [Vue.config.keyCodes](https://cn.vuejs.org/v2/docs/#keyCodes) | <span style="color: #900">不支持</span> | 在移动端无用 |
| [Vue.config.performance](https://cn.vuejs.org/v2/docs/#performance) | <span style="color: #900">不支持</span> | 只在 Web 环境下支持 |
| [Vue.config.productionTip](https://cn.vuejs.org/v2/docs/#productionTip) | <span style="color: #3eaf7c">支持</span> | - |

### 全局 API
| Vue 全局 API | 是否支持 | 说明 |
| ---------- | --------- | ---- |
| [Vue.extend](https://cn.vuejs.org/v2/docs/#Vue-extend) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.nextTick](https://cn.vuejs.org/v2/docs/#Vue-nextTick) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.set](https://cn.vuejs.org/v2/docs/#Vue-set) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.delete](https://cn.vuejs.org/v2/docs/#Vue-delete) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.directive](https://cn.vuejs.org/v2/docs/#Vue-directive) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.filter](https://cn.vuejs.org/v2/docs/#Vue-filter) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.component](https://cn.vuejs.org/v2/docs/#Vue-component) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.use](https://cn.vuejs.org/v2/docs/#Vue-use) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.mixin](https://cn.vuejs.org/v2/docs/#Vue-mixin) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.version](https://cn.vuejs.org/v2/docs/#Vue-version) | <span style="color: #3eaf7c">支持</span> | - |
| [Vue.compile](https://cn.vuejs.org/v2/docs/#Vue-compile) | <span style="color: #900">不支持</span> | Weex 用的是 [只包含运行时构建](https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6) |

### 选项
| Vue 选项 | 是否支持 | 说明 |
| ---------- | --------- | ---- |
| [data](https://cn.vuejs.org/v2/docs/#data) | <span style="color: #3eaf7c">支持</span> | - |
| [props](https://cn.vuejs.org/v2/docs/#props) | <span style="color: #3eaf7c">支持</span> | - |
| [propsData](https://cn.vuejs.org/v2/docs/#propsData) | <span style="color: #3eaf7c">支持</span> | - |
| [computed](https://cn.vuejs.org/v2/docs/#computed) | <span style="color: #3eaf7c">支持</span> | - |
| [methods](https://cn.vuejs.org/v2/docs/#methods) | <span style="color: #3eaf7c">支持</span> | - |
| [watch](https://cn.vuejs.org/v2/docs/#watch) | <span style="color: #3eaf7c">支持</span> | - |
| [el](https://cn.vuejs.org/v2/docs/#el) | <span style="color: #3eaf7c">支持</span> | - |
| [template](https://cn.vuejs.org/v2/docs/#template) | <span style="color: #3eaf7c">支持</span> | - |
| [render](https://cn.vuejs.org/v2/docs/#render) | <span style="color: #3eaf7c">支持</span> | - |
| [renderError](https://cn.vuejs.org/v2/docs/#renderError) | <span style="color: #3eaf7c">支持</span> | - |
| [directives](https://cn.vuejs.org/v2/docs/#directives) | <span style="color: #3eaf7c">支持</span> | - |
| [filters](https://cn.vuejs.org/v2/docs/#filters) | <span style="color: #3eaf7c">支持</span> | - |
| [components](https://cn.vuejs.org/v2/docs/#components) | <span style="color: #3eaf7c">支持</span> | - |
| [parent](https://cn.vuejs.org/v2/docs/#parent) | <span style="color: #3eaf7c">支持</span> | - |
| [mixins](https://cn.vuejs.org/v2/docs/#mixins) | <span style="color: #3eaf7c">支持</span> | - |
| [extends](https://cn.vuejs.org/v2/docs/#extends) | <span style="color: #3eaf7c">支持</span> | - |
| [provide/inject](https://cn.vuejs.org/v2/docs/#provide-inject) | <span style="color: #3eaf7c">支持</span> | - |
| [name](https://cn.vuejs.org/v2/docs/#name) | <span style="color: #3eaf7c">支持</span> | - |
| [delimiters](https://cn.vuejs.org/v2/docs/#delimiters) | <span style="color: #3eaf7c">支持</span> | - |
| [functional](https://cn.vuejs.org/v2/docs/#functional) | <span style="color: #3eaf7c">支持</span> | - |
| [model](https://cn.vuejs.org/v2/docs/#model) | <span style="color: #3eaf7c">支持</span> | - |
| [inheritAttrs](https://cn.vuejs.org/v2/docs/#inheritAttrs) | <span style="color: #3eaf7c">支持</span> | - |
| [comments](https://cn.vuejs.org/v2/docs/#comments) | <span style="color: #900">不支持</span> | - |

### 生命周期钩子
Vue 组件的实例生命周期钩子将在特定的阶段发出，详情请参考 Vue 组件的[生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)。
| Vue 生命周期钩子 | 是否支持 | 说明 |
| ---------- | --------- | ---- |
| [beforeCreate](https://cn.vuejs.org/v2/docs/#beforeCreate) | <span style="color: #3eaf7c">支持</span> | - |
| [created](https://cn.vuejs.org/v2/docs/#created) | <span style="color: #3eaf7c">支持</span> | - |
| [beforeMount](https://cn.vuejs.org/v2/docs/#beforeMount) | <span style="color: #3eaf7c">支持</span> | - |
| [mounted](https://cn.vuejs.org/v2/docs/#mounted) | <span style="color: #3eaf7c">支持</span> | - |
| [beforeUpdate](https://cn.vuejs.org/v2/docs/#beforeUpdate) | <span style="color: #3eaf7c">支持</span> | - |
| [updated](https://cn.vuejs.org/v2/docs/#updated) | <span style="color: #3eaf7c">支持</span> | - |
| [activated](https://cn.vuejs.org/v2/docs/#activated) | <span style="color: #900">不支持</span> | 不支持 `<keep-alive>` |
| [deactivated](https://cn.vuejs.org/v2/docs/#deactivated) | <span style="color: #900">不支持</span> | 不支持 `<keep-alive>` |
| [beforeDestroy](https://cn.vuejs.org/v2/docs/#beforeDestroy) | <span style="color: #3eaf7c">支持</span> | - |
| [destroyed](https://cn.vuejs.org/v2/docs/#destroyed) | <span style="color: #3eaf7c">支持</span> | - |
| [errorCaptured](https://cn.vuejs.org/v2/docs/#errorCaptured) | <span style="color: #3eaf7c">支持</span> | 在 Vue 2.5.0+， Weex SDK 0.18+ 中新增 |

### 实例属性
| Vue 实例属性 | 是否支持 | 说明 |
| ---------- | --------- | ---- |
| [vm.$data](https://cn.vuejs.org/v2/docs/#vm-data) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$props](https://cn.vuejs.org/v2/docs/#vm-props) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$el](https://cn.vuejs.org/v2/docs/#vm-el) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$options](https://cn.vuejs.org/v2/docs/#vm-options) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$parent](https://cn.vuejs.org/v2/docs/#vm-parent) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$root](https://cn.vuejs.org/v2/docs/#vm-root) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$children](https://cn.vuejs.org/v2/docs/#vm-children) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$slots](https://cn.vuejs.org/v2/docs/#vm-slots) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$scopedSlots](https://cn.vuejs.org/v2/docs/#vm-scopedSlots) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$refs](https://cn.vuejs.org/v2/docs/#vm-refs) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$isServer](https://cn.vuejs.org/v2/docs/#vm-isServer) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$attrs](https://cn.vuejs.org/v2/docs/#vm-attrs) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$listeners](https://cn.vuejs.org/v2/docs/#vm-listeners) | <span style="color: #3eaf7c">支持</span> | - |

### 实例方法
| Vue 实例方法 | 是否支持 | 说明 |
| ---------- | --------- | ---- |
| [vm.$watch](https://cn.vuejs.org/v2/docs/#vm-watch) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$set](https://cn.vuejs.org/v2/docs/#vm-set) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$delete](https://cn.vuejs.org/v2/docs/#vm-delete) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$on](https://cn.vuejs.org/v2/docs/#vm-on) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$once](https://cn.vuejs.org/v2/docs/#vm-once) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$off](https://cn.vuejs.org/v2/docs/#vm-off) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$emit](https://cn.vuejs.org/v2/docs/#vm-emit) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$mount](https://cn.vuejs.org/v2/docs/#vm-mount) | <span style="color: #900">不支持</span> | 需要手动安装 Vue 实例 |
| [vm.$forceUpdate](https://cn.vuejs.org/v2/docs/#vm-forceUpdate) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$nextTick](https://cn.vuejs.org/v2/docs/#vm-nextTick) | <span style="color: #3eaf7c">支持</span> | - |
| [vm.$destroy](https://cn.vuejs.org/v2/docs/#vm-destroy) | <span style="color: #3eaf7c">支持</span> | - |

### 模板指令
| Vue 指令 | 是否支持 | 说明 |
| ---------- | --------- | ---- |
| [v-text](https://cn.vuejs.org/v2/docs/#v-text) | <span style="color: #3eaf7c">支持</span> | - |
| [v-html](https://cn.vuejs.org/v2/docs/#v-html) | <span style="color: #900">不支持</span> | Weex 中没有 HTML 解析器，这不是很好的实现 |
| [v-show](https://cn.vuejs.org/v2/docs/#v-show) | <span style="color: #900">不支持</span> | 不支持 `display: none;` |
| [v-if](https://cn.vuejs.org/v2/docs/#v-if) | <span style="color: #3eaf7c">支持</span> | - |
| [v-else](https://cn.vuejs.org/v2/docs/#v-else) | <span style="color: #3eaf7c">支持</span> | - |
| [v-else-if](https://cn.vuejs.org/v2/docs/#v-else-if) | <span style="color: #3eaf7c">支持</span> | - |
| [v-for](https://cn.vuejs.org/v2/docs/#v-for) | <span style="color: #3eaf7c">支持</span> | - |
| [v-on](https://cn.vuejs.org/v2/docs/#v-on) | <span style="color: #3eaf7c">支持</span> | 不支持[事件修饰符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6) |
| [v-bind](https://cn.vuejs.org/v2/docs/#v-bind) | <span style="color: #3eaf7c">支持</span> | - |
| [v-model](https://cn.vuejs.org/v2/docs/#v-model) | <span style="color: #3eaf7c">支持</span> | - |
| [v-pre](https://cn.vuejs.org/v2/docs/#v-pre) | <span style="color: #3eaf7c">支持</span> | - |
| [v-cloak](https://cn.vuejs.org/v2/docs/#v-cloak) | <span style="color: #900">不支持</span> | 只支持单类名选择器 |
| [v-once](https://cn.vuejs.org/v2/docs/#v-once) | <span style="color: #3eaf7c">支持</span> | - |

### 特殊属性
| Vue 特殊属性 | 是否支持 | 说明 |
| ---------- | --------- | ---- |
| [key](https://cn.vuejs.org/v2/docs/#key) | <span style="color: #3eaf7c">支持</span> | - |
| [ref](https://cn.vuejs.org/v2/docs/#ref) | <span style="color: #3eaf7c">支持</span> | - |
| [slot](https://cn.vuejs.org/v2/docs/#slot) | <span style="color: #3eaf7c">支持</span> | - |
| [slot-scope](https://cn.vuejs.org/v2/docs/#slot-scope) | <span style="color: #3eaf7c">支持</span> | 在 Vue 2.5.0+， Weex SDK 0.18+ 中新增 |
| [scope](https://cn.vuejs.org/v2/docs/#scope) | <span style="color: #3eaf7c">支持</span> | 不推荐 |
| [is](https://cn.vuejs.org/v2/docs/#is) | <span style="color: #3eaf7c">支持</span> | - |

### 内置组件
| Vue 内置组件 | 是否支持 | 说明 |
| ---------- | --------- | ---- |
| [component](https://cn.vuejs.org/v2/docs/#component) | <span style="color: #3eaf7c">支持</span> | - |
| [transition](https://cn.vuejs.org/v2/docs/#transition) | <span style="color: #900">不支持</span> | 在移动端 *enter* 与 *leave* 的概念可能有点不同， 并且 Weex 不支持 `display: none;` |
| [transition-group](https://cn.vuejs.org/v2/docs/#transition-group) | <span style="color: #900">不支持</span> | 跟 *transition* 一样 |
| [keep-alive](https://cn.vuejs.org/v2/docs/#keep-alive) | <span style="color: #900">不支持</span> | 移动端的原生组件不能被前端缓存 |
| [slot](https://cn.vuejs.org/v2/docs/#slot) | <span style="color: #3eaf7c">支持</span> | - |