---
title: 适配不同尺寸的屏幕
type: guide
group: 高阶特性
order: 8.1
version: 2.1
has_chapter_content: true
---

## 简介

本文将介绍 Weex 适配不同尺寸屏幕的方法以及横竖屏动态切换时如何自适应。
::: danger 
Android暂不支持
:::

## Weex 如何将前端样式值转换为系统坐标值

以 iOS 为例，在应用启动时，Weex 获取当前屏幕宽度作为全局默认值。在 iOS 系统上该宽度为实际像素/屏幕比例后的 UIKit 宽度。比如 iPhone6 为 375。

```C
@implementation WXCoreBridge

+ (void)install
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        WeexCore::WXCoreEnvironment* env = WeexCore::WXCoreEnvironment::getInstance();
        env->SetPlatform(OS_iOS);
        env->AddOption("scale", "1");
        
        CGSize screenSize = [UIScreen mainScreen].bounds.size;
        env->SetDeviceWidth(std::to_string(screenSize.width));
        env->SetDeviceHeight(std::to_string(screenSize.height));
        ...
        ...
}
```

创建的每个 WXSDKInstance，其默认的 viewPortWidth 为 750px。
```C
// The default screen width which helps us to calculate the real size or scale in different devices.
static const CGFloat WXDefaultScreenWidth = 750.0;
```

当指定 CSS 样式值为 "375px" 时，Weex 在接收到该样式后，自动根据当前屏幕宽度和当前 Instance 的 viewPortWidth 计算出在 iOS 系统上，对应的 UIKit 坐标值为：

```C
dimension(UIKit) = dimensionPx(CSS) / viewPortWidth(instance) * globalScreenWidth
```

代入后：
dimension(UIKit) = 375 / 750 * 375 = 187.5

之后 Weex 排版引擎使用 187.5 来排版，并最终将排版后的结果设置给 iOS UIView。之后没有坐标转换过程了。

## 为什么 Weex 页面不支持横竖屏切换

如上文所述，Weex 最终将原始样式值转换为平台 UI 系统的坐标值，之后原始样式值被丢弃。这个有一定历史原因，且当页面非常大或复杂时，丢弃后可以节省很多内存，因此原始样式值被丢弃。

同时，目前 Weex 不支持百分比布局，大量竖屏页面使用 750px 的 viewPortWidth 值为基准进行开发，页面里的坐标值都是根据 750px 为一个屏幕宽度换算后的值。

当屏幕发生旋转后，比如 iPhone6 手机，旋转后的 “宽 * 高” 为 “667 * 375”。此时我们需要原始的样式值来重新计算出设置给排版引擎的坐标值，如前文所说，排版引擎接收的是 iOS UIKit 的坐标值。这个时候对于仍然为 "375px" 的样式，其计算出的 UIKit 坐标值为：

dimension(UIKit) = 375 / 750 * 667 = 333.5

仍然为宽屏下的屏幕宽度一半。

但是因为原始样式值被丢弃，我们不能支持横竖屏切换。

## 屏幕参数接口

我们通过添加一系列接口让 Weex 使用者可以控制排版参数。

### 一、设置页面使用的 viewPortWidth

#### 1. 使用 Meta Module

```Javascript
const meta = weex.requireModule('meta');
meta.setViewport({
	width: 800
});
```

#### 2. 使用 WXSDKInstance 的接口

```Objective-C
WXSDKInstance* instance = [[WXSDKInstance alloc] init];
[instance setViewportWidth:800.f];
```

### 二、设置页面使用的 deviceWidth

<Badge text="v0.25+" type="warning"/>

#### 1. 使用 Meta Module

```Javascript
const meta = weex.requireModule('meta');
meta.setViewport({
	deviceWidth: 375,
	deviceHeight: 800
});
```

#### 2. 使用 WXSDKInstance 的接口

```Objective-C
WXSDKInstance* instance = [[WXSDKInstance alloc] init];
[instance setPageRequiredWidth:375.f height:800.f];
```

#### 3. 设置全局的 deviceWidth

```Objective-C
[WXSDKEngine setGlobalDeviceSize:CGSizeMake([UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height)];
```

### 三、设置页面保留原始 CSS 样式值

<Badge text="v0.25+" type="warning"/>

#### 1. 使用 Meta Module

```Javascript
const meta = weex.requireModule('meta');
meta.setViewport({
	reserveCssStyles: true
});
```

#### 2. 使用 WXSDKInstance 的接口

```Objective-C
WXSDKInstance* instance = [[WXSDKInstance alloc] init];
[instance setPageKeepRawCssStyles];
```

### 四、强制页面重新排版

<Badge text="v0.25+" type="warning"/>

```Objective-C
[instance reloadLayout];
```

## 使用场景

### 一、不可旋转屏幕的应用

如果应用不支持屏幕旋转，你可以不用关心以上问题。当 Weex 启动时，会自动获取当前屏幕宽度作为全局宽度，所有之后创建的 Weex 页面都会使用该宽度。

### 二、某个特殊页面支持横竖屏切换

<Badge text="v0.25+" type="warning"/>

1、设置页面保留原始 CSS 样式值
2、当屏幕旋转完成后，调用以下接口设置新的屏幕尺寸，并重新排版
```Objective-C
CGFloat w = [UIScreen mainScreen].bounds.size.width;
CGFloat h = [UIScreen mainScreen].bounds.size.height;
[_instance setPageRequiredWidth:w height:h];
[_instance reloadLayout];
```

你可以使用最新 Playground 扫码[示例](http://editor.weex.io/p/wqyfavor/scroller/commit/37810078ef963388b699b5ad7d5e9881)
要在控制面板里允许屏幕自动旋转。

[image](https://img.alicdn.com/tfs/TB1gWiTcvWG3KVjSZPcXXbkbXXa-240-427.gif)

### 三、注意

对于不希望受屏幕宽度和 viewPortWidth 影响的尺寸，请使用 'wx' 单位。

