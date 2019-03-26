# 代码贡献指南

本文档描述了如何对 Weex 源代码进行更改和提交，以下是建议的步骤：

## 写代码前
### 检查 License
Weex 采用 [Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)作为其开源证书，Weex的任何新增改动需要符合该开源证书的要求。

### 修复 Bug 还是提供新特性 ？
* 如果你准备为 Weex 修复一个Bug，先在[ Github Issues ](https://github.com/apache/incubator-weex/issues)中查看对应的 Bug 是否存在，如果存在的话，请在提交Pull Request时附上对应的链接。

* 如果你准备为 Weex 添加一个新的特性，请遵循以下流程：
    1. 向[邮件列表](how-to-contribute.html#邮件列表)中发送邮件，说明你需要你想要做的事情。
    1. 编写[文档](how-to-contribute.html#贡献文档或代码).


## 编写代码
1. Fork Weex 的 [Github 仓库](https://github.com/apache/incubator-weex)。

1. 编写需要开发的特性或 bug 修复代码，确保你的更改符合[代码风格指南](./contribute-code.html#代码风格指南)。

1. 复制下面的**License注释**到你的新文件顶部:
   
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
   

1. 提交代码到你的分支上。

:::tip
如果你使用Android Studio开发 Java 或 C++ 代码，**License注释**会在编译时自动添加到文件头部，无需人工操作。
:::

### 代码风格指南

#### Objective-C

- 用 tab 缩进而不是空格

- `*` 操作符靠近变量名（如 Type *variable）
- 方法定义：大括号需要另起一行
- 其他大括号：开括号紧跟在代码后面，不另起一行，闭括号单独占一行
- 使用 `#pragma marks` 标记将方法分类
- 遵循 [GitHub Objective-C Style Guide](https://github.com/github/objective-c-style-guide) 中其他的代码风格指南

#### Java & Android

- 使用 [Google Java Style](https://google.github.io/styleguide/javaguide.html) 作为基本的 Java 代码风格指南
- 其他 android 相关代码需遵循 [AOSP Code Style](https://source.android.com/source/code-style.html)

#### C & C++

* 整体使用[Google C++ Style](https://google.github.io/styleguide/cppguide.html)作为C++代码风格指南
* Weex定义了一套[Google C++ 开发规范子集](https://github.com/jianhan-he/C-Style-Guide/blob/master/C%2B%2B%20Style%20Guide.md)，涵盖了一些主要C++场景使用规范

## 提交代码

[创建一个 pull request](https://help.github.com/articles/using-pull-requests/) 并提交到 [`apache/incubator-weex`](https://github.com/apache/incubator-weex) 的 `master` 分支，确保它符合这些准则:

1. 一个 Pull Request 只解决一个问题
2. PR 标题应符合 `[模块] 标题` 格式：
    * 模块是 PR 的类别（android、iOS、JsFm、web、doc、test、other），
    * 标题是对PR内容不超过一句话的描述。
3. PR 内容
    * 如果 PR 是修复了某个 Bug *非Crash*，需要在 PR 内容中添加对应的 [Demo 地址](http://dotwe.org/vue)
    * 如果 PR 是添加了某个特性，需要在 PR 内容中添加对应的[文档PR](how-to-contribute.html#贡献文档或代码)。
    * *可选项* 如果 PR 解决了某个Github issue， 需要在 PR 内容中添加对应的链接

:::tip
PR的 Review 需要一定时间，请耐心等待。如果某个 PR 超过**96小时**无人回复，可向[Weex邮件列表](how-to-contribute.html#邮件列表)发送邮件，询问进展。
:::