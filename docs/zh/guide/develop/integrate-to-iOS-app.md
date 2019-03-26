---
title: Integrate to Your App
type: guide
group: Overview
order: 1.3
version: 2.1
---

<!-- toc -->

# 集成 Weex 到 iOS

使用 [CocoaPods](https://cocoapods.org/) 或 [Carthage](https://github.com/Carthage/Carthage) 可以方便地将 Weex 集成到自己的项目中。

## 1. 配置依赖

### 使用 CocoaPods

从 Cocoapods [仓库](https://cocoapods.org/pods/WeexSDK)中获取 WeexSDK 的最新版本。

将 WeexSDK 添加到你的 Podfile 中。

```ruby
source 'git@github.com:CocoaPods/Specs.git'
target 'YourTarget' do
    platform :ios, '8.0'
    pod 'WeexSDK', '0.20.1'
end
```

运行 `pod install` 命令安装依赖。
    
### 使用 Carthage

在工程中创建一个 Cartfile，[Carthage 使用方法](https://github.com/Carthage/Carthage#adding-frameworks-to-an-application)。

添加 `github "apache/incubator-weex"` 到 [`Cartfile`](https://github.com/Carthage/Carthage/blob/master/Documentation/Artifacts.md#cartfile)

运行 `carthage update`。

## 2. 初始化 Weex

建议在 `didFinishLaunchingWithOptions` 回调中初始化 Weex，你也可以在子线程中异步初始化，但需要确保渲染 Weex 页面前初始化已经全部完成。

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

## 3. 创建一个 Weex 实例

你既可以在全页面中使用 Weex，也可以在一个 view 中渲染 Weex。只需要创建一个 Weex 实例并指定好回调方法，提供一个合法的 URL 就可以了。在 `onCreate` 回调方法中将根 view 添加到你想显示内容的地方，并通过 `instance.frame = ` 来设置它的尺寸和位置。

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

## 4. 销毁实例

必须**显式地**销毁 Weex 实例，否则可能引起内存泄漏。

```Objective-C
[instance destroyInstance];
```

## 5. 扩展 Weex

Weex 支持自定义组件、模块，可以参考以下两篇文档。

* [Extend iOS](../extend/extend-ios.html)
* [Extend iOS with swift](../extend/extend-ios-with-swift.html)

## 6. 在 iPad 中使用 Weex

当页面渲染完成后，屏幕再旋转，页面不会自动适配。所以，如果你的 App 允许屏幕旋转，务必在页面渲染前更新屏幕宽度。

前端样式中指定的坐标在渲染时会根据 **屏幕宽度** 和 **当前页面的 view-port-width** 进行换算。

修改 view-port-width 的方法，会影响前端代码，通常不要设置，默认为 750px。
```javascript
beforeCreate(){
    const meta = weex.requireModule('meta');
    meta.setViewport({
        width: 1536
    });
}
```

监听 UIDeviceOrientationDidChangeNotification 通知，并调用下面方法修改屏幕尺寸（假设已经旋转完成，[UIScreen mainScreen].bounds.size.width 就是当前宽度）
```Objective-C
[WXCoreBridge setDeviceSize:[UIScreen mainScreen].bounds.size];
```
