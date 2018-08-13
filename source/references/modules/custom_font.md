---
title: dom
type: references
group: Build-in Modules
order: 9.03
version: 2.1
---

# Custom Font <span class="api-version">v0.12.0+</span>
## OverView
Weex provide the ability of loading custom through **DOM.addRule**. Developers can load *iconfont* and *custom font* by specifying the **font-family**.

## API
Developers may use the following code snippet to load their font:

    const domModule = weex.requireModule('dom')
    domModule.addRule('fontFace', {
        'fontFamily': "iconfont2",
        'src': "url('http://at.alicdn.com/t/font_1469606063_76593.ttf')"
    });

The parameter of **Add Rule** is illustrated as following:

* **fontFace** You should not change this as this is the name of the font rule
* **fontFamily** You should provide the name of your font-family there, the valid name should be a string.
* **src** The src of your custom font, and url('') is reserved for protocol reason, the supported parameters are listed below:
    * **http**. Read from http, e.g. `url('http://at.alicdn.com/t/font_1469606063_76593.ttf')`
    * **https**. Read from https, e.g. `url('https://at.alicdn.com/t/font_1469606063_76593.ttf')` 
    * **local**, *Android ONLY*. Read from assets directory e.g. `url('local://foo.ttf')`, the **foo.ttf** is in your android assets directory.
    * **file**. Read from a local file, e.g. `url('file://storage/emulated/0/Android/data/com.alibaba.weex/cache/http:__at.alicdn.com_t_font_1469606063_76593.ttf')` 
    * **data**. Read from a base64 data source, e.g. `url('data:font/truetype;charset=utf-8;base64,AAEAAAALAIAAAwAwR1NVQrD+....')`, the above data field is only a part of the actual data.

## Note
> **Note:** You can name `fontFamily` in `addRule` as you wish in your page, any string is OK. But this is not the real font-family name of the font file. The real name or system name for the font is stored in binrary data of ttf file. You must ensure that the real font-family name of font file is unique. Or your font may not be successfully registered to device and your text may display as a '?'.

> **Note:** Specially, if you are using http://www.iconfont.cn/ to build your iconfont. Make sure that you set a unique enough font-family name for your font in project settings.

> **Note:** Calling `addRule` in `beforeCreate` is recommended.

## Example
Check the custom font [example](http://dotwe.org/vue/7e328ee2ac9b7205c9ee37f4e509263d).