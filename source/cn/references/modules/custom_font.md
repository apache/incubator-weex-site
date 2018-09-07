---
title: custom font
type: references
group: Build-in Modules
order: 9.03
version: 2.1
---

# Custom Font <span class="api-version">v0.12.0+</span>
## 简介
Weex 提供  **DOM.addRule** 以加载自定义字体。开发者可以通过指定 **font-family**加载 *iconfont* 和 *custom font*。

## API
开发者可以使用下面的代码加载自定义字体：

    const domModule = weex.requireModule('dom')
    domModule.addRule('fontFace', {
        'fontFamily': "iconfont2",
        'src': "url('http://at.alicdn.com/t/font_1469606063_76593.ttf')"
    });

参数含义如下:

* **fontFace** 协议名称，不可修改。
* **fontFamily** font-family的名称。
* **src** 字体地址，url('') 是保留字段，其参数如下:
    * **http**. 从HTTP请求加载, e.g. `url('http://at.alicdn.com/t/font_1469606063_76593.ttf')`
    * **https**. 从HTTPS请求加载, e.g. `url('https://at.alicdn.com/t/font_1469606063_76593.ttf')` 
    * **local**, *Android ONLY*. 从assets目录读取, e.g. `url('local://foo.ttf')`,  **foo.ttf** 是文件名在你的assets目录中.
    * **file**. 从本地文件读取, e.g. `url('file://storage/emulated/0/Android/data/com.alibaba.weex/cache/http:__at.alicdn.com_t_font_1469606063_76593.ttf')` 
    * **data**. 从base64读取, e.g. `url('data:font/truetype;charset=utf-8;base64,AAEAAAALAIAAAwAwR1NVQrD+....')`, 上述data字段不全。

## Note
> **Note:** `addRule` 方法里的 `fontFamily` 可以随意取。这个名字不是字体真正的名字。字体真正的名字（font-family），也就是注册到系统中的名字是保存在字体二进制文件中的。你需要确保你使用的字体的真正名字（font-family）足够特殊，否则在向系统注册时可能发生冲突，导致注册失败，你的字符被显示为‘?’。

> **Note:** 如果你使用 http://www.iconfont.cn/ 来构建你的 iconfont。确保在项目设置中，设置一个特殊的 font-family 名字。默认是 “iconfont”，但极大可能发生冲突。

> **Note:** 调用`addRule` 在 `beforeCreate` 中是被推荐的。如果封装为组件时不建议放在beforeCreate中，会导致卡顿，空白页面等现象。

## Example
[示例](http://dotwe.org/vue/7e328ee2ac9b7205c9ee37f4e509263d)。
