---
title: Android APIs
type: references
group: API
order: 2.2
version: 2.1
---



# WXSDKEngine

1. Register component
2. Register module
3. Set up various adapters

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

## Register module

registerModule(moduleName,moduleClass)

- `return`(_bool_): register success
- `moduleName`(_String_): module name
- `moduleClass`(_Class_): the Java class of the module, which provide a constructor with an empty parameter.

使用方式:

```
WXSDKEngine.registerModule("picker", WXPickersModule.class);
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

# WXSDKInstace

## Custom events
Used for a custom control for event notifications, such as custom click events, response drop events, and so on.

```
void fireEvent(elementRef,type)
void fireEvent(elementRef,type, data)
void fireEvent(elementRef,type,data,domChanges)
```

* `elementRef`(_String_): The event occurred for the control ID。

* `type`(_String_): Custom events, Weex defaults to a custom event starting with onXxxxx. OnPullDown (drop-down event)

* `data`(_Map<String, Object>_): Need to reveal the parameters, such as the current control of the size, coordinates and other information。

* `domChanges`(_Map<String, Object>_): Update ref for the control's Attribute and Style

## Event callback
Used for Module callback, for example, after the completion of positioning Module need to notify JS. Use as follows:

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
Weex gets the scroll event You can register `registerOnWXScrollListener` via `WXSDKInstance`

## Other Introduction

### setSize

You can use the `mWXSDKInstance.setSize()` method to change the size of the Weex container.

### Downgrade

Weex in the development stage will add some new features and new methods, but these new features and functions must be upgraded to achieve the SDK, for the application should not be upgraded how to deal with it? You can use the downgrade feature.

Native can be handled by the `onException` method in interface `IWXRenderListener`, and if it is an active demoulding errCode is a character that is divided by "|". "|" The preceding character is 1 for active demotion, and the Native side can jump to the corresponding H5 page. Or otherwise prompted the user's current environment does not support Weex.
