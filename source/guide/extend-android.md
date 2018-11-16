---
title: Extend Android
type: guide
group: Extend
order: 6.3
version: 2.1
---

<!-- toc -->

Weex supports module-extend、component-extend and adapter-extend.

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

## Component extension adaptation document（v0.19+）

### 1. Description of change
The WXDomObject and Layout engines are sunk into WeexCore using C++, and the WXDomObject in Java code has been removed. The 0.19 version of the upgrade involves interface changes to WXComponent and WXDomObject.

#### (1) setMeasureFunction migrate
The setMeasureFunction() method in WXDomObject was migrated to WXComponent:
```java
protected void setMeasureFunction(final ContentBoxMeasurement contentBoxMeasurement);
```
See: com.taobao.weex.layout.ContentBoxMeasurement.java

Demo: WXText.java / setMeasureFunction()

Note：ContentBoxMeasurement only supports leaf nodes.

#### (2) WXComponent Interface change
##### getDomObject [Delete]
Since the WXDomObject sinks to WeexCore, the WXComponent's getDomObject() method has been removed.

##### Constructor [Parameter change]
The constructor of WXComponent removes the parameter of type WXDomObject, adds a parameter of type BasicComponentData, and the remaining parameters remain unchanged:

```java
public WXComponent(WXSDKInstance instance, WXVContainer parent, int type, BasicComponentData basicComponentData);
public WXComponent(WXSDKInstance instance, WXVContainer parent, BasicComponentData basicComponentData);
```


#### （3）WXDomObject Interface change
You can't access and inherit WXDomObject using Java code, (the ImmutableDomObject.java has also been removed), some of the methods in WXDomObject have been migrated to WXComponent if you need to use them:


##### WXDomObject.getType() -> WXComponent.getComponentType() [Migrate]
The getType() method in WXDomObject is used to get the type of Component (for example: list, div, text, img...). After migrating to WXComponent, it is renamed to:

```java
public String getComponentType();
```

##### Some methods for Layout results [Migrate]
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

## Component extend (< v0.19)

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


### Extend Component Method
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


# Extend adapter

## ImagedownloadAdapter

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
