---
title: Extend iOS
type: guide
group: Extend
order: 6.4
version: 2.1
---

<!-- toc -->

> **NOTICE**: **All of the exported APIs in Weex are controllable and safe, they can not access private APIs or do any system hacks at runtime,  neither can they change the primary purpose of the Application**.
>
> **If you are extending your custom modules/components,  be sure NOT to export the ability of Objective-C runtime, be sure NOT to export  dynamic and uncontrolled methods such as `dlopen()`, `dlsym()`, `respondsToSelector:`, `performSelector:`, `method_exchangeImplementations()`, be sure NOT to export any private methods. **

Weex SDK provides only rendering capabilities, rather than have other capabilities. There are some internal [components](../wiki/component-introduction.html), [modules](../wiki/module-introduction.html) and [handlers](../wiki/handler-introduction.html). If you want these features which weexSDK doesn't provide, you can to extend.
> The following section we will extend iOS using Objective-C and here is [swift](./extend-module-using-swift.html).

### extend custom module

 To extend your custom weex modules in iOS, you must make your class conform to `WXModuleProtocol` protocol, and then exports your method to javaScript using macro `WX_EXPORT_METHOD`,finally register your module with your class and a self-define module name.

- basic
  we will custom a module to print params that javaScript give.

  1. new a class derived from `NSObject` conforming `WXModuleProtocol` protocol
  
    ![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/2f15f1ef79128dd923706f0d321482e7.png)

  2. add your module method and then exports using macro `WX_EXPORT_METHOD`

    ![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/8079e55e74f098eb42e074f696537de1.png)

  3. register module after WeexSDK's initialization

    ![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/dd6b2a43132c0bfa724f5c1e56f300b4.png)

  by far, we've finished a basic custom module, and you may understand how to custom a weex module in iOS using Objective-C.

  We can use it in javaScript code like this: 

  ```javaScript
      weex.requireModule("event").showParams("hello Weex)
  ```

- advanced extendibility

 you must understand more in `WXModuleProtocol` protocol, we'll talk more about blueprint methods and properties in this protocol.

   1. `weexInstance`
    The instance of `WXSDKInstance` holds the references of all modules created in a single page. if you add `@synthesize weexInstance` in your module class, your module will hold a reference to the instance of `WXSDKInstance` who create and initialize your module, or you get nothing. You can get more details by `weexInstance` such as pageName.

   2. `targetExecuteThread`
    We will schedule your module method to main thread(UI thread), we highly recommend that you can not do much works here, if must, you can add implementation for this method. You can provide a thread so that we can schedule to.

   3. `WXModuleKeepAliveCallback`
    Sometimes you can return your result to your caller, callback is important in this scene,the params for callback can be string or dictionary. You must specify a second params to keep your callback function id in js after used. We'll create a new function id every time callback, `NO` will be a better choice for memory.

   4. `WX_EXPORT_METHOD_SYNC`
    > This feature only works on WeexSDK 0.10 and later. Synchronous method only works in JavaScript thread, you cannot do much works here.
    exports asynchronous method using `WX_EXPORT_METHOD`, you may get result in callback function.
    `WX_EXPORT_METHOD_SYNC` to export synchronous method. You can get result on the left of operand `=`.

### extend custom component

- new a class derived from `WXComponent` class
  if we do nothing in this class and then register to WeexSDK engine, its functionality is just like `div`.

- override the lifecycle of `WXComponent`

  - `loadView`
    We will load a view for a component default, if you didn't override this method, supperclass will provide a `WXView` derived from `UIView`. If we want to load html or just to show a map, override `loadView` and provide a custom view is a good choice.

    ```
        - (UIView *)loadView {
            return [MKMapView new];
        }
    ```
  - `viewDidLoad`
    If you want to make some configurations for your custom view like set delegate, you can finish here.
    You don't need to set frame for your custom view if it doesn't has any subview, weexSDK will set it's frame according to style.

    ```
	    - (void)viewDidLoad {
            ((MKMapView*)self.view).delegate = self;
	    }
	```
- register component

 ```
    [WXSDKEngine registerComponent:@"map" withClass:[WXMapComponent class]];
 ```

 by far you can use your custom component in front-end

 ```html
    <template>
        <div>
            <map style="width:200px;height:200px"></map>
        </div>
    </template>
```

Weex engine has done some works to support common events and other attributes, if you want support your own attributes, let's continue.

- custom events for your component
 Our target is that support `mapLoaded` event for the component we just implement, and then we can use in front-end directyly. The front-end code can be like this.

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
we must save status for event added or not, so we add a `BOOL` member named `mapLoaded` for the component class to make it record, and when event map loaded, we can fire event according to this record.

- custom event
    - override method add/remove event

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
    - fire event to front-end
    we'll fire `mapLoaded` event when map loaded finish according to our record.
    > do not forget to set delegate for MKMapView.

    ```object-c
        - (void)mapViewDidFinishLoadingMap:(MKMapView *)mapView {
            if (_mapLoaded) {
                [self fireEvent:@"mapLoaded" params:@{@"customKey":@"customValue"} domChanges:nil]
            }
        }
    ```

We have finish our custom event, so what about custom attributes? this is the same important as custom events.

- custom attributes
 The next target is that we add a custom attribute `showTraffic`, we can display real time traffic or not according to this attribute. The front-end code can be like the following.

```html
    <template>
        <div>
            <map style="width:200px;height:200px" showTraffic="true"></map>
        </div>
    </template>
```

  - override component init method `initWithRef...`
    add a `BOOL` member `showsTraffic` to make the status whether front-end user use the attribute or not record. We can get all the attribute for this component by override init method of component.
     
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
  - set property for custom view.
    ```object-c
        - (void)viewDidLoad {
        ((MKMapView*)self.view).showsTraffic = _showsTraffic;
        }
    ```
  - support attribute updates
    
    ```object-c
    - (void)updateAttributes:(NSDictionary *)attributes
    {
        if (attributes[@"showsTraffic"]) {
            _showsTraffic = [WXConvert BOOL: attributes[@"showsTraffic"]];
            ((MKMapView*)self.view).showsTraffic = _showsTraffic;
        }
    }
    ```
-  more life cycle for component

A Native Component has a life cycle managed by Weex. Weex creates it, layout it, renders it and destroys it.

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

### Component Method
from WeexSDK `0.9.5`, you can define your component method by macro `WX_EXPORT_METHOD`
for example:

```
@implementation WXMyComponent
 +WX_EXPORT_METHOD(@selector(focus))
 +- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
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

### custom your handlers

We don't provide functionality for downloading image but defines a blueprint of methods in `WXImgLoaderProtocol` for loading image, and image component get image content from these methods. You must implement methods in `WXImgLoaderProtocol` except the `optional` methods to display image from specified url.
You can also define your own `protocol` and implement its handler.

- new a class derived from `NSObject` conforming `WXImgLoaderProtocol` and then add implementation for methods in `WXImgLoaderProtocol`.

> the flowing code may require SDWebImage as dependency, you can download remote url image by your own way without SDWebImage. 
 
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
- register handler
  register handler by the method `registerHandler:withProtocol` in WXSDKEngine

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
- use handler
 you can use your handle in any native code including `component`, `module` and other `handlers`
 ```object-c
    id<WXImgLoaderProtocol> imageLoader = [WXSDKEngine handlerForProtocol:@protocol(WXImgLoaderProtocol)];
    [iamgeLoader downloadImageWithURL:imageURl imageFrame:frame userInfo:customParam completed:^(UIImage *image, NSError *error, BOOL finished){
    }];
  ```


