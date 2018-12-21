---
title: Integrate to Your App
type: guide
group: Overview
order: 1.3
version: 2.1
---

<!-- toc -->

# 集成到应用中

## 集成到Android应用

在执行以下步骤之前，请先确认您的Android开发环境是ok的。


### 1. 设置gradle依赖


```
dependencies {
    ...
    // weex sdk and fastjson
    compile 'com.taobao.android:weex_sdk:0.18.0@aar'
    compile 'com.alibaba:fastjson:1.1.46.android'

    //support library dependencies
    compile 'com.android.support:recyclerview-v7:23.1.1'
    compile 'com.android.support:support-v4:23.1.1'
    compile 'com.android.support:appcompat-v7:23.1.1'
}
```

### 2. 声明权限

在`AndroidManifest.xml`中声明权限 

```xml
//网络
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>

//sd卡读写
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```

### 3. 初始化sdk


```java
InitConfig config = new InitConfig.Builder()
					//图片库接口
    				.setImgAdapter(new FrescoImageAdapter())
    				//网络库接口
    				.setHttpAdapter(new InterceptWXHttpAdapter())
    				.build();
WXSDKEngine.initialize(applicationContext,config);

```

- [demo init case](https://github.com/apache/incubator-weex/blob/master/android/playground/app/src/main/java/com/alibaba/weex/WXApplication.java)
- [InterceptWXHttpAdapter](https://github.com/apache/incubator-weex/blob/master/android/playground/app/src/main/java/com/alibaba/weex/extend/adapter/InterceptWXHttpAdapter.java)
- [fresco  imageAdapter](https://github.com/apache/incubator-weex/blob/master/android/commons/src/main/java/com/alibaba/weex/commons/adapter/FrescoImageAdapter.java) 
- [picasso imageAdapter](https://github.com/apache/incubator-weex/blob/master/android/commons/src/main/java/com/alibaba/weex/commons/adapter/ImageAdapter.java)

### 4. 创建weex实例WXSDKInstance 

`WXSDKInstance`是weex渲染页面的基本单元，

- 通过`instance.render(url)`拉取bundle，
- 在回调`IWXRenderListener`的`onViewCreated `返回创建的view，
- 将返回的view 添加到Activity的view上（rootView）

[case WXPageActivity](https://github.com/apache/incubator-weex/blob/master/android/playground/app/src/main/java/com/alibaba/weex/WXPageActivity.java)

```java
public class MainActivity extends AppCompatActivity implements IWXRenderListener {
  WXSDKInstance mWXSDKInstance;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    mWXSDKInstance = new WXSDKInstance(this);
    mWXSDKInstance.registerRenderListener(this);
    /**
    * bundleUrl source http://dotwe.org/vue/38e202c16bdfefbdb88a8754f975454c
    */
    String pageName = "WXSample";
    String bundleUrl = "http://dotwe.org/raw/dist/38e202c16bdfefbdb88a8754f975454c.bundle.wx";
    mWXSDKInstance.renderByUrl(pageName, bundleUrl, null, null,WXRenderStrategy.APPEND_ASYNC);
  }
  @Override
  public void onViewCreated(WXSDKInstance instance, View view) {
    setContentView(view);
  }
  @Override
  public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
  }
  @Override
  public void onRefreshSuccess(WXSDKInstance instance, int width, int height) {
  }
  @Override
  public void onException(WXSDKInstance instance, String errCode, String msg) {
  }
  @Override
  protected void onResume() {
    super.onResume();
    if(mWXSDKInstance!=null){
      mWXSDKInstance.onActivityResume();
    }
  }
  @Override
  protected void onPause() {
    super.onPause();
    if(mWXSDKInstance!=null){
       mWXSDKInstance.onActivityPause();
    }
  }
  @Override
  protected void onStop() {
    super.onStop();
    if(mWXSDKInstance!=null){
      mWXSDKInstance.onActivityStop();
    }
  }
  @Override
  protected void onDestroy() {
    super.onDestroy();
    if(mWXSDKInstance!=null){
      mWXSDKInstance.onActivityDestroy();
    }
  }
}
```

### 5. 运行app

Run app, start activity, then you will see hello world demo. well done.

运行app，您将会看到一个 `hello world` 页面。

- [Hello World Demo 源码](http://dotwe.org/vue/38e202c16bdfefbdb88a8754f975454c)
- 提示: 点击二维码, 可以看到最终编译的代码产物。

## 集成到iOS应用


通过 [CocoaPods](https://cocoapods.org/) 或者 [Carthage](https://github.com/Carthage/Carthage) 集成 Weex iOS SDK 到您的项目中。

首先确认您的开发环境是OK的

- [iOS development environment](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html) 
- [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) 或者 [Carthage](https://github.com/Carthage/Carthage#installing-carthage)).

### 1. 添加依赖

集成 Weex iOS SDK 到您现有的工程中, 如果没有的话, 可以参照[tutorial](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html))创建一个新的工程。

在开始之前，确认您的工程下有podfile文件，如果没有，手动创建一个。（如果使用的是`Cartfile`,确认[`Cartfile`](https://github.com/Carthage/Carthage/blob/master/Documentation/Artifacts.md#cartfile)在您的工程下）

选择一种方式集成

#### 使用[CocoaPods](https://cocoapods.org/)

修改您的podfile	

```object-c
	source 'git@github.com:CocoaPods/Specs.git'
	target 'YourTarget' do
	    platform :ios, '7.0'
	    pod 'WeexSDK', '0.17.0'   ## 建议使用最新的版本
	end
```

可以从这里查[weex最新的版本地址](https://cocoapods.org/pods/WeexSDK) .

在podfile目录下，运行命令
```
pod install
```
如果没有`error`提示的话，集成完毕

#### 使用 [Carthage](https://github.com/Carthage/Carthage)

[weex最新的版本地址](https://github.com/apache/incubator-weex/tags) .
  
添加 `github "apache/incubator-weex"` 到 [`Cartfile`](https://github.com/Carthage/Carthage/blob/master/Documentation/Artifacts.md#cartfile)
  
打开命令行，cd 到 artfile所在目录, 运行 `carthage update`.
 
[Add Carthage build framework to your project](https://github.com/Carthage/Carthage#adding-frameworks-to-an-application)


### 2. 初始化WEEX

同常在 `AppDelegate.m`的 `didFinishLaunchingWithOptions`方法中进行初始化工作。 


```object-c
//业务设置
[WXAppConfiguration setAppGroup:@"AliApp"];
[WXAppConfiguration setAppName:@"WeexDemo"];
[WXAppConfiguration setAppVersion:@"1.0.0"];
//初始化weex sdk
[WXSDKEngine initSDKEnvironment];
//注册自定义的组件 和模块
[WXSDKEngine registerComponent:@"MyView" withClass:[MyViewComponent class]];
[WXSDKEngine registerModule:@"event" withClass:[WXEventModule class]];
//注册接口实现，如网络库、图片库
[WXSDKEngine registerHandler:[WXNavigationDefaultImpl new] withProtocol:@protocol(WXNavigationProtocol)];
//设置log等级
[WXLog setLogLevel: WXLogLevelAll];
```

- [init case](https://github.com/apache/incubator-weex/blob/master/ios/playground/WeexDemo/AppDelegate.m)

### 3. 渲染instnace页面

我们同时支持全页页面 和 部分卡片渲染方式。您只需要在调用函数时，制定需要展示的尺寸，并且讲view 添加到容器view上。


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

WXSDKInstance 是一个非常重要的类，提供很多功能，比如渲染函数renderWithURL,各种事件回调, 比如, onCreate, onFailed, etc., 具体函数参见[WXSDKInstance](https://github.com/apache/incubator-weex/blob/master/ios/sdk/WeexSDK/Sources/Model/WXSDKInstance.h)

### 4. 销毁 Instance

在`viewController `销毁时，需要同步调用instance的`destroyInstance`方法，weex会做内存回收，否则会出现内存泄漏。

```object-c
- (void)dealloc
{
    [_instance destroyInstance];
}
```

## 构建framework并且引入到您的工程中

如果您需要尝试最新的feature或者其它需求，可以根据master上最新的源码进行构建

- `git clone https://github.com/apache/incubator-weex.git`
- 打开 WeexSDK.xcodeproj in `weex/ios/sdk`，选择target
  ![img](http://img1.tbcdn.cn/L1/461/1/4fe050b36e7fea52f121e73790b1fdb7ea934e97)
- 点击编译图标 或者使用快捷键`⌘ + b`
- 产物在  `weex/ios/sdk/Products `
  ![img](http://img4.tbcdn.cn/L1/461/1/52594fea03ee1154845d0f897558b81b4b5bef2e)

- 添加 `js-framework` 到工程中
  ![img](http://img1.tbcdn.cn/L1/461/1/bb3998595bafe9c9336411160c0b6bd3eeb843ef)
- 导入framework 和依赖的系统framework
  ![img](http://img1.tbcdn.cn/L1/461/1/ce309c54c7b3dd3607d7a3d07c44bfd0e0e10f86)
- 添加`-ObjC` 到工程设置
![img](http://img3.tbcdn.cn/L1/461/1/430ae522f5031ff728c95efea49219a11e6852b3)
