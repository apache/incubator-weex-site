---
title: Android APIs
type: references
group: API
order: 2.2
version: 2.1
---

# Android APIs

Weex 初步接入请参考：https://github.com/weexteam/article/issues/25

## WXSDKEngine
WXSDKEngine 是 Weex 对外的总入口。
主要提供了一下功能：

1. 注册自定义 module 和 component
1. 设置相关 adapter 和获取 adapter。

### 注册自定义 module 和 component
#### component
Weex提供多种注册 Component的方式，其中效率最高的为

    public static boolean registerComponent(IFComponentHolder holder, boolean appendTree, String ... names)

* holder 为一个抽象工厂，用于创建component，可使用 SimpleComponentHolder 来快速的构建该对象。
* appendTree 为一个扩展标记位，目前暂无意义。
* names 表示该 component 在前端代码中名称，可把多个前端组件映射成一个 component 。

#### module
Weex 提供如下注册 Module 的方式：

    public static <T extends WXModule> boolean registerModule(String moduleName, Class<T> moduleClass,boolean global) throws WXException

* moduleName 前端代码中module的名称
* moduleClass module对应的Class，需要提供一个不含参数的构造函数，或使用默认构造函数。
* global 是否为全局唯一，true 为全局唯一，false 表示和 WXSDKInstance 绑定。

### Adapter 介绍
第三方 App 可能需要实现下述的 Adapter，才能完整的使用Weex的能力。

#### 图片适配器
Weex 图片适配器负责根据URL，加载对应的图片，图片适配器分为两种：
1. 将 URL 对应的图片加载到 View 上
1. 将 URL 对应的图片加载到 Drawable 对象上。

第一种图片适配器是必须实现，第二种图片适配器是可选实现。Weex对于这两种图片适配器均没有默认实现。

##### IWXImgLoaderAdapter
Weex 会把需要设置图片的 View 和 URL 透露出来，Native 端需要实现这个接口进行图片下载。

接口定义如下：

    public interface IWXImgLoaderAdapter {
      void setImage(String url, ImageView view, WXImageQuality quality,WXImageStrategy strategy);
    }
  
* `WXImageQuality` 表示图片的质量，`WXImageQuality` 取如下值 `LOW`, `NORMAL`, `HIGH`, `ORIGINAL` 图片质量依次变高。默认为 `LOW`。
* `WXImageStrategy` 为扩展类，表示了图片是否可以裁剪 (isClipping) 锐化 (isSharpen) 占位符 (placeHolder) 等。

##### IDrawableLoader 
Weex 会把需要设置图片的 对象(DrawableTarget) 和 URL 透露出来，Native 端需要实现这个接口进行图片下载。

接入者需要实现DrawableTarget这个类，并实现
    void setDrawable(String url, DrawableTarget drawableTarget, DrawableStrategy drawableStrategy);
* `DrawableTarget` 表示待加载的对象，需要是`StaticTarget`或`AnimatedTarget`中的一个。

#### IWXHttpAdapter 网络下载适配器

Weex 自定义了 `WXRequest` 和 `OnHttpListener`，Native 重载接口后可以从 Request 中获取URL，Header 等参数，网络请求完成后可以通过 `OnHttpListener` 进行回调通知。Weex 提供了默认网络请求：`DefaultWXHttpAdapter`， 使用的是 `HttpURLConnection` 进行网络请求。

接口定义如下：

    public interface IWXHttpAdapter {
      void sendRequest(WXRequest request, OnHttpListener listener);
    }

`WXRequest` 定义了网络请求相关的参数，请求方法，请求主体，超时时间。Weex默认超时时间是3000.

`OnHttpListener` 定义了网络请求结束后对应方法。定义如下：

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

#### IWXUserTrackAdapter 埋点适配器

接口定义：

    public interface IWXUserTrackAdapter {
      void commit(Context context, String eventId, String type, WXPerformance perf, Map<String, Serializable> params);
    }

* Native 实现接口后可以通过 `WXPerformance` 和 `params` 获取对应的信息。
* WXPerformane 对应字段表示含义请参考文档：https://github.com/weexteam/article/issues/124

后续随着开发 Weex 还会定义更多的 Adapter，此文档也会定时更新。

#### IActivityNavBarSetter Weex导航适配器

Weex 提供了 `WXNavigatorModule` 进行导航控制，对应的方法可以通过设置 `IActivityNavBarSetter` 接口进行定制。

使用方法:

    WXSDKEngine.setActivityNavBarSetter(new IActivityNavBarSetter(){});

#### IWXStorageAdapter
Weex提供了`WXStorageModule`将一些数据存储到本地，WXStorageModule依赖`IWXStorageAdapter`来操作本地存储系统。 Weex提供了一个默认的实现，DefaultWXStorage。

#### IWXJSExceptionAdapter
Weex依赖`IWXJSExceptionAdapter`来实现JavaScript异常的处理，默认行为是忽略JavaScript异常。

## WXSDKInstance

### Weex 中 Native 和 JS 通信

#### 自定义事件通知
多用于某个自定义控件进行事件通知，例如自定义点击事件，响应下拉事件等。

  WXSDKInstance.java

    public void fireEvent(String elementRef,final String type, final Map<String, Object> data,final Map<String, Object> domChanges){  }

    public void fireEvent(String elementRef,final String type, final Map<String, Object> data){
      fireEvent(elementRef,type,data,null);
    }

    public void fireEvent(String elementRef, String type){
      fireEvent(ref,type,new HashMap<String, Object>());
    }

* `elementRef`：事件发生的控件 ID。
* `type`: 自定义事件，Weex 默认以 onXxxxx 开头为自定义事件。onPullDown (下拉事件)。
* `data`: 需要透出的参数，例如当前控件的大小，坐标等其他信息。
* `domChanges`：更新 ref 对应控件的 Attribute 和 Style。

#### 事件回调
多用于 Module 回调，例如定位 Module 完成后需要通知 JS。使用方法如下：

  public class WXLocation extends WXModule {

    @JSMethod
    public void getLocation(JSCallback callback){
      //获取定位代码.....
      Map<String,String> data=new HashMap<>();
      data.put("x","x");
      data.put("y","y");
      //通知一次
      callback.invoke(data);
      //持续通知
      callback.invokeAndKeepAlive(data);

      //invoke方法和invokeAndKeepAlive两个方法二选一
    }

### Weex 和其他 Native 组件通讯

#### 注册滑动事件

Weex 获取滑动事件可以通过 `WXSDKInstance` 注册 `registerOnWXScrollListener` 监听

接口定义如下：

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

## 其他介绍
### 动态适配容器

因为 Android 手机的碎片化导致屏幕适配很困难。Weex 对外提供的接口 render 需要动态传入容器的宽高，但是传入的宽高有时会发生变化，例如 ActionBar 隐藏等，这是传入的 Weex 容器也要进行对应的变化。
为了适应这种变化，Weex 提供了接口 `WXSDKInstance.setSize(int width, int height)` 来改变容器的大小。

    /**
       *
       * @param width 容器宽度
       * @param height 容器高度
       */
    public void setSize(int width, int height){};

### 降级使用

Weex 处于发展阶段会增加一些新的特性和功能，但是这些新的特性和功能都必须升级 SDK 才能实现，对于没有升级的应用应该怎么处理呢？可以使用降级功能。

所谓降级功能就是 Weex 无法运行的版本或者手机，可以用 Weex h5 来代替。

Native 端可以通过接口 `IWXRenderListener` 中的 `onException` 方法进行处理，如果是主动降级 errCode 是以“|”分割的字符。“|"前面的字符为1表示主动降级，Native 端可以跳转到对应的 H5 页面。或者用其他的方式提示用户当前环境不支持 Weex。
