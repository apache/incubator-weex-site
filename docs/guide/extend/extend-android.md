---
title: Extend Android
type: guide
group: Extend
order: 6.3
version: 2.1
---

<!-- toc -->

## Module extend

1. Customize modules class must extend from WXModule.
2. Extended method must add @JSMethod (uiThread = false or true) annotation, which determines whether the method is run on UI thread.
3. The access level of method must be `public`.
4. Do not obfuscate code using tools like ProGuard.
5. Extended method suppport the data type of int, double, float, String, Map, List as its param.
7. Register the module: `WXSDKEngine.registerModule("MyModule", MyModule.class);`or else may report an error: `ReportException :undefined:9: TypeError: Object #<Object> has no method 'xxx'` .

Refer to the following example:

```java
public class MyModule extends WXModule{

  //run ui thread
  @JSMethod (uiThread = true)
  public void printLog(String msg) {
    Toast.makeText(mWXSDKInstance.getContext(),msg,Toast.LENGTH_SHORT).show();
  }

  //run JS thread
  @JSMethod (uiThread = false)
  public void fireEventSyncCall(){
   //implement your module logic here
  }
}
```
Register the module

```java
WXSDKEngine.registerModule("MyModule", MyModule.class);
```
Use this module in weex DSL
Now `event` moudle is avaiable in weex, use the module like this:

```html
<template>
  <div>
    <text onclick="click">testMyModule</text>
  </div>
</template>

<script>
  module.exports = {
    methods: {
      click: function() {
        weex.requireModule('MyModule').printLog("I am a weex Module!");
      }
    }
  }
</script>
```

## Register module

registerModule(moduleName,moduleClass)

- `return`(_bool_): register success
- `moduleName`(_String_): module name
- `moduleClass`(_Class_): the Java class of the module, which provide a constructor with an empty parameter.

使用方式:

```
WXSDKEngine.registerModule("picker", WXPickersModule.class);
```

## Javascript callback

If the module need implement a callback to javascript, you just add `JSCallback` argument to the method you want expose to javascript:

```java
@WXModuleAnno
public void openURL(String url,JSCallback callback){
  //implement your module logic here
  Map<String,Object> resp = new HashMap();
  resp.put("result","ok");
  callback.invoke(resp);
}
```

At the javascript side, call the module with javascript function to receive callback data:

```javascript
event.openURL("http://www.github.com",function(resp){ console.log(resp.result); });
```

## Component extension adaptation
### weex_sdk version >= v0.19+
#### Abstract
The WXDomObject and Layout engines are sunk into WeexCore using C++, and the WXDomObject in Java code has been removed. The 0.19 version of the upgrade involves interface changes to WXComponent and WXDomObject.

#### Migration guide
##### setMeasureFunction migrate
The setMeasureFunction() method in WXDomObject was migrated to WXComponent:
```java
protected void setMeasureFunction(final ContentBoxMeasurement contentBoxMeasurement);
```
See: com.taobao.weex.layout.ContentBoxMeasurement.java

Demo: WXText.java / setMeasureFunction()

Note：ContentBoxMeasurement only supports leaf nodes.

##### WXComponent Interface change
###### getDomObject [Delete]
Since the WXDomObject sinks to WeexCore, the WXComponent's getDomObject() method has been removed.

###### Constructor [Parameter change]
The constructor of WXComponent removes the parameter of type WXDomObject, adds a parameter of type BasicComponentData, and the remaining parameters remain unchanged:

```java
public WXComponent(WXSDKInstance instance, WXVContainer parent, int type, BasicComponentData basicComponentData);
public WXComponent(WXSDKInstance instance, WXVContainer parent, BasicComponentData basicComponentData);
```


##### WXDomObject Interface change
You can't access and inherit WXDomObject using Java code, (the ImmutableDomObject.java has also been removed), some of the methods in WXDomObject have been migrated to WXComponent if you need to use them:


###### WXDomObject.getType() -> WXComponent.getComponentType() [Migrate]
The getType() method in WXDomObject is used to get the type of Component (for example: list, div, text, img...). After migrating to WXComponent, it is renamed to:

```java
public String getComponentType();
```

###### Some methods for Layout results [Migrate]
Migrating from WXDomObject to WXComponent:
```java
public float getCSSLayoutTop();
public float getCSSLayoutBottom();
public float getCSSLayoutLeft();
public float getCSSLayoutRight();
public float getLayoutWidth();
public float getLayoutHeight();
```
Remove two obsolete interfaces:
```java
public float getLayoutY();
public float getLayoutX();
```

### weex_sdk version < v0.19

1. Customize components must extend from WXComponent
2. Use the `@WXComponentProp(name = value(value is attr or style))` annotation to let the update of attribute or style be recognized automatically.
3. The access levels of method must be **public**
4. Customize can not be obfuscated by tools like ProGuard
5. Component method with the annotation of `@JSMethod` can
7. Weex params can be int, double, float, String, Map, List, Array
8. Register your Component by `WXSDKEngine.registerComponent`

Refer to the following example

```java
public class RichText extends WXComponent<TextView> {

    public RichText(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
        super(instance, dom, parent);
    }

    @Override
    protected TextView initComponentHostView(@NonNull Context context) {
        TextView textView = new TextView(context);
        textView.setTextSize(22);
        textView.setTextColor(Color.BLACK);
        return textView;
    }

    @WXComponentProp(name = "tel")
    public void setTel(String telNumber) {
        getHostView().setText("tel: " + telNumber);
    }
}
```
Register your Component：

```java
WXSDKEngine.registerComponent("richText", RichText.class);
```

Use this component in weex DSL：

```html
<template>
  <div>
    <richText tel="12305" style="width:200;height:100">12305</richText>
  </div>
</template>
```


#### Extend Component Method
 WeexSDK `(0.9.5+)` support the component method that can be invoked
 for example：

 ```java
 @JSMethod
 public void focus(){
  //method implementation
 }
 ```
 after your registration for your own custom component, now you can call it in your js file.

```html
<template>
  <mycomponent ref='mycomponent'></mycomponent>
</template>
<script>
  module.exports = {
    created: function() {
      this.$refs.mycomponent.focus();
    }
  }
</script>
```

## Register component

### __registerComponent(type,class,appendTree)__

- `return`(_bool_): register success
- `type`(_String_): component's name,such as `div`
- `class`(_Class_): ComponentClass，called when init component
- `appendTree`(_bool_): render option logic，default false
	- if true，render compoent tree one-time
	- if false，render component one by one

usage:

```
WXSDKEngine.registerComponent("video", WXVideo.class, false);
```

### __registerComponent(holder,appendTree，...names)__

- `return`(_bool_): register success
- `holder`(_IFComponentHolder_): abstract factory designed for create Component, and __SimpleComponentHolder__ is the a simple way to achieve IFComponentHolder.
- `appendTree`: see `registerComponent(type,class,appendTree)`
- `names`(_String ..._): component's name in front end template file

usage:

```
WXSDKEngine.registerComponent(
              new SimpleComponentHolder(
                      WXText.class,
                      new WXText.Creator()
              ),
              false,
              "text"
      );
```

## Extend adapter

### ImagedownloadAdapter

Weex SDK has no image download capability, you need to implement `IWXImgLoaderAdapter`.

Refer to the following example
```java
public class ImageAdapter implements IWXImgLoaderAdapter {

  public ImageAdapter() {
  }

  @Override
  public void setImage(final String url, final ImageView view,
                       WXImageQuality quality, WXImageStrategy strategy) {

    WXSDKManager.getInstance().postOnUiThread(new Runnable() {

      @Override
      public void run() {
        if(view==null||view.getLayoutParams()==null){
          return;
        }
        if (TextUtils.isEmpty(url)) {
          view.setImageBitmap(null);
          return;
        }
        String temp = url;
        if (url.startsWith("//")) {
          temp = "http:" + url;
        }
        if (view.getLayoutParams().width <= 0 || view.getLayoutParams().height <= 0) {
          return;
        }
        Picasso.with(WXEnvironment.getApplication())
            .load(temp)
            .into(view);
      }
    },0);
  }
}
```

## Set up various adapters

### ImageAdapter
Image adapter is responsible for loading images according to URLs. There are two types of image adapter:
1. Loading a image to a view according to URL.
1. Loading a image to a specified object according to URL.

In order to use image component, one must implement the first adapter, while the second adapter is optional.

#### IWXImgLoaderAdapter

    public interface IWXImgLoaderAdapter {
      void setImage(String url, ImageView view, WXImageQuality quality, WXImageStrategy strategy);
    }

 * `WXImageQuality` that the quality of the picture variables, take the following values `LOW`, `NORMAL`, `HIGH`, `ORIGINAL` picture quality in turn higher. The default is `LOW`.
 * `WXImageStrategy` is an extension class that indicates whether the image can be cut (isClipping) sharpening (isSharpen) placeholder (placeHolder) and so on.

#### IDrawableLoaderAdapter
This adapter is optional.

    void setDrawable(String url, DrawableTarget drawableTarget, DrawableStrategy drawableStrategy);

*  `DrawableTarget` is a object into where will load an image. `DrawableTarget` is one of `StaticTarget` or `AnimatedTarget`.

### IWXHttpAdapter

Weex custom `WXRequest` and `OnHttpListener`, Native reload interface can be obtained from the Request URL, Header and other parameters, the network request can be completed through `OnHttpListener` callback notification. Weex provides the default network request: `DefaultWXHttpAdapter`, using `HttpURLConnection` for network requests.

The interface is defined as follows:

```
public interface IWXHttpAdapter {
	void sendRequest(WXRequest request, OnHttpListener listener);
}
```

#### WXRequest

* `WXRequest` defines the parameters related to the network request, the request method, the request body, and the timeout time. Weex default timeout is 3s.

#### OnHttpListener

```
 interface OnHttpListener {

    /**
     * start request
     */
    void onHttpStart();

    /**
     * headers received
     */
    void onHeadersReceived(int statusCode,Map<String,List<String>> headers);

    /**
     * post progress
     * @param uploadProgress
     */
    void onHttpUploadProgress(int uploadProgress);

    /**
     * response loaded length (bytes), full length should read from headers (content-length)
     * @param loadedLength
     */
    void onHttpResponseProgress(int loadedLength);

    /**
     * http response finish
     * @param response
     */
    void onHttpFinish(WXResponse response);
  }
```

### IWXUserTrackAdapter
Weex related performance data (first screen loading time, JS-Native communication time, dom update time, etc.) and other general information (JSLib file size, Weex SDK version number, etc.).

```
public interface IWXUserTrackAdapter {
	void commit(Context context, String eventId, String type, WXPerformance perf, Map<String, Serializable> params);
}
```

Native implementation interface can be obtained through `WXPerformance` and `params` corresponding information.

### IActivityNavBarSetter
Weex provided the ability of navigation through `WXNavigatorModule` which relys on IActivityNavBarSetter.

Usage:

```
WXSDKEngine.setActivityNavBarSetter(new IActivityNavBarSetter(){});   
```    

### IWXStorageAdapter
Weex provided the ability of local storage through `WXStorageModule` which depends on IWXStorageAdapter. One can use `DefaultWXStorage` as the default implementation of IWXStorageAdapter.


### IWXJSExceptionAdapter
IWXJSExceptionAdapter is used to handle weex exception.
- DownLoadException
- WhiteSceenException
- JSException
- DownGradeException

```
public interface IWXJSExceptionAdapter {
  void onJSException(WXJSExceptionInfo exception);
}
```
usage：

```
WXSDKEngine.setJSExcetptionAdapter(new TestExceptionAdapter());
```

## Proguard Rules

If you want to using proguard to protect your source code, please add the following rules to your profile:

```java
-keep class com.taobao.weex.WXDebugTool{*;}
-keep class com.taobao.weex.devtools.common.LogUtil{*;}
-keepclassmembers class ** {
  @com.taobao.weex.ui.component.WXComponentProp public *;
}
-keep class com.taobao.weex.bridge.**{*;}
-keep class com.taobao.weex.dom.**{*;}
-keep class com.taobao.weex.adapter.**{*;}
-keep class com.taobao.weex.common.**{*;}
-keep class * implements com.taobao.weex.IWXObject{*;}
-keep class com.taobao.weex.ui.**{*;}
-keep class com.taobao.weex.ui.component.**{*;}
-keep class com.taobao.weex.utils.**{
    public <fields>;
    public <methods>;
    }
-keep class com.taobao.weex.view.**{*;}
-keep class com.taobao.weex.module.**{*;}
-keep public class * extends com.taobao.weex.common.WXModule{*;}
-keep public class * extends com.taobao.weex.ui.component.WXComponent{*;}
-keep class * implements com.taobao.weex.ui.IExternalComponentGetter{*;}
```
