# Integrate to Android App
::: tip
Currently, Weex supports the following [ABIs](https://developer.android.com/ndk/guides/abis.html):
* x86
* armeabi-v7a
* arm64-v8a
:::

The following documents assume that you already have a certain Android development experience.

- [JAVA Environment, jdk7+](https://www.oracle.com/technetwork/java/javase/downloads/index.html)
- [Android Studio](https://developer.android.com/training/basics/firstapp/)
- [NDK r18](https://developer.android.com/ndk/)、[Cmake 3.9.0+](https://cmake.org/download/) (option: if you need compile the source ,ndk and cmake are required)


## 1. Configure dependency 

::: tip
**Since 0.28.0, Weex would publish two convenience binary in each release, please [read the documentation about the detail](../../download/major_change.html).**
:::

```
dependencies {
    ...
    // Choose one of the following sdk of weex.
    //compile 'org.apache.weex:sdk:0.28.0'
    //compile 'org.apache.weex:sdk_legacy:0.28.0'

    // fastjson
    compile 'com.alibaba:fastjson:1.1.46.android'

    //support library dependencies
    compile 'com.android.support:recyclerview-v7:23.1.1'
    compile 'com.android.support:support-v4:23.1.1'
    compile 'com.android.support:appcompat-v7:23.1.1'
}
```

## 2. Configure proguard

proguard rules are as follows,recommended reference to [__the latest source configuration__](https://github.com/apache/incubator-weex/blob/master/android/sdk/proguard-rules.pro)

```
-keep class com.taobao.weex.bridge.** { *; }
-keep class com.taobao.weex.layout.** { *; }
-keep class com.taobao.weex.WXSDKEngine { *; }
-keep class com.taobao.weex.base.SystemMessageHandler { *; }
-dontwarn com.taobao.weex.bridge.**
```

## 3. Add permissions 

Add required permissions in your AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```

## 4. Init Weex SDK

Init Weex SDK When Application Create

```java
InitConfig config = new InitConfig.Builder()
					//imageLib interface 
    				.setImgAdapter(new FrescoImageAdapter())
    				//network lib interface
    				.setHttpAdapter(new InterceptWXHttpAdapter())
    				.build();
WXSDKEngine.initialize(applicationContext,config);
```

- [demo init case](https://github.com/apache/incubator-weex-playground/blob/master/android/playground/src/main/java/org/apache/weex/WXApplication.java)
- [extend-android doc](/guide/extend/extend-android.html)


## 5. Create an WXSDKInstance

- create an WXSDKInstance add IWXRenderListener and activity lifecycle on it. 
- load weex bundle url. when  page load success; 
- target view will be send for you on  onViewCreated callback, set target view to activity contentView.

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

## 6. Run

Run app ,start activity, then you will see hello world demo. well done.

[Hello World Demo Source](http://dotwe.org/vue/38e202c16bdfefbdb88a8754f975454c)

Tip: Click QRCode Image in Demo Source Page, your will see compiled bundle js.

## 7. Extend-Android 

Weex supports module-extend、component-extend and adapter-extend

[Extend Android Doc](/guide/extend/extend-android.html)


