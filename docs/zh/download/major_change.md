# Introduction
本文档主要介绍 Weex 的重大变更，对于详细变更日志，请参考 [Weex GitHub page](https://github.com/apache/incubator-weex/releases).

# 版本
## 0.28
::: tip
下述在 0.28 中的重大变更只影响 Android 用户。
:::

### Android
#### Java 包名
由于 Weex 在捐献给 ASF(Apache Software Foundation) 前隶属于阿里巴巴集团(淘宝的母公司)，因此在 `0.28.0` 之前，Android 代码中的 Java 包名是 `com.taobao.weex`

从 `0.28.0` 之后，Android 代码中的 Java 包名被修改为 `org.apache.weex`。考虑到这个升级会给现有用户来不兼容，weex 提供了 `org.apache.weex:sdk_legacy` 作为[兼容性方案](#groupid-and-artifactid-in-jcenter)。这个兼容性方案后续可能不再维护，请尽可能的依 `org.apache.weex:sdk` 并将现有代码的包名升级为 `org.apache.weex`。

#### GroupId and artifactId in JCenter
由于 Weex 在捐献给 ASF(Apache Software Foundation) 前隶属于阿里巴巴集团(淘宝的母公司)，因此在 `0.28.0` 之前，Android 代码中的 Java 包名是 `com.taobao.weex`，因此在 `0.28.0` 之前，Weex 在JCenter 上的发布产物为 `com.taobao.android:weex_sdk`

从 `0.28.0` 之后，Weex 在 JCenter 上的发布变更为如下形式：
* `org.apache.weex:sdk` 是稳定且持续维护的 aar 包，在这个包中所有的 Java 类在 `org.apache.weex` 包名下。
* `org.apache.weex:sdk_legacy` 是兼容性 aar 包，在这包中所有的 Java 类在 `com.taobao.weex` 包名下。兼容性包后续可能不再维护，请尽量升级到 `org.apache.weex:sdk` 上。

#### JavaScript Interpreter
在 `0.28.0` 之前， Weex Android 依赖并且将[JavaScriptCore](https://github.com/alibaba/weex_js_engine/tree/bridge_branch_mergeTimer) 作为 Weex 在 JCenter 上的发布产物的一部分，这种方式有如下缺陷：
* JavaScriptCore 属于双重授权项目，一部分以 BSD 形式授权，另一部分以 LGPL 形式授权，而这与 ASF 的 [License 授权政策](https://apache.org/legal/resolved.html#category-a)相违背。
* 如果将 JavaScriptCore 包含在 Weex 的 JCenter 发布产物中，会剥夺用户选择 JavaScript 解析引擎的自由。
* Weex 内置的 JavaScriptCore 是基于 [JavaScriptCore 2016版](https://svn.webkit.org/repository/webkit/releases/WebKitGTK/webkit-2.17.4/Source/JavaScriptCore) 进行了裁剪，已经数年未更新。

基于上述原因，从 Weex 0.28.0 开始，JavaScript 引擎将**不再**内置于 Weex 在 JCenter 上的发布产物中，用户可以自由选择它们喜欢的 JavaScript 引擎，只要这个引擎遵循了[指定接口](https://svn.webkit.org/repository/webkit/releases/WebKitGTK/webkit-2.27.1/Source/JavaScriptCore/API/)。

这意味着用户需要在它们的 App 中内置 JavaScript 引擎，否则 Weex 将无法运行。对于不知道如何选择 JavaScript 用户的引擎，可以在 App 的 build.gradle 中引入下述脚本：

    apply from: 'https://raw.githubusercontent.com/apache/incubator-weex/release/0.28/android/sdk/buildSrc/download_jsc.gradle'

这个脚本将会下载并内置[jsc-android](https://www.npmjs.com/package/jsc-android/v/241213.1.0)到你的 App 中。上述脚本仅为演示时使用，用户依然有权利在 App 中选择其符合其诉求的 JavaScript 引擎。

::: tip
1. 上述脚本中引入的 JavaScriptCore Interpreter 只支持 armeabi-v7a, arm64-v8a, x86 三种架构。
2. 上述脚本将尝试把 JavaScriptCore Interpreter 拷贝至 `project.android.sourceSets.main.jniLibs` 文件夹。

若你的工程无法在上述条件下运行起来，请自行调整脚本。
:::