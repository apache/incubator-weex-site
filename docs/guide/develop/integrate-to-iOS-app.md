---
title: Integrate to Your App
type: guide
group: Overview
order: 1.3
version: 2.1
---

<!-- toc -->

# Integrate to iOS App

You may integrate Weex to your iOS app through the [CocoaPods](https://cocoapods.org/) or [Carthage](https://github.com/Carthage/Carthage). We assume that you have already installed the Xcode and CocoaPods or Carthage.

## 1. Configure dependency 

### Using CocoaPods

The latest WeexSDK version on iOS could be obtained from [here](https://cocoapods.org/pods/WeexSDK).

Add WeexSDK to your Podfile.

```ruby
source 'git@github.com:CocoaPods/Specs.git'
target 'YourTarget' do
    platform :ios, '8.0'
    pod 'WeexSDK', '0.20.1'
end
```

Then run `pod install` command in your project directory.
	
### Using Carthage

Create a Cartfile in your project directory. [Carthage Manual](https://github.com/Carthage/Carthage#adding-frameworks-to-an-application)

Add `github "apache/incubator-weex"` to [`Cartfile`](https://github.com/Carthage/Carthage/blob/master/Documentation/Artifacts.md#cartfile)

Run `carthage update` in your project directory.

## 2. Initialize Weex

We recommend initializing Weex in `didFinishLaunchingWithOptions` callback of your App delegate.

```Objective-C
// App configuration
[WXAppConfiguration setAppGroup:@"Your app group"];
[WXAppConfiguration setAppName:@"Your app name"];
[WXAppConfiguration setAppVersion:@"Your app version"];

//Initialize WeexSDK
[WXSDKEngine initSDKEnvironment];

//Register custom modules and components, optional.
[WXSDKEngine registerComponent:@"myview" withClass:[MyViewComponent class]];
[WXSDKEngine registerModule:@"mymodule" withClass:[MyWeexModule class]];

//Register the implementation of protocol, optional.
[WXSDKEngine registerHandler:[WXAppNavigationImpl new] withProtocol:@protocol(WXNavigationProtocol)];

//Set the log level, optional
[WXLog setLogLevel: WXLogLevelWarning];
```

## 3. Create a Weex instance

You can render a Weex instance in full page or in a view. All you need to do is to create a Weex instance and set callbacks of it, then provide it with a valid URL. In the `onCreate` callback, add the root view to your desired parent view and set the view frame using `instance.frame = `.

```Objective-C
#import <WeexSDK/WXSDKInstance.h>

- (void)viewDidLoad
{
    [super viewDidLoad];
    _instance = [[WXSDKInstance alloc] init];
    _instance.viewController = self;
    _instance.frame = self.view.frame;
    __weak typeof(self) weakSelf = self;
    _instance.onCreate = ^(UIView *view) {
        [weakSelf.weexView removeFromSuperview];
        weakSelf.weexView = view;
        [weakSelf.view addSubview:view];
    };
    _instance.onFailed = ^(NSError *error) {
        //process failure, you could open an h5 web page instead or just show the error.
    };
    _instance.renderFinish = ^ (UIView *view) {
        //process renderFinish
    };
    NSURL *url = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"js"];
    [_instance renderWithURL:url options:@{@"bundleUrl":[self.url absoluteString]} data:nil];
}
```

## 4. Destroy the instance

You should destroy the Weex instance explicitly using `[instance destroyInstance]`.

## 5. Extend Weex

You can extend Weex functionality by writing your own components, modules. For more details please refer to [Extend iOS](../extend/extend-ios.html) and [Extend iOS with swift](../extend/extend-ios-with-swift.html).
