---
title: 前端框架
type: guide
group: Overview
order: 1.3
version: 2.1
---

<!-- toc -->

## Weex 中的前端框架

![Vue and Rax](./images/vue-rax.png)

前端技术看起来很繁荣，测试、打包、调试等工具都比较丰富，开发效率比原生开发要高很多。在大型项目中使用前端框架也是一个管理应用好方法，这样更方便于长期维护。

然而，**Weex并不是一个前端框架**。实际上，前端框架仅仅是 Weex 的语法层或称之为 DSL (Domain-specific Language)，它们与原生渲染引擎是分离的。换句话说，Weex 并不依赖于特定的前端框架，随着前端技术的发展，Weex 也可以集成更多广泛使用的前端框架。

目前 Weex 主要支持 [Vue.js](https://vuejs.org/) 和 [Rax](https://alibaba.github.io/rax/) 作为其内置的前端框架。这些框架已经集成到了 Weex SDK，你不需要在额外引入。

> **学习一些 Vue 和 Rax 的基础知识，对使用 Weex 非常有帮助。**

## Vue.js

Weex 从 [v0.10.0](https://github.com/alibaba/weex/releases/tag/v0.10.0)（发布于 2016/02/17）这个版本开始，就集成了 v2 版本的 Vue.js。Vue.js 是一套用于构建用户界面的渐进式框架，详情请参阅其[官方网站](https://vuejs.org/)。

关于在 Weex 中使用 Vue 的技巧请参阅：[《使用 Vue》](./use-vue.html)。

## Rax

Rax 是一个兼容 React 接口的前端框架，请参考 [Rax 的官方网站](https://alibaba.github.io/rax/) 来获得更多信息。
