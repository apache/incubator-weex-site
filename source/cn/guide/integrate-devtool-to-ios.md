---
title: 集成 Devtools 到 iOS
type: guide
group: 开发
order: 5.5
version: 2.1
---

<!-- toc -->


# 概要

Weex Devtools 能够方便调试 Weex 页面，但此功能离不开 Native 的支持。如何让你的 App 也集成 Devtools，在本章将会详细说明 iOS 端如何接入 Weex Devtools。

- iOS 应用接入DevTool
- 和Debug Server 配合使用


# iOS 应用接入DevTool


## 添加依赖 

建议在DEBUG模式下依赖


### 方法1: cocoapods 依赖

在工程目录的 podfile 添加如下代码

```
source https://github.com/CocoaPods/Specs.git，
pod  'WXDevtool', '0.15.3', :configurations => ['Debug']，
```


可以通过更新本地 podspec repo，pod search 来查询最新版本，在 podfile 文件添加依赖。



### 方法二：github 源码依赖


1. `git clone git@github.com:weexteam/weex-devtool-iOS.git`

2. 如下图示：拖动source目录源文件到目标工程中

  ![drag](http://img.alicdn.com/tps/TB1MXjjNXXXXXXlXpXXXXXXXXXX-795-326.png)

3. 按照红框中配置勾选

  ![_](http://img.alicdn.com/tps/TB1A518NXXXXXbZXFXXXXXXXXXX-642-154.png)


  在相对较大的互联网 App 研发中, framework 静态库被广泛应用，所以推荐使用方法一接入。

### 集成功能

参考`PlayGround`中的实现


```
//方法1 pod依赖方式
#import <TBWXDevtool/WXDevtool.h>

//方法2 源码依赖方式
#import "WXDevtool.h"

```

查看 WXDevtool 头文件如下：

```object-c
@interface WXDevTool : NSObject

+ (void)setDebug:(BOOL)isDebug;

+ (BOOL)isDebug;

+ (void)launchDevToolDebugWithUrl:(NSString *)url;

@end
```

`setDebug`：参数为 `YES` 时，直接开启 debug 模式，反之关闭，使用场景如下所述

在你自己的程序中添加如下代码：

```object-c
[WXDevTool launchDevToolDebugWithUrl:@"ws://30.30.31.7:8088/debugProxy/native"];
```

其中的 ws 地址正是 `Weex debug` 控制台中出现的地址，如果不是通过扫码链接的方式，你可以通过`weex debug --port 8888 --channelid 1` 去指定端口号及`channelid`, 随后可以将链接填写到 `launchDevToolDebugWithUrl` 接口中。

如果程序一启动就开启 Weex 调试，**需要在 WeexSDK 引擎初始化之前**添加代码：

```object-c
[WXDevTool setDebug:YES];
[WXDevTool launchDevToolDebugWithUrl:@"ws://30.30.31.7:8088/debugProxy/native"];
```

### 附加页面刷新功能

- 为什么需要页面刷新功能？

  如下图所示，当点击 debugger 按钮时，js 的运行环境会从手机端（JavaScriptCore）切换到 Chrome（V8），这时需要重新初始化 Weex 环境，重新渲染页面。页面渲染是需要接入方在自己的页面添加。

  ![_debug](http://img.alicdn.com/tps/TB1xRHhNXXXXXakXpXXXXXXXXXX-1498-668.png)

- 什么场景下需要添加页面刷新功能?

  - 点击 debugger 按钮调试
  - 切换 RemoteDebug 开关
  - 刷新 Chrome 页面（command+R）

- 如何添加刷新  
	- 具体实现可参考 [playground](https://github.com/weexteam/weex-devtool-iOS/blob/master/Devtools/playground/WeexDemo/WXDemoViewController.m)  `WXDemoViewController.m` 文件 

  在 Weex 页面初始化或 `viewDidLoad` 方法时添加注册通知，举例如下：

  ```object-c
  [[NSNotificationCenter defaultCenter] addObserver:self selector:notificationRefreshInstance: name:@"RefreshInstance" object:nil];
  ```

  最后**千万记得**在 `dealloc` 方法中取消通知，如下所示

  ```
  - (void)dealloc
  {
      [[NSNotificationCenter defaultCenter] removeObserver:self];
  }
  ```

  页面刷新实现，先销毁当前 instance，然后重新创建 instance，举例如下:

  ```
   - (void)render
    {
      CGFloat width = self.view.frame.size.width;
      [_instance destroyInstance];
      _instance = [[WXSDKInstance alloc] init];
      _instance.viewController = self;
      _instance.frame = CGRectMake(self.view.frame.size.width-width, 0, width, _weexHeight);

      __weak typeof(self) weakSelf = self;
      _instance.onCreate = ^(UIView *view) {
          [weakSelf.weexView removeFromSuperview];
          weakSelf.weexView = view;
          [weakSelf.view addSubview:weakSelf.weexView];
          UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification,  weakSelf.weexView);
      };
      _instance.onFailed = ^(NSError *error) {

      };

      _instance.renderFinish = ^(UIView *view) {
          [weakSelf updateInstanceState:WeexInstanceAppear];
      };

      _instance.updateFinish = ^(UIView *view) {
      };
      if (!self.url) {
          return;
      }
      NSURL *URL = [self testURL: [self.url absoluteString]];
      NSString *randomURL = [NSString stringWithFormat:@"%@?random=%d",URL.absoluteString,arc4random()];
      [_instance renderWithURL:[NSURL URLWithString:randomURL] options:@{@"bundleUrl":URL.absoluteString} data:nil];
  }
  ```



*说明：目前版本需要注册的通知名称为固定的 “RefreshInstance”，下个版本会添加用户自定义 name 。*

# 功能使用

文档见 [Weex Debugger 使用文档](../tools/toolkit.html#debug)。
