# 概要

:::danger
[Android Devtools for Apache Weex](https://github.com/weexteam/android-devtools-for-Apache-Weex) 是三方插件, 不由 Apache Weex 开发或维护。
:::

Android Devtools for Apache Weex 能够方便调试 Weex 页面，但此功能离不开 Native端 的支持。本章将会详细说明 Android 端如何接入 Android Devtools for Apache Weex.

#### 版本兼容

| WeexSDK | Weex Inspector |
|----------|----------------|
| 0.16.0+  | 0.12.1         |
| 0.17.0+  | 0.13.2         |
| 0.18.0+  | 0.13.4-multicontext |
| 0.19.0+  | 0.18.68        |
| 0.20.3.0-beta | 0.20.3.0-beta |
| 0.24.0+  | 0.24.2.4 |
| 0.26.0+  | 0.24.2.4 |

## Android接入指南

#### 一、添加依赖
可以通过Gradle 或者 Maven添加对 Android Devtools for Apache Weex 的依赖, 也可以直接对源码依赖.

  * *Gradle依赖*.
  ```
  dependencies {
     implementation 'com.taobao.android:weex_inspector:0.24.2.11'
  }
  ```

  或者
  * *Maven依赖*.
  ```
  <dependency>
    <groupId>com.taobao.android</groupId>
    <artifactId>weex_inspector</artifactId>
    <version>0.24.2.11</version>
    <type>pom</type>
  </dependency>
  ```

  或者
  * *源码依赖*.

  需要复制[inspector](https://github.com/weexteam/weex_devtools_android/tree/master/inspector)目录到你的app的同级目录, 然后在工程的 `settings.gradle` 文件下添加 `include ":inspector"`, 此过程可以参考playground源码的工程配置及其配置, 然后在app的`build.gralde`中添加依赖.
  ```
  dependencies {
     compile project(':inspector')
  }
```

 * **需要引入okhttp**
 ```
  dependencies {
     compile 'com.squareup.okhttp:okhttp:2.3.0'
     compile 'com.squareup.okhttp:okhttp-ws:2.3.0'
      ...
  }
 ```

#### 二、调试开关（扫码开启调试/手动开启调试）

最简单方式就是复用Playground的相关代码,比如扫码和刷新等模块, 但是扫码不是必须的, 它只是与app通信的一种形式, 二维码里的包含DebugServer IP及bundle地址等信息,用于建立App和Debug Server之间的连接及动态加载bundle. 在Playground中给出了两种开启debug模式的范例.

* 范例1: 通过在XXXApplication中设置开关打开调试模式 <br>
```
public class MyApplication extends Application {
  public void onCreate() {
  super.onCreate();
  initDebugEnvironment(true, "xxx.xxx.xxx.xxx"/*"DEBUG_SERVER_HOST"*/);
  //WXSDKEngine.reload();
  }
}

private void initDebugEnvironment(boolean enable, String host) {
  WXEnvironment.sRemoteDebugMode = enable;
  WXEnvironment.sRemoteDebugProxyUrl = "ws://" + host + ":8088/debugProxy/native";
}
```
这种方式最直接, 在代码中直接hardcode了开启调试模式, 如果在SDK初始化之前调用甚至连`WXSDKEngine.reload()`都不需要调用, 接入方如果需要更灵活的策略可以将`initDebugEnvironment(boolean enable, String host)`和`WXSDKEngine.reload()`组合在一起在合适的位置和时机调用即可.（如果不是初始化之前调用，n那么每次调用initDebugEnvironment后必须调用WXSDKEngine.reload()刷新Weex引擎）

* 范例2:通过扫码打开调试模式 <br>
Playground中较多的使用扫描weex debugger生成的调试二维码的方式传递信息, 不仅用这种方式控制Debug模式的开关,而且还通过它来传入bundle的url直接调试. 应当说在开发中这种方式是比较高效的, 省去了修改sdk代码重复编译和安装App的麻烦.

拦截方式：
````
if (WXEnvironment.isApkDebugable()) {
  String devToolUrl = uri.getQueryParameter("_wx_devtool");
  if (!TextUtils.isEmpty(devToolUrl)) {
    WXEnvironment.sRemoteDebugProxyUrl = devToolUrl;
    WXEnvironment.sDebugServerConnectable = true;
    WXSDKEngine.reload(XXXXX.getApplication(), false);
  }
}
````

* 可选：调试刷新协议 <br>
广播 ACTION_DEBUG_INSTANCE_REFRESH 在调试模式切换和 Chrome 调试页面刷新时发出，主要用来通知当前的 Weex容器以 Debug 模式重新加载当前页。在 playground 中的处理过程如下：
```
  public class RefreshBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
      if (IWXDebugProxy.ACTION_DEBUG_INSTANCE_REFRESH.equals(intent.getAction())) {
        //Do something
      }
    }
  }
```

## 科普
::: tip
在以下的简介中，Android Devtools for Apache Weex 将简称为 Devtools
:::

#### Devtools组件介绍
Devtools扩展了[Chrome Debugging Protocol](https://developer.chrome.com/devtools/docs/debugger-protocol), 在客户端和调试服务器之间的采用[JSON-RPC](https://en.wikipedia.org/wiki/JSON-RPC)作为通信机制, 本质上调试过程是两个进程间协同, 相互交换控制权及运行结果的过程. 更多细节还请阅读[Weex Devtools Debugger的技术选型实录](http://www.atatech.org/articles/59284)这篇文章.

* **客户端**
Devtools 客户端作为aar被集成App中, 它通过webscoket连接到调试服务器,此处并未做安全检查. 出于安全机制及包大小考虑, 强烈建议接入方只在debug版本中打包此aar.

* **服务器**
Devtools 服务器端是信息交换的中枢, 既连接客户端, 又连接Chrome, 大多数情况下扮演一个消息转发服务器和Runtime Manager的角色.

* **Web端**
Chrome的V8引擎扮演着bundle javascript runtime的角色. 开启debug模式后, 所有的bundle js 代码都在该引擎上运行. 另一方面我们也复用了Chrome前端的调试界面, 例如设置断点,  查看调用栈等, 调试页关闭则runtime将会被清理.

调试的大致过程请参考如下时序图.
![debug sequence diagram](https://img.alicdn.com/tps/TB1igLoMVXXXXawapXXXXXXXXXX-786-1610.jpg "debug sequence diagram")
