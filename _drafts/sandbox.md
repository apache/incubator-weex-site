# Weex 多实例隔离机制

## 需求

隔离每个页面实例的执行环境，保障实例中的变量无法污染全局。

## 污染点

1. global javascript context
2. global objects: `Object`, `Array`, `Array.prototype`
3. (browser) global apis: `setTimeout`, `Promise`, `console`.
4. weex, document
5. Vue & Rax

## 实现思路

+ 从客户端或引擎级别将页面的执行环境区分开。

### 额外收获

+ 取消 **“用 js 执行 js”**（`new Function`）之后，更细粒度的代码分割、动态组件或模块都可以实现了。

### 依然存在的风险点

+ console
+ Promise
+ timer
+ 回调函数

+ js service
+ weex 不是开放问题，用 freeze 可以防御
+ Vue 不是开发问题，用 freeze 可以防御。如果前端框架从 jsfm 中拆离，可彻底解决问题。

## 增强方案

## 更激进方案
