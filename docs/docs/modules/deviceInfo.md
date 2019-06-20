# deviceInfo

The `deviceInfo` module can be used to get and set properties about device in weex such as fullScreenHeight.The module is suggested when you create a full screen page.

# API

## enableFullScreenHeight

Since the default screen height in weex may exclude the height of status bar on some full screen devices.`enableFullScreenHeight` can be used to make full screen pages on these devices.

#### enableFullScreenHeight(callback,extend)

* **@callback**, function，callback when complete.
  * **`fullScreenHeight`**, string, the current full screen height.

* **@extend**,  optional parameters，please input {}.


#### example

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
[Demo](http://dotwe.org/vue/d164a5f38bc15713e345483ef09868ab)
