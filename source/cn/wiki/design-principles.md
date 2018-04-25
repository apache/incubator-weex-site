---
title: 设计理念
type: wiki
group: Design
order: 1.4
version: 2.1
---

<!-- toc -->

# Weex 设计理念
这篇文章想从 Weex 的设计理念入手，让你对 Weex 的设计哲学、优势有一个全面的了解，希望可以帮助 Weex 的使用者更好的在适合的场景应用 Weex，也希望 Weex 的开发者可以在设计理念的指引下将 Weex 变得更好
## 性能为王
性能对于 Weex 来说是最为重要的核心价值，也是 Weex 区别于传统的基于 WebView 的 hybrid 框架的特点。Weex 采用了 vDOM 机制，在 JavaScript context 中维护页面布局，并通过向移动端发送规范化的渲染指令，在移动端直接通过 iOS 和 Android 的界面框架生成原生的 UI 进行渲染。相比于浏览器通过自己的渲染系统实现渲染的方式，Weex 的方式更好的利用了系统 UI 体系以达到更佳的性能和用户体验。
同时 Weex 也采取了多种手段优化性能表现，包括优化 native 与 JavaScript 的通信频率和通信量，使用二进制方式提升单次通信的耗时等，未来还会通过跨平台内核将 DOM 管理移至 native 层实现来彻底解决 native 与 JavaScript 层异步通信成本的问题，从多个维度提升 Weex 引擎的性能。
## 交互体验
交互体验一直是 Weex 在不断追求的目标。与 React Native 等框架不同的是，Weex 希望完全做到 iOS、Android 及 Mobile Web 的跨端一致性表现，因此在内置组件的设计上充分考虑了跨端一致性，为 Weex 开发者提供了一致的交互体验。Weex 借助 GCanvas 等组件增强了框架的 2D、3D 渲染能力，为高性能渲染场景提供了可能；同时借助 Expression Binding 的交互理念提升了 Weex 的交互性能。对于前端使用习惯带来的传统 list 性能较差的问题，Weex 提供了基于模板和数据分离的 recycle list 组件，大大提升了交互性能。
## 开发效率
从易用和高效的角度考虑 Weex 的开发体验，是 Weex 不断致力提升的方向。从一开始，Weex 的设计就是面向前端开发技术栈，利用前端技术在开发体验、效率上的优势，为开发者提供接近前端开发体验的开发环境。你可以使用 JavaScript、CSS 和 HTML 技术进行 Weex 开发，Weex 的内置组件通过HTML标签的方式提供给开发者，事件体系的设计遵循 W3C 标准，API 也通过 JavaScript 对象的方式提供。同时 Weex 原生支持 Vue DSL，开发者可以利用 Vue 提供的强大易用的开发范式进行 Weex 应用开发。
## 易于扩展
扩展机制的便利性也是 Weex 从一开始就考虑在内的设计思路。基于 Weex 的实现特点，在框架层面提供了两种扩展方式，其中 Module 用于提供无 UI 的基础功能接口扩展能力，Component 提供包含 UI 的界面组件扩展能力，开发者可以根据需要选择不同的扩展方式实现需求。
