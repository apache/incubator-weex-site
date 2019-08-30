---
title: Fit for multi-size screens
type: guide
group: Advanced Guide
order: 8.1
version: 2.1
has_chapter_content: true
---

## Summary

In this article, we demonstrate how to fit Weex pages for different or changable screen sizes such as orientation switches.

::: danger 
iOS only,Android not support yet
:::
## How Weex convert a CSS style ot view coordinate

Take iOS as example, when your application starts up, Weex acquires current device screen width as global variable. On iOS, this value is screen physical pixels divided by screen scale. For iPhone6, this value is 375.

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

When every WXSDKInstance is created, it's default viewPortWidth is 750px.

```C
// The default screen width which helps us to calculate the real size or scale in different devices.
static const CGFloat WXDefaultScreenWidth = 750.0;
```

If you set a CSS style as "375px", in Weex, this value is automatically converted to a UIKit system value considering current screen width and the current instance's viewPortWidth.

```C
dimension(UIKit) = dimensionPx(CSS) / viewPortWidth(instance) * globalScreenWidth
```

We get:
dimension(UIKit) = 375 / 750 * 375 = 187.5

After that, Weex use value 187.5 for layout and set the final value after layout to an iOS UIView, no more conversion.

## Why Weex does not support orientation switch

As mentioned above, Weex converts a raw CSS style value to UI system's unit and dropped the raw style value. This is for historical reason, and could save a lot of memory for huge and complcated pages.

At the same time, Weex does not support style value as percentage. Massive existing pages use 750px as the default viewPortWidth, and all sub elements in the page use coordinate values relative to 750 which is treated as full screen width.

When screen rotated, as for iPhone6, the "width * height" would be "667 * 375". We need raw style value to calculate the new value for layout and UIView. But because there are no raw style values, we cannot proceed.

For style value "375px" after rotation, the UIKit value would be:

dimension(UIKit) = 375 / 750 * 667 = 333.5

You can see that 333.5 is still half the screen width.

## Interface for screen

We provide a series of APIs to control layout parameter.

### 1. Set viewPortWidth of a page

#### a. Use Meta Module

```Javascript
const meta = weex.requireModule('meta');
meta.setViewport({
	width: 800
});
```

#### b. Use WXSDKInstance

* iOS:  
```Objective-C
WXSDKInstance* instance = [[WXSDKInstance alloc] init];
[instance setViewportWidth:800.f];
```
* Android:  
```Java
WXSDKInstance instance = new WXSDKInstance(mContext);
instance.setInstanceViewPortWidth(800);
```

### 2. Set deviceWidth of a page

::: danger 
iOS only,Android not support yet
:::

<Badge text="v0.25+" type="warning"/>


#### a. Use Meta Module

```Javascript
const meta = weex.requireModule('meta');
meta.setViewport({
	deviceWidth: 375,
	deviceHeight: 800
});
```

#### b. Use WXSDKInstance

```Objective-C
WXSDKInstance* instance = [[WXSDKInstance alloc] init];
[instance setPageRequiredWidth:375.f height:800.f];
```

#### c. Set global deviceWidth

```Objective-C
[WXSDKEngine setGlobalDeviceSize:CGSizeMake([UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height)];
```

### 3. Let a page reserve all raw CSS styles

<Badge text="v0.25+" type="warning"/>

#### a. Use Meta Module

```Javascript
const meta = weex.requireModule('meta');
meta.setViewport({
	reserveCssStyles: true
});
```

#### b. Use WXSDKInstance

* iOS:  
```Objective-C
WXSDKInstance* instance = [[WXSDKInstance alloc] init];
[instance setPageKeepRawCssStyles];
```
* Android:
```Java
WXSDKInstance instance = new WXSDKInstance(mContext);
instance.setPageKeepRawCssStyles();
```

### 4. Force the page to relayout

<Badge text="v0.25+" type="warning"/>

* iOS:  
```Objective-C
[instance reloadLayout];
```
* Android:  
```Java
instance.reloadPageLayout();
```

## Scenarios

### 1. Applications that do not support screen rotation

If your app does not support screen rotation, you can ignore all issues above. When Weex starts up, it will automatically get current screen width and after that all pages will use this global value as default. 

### 2. Support screen rotation for a specific page

<Badge text="v0.25+" type="warning"/>

1. Let the page reserve all CSS style values.
2. After screen rotation is done, use the code below to reset screen width for the page and trigger relayout.

* iOS:
```Objective-C
CGFloat w = [UIScreen mainScreen].bounds.size.width;
CGFloat h = [UIScreen mainScreen].bounds.size.height;
[_instance setPageRequiredWidth:w height:h];
[_instance reloadLayout];
```
* Android:
```Java
instance.resetDeviceDisplayOfPage();
instance.reloadPageLayout();
```

You could use latest Playground to test the [demo](http://editor.weex.io/p/wqyfavor/scroller/commit/37810078ef963388b699b5ad7d5e9881)

Remember to turn on screen rotation in control panel.

[image](https://img.alicdn.com/tfs/TB1gWiTcvWG3KVjSZPcXXbkbXXa-240-427.gif)

### 3. Notice

For styles that should not be affected by screen width and viewPortWidth, you should use 'wx' as unit.
