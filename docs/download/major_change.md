# Introduction
This page introduces the break change of Weex, you can visit [GitHub page](https://github.com/apache/incubator-weex/releases) for detail changelog.

# Version
## 0.28
::: tip
The following three major change in 0.28 only affects Android developers.
:::

### Android
#### Package name
Due to the fact that Weex was a software of Alibaba Group (the mother company of Taobao Software Cooperation, ltd.) before donated to ASF (Apache Software Foundation),the Android package name of Weex was `com.taobao.weex` before Weex 0.28.0 released. 

Since Weex 0.28.0, the package name of Android(i.e. Java) files was changed to `org.apache.weex`, which may cause compiling failure if you try to upgrade from a older version. For backward-compatibility reasons, we provide an [artifact](#groupid-and-artifactid-in-jcenter) named `sdk_legacy` where all files are still in the package name of `com.taobao.weex`. The legacy artifact may not be maintained in the future, please upgrade to the new package name when it's possible for you.

#### GroupId and artifactId in JCenter
Due to the fact that Weex was a software of Alibaba Group (the mother company of Taobao Software Cooperation, ltd.) before donated to ASF (Apache Software Foundation),Weex Android was under `com.taobao.android:weex_sdk` in JCenter before Weex 0.28.0 release.

Since 0.28.0, Weex provides a convenience library in JCenter with the following groupId and artifactId:
* `org.apache.weex:sdk` is the currently stable package of Weex, where all Java files are under the package of `org.apache.weex`.
* `org.apache.weex:sdk_legacy` is the legacy package of Weex, where all Java files are under the package of `com.taobao.weex`. This artifact may not be maintained in the future, please upgrade to the new package name when it's possible for you.

#### JavaScript Interpreter
Before Weex 0.28.0, Weex Android relied and bundled [JavaScriptCore](https://github.com/alibaba/weex_js_engine/tree/bridge_branch_mergeTimer) into its convenience binary(i.e. aar), and this approach have the following disadvantage:
* JavaScriptCore is partly licensed under BSD, partly licensed under LGPL, which is against the [License policy of ASF](https://apache.org/legal/resolved.html#category-a)
* Users of Weex has no choice of JavaScript Interpreter if we continue bundling JavaScriptCore in convenience binary.
* The JavaScriptCore Weex used is a pruning version of [official JavaScriptCore](https://svn.webkit.org/repository/webkit/releases/WebKitGTK/webkit-2.17.4/Source/JavaScriptCore/) in 2016 and not update since that time, which means we might miss a lot of new features.

Since Weex 0.28.0, the JavaScript Interpreter is not bundled in the convenience binary anymore, users have the freedom of using whatever JavaScript Interpreter they want as long as they implement the [same interface](https://svn.webkit.org/repository/webkit/releases/WebKitGTK/webkit-2.27.1/Source/JavaScriptCore/API/). 

This means users have to bundle a JavaScript Interpreter in their APP to run Weex. For users who don't have idea about how to choose JavaScript Interpreter, one can insert the following code snippet into the `build.gradle` of the app:

    apply from: 'https://raw.githubusercontent.com/apache/incubator-weex/release/0.28/android/sdk/buildSrc/download_jsc.gradle'

The above code snippet will download and bundle [jsc-android](https://www.npmjs.com/package/jsc-android/v/241213.1.0) of version `241213.1.0`. This is only for demonstration purpose, users always have the freedom of choosing JavaScript Interpreter in their APP.

::: tip
1. The **JavaScriptCore Interpreter** included above only supports armeabi-v7a, arm64-v8a, x86.
2. The above script will copy **JavaScriptCore Interpreter** into `project.android.sourceSets.main.jniLibs`.

If there is any problems in your project when applying the script, please adjust it based on your condition.
:::