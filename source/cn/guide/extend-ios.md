---
title: 扩展 iOS 的功能
type: guide
group: 扩展
order: 6.3
version: 2.1
---

<!-- toc -->

> **注意**：**Weex 所有暴露给 JS 的内置 module 或 component API 都是安全和可控的，它们不会去访问系统的私有 API ，也不会去做任何 runtime 上的 hack 更不会去改变应用原有的功能定位。**
>
> **如果需要扩展自定义的 module 或者 component ，一定注意不要将 OC 的 runtime 暴露给 JS ， 不要将一些诸如 `dlopen()`， `dlsym()`， `respondsToSelector:`，`performSelector:`，`method_exchangeImplementations()` 的动态和不可控的方法暴露给JS，也不要将系统的私有API暴露给JS**

Weex SDK 只提供渲染，提供了一些默认的组件和能力，如果你需要一些特性但 Weex 并未提供，可以通过扩展自定义的一些插件来实现，通过 WeexSDK 加载。这些插件包括 [component](../wiki/component-introduction.html), [module](../wiki/module-introduction.html) 和 [handler](../wiki/handler-introduction.html)。
> 本文都以 Objective-C 为例子书写，如果需要 swift 请参考 [使用 swift 扩展 Weex](./extend-module-using-swift.html)

## 自定义 module

自定义 module, 需要让自己的 class 遵循 `WXModuleProtocol` 这个protocol, 通过 `WX_EXPORT_METHOD` 这个宏暴露出需要透出到 `JavaScript` 调用的方法，注册 module，就可以完成一个简单 module 的自定义。

- module 自定义初阶 

  下面完成一个 `module`, 该 `module` 暴露一个打印输入参数的方法

  1. 新建一个 基类为 NSObject 的 class `WXCustomEventModule`，让该类遵循 `WXModuleProtocol` 的协议
    ![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/2f15f1ef79128dd923706f0d321482e7.png)

  2. 添加打印的方法，通过 `WX_EXPORT_METHOD` 暴露该方法
    ![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/8079e55e74f098eb42e074f696537de1.png)

  3. 在初始化完成 Weex SDK 之后注册该 module 
    ![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/dd6b2a43132c0bfa724f5c1e56f300b4.png)

  到此，我们已经完成了一个简单的 module 方法的封装，javaScript 端的使用如下:

    ```javaScript
      weex.requireModule("event").showParams("hello Weex")
    ```

- module 高阶用法
   1. `weexInstance`
     在一个 Weex 页面中，默认 WXSDKInstance 的 Object 持有 多个 module 的 Object, 而 module 的 object 是没有对 WXSDKInstance 做持有的， 在自定义的module 中添加 `@synthesize weexInstance`, module Object 可以对 持有它本身的 WXSDKInstance Object 做一个 弱引用， 通过 weexInstance 可以拿到调用该 module 的页面的一些信息。
   2. `targetExecuteThread` 
     Module 方法默认会在UI线程中被调用，建议不要在这做太多耗时的任务，如果要在其他线程执行整个module 方法，需要实现`WXModuleProtocol`中`- (NSThread *)`的方法，这样，分发到这个module的任务会在指定的线程中运行

   3. `WXModuleKeepAliveCallback`  
    Module 支持返回值给 JavaScript中的回调，回调的类型是`WXModuleKeepAliveCallback`,回调的参数可以是String或者Map, 该 block 第一个参数为回调给 JavaScript 的数据，第二参数是一个 BOOL 值，表示该回调执行完成之后是否要被清除，JavaScript 每次调用都会产生一个回调，但是对于单独一次调用，是否要在完成该调用之后清除掉回调函数 id 就由这个选项控制，如非特殊场景，建议传 NO。
   4. `WX_EXPORT_METHOD_SYNC` 
    > WeexSDK 0.10 版本后才支持，暴露的同步方法只能在 JS 线程执行，请不要做太多同步的工作导致JS执行阻塞。
    
     使用 `WX_EXPORT_METHOD` 暴露到前端的方法都是异步方法(获得结果需要通过回调函数获得), 如果期望获得同步调用结果，可以使用`WX_EXPORT_METHOD_SYNC` 暴露module 方法。

## Component 扩展

可能 WeexSDK 内置提供的组件并不能满足你的开发需求，比如需要期望使用地图这样一个复杂的组件，可以通过自定义一个组件，注册到 WeexSDK engine 中，可以很方便的使用起来。

### component 基础生命周期

- 新建一个基类为 `WXComponent` 的 class
  如果此时我们什么都不做，将改组件注册进 WeexSDK engine，它的功能就跟内置的 `div` 组件功能是一致的。

- 覆盖 `WXComponent` 中的生命周期方法
 
  - `loadView`  
    一个 component 默认对应于一个 view，如果未覆盖 `loadView` 提供自定义 `view`，会使用 `WXComponent` 基类中的 `WXView`，`WXView` 是继承自 UIView 的一个派生 view。
    要实现地图功能，我们需要对应的地图 view，比如系统的 `MKMapView`。
    
	    ```
	     - (UIView *)loadView {
             return [MKMapView new];
	     }
    	```
  - `viewDidLoad`  
     对组件 view 需要做一些配置，比如设置 delegate，可以在 `viewDidLoad` 生命周期做，如果当前 view 没有添加 subview 的话，不要设置 view 的 frame，WeexSDK 会根据 style 设置。
    
	    ```
	    - (void)viewDidLoad {
            ((MKMapView*)self.view).delegate = self;
	    }
	    ```
- 注册 component
 
    ```
    [WXSDKEngine registerComponent:@"map" withClass:[WXMapComponent class]];
    ```
 在前端页面直接可以使用 `map` 标签，如下所示
 
```html
    <template>
        <div>
            <map style="width:200px;height:200px"></map>
        </div>
    </template>
```

- 支持自定义事件

   给 map 组件支持 `mapLoaded` 事件

    ```html
    <template>
        <div>
            <map style="width:200px;height:200px" @mapLoaded="onMapLoaded"></map>
        </div>
    </template>

    <script>
    export default {
        methods: {
            onMapLoaded:function(e) {
                console.log("map loaded"+JSON.stringify(e))
            }
        }
    }
    </script>
    ```
   给当前组件添加 `BOOL` 成员 mapLoaded，记录当前事件是否被添加，当地图加载完成时候，我们可以根据这个判断是否应该发送事件。
   
   - 覆盖组件生命周期方法添加和移除事件
    
    覆盖 `addEvent` 和 `removeEvent` 方法 

    ```Objective-C
    - (void)addEvent:(NSString *)eventName {
        if ([eventName isEqualToString:@"mapLoaded"]) {
            _mapLoaded = YES;
        }
    }

    - (void)removeEvent:(NSString *)eventName
    {
        if ([eventName isEqualToString:@"mapLoaded"]) {
            _mapLoaded = NO;
        }
    }
    ```
    - 在适宜的时间发事件通知

    在 MKMapView 加载完成的 delegate 方法中，发事件通知自定义事件
    > 不要忘记设置 MKMapView 的 delegate.

    ```object-c
    - (void)mapViewDidFinishLoadingMap:(MKMapView *)mapView {
        if (_mapLoaded) {
            [self fireEvent:@"mapLoaded" params:@{@"customKey":@"customValue"} domChanges:nil]
        }
    }
    ```



- 支持自定义属性

    添加自定义属性 `showTraffic`

    ```html
        <template>
            <div>
                <map style="width:200px;height:200px" showTraffic="true"></map>
            </div>
        </template>
    ```
   - 覆盖组件初始化方法 `initWithRef...`

   当前component 添加 `BOOL` 成员 showsTraffic，接受保存用户输入值，添加到当前组件上的所有属性都会在初始化方法中 `attributes` 中传过来，此处我们处理我们感兴趣的属性即可。

    ```object-c
    - (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance {
        if(self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
            
            if (attributes[@"showsTraffic"]) {
                _showsTraffic = [WXConvert BOOL: attributes[@"showsTraffic"]];
            }
        }
        return self;
    }
    ```

    - 在 `viewDidLoad` 中设置该属性
     
     ```object-c
     - (void)viewDidLoad {
        ((MKMapView*)self.view).showsTraffic = _showsTraffic;
     }
     ```

    - 支持属性更新
    
    ```object-c
    - (void)updateAttributes:(NSDictionary *)attributes
    {
        if (attributes[@"showsTraffic"]) {
            _showsTraffic = [WXConvert BOOL: attributes[@"showsTraffic"]];
            ((MKMapView*)self.view).showsTraffic = _showsTraffic;
        }
    }

    ```

### 更多 component 生命周期

native 的 component 是由 Weex 管理的，Weex 创建，布局，渲染，销毁。Weex 的 component 生命周期都是可以 hook 的，你可以在这些生命周期中去做自己的事情。

|          方法          | 描述                          |
| :------------------: | --------------------------- |
| initWithRef:type:... | 用给定的属性初始化一个component.       |
|   layoutDidFinish    | 在component完成布局时候会调用.        |
|       loadView       | 创建component管理的view.         |
|     viewWillLoad     | 在component的view加载之前会调用.     |
|     viewDidLoad      | 在component的view加载完之后调用.     |
|    viewWillUnload    | 在component的view被释放之前调用.     |
|    viewDidUnload     | 在component的view被释放之后调用.     |
|    updateStyles:     | 在component的style更新时候调用.     |
|  updateAttributes:   | 在component的attribute更新时候调用. |
|      addEvent:       | 给component添加event的时候调用.     |
|     removeEvent:     | 在event移除的时候调用.              |

或许你需要考虑更多的生命周期方法去 Hook，当布局完成时候，像 `layoutDidFinish`，如果你想了解更多，可以参考一下`WXComponent.h` 声明的方法。

### component 方法

WeexSDK 0.9.5 之后支持了在 js 中直接调用 component 的方法，自定义完组件后，下面的例子可以指引你完成 component 方法。

- 自定义一个 WXMyCompoenent 的组件

  ```object-c
  @implementation WXMyComponent
  WX_EXPORT_METHOD(@selector(focus)) // 暴露该方法给js
  - (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
  {
      if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
          // handle your attributes
          // handle your styles
      }

      return self;
  }

  - (void)focus
  {
      NSLog(@"you got it");
  }
  @end
  ```

- 注册组件 `[WXSDKEngine registerComponent:@"mycomponent" withClass:[WXMyComponent class]]`

- 在 weex 文件中调用

  ```html
  <template>
    <mycomponent ref='mycomponent'></mycomponent>
  </template>
  <script>
    module.exports = {
      created:function() {
        this.$refs.mycomponent.focus();
      }
    }
  </script>
  ```

### 获取组件的 CSS 样式信息

- 在 0.19 版本之前，Weex 使用 Yoga 排版引擎，可以通过访问 WXComponent 的 cssNode 属性获取。例如：
  ```
  self.cssNode->style.flex = 1.0;
  float height = self.cssNode->style.dimensions[CSS_HEIGHT]);
  ```

- 从 0.19 版本开始，Weex 使用自已的排版引擎，是 C++ 代码。获取 CSS 属性可以从 WXComponent 的 styles 字典（NSDictionary）里获取，也可以访问 WXComponent 的 flexCssNode 属性，其类型为 C++ 类 WeexCore::WXCoreLayoutNode。注意，需要源文件为 .mm 类型。

- 从 0.20 版本开始，iOS 接入 WeexCore，排版引擎也沉入 WeexCore层，并且 CSS 相关属性不再上传给 WXComponent 对象，WXComponent 对象的 styles 字典里只有非 CSS 样式。我们的目的是上层 UI 组件只需要关心排版引擎生成的最终坐标即可，不需要关心前端标记的 CSS 属性。如果仍然需要获取 CSS 样式，可以在 .mm 文件中直接访问 flexCssNode，或通过 WXComponent+Layout.h 文件中提供的扩展方法。

 ```
 /* 通过 key 获取 CSS 样式，可以在 ObjC 文件中调用。这个方法在 Component 线程调用是最安全的，
 比如通过WXPerformBlockOnComponentThread调用。不过 WXComponent 的 init 方法总是在 Component 线程执行的，
 所以在 init 方法里完成 CSS 样式获取，可以直接调用。

 当前支持的 Key 如下：
    width, height, min-width, min-height, max-width, max-height,
    margin-(left/right/top/bottom)
    padding-(left/right/top/bottom)
    border-(left/right/top/bottom)-width
    left, right, top, bottom
    flex-grow
 */
- (float)getCssStyleValueForKey:(NSString *)key;

// 其它方法，功能如其名，也需要在 Component 线程调用
- (WXCoreFlexDirection)getCssStyleFlexDirection;
- (WXCoreFlexWrap)getCssStyleFlexWrap;
- (WXCoreJustifyContent)getCssStyleJustifyContent;
- (WXCoreAlignItems)getCssStyleAlignItems;
- (WXCoreAlignSelf)getCssStyleAlignSelf;
- (WXCorePositionType)getCssStylePositionType;
- (NSString*)convertLayoutValueToStyleValue:(NSString*)valueName;
 ```

## 自定义 handler 

   weexSDK 目前没有提供图片下载的能力，在`WXImgLoaderProtocol` 定义了一些获取图片的接口，image 组件正是通过 `WXImgLoaderProtocol` 获得并展示图片，开发者可以实现该 protocol 中的接口方法，这样 `image` 标签才能正常展示图片。 
   
  开发者也可以定义自己的 `protocol` 和对应的实现来使用 `handler` 机制

- 新建基类为 NSObject 的 class 实现 `WXImgLoaderProtocol` 协议， 实现 `WXImgLoaderProtocol` 的方法
> 下面加载图片的逻辑需要依赖 SDWebImage，你也可以不依赖 SDWebimage 使用自己的方式加载对应 URL 图片。

    ```object-c
    @implementation WXImgLoaderDefaultImpl
    - (id<WXImageOperationProtocol>)downloadImageWithURL:(NSString *)url imageFrame:(CGRect)imageFrame userInfo:(NSDictionary *)userInfo completed:(void(^)(UIImage *image,  NSError *error, BOOL finished))completedBlock
    {
        if ([url hasPrefix:@"//"]) {
            url = [@"http:" stringByAppendingString:url];
        }
        return (id<WXImageOperationProtocol>)[[SDWebImageManager sharedManager] downloadImageWithURL:[NSURL URLWithString:url] options:0 progress:^(NSInteger receivedSize, NSInteger expectedSize) {
        } completed:^(UIImage *image, NSError *error, SDImageCacheType cacheType, BOOL finished, NSURL *imageURL) {
        if (completedBlock) {
            completedBlock(image, error, finished);
        }
        }];
    }
    @end
    ```

- 注册 handler 

    你可以通过WXSDKEngine 中的 `registerHandler:withProtocol` 注册handler

    ```object-c
    WXSDKEngine.h
    /**
    * @abstract Registers a handler for a given handler instance and specific protocol
    * @param handler The handler instance to register
    * @param protocol The protocol to confirm
    */
    + (void)registerHandler:(id)handler withProtocol:(Protocol *)protocol;

    [WXSDKEngine registerHandler:[WXImgLoaderDefaultImpl new] withProtocol:@protocol(WXImgLoaderProtocol)]

    ```
- 使用 handler

  handler 可以在 native 的 module 或者 component 实现中使用
  
  ```object-c
    id<WXImgLoaderProtocol> imageLoader = [WXSDKEngine handlerForProtocol:@protocol(WXImgLoaderProtocol)];
    [iamgeLoader downloadImageWithURL:imageURl imageFrame:frame userInfo:customParam completed:^(UIImage *image, NSError *error, BOOL finished){
    }];
  ```
