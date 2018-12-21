---
title: Android APIs
type: references
group: API
order: 2.2
version: 2.1
---



# WXSDKEngine

1. 注册module 
2. 注册component
3. 设置自定义的adapter


## 注册Component

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


## 注册Module

registerModule(moduleName,moduleClass)

- `return`(_bool_): 是否注册成功
- `moduleName`(_String_): 模块名称
- `moduleClass`(_Class_): 模块对应的class，创建module实例时使用

使用方式:

```
WXSDKEngine.registerModule("picker", WXPickersModule.class);
```

## 注册Adapter

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

# WXSDKInstace

Weex Native 和 JavaScript 世界交互通信.

## 自定义发送事件

向js世界发送一些事件，比如`click`事件

```
void fireEvent(elementRef,type)
void fireEvent(elementRef,type, data)
void fireEvent(elementRef,type,data,domChanges)
```

* `elementRef`(_String_)：产生事件的组件id

* `type`(_String_): 事件名称，weex默认事件名称格式为"onXXX",比如`OnPullDown `

* `data`(_Map<String, Object>_): 需要发送的一些额外数据，比如`click`时，view大小，点击坐标等等。

* `domChanges`(_Map<String, Object>_): 目标组件的属性和样式发生的修改内容


## 结果回调

JS调用时，有的场景需要返回一些数，比如以下例子，返回x、y坐标

```
public class WXLocation extends WXModule {

      @JSMethod
      public void getLocation(JSCallback callback){
      //Get the code for the location information .....
      Map<String,String> data=new HashMap<>();
      data.put("x","x");
      data.put("y","y");
      //notify once
      callback.invoke(data);
      //Continuous connection
      callback.invokeAndKeepAlive(data);
      //Invoke method and invokeAndKeepAlive two methods of choice  }
}
```

## OnWXScrollListener

如果想要拿到instance滚动的信息，需要在`WXSDKInstance`上注册`registerOnWXScrollListener` ，详细参数见`OnWXScrollListener `



## 其它的一些接口介绍
### 设置instance显示的大小

使用`mWXSDKInstance.setSize()`来改变instance容器显示的大小


### 降级

Weex在开发过程中，会不断增加新的feature，但是这些feature可能在老版本上不兼容。这种情况下，native可以在`IWXRenderListener`的`onException`中进行判断，如果错误信息是 "|"格式. 并且分割后，"|"前第一个字符串等于1，这时候native可以直接降级到h5页面或者提示用户当前版本不支持。
