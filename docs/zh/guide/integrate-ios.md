## 通过 CocoaPods 或者 Carthage 集成 Weex iOS SDK 到你的项目
首先假设你已经完成了安装 [iOS 开发环境](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html) 和 [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)(或者 [Carthage](https://github.com/Carthage/Carthage#installing-carthage))
### 第一步：添加依赖
导入 Weex iOS SDK 到你已有的项目, 如果没有，可以[参考](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html)新建项目。  
在继续下面内容之前，确保你已有的项目目录有名称为 `Podfile` 文件，如果没有，创建一个，用文本编辑器打开(如果使用 Carthage ，请确保已有项目目录下存在 `Cartfile`)。选择其中一个集成方法就可以。
- 使用 [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)  
  WeexSDK 在 cocoaPods 上最新版本 可以在[这](https://cocoapods.org/pods/WeexSDK)获取。  
  在 `Podfile` 文件中添加如下内容
  ```
  source 'git@github.com:CocoaPods/Specs.git'
  target 'YourTarget' do
      platform :ios, '7.0'
      pod 'WeexSDK', '0.17.0'   ## 建议使用WeexSDK新版本
  end
  ```
  打开命令行，切换到你已有项目 `Podfile` 这个文件存在的目录，执行 `pod install`，没有出现任何错误表示已经完成环境配置。
- 使用 [Carthage](https://github.com/Carthage/Carthage#installing-carthage)
  可以在[这](https://github.com/apache/incubator-weex/tags)查询到当前最新的版本。  
  在 `Cartfile` 中添加如下内容
  ```
  github "apache/incubator-weex"
  ```
  在包含 `Cartfile` 文件目录的终端中执行 `carthage update`。  
  [添加 framework 到你的工程](https://github.com/Carthage/Carthage#adding-frameworks-to-an-application)

### 第二步：初始化 Weex 环境
在 `AppDelegate.m` 文件中做初始化操作，一般会在 `didFinishLaunchingWithOptions` 方法中如下添加。
```
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

### 第三步：渲染 weex Instance
Weex 支持整体页面渲染和部分渲染两种模式，你需要做的事情是用指定的 URL 渲染 Weex 的 view，然后添加到它的父容器上，父容器一般都是 viewController。
```
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
WXSDKInstance 是很重要的一个类，提供了基础的方法和一些回调，如 `renderWithURL`, `onCreate`, `onFailed` 等，可以参见 `WXSDKInstance.h` 的声明。

### 第四步：销毁 Weex Instance
在 viewController 的 dealloc 阶段 销毁掉 Weex instance，释放内存，避免造成内存泄露。
```
- (void)dealloc
{
    [_instance destroyInstance];
}
```

## 导入 Weex SDK framework 到工程
可以通过源码编译出 Weex SDK，可以在新的 feature 或者 bugfix 分支，尝试最新的 feature。
- 使用 git clone [Weex](https://github.com/apache/incubator-weex)  
  SSH
  ```
  git clone git@github.com:apache/incubator-weex.git
  ```
  或者 https
  ```
  git clone https://github.com/apache/incubator-weex.git
  ```
- 打开 WeexSDK.xcodeproj in `weex/ios/sdk`  
  切换到如下图所示 target  

  <img src="https://img.alicdn.com/tfs/TB1Rpo5n3HqK1RjSZFPXXcwapXa-241-36.png" width="30%" />
- 编译当前target，可以直接用快捷键 `⌘ + b`  
- 最后找到产物在 `weex/ios/sdk/Products` 目录  

  <img src="https://img.alicdn.com/tfs/TB1rXs5n3HqK1RjSZFPXXcwapXa-598-262.png" width="50%" />
- 导入 framework 到自己工程
  - 需要添加如下图系统依赖  
    <img src="https://img.alicdn.com/tfs/TB1hO34nVzqK1RjSZFvXXcB7VXa-1346-610.png" width="50%" />
  - 添加 `-ObjC` 到工程设置中    

    <img src="https://img.alicdn.com/tfs/TB1Yto3n4TpK1RjSZFKXXa2wXXa-728-271.png" width="50%" />
  - 添加 `js-framework` 到自己的 main bundle, `js-framework` 的位置在 WeexSDK.framework 中，文件名称为 `native-bundle-main.js`  
    
    <img src="https://img.alicdn.com/tfs/TB1bdtrohjaK1RjSZKzXXXVwXXa-709-196.png" width="50%" />

