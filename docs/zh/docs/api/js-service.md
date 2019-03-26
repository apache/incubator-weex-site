---
title: JSService
type: references
group: API
order: 2.6
version: 2.1
---


## 概述

<span class="weex-version">v0.9.5+</span>

JSService 和 Weex 实例在 JS Runtime 中并行运行。Weex 实例的生命周期可调用 JSService 生命周期。目前提供创建、刷新、销毁生命周期。

**重要提醒: JSService 使用不当会导致内存增高或全局污染！**


## 注册

### iOS

```objective-c
[WXSDKEngine registerService:@"SERVICE_NAME" withScript: @"SERVICE_JS_CODE" withOptions: @{}];
// or
[WXSDKEngine registerService:@"SERVICE_NAME" serviceScriptUrl: @"SERVICE_JS_URL" withOptions: @{}];
```

### Android

```java
HashMap<String, String> options = new HashMap<>()
options.put("k1", "v1")
String SERVICE_NAME = "SERVICE_NAME"
String SERVICE_JS_CODE = "SERVICE_JS_CODE"
boolean result = WXSDKEngine.registerService(SERVICE_NAME, SERVICE_JS_CODE, options)
```
> params of `options` Could have { create, refresh, destroy } lifecycle methods. In create method it should  return an object of what variables or classes would be injected into the `Weex` instance.

### Web
```html
<script src="SERVICE_JS_CODE_URL"></script>
```

## 样例

```javascript
service.register(SERVICE_NAME /* same string with native */, {
  /**
    * JSService lifecycle. JSService `create` will before then each instance lifecycle `create`. The return param `instance` is Weex protected param. This object will return to instance global. Other params will in the `services` at instance.
    *
    * @param  {String} id  instance id
    * @param  {Object} env device environment
    * @return {Object}
    */
  create: function(id, env, config) {
    return {
      instance: {
        InstanceService: function(weex) {
          var modal = weex.requireModule('modal')
          return {
            toast: function(title) {
              modal.toast({ message: title })
            }
          }
        }
      },
      NormalService: function(weex) {
        var modal = weex.requireModule('modal')
        return {
          toast: function(title) {
            modal.toast({ message: title })
          }
        }
      }
    }
  },

  /**
    * JSService lifecycle. JSService `refresh` will before then each instance lifecycle `refresh`. If you want to reset variable or something on instance refresh.
    *
    * @param  {String} id  instance id
    * @param  {Object} env device environment
    */
  refresh: function(id, env, config){

  },

  /**
    * JSService lifecycle. JSService `destroy` will before then each instance lifecycle `destroy`. You can deleted variable here. If you doesn't detete variable define in JSService. The variable will always in the js runtime. It's would be memory leak risk.
    *
    * @param  {String} id  instance id
    * @param  {Object} env device environment
    * @return {Object}
    */
  destroy: function(id, env) {

  }
})
```

Use JSService

```html
<script>
var _InstanceService = new InstanceService(weex)
var _NormalService = new service.NormalService(weex)

module.exports = {
  created: fucntion() {
    // called modal module to toast something
    _InstanceService.toast('Instance JSService')
    _NormalService.toast('Normal JSService')
  }
}
</script>
```
