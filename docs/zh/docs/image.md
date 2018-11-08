# &lt;image&gt;

`<image>` 用于在界面中显示单个图片。

``` vue
<image style="width:500px;height:500px" src="https://vuejs.org/images/logo.png"></image>
```
::: warning 注意
* 必须指定样式中的宽度和高度，否则无法工作。
* 不支持内嵌子组件。
* 图片地址，建议以CDN的形式引入，但是也可以指定为一个相对路径，参考: [资源路径](http://weex.apache.org/cn/guide/advanced/path.html) 。
*  Weex 没有内置的图片下载器，因为相关的下载、缓存、解码机制非常复杂，一些开源的图片库已经处理得很好， 所以在使用 `<image>` 之前，请在客户端先接入相应的图片处理工具，参考: [Android](http://weex.apache.org/cn/references/android-apis.html#Adapter) 和 [iOS](http://weex.apache.org/cn/references/ios-apis.html#Handler-like-Android-Adapter)。
* 支持的图片格式——Weex 没有提供必须支持的图片格式列表，主要依赖于你正在使用的图片处理工具。
:::

## 属性
<table>
  <thead><tr><th>属性名</th><th style="width: 40%">说明</th><th>类型</th><th style="width: 33%">值</th><th style="width: 10%">默认值</th></tr></thead>
  <tbody>
    <tr><td>src</td><td>要显示图片的 URL</td><td>string</td><td>{ URL / Base64 }</td><td>-</td></tr>
    <tr><td>placeholder</td><td>占位图的 URL，当由 <code>src</code> 表示的图片下载完成并展示后将被删除</td><td>string</td><td>{ URL / Base64 }</td><td>-</td></tr>
    <tr><td>resize</td><td>说明见下文</td><td>string</td><td>cover / contain / stretch</td><td>stretch</td></tr>
  </tbody>
</table>

### resize

<div style="text-align: center"><img src="https://img.alicdn.com/tfs/TB1Lik8nVzqK1RjSZFCXXbbxVXa-1620-538.png" width="700"></div>

- contain：缩放图片以完全装入 `<image>` 区域，可能背景区部分空白。 ([示例](http://dotwe.org/vue/89be94dcd1fec73b77246ec46c678914))
- cover：缩放图片以完全覆盖 `<image>` 区域，可能图片部分看不见。 ([示例](http://dotwe.org/vue/bcc12eb2321c1416fee518735646e059))
- stretch：`默认值`，按照 `<image>` 区域的宽高比例缩放图片。([示例](http://dotwe.org/vue/dcf82a112bd49139685753ba20909a20))

## 事件
`<image>` 组件除了支持 [通用事件](/guide/common-events.html)外，还支持 `load事件`：当加载完 `src` 指定的图片时，`load` 事件将被触发。  

`load` 事件参数 `event`：
* success：`{ Boolean }`，标记图片是否成功加载
* size：`{ Object }`，加载的图片大小对象
  * naturalWidth: `{ Number }` 图片宽度，如果图片加载失败则为0
  * naturalHeight: `{ Number }` 图片高度，如果图片加载失败则为0
```vue
<template>
  <div>
    <image @load="onload" style="width:300px;height:300px;" src="https://gw.alicdn.com/tps/TB1bEMYKXXXXXaLaXXXXXXXXXXX-360-388.png"></image>
  </div>
</template>
<script>
  module.exports = {
    methods : {
      onload : function(e) {
        if (e.success) {
          console.log(e.size)
        }
      }
    }
  }
</script>
```
[参考示例](http://dotwe.org/vue/4996b4d1e055168e0cb5cbf817b42249)
<IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1lRQ4n9zqK1RjSZFLXXcn2XXa-544-960.gif" />

## 组件方法
**`save`**  <Badge text="0.16.0+" type="warn" vertical="middle"/>  
保存图片内容到本地文件或相册，此操作可能需要设备相关权限。

使用方法：在 `<image>` 标签上增加 `ref` 属性 (Vue.js [Child Component Refs](https://vuejs.org/v2/guide/docss-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements)) 
```vue
<image ref="poster" src="path/to/image.png"></image>
```
获取组件引用并使用 `save` 方法，查看 [完整示例](http://dotwe.org/vue/204cafec46aa8e23485a94cfb2c39cfa):

```js
const $image = this.$refs.poster
$image.save(result => {
  if (result.success) {
    // Do something to hanlde success
  } else {
    console.log(result.errorDesc)
    // Do something to hanlde failure
  }
})
```

参数说明：
* callback: `{ Function }` 在图片被写入到本地文件或相册后的回调，回调参数
  * result: `{ Object }` 回调结果对象，属性列表
    * success: `{ Boolean }` 标记图片是否已写入完成
    * errorDesc: `{ String }` 如果图像没有成功写入，该字符串包含了详细的错误描述

::: warning 注意
必须加入 NSPhotoLibraryAddUsageDescription (iOS 11) 以获得访问 iOS 系统相册权限。参考：[Cocoa Keys](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html)。
:::
 
## Demo
[图片 `contain` 属性](http://dotwe.org/vue/11da331116b74515a4d74ae9707f85a9)    
[图片 `cover` 属性](http://dotwe.org/vue/bcc12eb2321c1416fee518735646e059)    
[图片 `stretch` 属性](http://dotwe.org/vue/dcf82a112bd49139685753ba20909a20)   
[组件方法 `save` 示例](http://dotwe.org/vue/204cafec46aa8e23485a94cfb2c39cfa)  
[`load` 事件示例](http://dotwe.org/vue/213ef53ec275cbd550d9ebea9f81acf0)
