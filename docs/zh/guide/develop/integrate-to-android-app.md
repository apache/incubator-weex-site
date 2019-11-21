# 集成到Android应用
::: tip
目前，Weex 支持以下 [ABI](https://developer.android.com/ndk/guides/abis.html):
* x86
* armeabi-v7a
* arm64-v8a
:::

在执行以下步骤之前，请先确认您的Android开发环境是ok的。

- [JAVA环境, jdk7+](https://www.oracle.com/technetwork/java/javase/downloads/index.html)
- [Android Studio](https://developer.android.com/training/basics/firstapp/)
- [NDK r18](https://developer.android.com/ndk/)、[Cmake 3.9.0+](https://cmake.org/download/) (可选项：如果需要编译WEEX源码，需要NDK环境支持)


## 1. 设置gradle依赖
::: tip
从 0.28.0 开始，Weex 每次 Release 都将会发布两个二进制版本，请[阅读文档了解它们的区别](../../download/major_change.html)
:::

```
dependencies {
    ...
    // 以下两个 weex_sdk 版本二选一
    //implementation 'org.apache.weex:sdk:0.28.0'
    //implementation 'org.apache.weex:sdk_legacy:0.28.0'

    // fastjson
    implementation 'com.alibaba:fastjson:1.1.46.android'

    //support library dependencies
    implementation 'com.android.support:recyclerview-v7:23.1.1'
    implementation 'com.android.support:support-v4:23.1.1'
    implementation 'com.android.support:appcompat-v7:23.1.1'
}
```

## 2. 配置混淆规则

混淆规则如下，建议参考[__最新的源码配置__](https://github.com/apache/incubator-weex/blob/master/android/sdk/proguard-rules.pro)

```
-keep class com.taobao.weex.bridge.** { *; }
-keep class com.taobao.weex.layout.** { *; }
-keep class com.taobao.weex.WXSDKEngine { *; }
-keep class com.taobao.weex.base.SystemMessageHandler { *; }
-dontwarn com.taobao.weex.bridge.**
```

## 3. 声明权限

在`AndroidManifest.xml`中声明权限 

```xml
//网络
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>

//sd卡读写
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```

## 4. 初始化sdk

```java
InitConfig config = new InitConfig.Builder()
					//图片库接口
    				.setImgAdapter(new FrescoImageAdapter())
    				//网络库接口
    				.setHttpAdapter(new InterceptWXHttpAdapter())
    				.build();
WXSDKEngine.initialize(applicationContext,config);

```

- [demo初始化源码](https://github.com/apache/incubator-weex/blob/master/android/playground/app/src/main/java/com/alibaba/weex/WXApplication.java)
- [其它扩展配置看这里](/guide/extend/extend-android.html)


## 5. 创建WXSDKInstance 

`WXSDKInstance`是weex渲染页面的基本单元，

- 通过`instance.render(url)`拉取bundle，
- 在回调`IWXRenderListener`的`onViewCreated `返回创建的view，
- 将返回的view 添加到Activity的view上（rootView）

参见源码: [WXPageActivity](https://github.com/apache/incubator-weex/blob/master/android/playground/app/src/main/java/com/alibaba/weex/WXPageActivity.java)

```java
public class MainActivity extends AppCompatActivity implements IWXRenderListener {
  WXSDKInstance mWXSDKInstance;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    mWXSDKInstance = new WXSDKInstance(this);
    mWXSDKInstance.registerRenderListener(this);
    /**
    * bundleUrl source http://dotwe.org/vue/38e202c16bdfefbdb88a8754f975454c
    */
    String pageName = "WXSample";
    String bundleUrl = "http://dotwe.org/raw/dist/38e202c16bdfefbdb88a8754f975454c.bundle.wx";
    mWXSDKInstance.renderByUrl(pageName, bundleUrl, null, null,WXRenderStrategy.APPEND_ASYNC);
  }
  @Override
  public void onViewCreated(WXSDKInstance instance, View view) {
    setContentView(view);
  }
  @Override
  public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
  }
  @Override
  public void onRefreshSuccess(WXSDKInstance instance, int width, int height) {
  }
  @Override
  public void onException(WXSDKInstance instance, String errCode, String msg) {
  }
  @Override
  protected void onResume() {
    super.onResume();
    if(mWXSDKInstance!=null){
      mWXSDKInstance.onActivityResume();
    }
  }
  @Override
  protected void onPause() {
    super.onPause();
    if(mWXSDKInstance!=null){
       mWXSDKInstance.onActivityPause();
    }
  }
  @Override
  protected void onStop() {
    super.onStop();
    if(mWXSDKInstance!=null){
      mWXSDKInstance.onActivityStop();
    }
  }
  @Override
  protected void onDestroy() {
    super.onDestroy();
    if(mWXSDKInstance!=null){
      mWXSDKInstance.onActivityDestroy();
    }
  }
}
```

## 6. 运行app

运行app，您将会看到一个 `hello world` 页面。

- [Hello World Demo 源码](http://dotwe.org/vue/38e202c16bdfefbdb88a8754f975454c)
- 提示: 点击二维码, 可以看到最终编译的代码产物。

## 7. 扩展Android能力

Weex 提供了[能力扩展机制](/guide/extend/extend-android.html)，可以根据自己的业务进行定制自己的功能。 主要分为：

- Module 扩展， 非 UI 的特定功能。例如 sendHttp、openURL 等。
- Component 扩展， 实现特别功能的 Native 控件。例如：RichTextview，RefreshListview 等。
- Adapter 扩展， Weex 对一些基础功能实现了统一的接口，可实现这些接口来定制自己的业务。例如：图片下载等。


