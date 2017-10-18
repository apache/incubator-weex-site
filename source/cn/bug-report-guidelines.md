---
title: Bug 报告指南
type: community
has_chapter_content: false
version: 2.1

---

# Bug 报告指南

该文档描述了如何编写一个好的 Weex bug 报告。好的 bug 报告帮助开发者决定一个 bug 的优先级和严重性，并且增加了 bug 被快速修复的可能性，你能提供的具体信息越多越好。

## Bug 报告原则

- 避免重复:在报 bug 前先搜索!
- 总是测试最新的可用版本。
- 每个报告只报一个 bug。
- 陈述有用的事实，而不是意见或抱怨。

## 如何编写一个好的 Bug 报告

一个好的 bug 报告应该包括以下信息:

### 摘要

摘要的目标是使 bug 能够被搜索并且唯一可识别。

一个坏的例子:`List Crash`

一个很好的例子:`List Crashes when deleting a header`

### 环境

**Weex 版本**: 请告知你在 bug 发生时使用的 WeexSDK 、Weex Playground 或 weex-toolkit 的版本

**设备环境**: 请告知你 bug 所发生的机型、平台和 OS 版本，例如：iPhone 6,iOS 10.3。

### 概述/描述

bug 报告的概述或描述是向开发者详细解释 bug，包括：

- 为什么这是一个 bug
- 可以重现 bug 的 [dotwe](http://dotwe.org/vue/) 链接
- 在视觉上可感知的 bug， 可以提供截屏
- 对于 crash bug， 可以提供详细的堆栈

### 复现步骤

复现步骤的目标是帮助开发者在他自己的系统上重现 bug ，例如：

步骤1：使用 Weex playgroud 扫码打开上面提供的 dotwe 链接

步骤2：滚动到列表底部

步骤3：点击红色按钮删除头部组件

### 测试结果

测试结果，包括预期结果和实际结果，预期结果描述了应该发生的事情，实际结果描述了实际发生的事情，从而表明这是个 bug 。