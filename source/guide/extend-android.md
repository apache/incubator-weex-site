---
title: Extend Android
type: guide
group: Extend
order: 6.3
version: 2.1
---

# Module extend
## Step to customize a module

- Customize module class must extends WXModule 
- `@JSMethod (uiThread = false or true)` annotation must be added, and set the callback mode as synchronous or asynchronous.
- The access levels of mehtod must be `public`
- The module class also can not be an inner class
- Do not be obfuscated by tools like ProGuard
- Weex params can be int, double, float, String, Map, List
- Register the module by `WXSDKEngine.registerModule`

Refer to the following example:

```java
public class WXEventModule extends WXModule{

  // as sync-callback mode
  @JSMethod (uiThread = false)
  public void fireEventSyncCall(){
   //implement your module logic here
  }
  // as async-callback mode   
  @JSMethod (uiThread = true)
  public void fireEventAsyncCall(){
  //implement your module logic here
  }
}
```
Register the module

```java
WXSDKEngine.registerModule("event", WXEventModule.class);
```

## Use this module in weex DSL
Now `event` moudle is avaiable in weex, use the module like this:

```javascript
var event = weex.requireModule('event');
event.openURL("http://www.github.com");
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

# Component extend

## Step to customize a component

1. Customize components must extend WXComponent or WXContainer
2. With the `@WXComponentProp(name = value(value is attr or style))`annotation to automatically update the attribute or style for it be recognized by weex SDK.
3. The access levels of mehtod must be **public**
4. The component class can not be an inner class
5. Customize can not be obfuscated by tools like ProGuard
6. Component method with the annotation of `@JSMethod` can 
7. Weex params can be int, double, float, String, Map, List, Array
8. Register your Component by `WXSDKEngine.registerComponent`

Refer to the following example

```java
public class MyViewComponent extends WXComponent{
   public MyViewComponent(WXSDKInstance instance, WXDomObject dom,WXVContainer parent, String instanceId, boolean isLazy) {
    super(instance, dom, parent, instanceId, isLazy);
   }
   @Override
   protected void initView() {
      mHost = new TextView(mContext);
   }
   @WXComponentProp(name = WXDomPropConstant.WX_ATTR_VALUE)
   public void setMyViewValue(String value) {
      ((TextView)mHost).setText(value);
   }
   @JSMethod
   public void focus(){
   //method implementation
   }
}
```
Register your Component

```java
WXSDKEngine.registerComponent("MyView",MyViewComponent.class);
```

### Extend Component Method
 WeexSDK `(0.9.5+)` support the component method that can be invoked  
 for example


 after your registration for your own custom component, now you can call it in your js file.

```html
<template>
  <mycomponent id='mycomponent'></mycomponent>
</template>
<script>
  module.exports = {
    created: function() {
      this.$el('mycomponent').focus();
    }
  }
</script>
```


# Extend adapter

## ImagedownloadAdapter

Weex SDK has no image download capability, you need to implement `IWXImgLoaderAdapter`. 

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
