---
title: 扩展 Android 的功能
type: guide
group: 扩展
order: 6.2
version: 2.1
---

<!-- toc -->

Weex 提供了扩展机制，可以根据自己的业务进行定制自己的功能。
主要分为两类扩展：

- Module 扩展 非 UI 的特定功能。例如 sendHttp、openURL 等。
- Component 扩展 实现特别功能的 Native 控件。例如：RichTextview，RefreshListview 等。
- Adapter 扩展 Weex 对一些基础功能实现了统一的接口，可实现这些接口来定制自己的业务。例如：图片下载等。
- JS全局变量自定义扩展


## JSEnv 扩展


### 接口

```

Map<String, Object> options = new HashMap();
options.set("testVlaue","hello");
//.... 
instance.render(pagename, template,options);

```

### 使用

```
var value = weex.config.testValue;

console.log(value);
```


## Module 扩展

1. Module 扩展必须继承 WXModule 类。
2. 扩展方法必须加上`@JSMethod (uiThread = false or true)` 注解。Weex 会根据注解来判断当前方法是否要运行在 UI 线程，和当前方法是否是扩展方法。
3. Weex是根据反射来进行调用 Module 扩展方法，所以Module中的扩展方法必须是 public 类型。
4. 同样因为是通过反射调用，Module 不能被混淆。请在混淆文件中添加代码：`-keep public class * extends com.taobao.weex.common.WXModule{*;}`
5. Module 扩展的方法可以使用 int, double, float, String, Map, List 类型的参数
6. 完成 Module 后一定要在初始化时注册 `WXSDKEngine.registerModule("myModule", MyModule.class);` 否则会报类似错误：`ReportException :undefined:9: TypeError: Object #<Object> has no method 'printLog'`

示例如下：

```java
public class MyModule extends WXModule {

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
JS 调用如下：

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
        weex.requireModule('MyModule').printLog("I am a weex Module");
      }
    }
  }
</script>
```

## Module 注册

registerModule(moduleName,moduleClass)

- `return`(_bool_): 是否注册成功
- `moduleName`(_String_): 模块名称
- `moduleClass`(_Class_): 模块对应的class，创建module实例时使用

使用方式:

```
WXSDKEngine.registerModule("picker", WXPickersModule.class);
```

## Component 扩展
### wee x版本 >= 0.19.0
#### 变更说明
WXDomObject 和 Layout 引擎被下沉到 WeexCore 中使用 C++ 实现，移除 Java 代码中的 WXDomObject。此次变更涉及 WXComponent 和 WXDomObject 的适配。

#### 迁移指南
##### setMeasureFunction 迁移
WXDomObject 中的 setMeasureFunction() 方法迁移至 WXComponent 中：
```java
protected void setMeasureFunction(final ContentBoxMeasurement contentBoxMeasurement);
```
详见：com.taobao.weex.layout.ContentBoxMeasurement.java

ContentBoxMeasurement 示例请参考：WXText.java / setMeasureFunction()
注意：ContentBoxMeasurement 只支持叶子节点。

##### WXComponent 接口变更
###### getDomObject [移除]
由于 WXDomObject 下沉至 WeexCore 中，所以 getDomObject() 方法已被删除。

###### 构造方法 [参数变更]
WXComponent 的构造方法删除了类型为 WXDomObject 的参数，新增了类型为 BasicComponentData 的参数，其余参数保持不变：
```java
public WXComponent(WXSDKInstance instance, WXVContainer parent, int type, BasicComponentData basicComponentData);

public WXComponent(WXSDKInstance instance, WXVContainer parent, BasicComponentData basicComponentData);

```

##### WXDomObject 接口变更
你无法在Java代码中访问和继承 WXDomObject，（ ImmutableDomObject 接口也已被删除）

WXDomObject 的部分方法被迁移至 WXComponent中，如需使用，如下：

###### WXDomObject.getType() -> WXComponent.getComponentType() [迁移]
WXDomObject 中 的 getType() 方法用于获取组件类型（如：list、div、text、img...），迁移到 WXComponent 后，更名为：
```java
public String getComponentType();
```

###### 获取 Layout 结果的相关方法 [迁移]
获取 Layout 结果的6个方法从 WXDomObject 迁移至 WXComponent：
```java
public float getCSSLayoutTop();
public float getCSSLayoutBottom();
public float getCSSLayoutLeft();
public float getCSSLayoutRight();
public float getLayoutWidth();
public float getLayoutHeight();
```

移除两个废弃接口：
```java
public float getLayoutY();
public float getLayoutX();
```

### weex_sdk 版本 < 0.19.0

1. Component 扩展类必须继承 WXComponent.
2. Component 对应的设置属性的方法必须添加注解 @WXComponentProp(name=value(value is attr or style of dsl))
3. Weex sdk 通过反射调用对应的方法，所以 Component 对应的属性方法必须是 public，并且不能被混淆。请在混淆文件中添加代码  `-keep public class * extends com.taobao.weex.ui.component.WXComponent{*;}`
4. Component 扩展的方法可以使用 int, double, float, String, Map, List 类型的参数
5. 完成 Component 后一定要在初始化时注册 `WXSDKEngine.registerComponent("richText", RichText.class);`

示例如下:

```java
public class RichText extends WXComponent<TextView> {

    public RichText(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
        super(instance, dom, parent);
    }

    @Override
    protected TextView initComponentHostView(@NonNull Context context) {
        TextView textView = new TextView(context);
        textView.setTextSize(20);
        textView.setTextColor(Color.BLACK);
        return textView;
    }

    @WXComponentProp(name = "tel")
    public void setTel(String telNumber) {
        getHostView().setText("tel: " + telNumber);
    }
}
```
注册你的组件：

```java
WXSDKEngine.registerComponent("richText", RichText.class);
```

JS 调用如下：

```html
<template>
  <div>
    <richText tel="12305" style="width:200;height:100">12305</richText>
  </div>
</template>
```
#### 组件方法支持
从WeexSDK 0.9.5开始，你可以定义组件方法

- 在组件中如下声明一个组件方法

 ```java
 @JSMethod
 public void focus(){
  //method implementation
 }
 ```

- 注册组之后，你可以在weex 文件中调用

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

注:工程要添加依赖 `compile 'com.squareup.picasso:picasso:2.5.2'`

## Component 注册

### __registerComponent(type,class,appendTree)__

- `return`(_bool_): 是否注册成功
- `type`(_String_): 前端使用的对应标签
- `class`(_Class_): 组件的class，在创建组件实例时调用
- `appendTree`(_bool_): 渲染时判定逻辑，默认false
	- 如果为true，则这个组件的子组件，整颗树建立、layout完后，整体一起刷新。
	- 如果为false，则这个组件的子组件，每add一个，刷新一个。

使用方式:

```
WXSDKEngine.registerComponent("video", WXVideo.class, false);
```

### __registerComponent(holder,appendTree，...names)__

- `return`(_bool_): 是否注册成功
- `holder`(_IFComponentHolder_): 用于创建component的抽象工厂，默认使用__SimpleComponentHolder__。
- `appendTree`: 同上
- `names`(_String ..._): 前端使用的对应标签

使用方式:

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

## Adapter 扩展

### 图片库Adapter

需要时集成接口 IWXImgLoaderAdapter，实现 setImage 方法。

示例如下：

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

## Adapter 注册

### ImageAdapter

__WEEX和图片库完全解耦__，WEEX的图片加载，都是通过调用公共接口，由实现类决定调用哪个图片库

- `IWXImgLoaderAdapter`: 根据url，load图片给某个view
- `IDrawableLoader`(可选): 根据url，load图片给某个drawable.


#### IWXImgLoaderAdapter

```
public interface IWXImgLoaderAdapter {
	void setImage(String url, ImageView view, WXImageQuality quality, WXImageStrategy strategy);   
}
```

* `WXImageQuality` 图片质量的设置参数,有 `LOW`, `NORMAL`, `HIGH`, `ORIGINAL` 几种质量，默认为`LOW`.
* `WXImageStrategy` 是一个扩展类参数，配置图像是否可以剪切`isClipping`、锐化`isSharpen`以及配置占位符`placeHolder`

#### IDrawableLoader(可选)

```
  interface DrawableTarget {

  }

  interface StaticTarget extends DrawableTarget{
    void setDrawable(@Nullable Drawable drawable, boolean resetBounds);
  }

  interface AnimatedTarget extends DrawableTarget{
    void setAnimatedDrawable(@Nullable Drawable drawable);
  }

  void setDrawable(String url, DrawableTarget drawableTarget, DrawableStrategy drawableStrategy);
}
```


### IWXHttpAdapter

同`ImageAdapter`,__WEEX和网络库也是解耦的__，通过接口形式调用，由实现类决定调用哪个网络库。

```
public interface IWXHttpAdapter {
	void sendRequest(WXRequest request, OnHttpListener listener);
}
```

#### WXRequest

- `paramMap`(_Map<String, String>_): http自定义请求参数,比如(?a=1&b=2);
- `url`(_String_): http请求的目标url
- `method`(_String_): http请求方法 "post","get"
- `body`(_String_): http请求body
- `timeoutMs`(_int_): 请求超时时间，__默认是3s__
- `instanceId`(_String_): （页面）id


#### OnHttpListener

```
interface OnHttpListener {

	/**
	*  开始请求
	*/
	void onHttpStart();

	/**
	* 收到http header内容
	*/
	void onHeadersReceived(int statusCode,Map<String,List<String>> headers);

	/**
	*
	* @param 上传进度
	*/
	void onHttpUploadProgress(int uploadProgress);

	/**
	*
	* @param loadedLength 接收到的数据长度
	*/
	void onHttpResponseProgress(int loadedLength);

	/**
	* 请求结束
	* @param response 返回的response
	*/
	void onHttpFinish(WXResponse response);
}
```

### IWXUserTrackAdapter(可选)

打点相关，如果关注weex的打点，需要实现这个adapter
- 基础信息：sdk版本、jsbundle大小...
- 性能信息：sdk初始化时间、页面加载可交互时间、加载bundle时间...

```
public interface IWXUserTrackAdapter {
	void commit(Context context, String eventId, String type, WXPerformance perf, Map<String, Serializable> params);
}
```

### IActivityNavBarSetter

`WXNavigatorModule`的实现依赖这个接口，用来操作navigation.

使用方式:

```
WXSDKEngine.setActivityNavBarSetter(new IActivityNavBarSetter(){});   
```

### IWXStorageAdapter

`WXStorageModule`实现依赖这个接口，用来实现数据的存、取默认使用`DefaultWXStorage`实现


### IWXJSExceptionAdapter

WEEX的异常上报接口，包括

- 下载异常
- 白屏异常
- js异常
- 降级异常

```
public interface IWXJSExceptionAdapter {
  void onJSException(WXJSExceptionInfo exception);
}
```

使用方式：

```
WXSDKEngine.setJSExcetptionAdapter(new TestExceptionAdapter());
```

#### SDK混淆规则
若要在APP中使用混淆，请在相应的配置文件中添加如下规则：

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
