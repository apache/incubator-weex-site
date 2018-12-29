> 注意：Weex 所有暴露给 JS 的内置 module 或 component API 都是安全和可控的，它们不会去访问系统的私有 API，也不会去做任何 runtime 上的 hack 更不会去改变应用原有的功能定位。  
> 如果需要扩展自定义的 module 或者 component ，一定注意不要将 OC 的 runtime 暴露给 JS ，不要将一些诸如 `dlopen()`， `dlsym()`， `respondsToSelector:`，`performSelector:`，`method_exchangeImplementations()` 的动态和不可控的方法暴露给JS，也不要将系统的私有API暴露给JS。否则将可能面临苹果上架审核问题。

在这篇文档里，我们使用 Objective-C 来扩展 Weex 功能，如果想使用 Swift，可以参考 [使用 Swift 扩展](./extend-ios-with-swift.html)。

## 自定义 module
自定义 module，需要让自己的 class 遵循 `WXModuleProtocol` 这个protocol，通过 `WX_EXPORT_METHOD` 这个宏暴露出需要透出到 `JavaScript` 调用的方法，再向 WeexSDK 注册 module，就可以完成一个简单 module 的自定义。

1. 新建一个基类为 NSObject 的 class `WXCustomEventModule`，让该类遵循 `WXModuleProtocol` 的协议。
<img src="https://img.alicdn.com/tfs/TB1LrZ8n7voK1RjSZPfXXXPKFXa-1042-264.png" width="100%">
2. 添加打印的方法，通过 `WX_EXPORT_METHOD` 暴露该方法。
<img src="https://img.alicdn.com/tfs/TB156M9nZfpK1RjSZFOXXa6nFXa-1434-564.png" width="100%">
3. 在初始化完成 Weex SDK 之后注册该 module。
<img src="https://img.alicdn.com/tfs/TB1IGo4nVzqK1RjSZFoXXbfcXXa-1420-122.png" width="100%">

到此，我们已经完成了一个简单的 module 方法的封装，在 JS 里使用方法如下：

```Javascript
weex.requireModule("event").showParams("hello Weex)
```

#### Module 进阶

关于 Module 和 Module 方法的执行特性（同步、异步；执行线程），需要了解：

1. `weexInstance`  
在一个 Weex 页面中，默认 WXSDKInstance 的实例持有多个 module 的实例, 而 Module 的实例是是没有对 WXSDKInstance 做持有的，在自定义的 module 中添加 `@synthesize weexInstance`，module 实例可以对持有它本身的 WXSDKInstance 实例做一个弱引用，通过 weexInstance 可以拿到调用该 module 的页面的一些信息。
2. `targetExecuteThread`  
Module 方法默认会在 UI 线程（iOS 主线程）中被调用，建议不要在这做太多耗时的任务。如果你的任务不需要在 UI 线程执行或需要在特定线程执行，需要实现 `WXModuleProtocol` 中的 `- (NSThread *)` 的方法，并返回你希望方法执行所在的线程。
3. `WXModuleKeepAliveCallback`  
Module 支持返回值给 JavaScript 中的回调，回调的类型是 `WXModuleKeepAliveCallback`。回调的参数可以是 `String` 或者 `Map`。该 block 第一个参数为回调给 JavaScript 的数据，第二参数是一个 BOOL 值，表示该回调执行完成之后是否要被清除。JavaScript 每次调用都会产生一个回调，但是对于单独一次调用，是否要在完成该调用之后清除掉回调函数 id 就由这个选项控制，如非特殊场景，建议传 NO。
4. `WX_EXPORT_METHOD_SYNC`  
使用 `WX_EXPORT_METHOD` 暴露到前端的方法都是异步方法(获得结果需要通过回调函数获得)。如果期望获得同步调用结果，可以使用 `WX_EXPORT_METHOD_SYNC` 声明同步的 Module 方法。

## 扩展组件

1. 新建一个基类为 `WXComponent` 的类。如果这个类里什么代码也不写，它和默认的的 `div` 组件能力是一致的。  
2. 覆盖 `WXComponent` 中的生命周期方法
* `loadView`  
一个组件默认对应于一个 view，如果未覆盖 `loadView` 提供自定义 view，会让 `WXComponent` 基类创建 `WXView`。`WXView` 继承自 `UIView`。比如我们要实现一个组件支持地图功能，我们可以返回系统的 `MKMapView`。
```Objective-C
- (UIView *)loadView {
    return [MKMapView new];
}
```
* `viewDidLoad`
对组件 view 需要做一些配置，比如设置 delegate，可以在 `viewDidLoad` 生命周期做。如果当前 view 没有添加 subview 的话，不要设置 view 的 frame，WeexSDK 会根据 style 进行排版后设置。
```Objective-C
- (void)viewDidLoad {
      ((MKMapView*)self.view).delegate = self;
}
```
3. 注册组件
```Objective-C
[WXSDKEngine registerComponent:@"map" withClass:[WXMapComponent class]];
```
4. 在前端代码中使用新组件
```Html
<template>
    <div>
        <map style="width:200px;height:200px"></map>
    </div>
</template>
```

#### 自定义事件  

1. 对于每个组件，WeexSDK 默认提供了一些事件能力，如点击等。假如想给我们的地图组件提供 `mapLoaded` 事件。
```Html
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

2. 覆盖组件生命周期方法，记录事件是否需要处理

我们需要额外添加一个 `BOOL` 成员 `mapLoaded` 用来记录该事件是否生效。

```Objective-C
- (void)addEvent:(NSString *)eventName {
    if ([eventName isEqualToString:@"mapLoaded"]) {
        _mapLoaded = YES;
    }
}

- (void)removeEvent:(NSString *)eventName {
    if ([eventName isEqualToString:@"mapLoaded"]) {
        _mapLoaded = NO;
    }
}
```

3. 给前端发送事件
```Objective-C
- (void)mapViewDidFinishLoadingMap:(MKMapView *)mapView {
    if (_mapLoaded) {
        [self fireEvent:@"mapLoaded" params:@{@"customKey":@"customValue"} domChanges:nil];
    }
}
```

#### 自定义属性

给我们的地图组件添加一个新的属性 `showTraffic`。在前端代码里可以控制组件是否显示车流情况。
```Html
<template>
    <div>
        <map style="width:200px;height:200px" showTraffic="true"></map>
    </div>
</template>
```

1. 覆盖组件初始化方法 `initWithRef...`
给组件添加一个成员变量记录 `showTraffic` 属性的值，并在 init 方法中初始化。   

```Objective-C
- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance {
    if(self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        if (attributes[@"showsTraffic"]) {
            _showsTraffic = [WXConvert BOOL: attributes[@"showsTraffic"]];
        }
    }
    return self;
}
```

2. 在生命期事件中记得将属性值同步给地图控件
```Objective-C
- (void)viewDidLoad {
  ((MKMapView*)self.view).showsTraffic = _showsTraffic;
}
```

3. 当属性更新时，同步给地图控件
```Objective-C
- (void)updateAttributes:(NSDictionary *)attributes {
    if (attributes[@"showsTraffic"]) {
        _showsTraffic = [WXConvert BOOL: attributes[@"showsTraffic"]];
        ((MKMapView*)self.view).showsTraffic = _showsTraffic;
    }
}
```

#### 更多的组件生命期方法

组件是由 Weex 管理的，比如创建、布局、渲染、销毁。Weex 组件的生命周期方法都是可以重写的，你可以在这些生命周期中去做自己的事情。

| 方法 | 描述 |
| ---------- | --------- |
| initWithRef:type:… | 用给定的属性初始化一个component. |
| layoutDidFinish | 在component完成布局时候会调用. |
| loadView | 创建component管理的view. |
| viewWillLoad | 在component的view加载之前会调用. |
| viewDidLoad | 在component的view加载完之后调用. |
| viewWillUnload | 在component的view被释放之前调用. |
| viewDidUnload | 在component的view被释放之后调用. |
| updateStyles: | 在component的style更新时候调用. |
| updateAttributes: | 在component的attribute更新时候调用. |
| addEvent: | 给component添加event的时候调用. |
| removeEvent: | 在event移除的时候调用. |

#### 给组件添加方法

在组件代码中使用宏 `WX_EXPORT_METHOD` 声明组件方法供前端调用。

```Objective-C
@implementation WXMyComponent

WX_EXPORT_METHOD(@selector(focus))

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance {
   if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
       // handle your attributes
       // handle your styles
   }

   return self;
}

- (void)focus {
    NSLog(@"you got it");
}
@end
```

在 JS 中调用 `focus` 方法。

```Html
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

#### 获取组件的 CSS 样式

1. 在 0.19 版本之前，Weex 使用 Yoga 排版引擎，可以通过访问 WXComponent 的 cssNode 属性获取。例如：
```Objective-C
self.cssNode->style.flex = 1.0;
float height = self.cssNode->style.dimensions[CSS_HEIGHT];
```

2. 从 0.19 版本开始，Weex 使用自已的排版引擎，是 C++ 代码。获取 CSS 属性可以从 WXComponent 的 styles 字典（NSDictionary）里获取，也可以访问 WXComponent 的 flexCssNode 属性，其类型为 C++ 类 WeexCore::WXCoreLayoutNode。注意，需要源文件为 .mm 类型。

3. 从 0.20 版本开始，iOS 接入 WeexCore，排版引擎也沉入 WeexCore层，并且 CSS 相关属性不再上传给 WXComponent 对象，WXComponent 对象的 styles 字典里只有非 CSS 样式。我们的目的是上层 UI 组件只需要关心排版引擎生成的最终坐标即可，不需要关心前端标记的 CSS 属性。如果仍然需要获取 CSS 样式，可以在 .mm 文件中直接访问 flexCssNode，或通过 WXComponent+Layout.h 文件中提供的扩展方法。

```Objective-C
/**
 * @abstract Get css style value for key. The key should be of CSS standard form.
 *  This method is for convenience use in C/ObjC environment. And if you want to
 *  retrieve all style values or in C++, you could use flexCssNode directly.
 *
 *  Thread usage:
 *      This method should be invoked in component thread by WXPerformBlockOnComponentThread.
 *      Note that all initWithRef methods of WXComponent and its subclasses are performed in
 *      component thread by default. Therefore you can call this method directly in initWithRef.
 *
 *  Supported keys:
 *      width, height, min-width, min-height, max-width, max-height,
 *      margin-(left/right/top/bottom)
 *      padding-(left/right/top/bottom)
 *      border-(left/right/top/bottom)-width
 *      left, right, top, bottom
 *      flex-grow
 */
- (float)getCssStyleValueForKey:(NSString *)key;

// Other methods which should also be used in component thread.
- (WXCoreFlexDirection)getCssStyleFlexDirection;
- (WXCoreFlexWrap)getCssStyleFlexWrap;
- (WXCoreJustifyContent)getCssStyleJustifyContent;
- (WXCoreAlignItems)getCssStyleAlignItems;
- (WXCoreAlignSelf)getCssStyleAlignSelf;
- (WXCorePositionType)getCssStylePositionType;
- (WXCoreDirection)getCssDirection;
```

## 自定义 handler

Handler 的作用是什么？比如 WeexSDK 目前没有提供图片下载的能力，而是在 `WXImgLoaderProtocol` 定义了一些获取图片的接口。Image 组件正是通过 `WXImgLoaderProtocol` 获得并展示图片，开发者可以实现该 protocol 中的接口方法，这样 `image` 标签才能正常展示图片。

开发者也可以定义自己的 `protocol` 和对应的实现来使用 `handler` 机制。常见的一个场景就是在每个 App 中需要特定的 Handler 来实现一些公共的能力。

1. 新建基类为 NSObject 的类，并实现 `WXImgLoaderProtocol` 协议，实现 `WXImgLoaderProtocol` 的方法。
下面加载图片的逻辑需要依赖 SDWebImage，你也可以不依赖 SDWebimage 使用自己的方式加载对应 URL 图片。
```Objective-C
@implementation WXImgLoaderDefaultImpl
- (id<WXImageOperationProtocol>)downloadImageWithURL:(NSString *)url imageFrame:(CGRect)imageFrame userInfo:(NSDictionary *)userInfo completed:(void(^)(UIImage *image,  NSError *error, BOOL finished))completedBlock {
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

2. 注册
```Objective-C
[WXSDKEngine registerHandler:[WXImgLoaderDefaultImpl new] withProtocol:@protocol(WXImgLoaderProtocol)];
```

3. 使用
```Objective-C
id<WXImgLoaderProtocol> imageLoader = [WXSDKEngine handlerForProtocol:@protocol(WXImgLoaderProtocol)];
[iamgeLoader downloadImageWithURL:imageURl imageFrame:frame userInfo:customParam completed:^(UIImage *image, NSError *error, BOOL finished) {
}];
```
