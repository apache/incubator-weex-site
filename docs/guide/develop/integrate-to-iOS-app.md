---
title: Integrate to Your App
type: guide
group: Overview
order: 1.3
version: 2.1
---

<!-- toc -->

# Integrate to iOS App

Through the [CocoaPods](https://cocoapods.org/) or [Carthage](https://github.com/Carthage/Carthage) integrated Weex iOS SDK to your project.
First assume that you have finished installing the [iOS development environment](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html) and [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)(or [Carthage](https://github.com/Carthage/Carthage#installing-carthage)).

## Step 1: Add Dependencies

Import Weex iOS SDK to your existing project, if not, you can create a new project according to the [tutorial](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html)).
Before proceeding, make sure that the Podfile file is under the project file. If not, create one and open with  text editor(if Carthage, please ensure the [`Cartfile`](https://github.com/Carthage/Carthage/blob/master/Documentation/Artifacts.md#cartfile) in your project directory). You can choose one of Integration method.

### using [CocoaPods](https://cocoapods.org/)

WeexSDK The latest version on cocoaPods can be obtained [here](https://cocoapods.org/pods/WeexSDK) .
	Add the following to the Podfile file:

	```object-c
	source 'git@github.com:CocoaPods/Specs.git'
	target 'YourTarget' do
	    platform :ios, '7.0'
	    pod 'WeexSDK', '0.17.0'   ## latest Weex SDK recommended
	end
	```
	Open the command line, switch to the directory of the Podfile file, and run the pod install command. If there are no errors, it means that the environment has been configured.
	
### using [Carthage](https://github.com/Carthage/Carthage)

- [here](https://github.com/apache/incubator-weex/tags) you can get the latest version of WeexSDK.
- Add `github "apache/incubator-weex"` to [`Cartfile`](https://github.com/Carthage/Carthage/blob/master/Documentation/Artifacts.md#cartfile)
- Open the command line, switch to the directory of the Cartfile, and run `carthage update`.

[Add Carthage build framework to your project](https://github.com/Carthage/Carthage#adding-frameworks-to-an-application)


## Step 2: Initialize the Weex environment

In the AppDelegate.m file to do the initialization operation, usually in the didFinishLaunchingWithOptions method as follows to add.

```object-c
//business configuration
[WXAppConfiguration setAppGroup:@"AliApp"];
[WXAppConfiguration setAppName:@"WeexDemo"];
[WXAppConfiguration setAppVersion:@"1.0.0"];
//init sdk environment
[WXSDKEngine initSDKEnvironment];
//register custom module and component，optional
[WXSDKEngine registerComponent:@"MyView" withClass:[MyViewComponent class]];
[WXSDKEngine registerModule:@"event" withClass:[WXEventModule class]];
//register the implementation of protocol, optional
[WXSDKEngine registerHandler:[WXNavigationDefaultImpl new] withProtocol:@protocol(WXNavigationProtocol)];
//set the log level
[WXLog setLogLevel: WXLogLevelAll];
```

## Step 3: Render weex Instance

Weex supports both full page rendering and partial rendering. What you need to do is render Weex's view with the specified URL and add it to its parent container. The parent container is generally a viewController.

```object-c
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
        [weakSelf.view addSubview:weakSelf.weexView];
    };
    _instance.onFailed = ^(NSError *error) {
        //process failure
    };
    _instance.renderFinish = ^ (UIView *view) {
        //process renderFinish
    };
    NSURL *url = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"js"];
    [_instance renderWithURL:url options:@{@"bundleUrl":[self.url absoluteString]} data:nil];
}
```

WXSDKInstance is a very important class that provides a basic method and some callbacks, such as renderWithURL, onCreate, onFailed, etc., can be found in WXSDKInstance.h.

## Step 4: Destroy Weex Instance

In the dealloc phase of the viewController destroyed Weex instance, can play a role in avoiding memory leaks.

```object-c
- (void)dealloc
{
    [_instance destroyInstance];
}
```

## 5. Extend-iOS

Weex SDK provides only rendering capabilities, rather than have other capabilities. There are some internal components, modules and handlers. If you want these features which weexSDK doesn't provide, you can to extend.


- [Extend iOS](../extend/extend-ios.html)
- [Extend iOS with swift](../extend/extend-ios-with-swift.html)

## More: Build framework

more, Build your own WeexSDK.framework and Import to your project.

The Weex SDK can be compiled from the source code. You can try the latest feature in the new feature or bugfix branch.

- `git clone https://github.com/apache/incubator-weex.git'
  you can use SSH

	```
	git clone git@github.com:apache/incubator-weex.git
	```
  or use https

	```
	git clone https://github.com/apache/incubator-weex.git
	```

- open WeexSDK.xcodeproj in `weex/ios/sdk`
  switch target just below
  ![img](http://img1.tbcdn.cn/L1/461/1/4fe050b36e7fea52f121e73790b1fdb7ea934e97)

- Build this project or just use the xcode default hot key `⌘ + b`

- Finally you can find `Products` directory in `weex/ios/sdk`, `WeexSDK.framework` was here
  ![img](http://img4.tbcdn.cn/L1/461/1/52594fea03ee1154845d0f897558b81b4b5bef2e)

- Add `js-framework`(which is in the `WeexSDK.framework` and renamed to `native-bundle-main.js`) to your main bundle
  ![img](http://img1.tbcdn.cn/L1/461/1/bb3998595bafe9c9336411160c0b6bd3eeb843ef)
- Import the framework you get above and import system framework
  ![img](http://img1.tbcdn.cn/L1/461/1/ce309c54c7b3dd3607d7a3d07c44bfd0e0e10f86)
- add `-ObjC` to your project settings,just like this
![img](http://img3.tbcdn.cn/L1/461/1/430ae522f5031ff728c95efea49219a11e6852b3)
