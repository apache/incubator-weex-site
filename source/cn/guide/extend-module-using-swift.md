---
title: 使用 swift 扩展 iOS 的功能
type: guide
group: 扩展
order: 6.4
version: 2.1
---

## Swift In Weex

[Swift和Objective-C](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html#//apple_ref/doc/uid/TP40014216-CH10-ID122) 混编

参考完整 [例子](https://github.com/acton393/WeexSwiftSample.git)

### 使用 Swift 进行 module 扩展

因为 module 暴露 method 是通过`Objective-C`宏来做的，调用的时候是通过反射，所以Swift扩展 module 通过`extension` `Objective-C`的类。
- 新建 `WXSwiftTestModule.h/m` 和 `WXSwiftTestModule.swift`文件， 在新建Swift文件的时候会提示
  ![img](http://img3.tbcdn.cn/L1/461/1/b2ed3ee4a966953c0f98a17f34f6f05e7c91cc6b)
  选择 `Create Bridging Header`, 因为我们要在 Swift 中访问 `Objective-C` 的一些类，正是通过这个 header暴露 OC 的类给 Swift,header 格式为 `yourTarget-Bridging-Header.h`，我这里创建完header文件名称为：`WeexDemo-Bridging-Header.h`
- `WXSwiftTestModule.h/m`中实现
  - WXSwiftTestModule.h 中
    
    ```
        #import <Foundation/Foundation.h>
        #import <WeexSDK/WeexSDK.h>
    
        @interface WXSwiftTestModule : NSObject <WXModuleProtocol>
    
        @end
    
    ```
  - WXSwiftTestModule.m 中
    
    WeexDemo-Swift.h 这个文件需要编译一下才可以搜索到，具体的路径
    
    ```
    weex/ios/playground/DerivedData/WeexDemo/Build/Intermediates/WeexDemo.build/Debug-iphonesimulator/WeexDemo.build/DerivedSources/WeexDemo-Swift.h
    ```
    
    路径具体需要根据自己工程而定
    
    ```
        #import "WXSwiftTestModule.h"
        #import "WeexDemo-Swift.h" // Swift类和方法 被 `Objective-C` 识别需要导入
    
        @implementation WXSwiftTestModule
        #pragma clang diagnostic push //关闭unknow selector的warrning
        #pragma clang diagnostic ignored "-Wundeclared-selector"
    
        WX_EXPORT_METHOD(@selector(printSome:callback:)) //Swift 中定义的方法，XCode 转换成的最终的方法名称，在`WeexDemo-Swift.h`里面查看
    
        #pragma clang diagnostic pop
    
        @end
    
    ```
- Swift 中实现 
  扩展 OC 的类 `WXSwiftTestModule`,增加了一个方法，这个方法就是我们要暴露出来，在 js 中可以调到的
  - WXSwiftTestModule.swift
    
    ```
        import Foundation
        public extension WXSwiftTestModule {
           public func printSome(someThing:String, callback:WXModuleCallback) {
               print(someThing)
               callback(someThing)
           }
        }
    ```
    
    `WXSwiftTestModule` 和`WXModuleCallback` 因为是 OC 的，需要在 `WeexDemo-Bridging-Header` 中暴露
  - WeexDemo-Bridging-Header.h中
    
    ```
    //
    //  Use this file to import your target's public headers that you would like to expose to Swift.
    //
    #import "WXSwiftTestModule.h"
    #import "WeexSDK.h"
    ```
    
    至此这个使用 Swift 开发的简单的 module 已经完成
    
  ### module 使用
  - 注册 module 
    
    ```
    [WXSDKEngine registerModule:@"swifter" withClass:[WXSwiftTestModule class]];
    
    ```
  - 前端脚本中用法
    
    ```
      <template>
          <text>Swift Module</text>
      </template>
    
      <script>
        module.exports = {
          ready: function() {
            var swifter = weex.require('swifter');
            swifter.printSome("https://www.taobao.com",function(param){
              nativeLog(param);
            });
          }
    
        };
      </script>
    ```
