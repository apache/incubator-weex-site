# deviceInfo

deviceInfo模块可用来获取设备的基本信息并进行设置，如fullScreenHeight（全面屏高度）。适配全面屏时建议使用该模块。

# API

## enableFullScreenHeight

适配全面屏时，默认获取的屏幕高度可能不包含status bar的高度，此时建议使用enableFullScreenHeight开启全屏效果

#### enableFullScreenHeight(callback,extend)

* **@callback**, function，用户操作完成后的回调
  * **`fullScreenHeight`**, string, 全屏高度

* **@extend**,  可选参数 请传入{}

```javascript
  var deviceInfo = weex.requireModule('deviceInfo')
  var modal = weex.requireModule('modal')
  deviceInfo.enableFullScreenHeight(
  function (e) {
    modal.toast({
      message:"full screen height:" + e.fullScreenHeight,
      duration:1,
    });
    
},{});
```
[示例](http://dotwe.org/vue/d164a5f38bc15713e345483ef09868ab)
