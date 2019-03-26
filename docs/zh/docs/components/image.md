# &lt;image&gt;

## 简介

`<image>` 用于在界面中显示单个图片。

:::tip
* 在代码中请使用 `<image>` 标签, `<img>` 的存在只是因为兼容性原因，在将来的版本中可能删除。
* Weex 没有内置的图片库，因为一些开源项目如 [SDWebImage](https://github.com/rs/SDWebImage) 和[Picasso](https://github.com/square/picasso)已经能很好的解决这个问题， 所以在使用 `<image>` 之前，请在 native 侧先接入相应的 adapter 或者 handler。参见: [Android adapter](../api/android-apis.html) 和 [iOS handler](../api/ios-apis.html)。
* `<image>` 必须指定样式中的宽度和高度。
* `<image>` 不支持内嵌子组件。
:::

## 基本用法
```html
<image style="width:500px;height:500px" src="https://vuejs.org/images/logo.png"></image>
```

参见[示例](http://dotwe.org/vue/00f4b68b3a86360df1f38728fd0b4a1f)。

## 子组件
`<image>`不支持子组件。

## 样式
支持**[通用样式](../styles/common-styles.html)**。

:::warning
`width`, `height` 和 `src`必须被提供，否则图片无法渲染。
:::

## 属性

| 属性名               | 类型   | 值                          | 默认值   |
| ------------------- | ------ | -------------------------- | ------- |
| `placeholder`       | String | {URL / Base64}             | -       |
| `resize`            | String | cover / contain / stretch  | stretch |
| `src`               | String | {URL / Base64 }            | -       |
| `quality`           | String | original/normal/low/high/auto | - |
| `autoBitmapRecycle`  <Badge text="Android" type="warning"/> | Boolean| {true / false }            | true    |

:::tip
* 您可以指定一个相对 bundle URL 的相对路径，相对路径将被重写为绝对资源路径(本地或远程)。参见: [资源路径](../../guide/advanced/asset-path.html)。
* `quality` 属性被 WeexSDK 解析但不处理，该参数会直接传给接入的图片下载库，由图片库决定下载什么图片。
* 当接入的外置图片库支持 `quality` 属性时，`resize` 有可能不能按照预期工作，这是因为图片被下载库剪裁了。可以通过指定 "quality='original'" 解决问题。
:::

### placeholder

占位图的 URL，在图片下载过程中将展示占位图，图片下载完成后将显示`src`中指定的图片。 ([示例](http://dotwe.org/vue/712ef102fc5e073b6c7e3b701545681c))

### resize

- `contain`：缩放图片以完全装入`<image>`区域，可能背景区部分空白。 ([示例](http://dotwe.org/vue/89be94dcd1fec73b77246ec46c678914))
- `cover`：缩放图片以完全覆盖`<image>`区域，可能图片部分看不见。 ([示例](http://dotwe.org/vue/f38e311d2e6b2af87f0a65a8f37d9490))
- `stretch`：`默认值`. 按照`<image>`区域的宽高比例缩放图片。([示例](http://dotwe.org/vue/f38e311d2e6b2af87f0a65a8f37d9490))

resize属性和[`background-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)的理念很相似。

### src

要显示图片的 URL，该属性是 `<image>` 组件的强制属性。

#### 支持的图片格式

Weex没有提供必须支持的图片格式列表，主要依赖于你正在使用的图片 adapter 或者 handler。例如，如果你使用 [SDWebImage](https://github.com/rs/SDWebImage#supported-image-formats) 作为iOS上的图片 handler，你可以使用像 JPEG、PNG、GIF、WebP 等图片格式。

:::danger
Android 默认的Image Adapter不支持 gif。
:::

### autoBitmapRecycle
一个布尔标志位控制当图片滚出屏幕时是否回收相关内存。

* `true` 当图片不可见时回收图片内存
* `false` 当图片不可见时不回收图片内存，这样做会占用更高的内存，但是会提供更好的用户体验。
* 默认值是true

## 组件方法

### `save` <span class="api-version">v0.16.0+</span>

保存图片内容到本地文件或相册，此操作可能需要设备相关权限。

**参数**:

* `callback`：{Function} 在图片被写入到本地文件或相册后的回调，回调参数：
  * `result`：{Object} 回调结果对象，属性列表：
    * `success`：{Boolean} 标记图片是否已写入完成。
    * `errorDesc`：{String} 如果图像没有成功写入，该字符串包含了详细的错误描述。

**返回值**: null

:::warning
你必须加入`NSPhotoLibraryAddUsageDescription` 和 `NSPhotoLibraryAddUsageDescription` (iOS 11) 以获得访问 iOS 系统相册权限. 参见: [Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html)
:::


#### 使用 `save` 方法

在 `<image>`标签上增加 `ref` 属性 (Vue.js *[Child Component Refs](https://vuejs.org/v2/guide/components.html#Child-Component-Refs)*) ：

```html
<image ref="poster" src="path/to/image.png"></image>
```

获取组件引用并使用 `save` 方法:

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

参见 [完整例子](http://dotwe.org/vue/fadcd44a7031943ff0feaaf1895df414).

## 事件

* **通用事件**. 参见[通用事件](../events/common-events.html)

### `load`

当加载完成 `src` 指定的图片时，`load`事件将被触发。

**事件对象**:

- `success`: {Boolean} 标记图片是否成功加载。


- `size`: {Object} 加载的图片大小对象，属性列表：
  - `naturalWidth`: {Number} 图片宽度，如果图片加载失败则为0。
  - `naturalHeight`: {Number} 图片高度，如果图片加载失败则为0。

#### 处理 `load` 事件

在 `<image>` 标签上绑定 `load` 事件：

```html
<image @load="onImageLoad" src="path/to/image.png"></image>
```

增加事件处理函数：

```js
export default {
  methods: {
    onImageLoad (event) {
      if (event.success) {
        // Do something to hanlde success
      }
    }
  }
}
```

参见[完整示例](http://dotwe.org/vue/94de9307517240dec066d2ea57fe54a0)。

## 示例

* [Base64 示例](http://dotwe.org/vue/ba477790c85ea12bbf7ad3a5f0885b5c)
* [Lazy load image 示例](http://dotwe.org/vue/b0b146e4e6fa4890f800e18cb950f803)