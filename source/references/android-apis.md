---
title: Android APIs
type: references
group: API
order: 2.2
version: 2.1
---

# Android APIs

## WXSDKEngine

1. Register the module and component
1. Set up various adapters

### Module & Component
#### Component
One can register a component using the following function:

    public static boolean registerComponent(IFComponentHolder holder, boolean appendTree, String ... names)

* holder is a abstract factory designed for create Component, and SimpleComponentHolder is the a simple way to achieve IFComponentHolder.
* appendTree is an additional flag which is unused now.
* names is the component's name in front end template file. A Android component could be mapped into multiple names.

#### Module
One can register a module using the following way:

    public static <T extends WXModule> boolean registerModule(String moduleName, Class<T> moduleClass,boolean global) throws WXException

* moduleName is the name in front end template.
* moduleClass is the Java class of the module, which provide a constructor with an empty parameter.
* global is a flag, true for singleton in the whole app, false for creating an object for each WXSDKIntance.

### Adapter
#### ImageAdapter
Image adapter is responsible for loading images according to URLs. There are two types of image adapter:
1. Loading a image to a view according to URL.
1. Loading a image to a specified object according to URL.

In order to use image component, one must implement the first adapter, while the second adapter is optional.

##### IWXImgLoaderAdapter

    public interface IWXImgLoaderAdapter {
      void setImage(String url, ImageView view, WXImageQuality quality, WXImageStrategy strategy);
    }

 * `WXImageQuality` that the quality of the picture variables, take the following values `LOW`, `NORMAL`, `HIGH`, `ORIGINAL` picture quality in turn higher. The default is `LOW`.
 * `WXImageStrategy` is an extension class that indicates whether the image can be cut (isClipping) sharpening (isSharpen) placeholder (placeHolder) and so on.

##### IDrawableLoaderAdapter
This adapter is optional.

    void setDrawable(String url, DrawableTarget drawableTarget, DrawableStrategy drawableStrategy);

*  `DrawableTarget` is a object into where will load an image. `DrawableTarget` is one of `StaticTarget` or `AnimatedTarget`.

#### IWXHttpAdapter

Weex custom `WXRequest` and `OnHttpListener`, Native reload interface can be obtained from the Request URL, Header and other parameters, the network request can be completed through `OnHttpListener` callback notification. Weex provides the default network request: `DefaultWXHttpAdapter`, using `HttpURLConnection` for network requests.

The interface is defined as follows:

    public interface IWXHttpAdapter {
      void sendRequest(WXRequest request, OnHttpListener listener);
    }

* `WXRequest` defines the parameters related to the network request, the request method, the request body, and the timeout time. Weex default timeout is 3000.

* `OnHttpListener` defines the corresponding method after the network request ends. Defined as follows:

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

#### IWXUserTrackAdapter
Weex related performance data (first screen loading time, JS-Native communication time, dom update time, etc.) and other general information (JSLib file size, Weex SDK version number, etc.).

    public interface IWXUserTrackAdapter {
      void commit(Context context, String eventId, String type, WXPerformance perf, Map<String, Serializable> params);
    }

Native implementation interface can be obtained through `WXPerformance` and `params` corresponding information.

#### IActivityNavBarSetter
Weex provided the ability of navigation through `WXNavigatorModule` which relys on IActivityNavBarSetter.

Usage:

    WXSDKEngine.setActivityNavBarSetter(new IActivityNavBarSetter(){});    

#### IWXStorageAdapter
Weex provided the ability of local storage through `WXStorageModule` which depends on IWXStorageAdapter. One can use `DefaultWXStorage` as the default implementation of IWXStorageAdapter.


#### IWXJSExceptionAdapter
IWXJSExceptionAdapter is used to handle JavaScript exception.

## WXSDKInstace
### Weex Native and JavaScript communication.

#### Custom events
Used for a custom control for event notifications, such as custom click events, response drop events, and so on.

`WXSDKInstance.java `

    public void fireEvent(String elementRef,final String type, final Map<String, Object> data,final Map<String, Object> domChanges){  }

    public void fireEvent(String elementRef,final String type, final Map<String, Object> data){
      fireEvent(elementRef,type,data,null);
    }

    public void fireEvent(String elementRef, String type){
      fireEvent(ref,type,new HashMap<String, Object>());
    }

* `elementRef`：The event occurred for the control ID。

* `type`: Custom events, Weex defaults to a custom event starting with onXxxxx. OnPullDown (drop-down event)

* `data`: Need to reveal the parameters, such as the current control of the size, coordinates and other information。

* `domChanges`：Update ref for the control's Attribute and Style

#### Event callback
Used for Module callback, for example, after the completion of positioning Module need to notify JS. Use as follows:

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

### Weex Native and other Native code communication
#### OnWXScrollListener
Weex gets the scroll event You can register `registerOnWXScrollListener` via `WXSDKInstance`
The interface is defined as follows:

    public interface OnWXScrollListener {

      /**
      * The  view is not currently scrolling.
      */
      int IDLE = RecyclerView.SCROLL_STATE_IDLE;
      /**
      * The view is currently being dragged by outside input such as user touch input.
      */
      int DRAGGING = RecyclerView.SCROLL_STATE_DRAGGING;
      /**
      * The view is currently animating to a final position while not under
      * outside control.
      */
      int SETTLING = RecyclerView.SCROLL_STATE_SETTLING;

      /**
      * Callback method to be invoked when the view has been scrolled. This will be
      * called after the scroll has completed.
      * <p>
      * This callback will also be called if visible item range changes after a layout
      * calculation. In that case, dx and dy will be 0.
      *
      */
      void onScrolled(View view, int x, int y);

      /**
      * Callback method to be invoked when view's scroll state changes.
      *
      */
      void onScrollStateChanged(View view, int x, int y, int newState);
    }

## Other Introduction
### setSize

You can use the `mWXSDKInstance.setSize()` method to change the size of the Weex container.

### Downgrade

Weex in the development stage will add some new features and new methods, but these new features and functions must be upgraded to achieve the SDK, for the application should not be upgraded how to deal with it? You can use the downgrade feature.

Native can be handled by the `onException` method in interface `IWXRenderListener`, and if it is an active demoulding errCode is a character that is divided by "|". "|" The preceding character is 1 for active demotion, and the Native side can jump to the corresponding H5 page. Or otherwise prompted the user's current environment does not support Weex.
