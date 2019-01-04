# 开发流程

本文档描述了如何对 Weex 源代码进行更改和提交，以下是建议的步骤：

## 1. 选择或创建一个 Github issue单

目前 Weex 使用 [Github Issues](https://github.com/apache/incubator-weex/issues)来跟踪所有类型的代码更改，而不仅仅是 bug 修复，我们使用 Github Pull Request 来管理代码 review 和合并特定的代码更改。也就是说，Github Issues用于描述什么是需要修复或更改的，Pull Request 用于描述这些修复和变更如何实现。

在创建新问题之前一定要先搜索问题，避免重复。如果你的更改可能需要和其他开发者进行讨论，你可以在 [weex-dev](mailto:dev@weex.incubator.apache.org) 邮件列表中创建一个讨论。

**每个 PR 都应该对应于 Github 中的一个 issue。**

## 2. 编写代码

1. [Fork](https://help.github.com/articles/fork-a-repo/) 在 <https://github.com/apache/incubator-weex> 上的 Github 仓库

2. Clone 你 fork 出来的仓库，创建一个新的分支用于提交变更

3. 编写需要开发的特性或 bug 修复代码，确保你的更改符合[代码风格指南](./development-process.html#代码风格指南)。

4. 复制并粘贴下面的注释到你的新文件顶部:

   ```
   /*
    * Licensed to the Apache Software Foundation (ASF) under one
    * or more contributor license agreements.  See the NOTICE file
    * distributed with this work for additional information
    * regarding copyright ownership.  The ASF licenses this file
    * to you under the Apache License, Version 2.0 (the
    * "License"); you may not use this file except in compliance
    * with the License.  You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing,
    * software distributed under the License is distributed on an
    * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    * KIND, either express or implied.  See the License for the
    * specific language governing permissions and limitations
    * under the License.
    */
   ```

5. 修改或添加该变更相关de的文档和测试。

6. 提交符合 [commit 指南](./development-process.html#commit-指南) 的 commit 到你的分支。

## 3. 创建一个 Pull Request

[创建一个 pull request](https://help.github.com/articles/using-pull-requests/) 并提交到 `apache/incubator-weex` 的 `master` 分支，确保它符合这些准则:

1. 一个 Pull Request 只解决一个问题
2. PR标题应该是 `[WEEX-xxxx][模块]标题`，其中 `xxxx` 是相关的 Github Issue 问题号，模块是 PR 的类别（android、iOS、jsfm、web、component、doc、website、test、other），标题可以是 Github 上Issue 的标题，也可以是描述 PR 本身的更具体的标题。
3. 如果该 PR 相关的工作还在进行中，还没有准备好被合并，但需要被推到 Github 上以方便查看，可以在模块后添加 `[WIP]` 标示。

## 代码风格指南

### Objective-C

- 用 tab 缩进而不是空格

- `*` 操作符靠近变量名（如 Type *variable）
- 方法定义：大括号需要另起一行
- 其他大括号：开括号紧跟在代码后面，不另起一行，闭括号单独占一行
- 使用 `#pragma marks` 标记将方法分类
- 遵循 [GitHub Objective-C Style Guide](https://github.com/github/objective-c-style-guide) 中其他的代码风格指南

### Java & Android

- 使用 [Google Java Style](https://google.github.io/styleguide/javaguide.html) 作为基本的 Java 代码风格指南
- 其他 android 相关代码需遵循 [AOSP Code Style](https://source.android.com/source/code-style.html)

### C & C++

* 整体使用[Google C++ Style](https://google.github.io/styleguide/cppguide.html)作为C++代码风格指南
* Weex定义了一套[Google C++ 开发规范子集](https://github.com/jianhan-he/C-Style-Guide/blob/master/C%2B%2B%20Style%20Guide.md)，涵盖了一些主要C++场景使用规范

## Commit 指南

使用下面的形式来写 commit 描述:

```
Summary of change, same as PR title: `[WEEX-xxxx][COMPONENT] Summary`

Longer description of change addressing as appropriate: why the change
is made,context if it is part of many changes, description of previous
behavior andnewly introduced differences, etc.

Long lines should be wrapped to 80 columns for easier log message
viewing interminals.

Bug: 123456
```

一个简短的主题紧跟一个空行再接着写 commit 的详细描述，Bug 这里使用的是来自 Github Issue 的问题号。

在[这里](https://chris.beams.io/posts/git-commit/)可以找到一些关于如何编写 commit message 的好方法。

