---
title: Extend iOS with swift
type: guide
group: Extend
order: 6.4
version: 2.1
---

## Swift In Weex

[Swift and Objective-C](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html#//apple_ref/doc/uid/TP40014216-CH10-ID122) mix-up

a complete [demo](https://github.com/acton393/WeexSwiftSample.git)

### extend module using swift

 As we export moudle method using macro and calling in runtime, so we can extend module using swift by `extension` `bjective-C` class.
 > You can also finish extending module by write an category for swift class in Objective-C class.

- new `WXSwiftTestModule.h/m` and `WXSwiftTestModule.swift` file ，you will get a tip as follow during the creation
  ![img](http://img3.tbcdn.cn/L1/461/1/b2ed3ee4a966953c0f98a17f34f6f05e7c91cc6b)
  choose `Create Bridging Header`, as we need to access method in `Objective-C` in swift file, and the `Bridging header` can help us. And the format name of the header file is `yourTarget-Bridging-Header.h`, and mine is `WeexDemo-Bridging-Header.h`.

- implementation in `WXSwiftTestModule.h/m`
  - WXSwiftTestModule.h
    
    ```
        #import <Foundation/Foundation.h>
        #import <WeexSDK/WeexSDK.h>
    
        @interface WXSwiftTestModule : NSObject <WXModuleProtocol>
    
        @end
    
    ```
  - WXSwiftTestModule.m
    
    you can search WeexDemo-Swift.h after building your project, Xcode will generate this file for us.

    for simulator the file path may be: 
    ```
    weex/ios/playground/DerivedData/WeexDemo/Build/Intermediates/WeexDemo.build/Debug-iphonesimulator/WeexDemo.build/DerivedSources/WeexDemo-Swift.h
    ```
    export method define in swift file.
    ```
        #import "WXSwiftTestModule.h"
        #import "WeexDemo-Swift.h" // you need to import the header to make Objective-C code recognize the method defined in swift file.
    
        @implementation WXSwiftTestModule
        #pragma clang diagnostic push //forbid unknow selector warrning
        #pragma clang diagnostic ignored "-Wundeclared-selector"
    
        WX_EXPORT_METHOD(@selector(printSome:callback:)) //method name in Swift, you can get the final method name in `WeexDemo-Swift.h` as the convert of Xcode.

        #pragma clang diagnostic pop
    
        @end
    
    ```
- in Swift
  make an extension for Objective-C class `WXSwiftTestModule`, add a method, and then export it in Objective-C, then we can use it in javaScript.

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
    
  we need to expose `WXSwiftTestModule` `WXModuleCallback` in `WeexDemo-Bridging-Header` as our `Objective-C` need to access them

  - WeexDemo-Bridging-Header.h
    
    ```
    //
    //  Use this file to import your target's public headers that you would like to expose to Swift.
    //
    #import "WXSwiftTestModule.h"
    #import "WeexSDK.h"
    ```

    by far we have finished our module using swift.
    
  ### module usage
  - register module to WeexSDK

    ```
    [WXSDKEngine registerModule:@"swifter" withClass:[WXSwiftTestModule class]];
    
    ```
  - front-end usage

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
