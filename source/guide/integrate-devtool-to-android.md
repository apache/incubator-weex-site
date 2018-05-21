# ---
title: Integrate Devtool to Android
type: guide
group: Develop
order: 5.4
version: 2.1
---

<!-- toc -->

# Integrate Devtool to Android

Weex devtools is a custom devtools for weex that implements Chrome Debugging Protocol inspired by Stetho, it is designed to help you quickly inspect your app and debug your JS bundle source in a Chrome web page. To make it work, at first you must integrate devtool to your App. This page will help you integrate devtool to your Android App.

## Integrate to Android

### Installing Dependencies

Weex Devtools depend on `weex_inspector`. I strongly recommend you use the latest version since both Weex SDK and devtools are developed iteratively and rapidly. See the release version list [here](https://github.com/weexteam/weex_devtools_android/releases). All the release version will publish to the [jcenter repo](https://bintray.com/alibabaweex/maven/weex_inspector). There are two choices to install it:

- From Gradle

  ```gradle
  dependencies {
    compile 'com.taobao.android:weex_inspector:0.13.2'
  }
  ```

- From source code

  you need to copy the dir of inspector to the same dir of your app and add `include ":inspector"`in your project's `settings.gradle` file just like playground have done, then add dependency in your app's `build.gralde`.

  ```gradle
  dependencies {
    compile project(':inspector')
  }
  ```

#### Version compatibility

| weex sdk | weex inspector | Debugger Server |
|----------|----------------|-----------------|
| 0.8.0.1+ | 0.0.8.1+       | 0.2.39+         |
| 0.7.0+   | 0.0.7.13       | 0.2.38          |
| 0.6.0+   | 0.0.2.2        | -               |
| 0.16.0+  | 0.12.1         | -               |
| 0.17.0+  | 0.13.2         | -               |


### Adding Debug mode switch

The key to control the opening and closing of the debug mode can be summarized as three rules:

**No.1: Set the switch and Debugger Server addresses via `sRemoteDebugMode` and ` sRemoteDebugProxyUrl`.**

`WXEnvironment` class has a pair of static variables mark Weex current debug mode:

```java
public static boolean sRemoteDebugMode; // default close
public static String sRemoteDebugProxyUrl; // Debugger Server addresses
```

You have to set `WXEnvironment.sRemoteDebugMode` and `WXEnvironment.sRemoteDebugProxyUrl` at the right time, for example:

```java
private void initDebugEnvironment(boolean enable, String host) {
  WXEnvironment.sRemoteDebugMode = enable;
  WXEnvironment.sRemoteDebugProxyUrl = "ws://" + host + ":8088/debugProxy/native";
}
```

You can find detail and suitable way of initialize inspector in `Playground`.


**No.2: You must call `WXSDKEngine.reload()` method when `sRemoteDebugMode` was changed.**

You can control a state of debug mode via the `WXEnvironment.sRemoteDebugMode`, but you need reset Weex runtime if you changed a state of debug mode.

```java
private void initWXBridge(boolean remoteDebug) {
    if (remoteDebug && WXEnvironment.isApkDebugable()) {
      WXEnvironment.sDebugServerConnectable = true;
    }

    if (mWxDebugProxy != null) {
      mWxDebugProxy.stop(false);
    }
    if (WXEnvironment.sDebugServerConnectable && (WXEnvironment.isApkDebugable() || WXEnvironment.sForceEnableDevTool)) {
      if (WXEnvironment.getApplication() != null) {
        try {
          Class clazz = Class.forName("com.taobao.weex.devtools.debug.DebugServerProxy");
          if (clazz != null) {
            Constructor constructor = clazz.getConstructor(Context.class, WXBridgeManager.class);
            if (constructor != null) {
              mWxDebugProxy = (IWXDebugProxy) constructor.newInstance(
                      WXEnvironment.getApplication(), WXBridgeManager.this);
              if (mWxDebugProxy != null) {
                mWxDebugProxy.start(new WXJsFunctions());
              }
            }
          }
        } catch (Throwable e) {
          //Ignore, It will throw Exception on Release environment
        }
        WXServiceManager.execAllCacheJsService();
      } else {
        WXLogUtils.e("WXBridgeManager", "WXEnvironment.sApplication is null, skip init Inspector");
        WXLogUtils.w("WXBridgeManager", new Throwable("WXEnvironment.sApplication is null when init Inspector"));
      }
    }
    if (remoteDebug && mWxDebugProxy != null) {
      mWXBridge = mWxDebugProxy.getWXBridge();
    } else {
      mWXBridge = new WXBridge();
    }
}
```

In this way, You can control the debug mode flexibly.

**No.3: Auto refresh page via `ACTION_DEBUG_INSTANCE_REFRESH` broadcast**

`ACTION_DEBUG_INSTANCE_REFRESH` can be broadcast messages when the debug mode is switched or Chrome page refresh. You can use this mechanism to inform the current page to refresh in time.

```java
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

### Example

The easiest way is reuse the code of playground. On the other hand QR code is not necessary, if you review the source code you can draw a conclusion that QR CODE is just a way to set devtools server address. There are two examples of how to open debug modes in the Playground App:

- Set the debug mode via `XXXApplication`

  ```java
  public class MyApplication extends Application {
    public void onCreate() {
    super.onCreate();
    initDebugEnvironment(true, "xxx.xxx.xxx.xxx"/*"DEBUG_SERVER_HOST"*/);
    }
  }
  ```

- Set the debug mode by scan QR code

  You review the source code of playground.

  - Debug mode switch control: [`WXApplication.java`](https://github.com/weexteam/weex_devtools_android/blob/master/playground/app/src/main/java/com/alibaba/weex/WXApplication.java)
  - Refresh control [`WXPageActivity.java`](https://github.com/weexteam/weex_devtools_android/blob/master/playground/app/src/main/java/com/alibaba/weex/WXPageActivity.java)


## Known Issues

You can report issues and bugs [here](https://github.com/weexteam/weex_devtools_android/issues). We will reply as soon as possible.
