> **NOTICE**: **All of the exported APIs in Weex are controllable and safe, they can not access private APIs or do any system hacks at runtime,  neither can they change the primary purpose of the Application**.
>
> **If you are extending your custom modules/components, be sure NOT to export the ability of Objective-C runtime, be sure NOT to export  dynamic and uncontrolled methods such as `dlopen()`, `dlsym()`, `respondsToSelector:`, `performSelector:`, `method_exchangeImplementations()`, be sure NOT to export any private methods.**

In this section we will talk about how to extend Weex on iOS using Objective-C. For Swift, please refer [Extend using Swift](./extend-ios-with-swift.html)

## Extend module

To extend your custom weex modules in iOS, you must make your class conform to `WXModuleProtocol` protocol, and then exports your method to javaScript using macro `WX_EXPORT_METHOD`, finally register your module with your class and a self-define module name.

1. New a class derived from `NSObject` conforming `WXModuleProtocol` protocol
![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/2f15f1ef79128dd923706f0d321482e7.png)
2. Add your module method and then exports using macro `WX_EXPORT_METHOD`
![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/8079e55e74f098eb42e074f696537de1.png)
3. Register module after WeexSDK's initialization
![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/dd6b2a43132c0bfa724f5c1e56f300b4.png)

By far, we've finished a basic custom module, and you may understand how to custom a weex module in iOS using Objective-C.
We can use it in javaScript code like this: 

```Javascript
weex.requireModule("event").showParams("hello Weex)
```

#### Advanced

You must understand more in `WXModuleProtocol` protocol, we'll talk more about blueprint methods and properties in this protocol.

1. `weexInstance`
The instance of `WXSDKInstance` holds the references of all modules created in a single page. if you add `@synthesize weexInstance` in your module class, your module will hold a reference to the instance of `WXSDKInstance` who create and initialize your module, or you get nothing. You can get more details by `weexInstance` such as pageName.
2. `targetExecuteThread`
We will schedule your module method to main thread(UI thread), we highly recommend that you can not do much works here, if must, you can add implementation for this method. You can provide a thread so that we can schedule to.
3. `WXModuleKeepAliveCallback`
Sometimes you can return your result to your caller, callback is important in this scene,the params for callback can be string or dictionary. You must specify a second params to keep your callback function id in js after used. We'll create a new function id every time callback, `NO` will be a better choice for memory.
4. `WX_EXPORT_METHOD_SYNC`
This feature only works on WeexSDK 0.10 and later. Synchronous method only works in JavaScript thread, you cannot do much works here. Export asynchronous method using `WX_EXPORT_METHOD`, you may get result in callback function. Use `WX_EXPORT_METHOD_SYNC` to export synchronous method. You can get result on the left of operand `=`.

## Extend component

1. New a class derived from `WXComponent` class or other subclasses of `WXComponent`. If we do nothing in this class and then register it to WeexSDK engine, its works just like `div`.

2. Override the lifecycle of `WXComponent`
* `loadView`
We will load a view for a component. If you didn't override this method, supperclass will provide a `WXView` derived from `UIView`. If we want to load html or just to show a map, override `loadView` and provide a custom view is a good choice.
```Objective-C
- (UIView *)loadView {
    return [MKMapView new];
}
```
* `viewDidLoad`
If you want to make some configurations for your custom view like set delegate, you can finish here. You don't need to set frame for your custom view if it doesn't has any subview, WeexSDK will set it's frame according to css style after layout.
```Objective-C
- (void)viewDidLoad {
      ((MKMapView*)self.view).delegate = self;
}
```
3. Register the component
```Objective-C
[WXSDKEngine registerComponent:@"map" withClass:[WXMapComponent class]];
```
4. Use the custom component
```Html
<template>
    <div>
        <map style="width:200px;height:200px"></map>
    </div>
</template>
```

#### Custom events

Weex engine has done some works to support common events and other attributes, if you want support your own attributes, let's continue.

1. Custom events
Our goal is to support `mapLoaded` event for the component we just implemented. The front-end code can be like this.
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

2. Override add/remove event in Objective-C
We must save status for event added or not, so we add a `BOOL` member named `mapLoaded` for the component class to make it record, and when event map loaded, we can fire event according to this record.

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

3. Fire event to front-end
```Objective-C
- (void)mapViewDidFinishLoadingMap:(MKMapView *)mapView {
    if (_mapLoaded) {
        [self fireEvent:@"mapLoaded" params:@{@"customKey":@"customValue"} domChanges:nil];
    }
}
```

#### Custom attributes

The next target is that we add a custom attribute `showTraffic`, we can display real time traffic or not according to this attribute. The front-end code can be like the following.

```Html
<template>
    <div>
        <map style="width:200px;height:200px" showTraffic="true"></map>
    </div>
</template>
```

1. Override component init method `initWithRef...`
Add a `BOOL` member `showsTraffic` to make the status whether front-end user use the attribute or not record. We can get all the attribute for this component by override init method of component.
     
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

2. Set property for custom view when it is loaded.
```Objective-C
- (void)viewDidLoad {
  ((MKMapView*)self.view).showsTraffic = _showsTraffic;
}
```

3. Handle attribute updates
```Objective-C
- (void)updateAttributes:(NSDictionary *)attributes {
    if (attributes[@"showsTraffic"]) {
        _showsTraffic = [WXConvert BOOL: attributes[@"showsTraffic"]];
        ((MKMapView*)self.view).showsTraffic = _showsTraffic;
    }
}
```

#### More life-cycle methods

A native Component has a life cycle managed by Weex. Weex creates it, layout it, renders it and destroys it.

Weex offers component life cycle hooks that give you visibility into these key moments and the ability to act when they occur.

|        method        | description                              |
| :------------------: | ---------------------------------------- |
| initWithRef:type:... | Initializes a new component using the specified  properties. |
|   layoutDidFinish    | Called when the component has just laid out. |
|       loadView       | Creates the view that the component manages. |
|     viewWillLoad     | Called before the load of component's view . |
|     viewDidLoad      | Called after the component's view is loaded and set. |
|    viewWillUnload    | Called just before releasing the component's view. |
|    viewDidUnload     | Called when the component's view is released. |
|    updateStyles:     | Called when component's style are updated. |
|  updateAttributes:   | Called when component's attributes are updated. |
|      addEvent:       | Called when adding an event to the component. |
|     removeEvent:     | Called when removing an event frome the component. |

#### Add method for component

You can define your component method by macro `WX_EXPORT_METHOD`

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

You can call `focus` in your js file.

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

#### Get css style of component

1. Before v0.19, Weex used Yoga layout engine. You can access css styles via cssNode of WXCompoent. Such as
```Objective-C
  self.cssNode->style.flex = 1.0;
  float height = self.cssNode->style.dimensions[CSS_HEIGHT];
```

2. From v0.19, Weex replaced layout engine which is C++ codes. You can get css styles from styles dictionary of a WXComponent. You can also access flexCssNode property which is of type WeexCore::WXCoreLayoutNode, but must in .mm files.

3. From v0.20, WeexCore is imported to iOS, and css styles are never uploaded to WXComponent. The styles dictionary only contains non-css styles. We think that upper UI components should only care about final layout results generated by layout engine. If you still want to access css styles, you may use flexCssNode in .mm files or by extension methods provided in WXComponent+Layout.h.

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

## Custom handlers

What is the purpose of a handler? We don't provide functionality for downloading image but defines a blueprint of methods in `WXImgLoaderProtocol` for loading image, and image component get image content from these methods. You must implement methods in `WXImgLoaderProtocol` except the `optional` methods to display image from specified url.
You can also define your own `protocol` and implement its handler.

1. New a class derived from `NSObject` conforming `WXImgLoaderProtocol` and then add implementation for methods in `WXImgLoaderProtocol`.

The flowing code may require SDWebImage as dependency, you can download remote url image by your own way without SDWebImage. 
 
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

2. Register handler for a protocol

```Objective-C
[WXSDKEngine registerHandler:[WXImgLoaderDefaultImpl new] withProtocol:@protocol(WXImgLoaderProtocol)];
```

3. Use the handler
```Objective-C
id<WXImgLoaderProtocol> imageLoader = [WXSDKEngine handlerForProtocol:@protocol(WXImgLoaderProtocol)];
[iamgeLoader downloadImageWithURL:imageURl imageFrame:frame userInfo:customParam completed:^(UIImage *image, NSError *error, BOOL finished) {
}];
```
