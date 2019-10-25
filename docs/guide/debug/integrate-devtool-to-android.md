# Integrate Devtool to Android

:::danger
[Android Devtools for Apache Weex](https://github.com/weexteam/weex-devtools-android) is a third party plugin, and is not developed nor maintained by Apache Weex.
:::

Android Devtools for Apache Weex implements Chrome Debugging Protocol inspired by Stetho. It is designed to help you quickly inspect your app and debug your JS bundle source in a Chrome web page. To make it work, at first you must integrate it to your App. This page will help you integrate devtool to your Android App.

#### Version compatibility

| weex sdk | weex inspector |
|----------|----------------|
| 0.16.0+  | 0.12.1         |
| 0.17.0+  | 0.13.2         |
| 0.18.0+  | 0.13.4-multicontext |
| 0.19.0+  | 0.18.68        |
| 0.20.3.0-beta | 0.20.3.0-beta |
| 0.24.0+  | 0.24.2.4 |
| 0.26.0+  | 0.24.2.4 |

## Integrate to Android

### Installing Dependencies

Android Devtools for Apache Weex depends on `weex_inspector`. I strongly recommend you use the latest version since both Weex SDK and devtools are developed iteratively and rapidly.

- From Gradle

 ```
  dependencies {
     compile 'com.taobao.android:weex_inspector:0.18.10'
  }
  ```

- From Maven

```
  <dependency>
    <groupId>com.taobao.android</groupId>
    <artifactId>weex_inspector</artifactId>
    <version>0.18.10</version>
    <type>pom</type>
  </dependency>
  ```


- From source code

  you need to copy the dir of [inspector](https://github.com/weexteam/weex_devtools_android/tree/master/inspector) to the same dir of your app and add `include ":inspector"`in your project's `settings.gradle` file just like playground have done, then add dependency in your app's `build.gralde`.

  ```gradle
  dependencies {
    compile project(':inspector')
  }
  ```

- need include okhttp 2.3.0

 ```
  dependencies {
     compile 'com.squareup.okhttp:okhttp:2.3.0'
     compile 'com.squareup.okhttp:okhttp-ws:2.3.0'
  }
 ```

### Adding Debug mode switch

The easiest way is reuse the code of playground. On the other hand QR code is not necessary, if you review the source code you can draw a conclusion that QR CODE is just a way to set devtools server address. There are two examples of how to open debug modes in the Playground App:

 - Demo 1: Set the debug mode via `XXXApplication` <br>

``` Java
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

 - Demo 2: Set the debug mode by scan QR code <br>

``` Java
if (WXEnvironment.isApkDebugable()) {
  String devToolUrl = uri.getQueryParameter("_wx_devtool");
  if (!TextUtils.isEmpty(devToolUrl)) {
    WXEnvironment.sRemoteDebugProxyUrl = devToolUrl;
    WXEnvironment.sDebugServerConnectable = true;
    WXSDKEngine.reload(XXXXX.getApplication(), false);
  }
}
```
 - Note：Auto refresh page via `ACTION_DEBUG_INSTANCE_REFRESH` broadcast

  `ACTION_DEBUG_INSTANCE_REFRESH` can be broadcast messages when the debug mode is switched or Chrome page refresh. You can use this mechanism to inform the current page to refresh in time.

``` Java
public class RefreshBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
      if (IWXDebugProxy.ACTION_INSTANCE_RELOAD.equals(intent.getAction()) ||
              IWXDebugProxy.ACTION_DEBUG_INSTANCE_REFRESH.equals(intent.getAction())) {
        Log.v(TAG, "connect to debug server success");
        if (mUri != null) {
          if (TextUtils.equals(mUri.getScheme(), "http") || TextUtils.equals(mUri.getScheme(), "https")) {
            String weexTpl = mUri.getQueryParameter(Constants.WEEX_TPL_KEY);
            String url = TextUtils.isEmpty(weexTpl) ? mUri.toString() : weexTpl;
            loadWXfromService(url);
          } else {
            loadWXfromLocal(true);
          }
        }
      }
    }
}
```


## Known Issues

You can report issues and bugs [here](https://github.com/weexteam/weex_devtools_android/issues). We will reply as soon as possible.
