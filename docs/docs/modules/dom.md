# dom

The `dom` module is used to manipulate the components in weex pages.

You can use these APIs to get a component's bounding rect in the page, or scroll a list to some specific component, or add a font-face rule to the page and so on.

::: tip
The `addRule` method is currently used only with font-face supportability.
:::

# API

## scrollToElement

Scroll the scrollable component to the referenced component. This API should only be used in the children components of a scrollable component, such as in a `<scroller>` or `<list>` component.

#### scrollToElement(ref, options)

* **@ref**, the referenced component who is meant to scroll into the view.
* **@options**,
  * **`offset`**, an space on top of the ref component, which is also scrolling down to the visual viewport. Default is `0`.
  * **`animated`**, a boolean indicates whether a scroll animation should be played. If set to false, the ref component will jump into the view without any transition animation. Default is true.

[Demo](http://dotwe.org/vue/56e0d256cbb26facd958dbd6424f42b2)

## getComponentRect

You can get the bounding rect of the referenced component using this API.

#### getComponentRect(ref, callback)

* **@ref**, the referenced component.
* **@callback**, the callback function after executing this action.

An example callback result should be like:
```javascript
{
  result: true,
  size: {
    bottom: 60,
    height: 15,
    left: 0,
    right: 353,
    top: 45,
    width: 353
  }
}
```

::: tip
If you want to get the bounding rect of outside viewport of the weex container, you can specify the `ref` as a literal string `'viewport'`, like `getComponentRect('viewport', callback)`.
:::

[Demo](http://dotwe.org/vue/d69ec16302e06300096c7285baef538a)

## getLayoutDirection <Badge text="0.20.0+" type="warn" vertical="middle"/>

You can get the layout direction the referenced component using this API.

#### getLayoutDirection(ref, callback)

* **@ref**, the referenced component.
* **@callback**, the callback function after executing this action.

An example callback result should be like:
```json
{
  "result": "rtl",
}
```

Demo
```javascript
const element = this.$refs['kkk'][0];
dom.getLayoutDirection(element, function(ret) {
  console.log(ret.result);
});
```

## addRule <Badge text="0.12.0+" type="warn" vertical="middle"/>

Weex provide the ability of loading custom through **DOM.addRule**. Developers can load *iconfont* and *custom font* by specifying the **font-family**.

Developers may use the following code snippet to load their font:
```javascript
const domModule = weex.requireModule('dom')
domModule.addRule('fontFace', {
    'fontFamily': "iconfont2",
    'src': "url('http://at.alicdn.com/t/font_1469606063_76593.ttf')"
});
```

#### addRule(type, contentObject)

* **@fontFace** You should not change this as this is the name of the font rule
* **@fontFamily** You should provide the name of your font-family there, the valid name should be a string.
* **@src** The src of your custom font, and url('') is reserved for protocol reason, the supported parameters are listed below:
    * **`http`**. Read from http, e.g. `url('http://at.alicdn.com/t/font_1469606063_76593.ttf')`
    * **`https`**. Read from https, e.g. `url('https://at.alicdn.com/t/font_1469606063_76593.ttf')`
    * **`local`**, *Android ONLY*. Read from assets directory e.g. `url('local://foo.ttf')`, the **foo.ttf** is in your android assets directory.
    * **`file`**. Read from a local file, e.g. `url('file://storage/emulated/0/Android/data/com.alibaba.weex/cache/http:__at.alicdn.com_t_font_1469606063_76593.ttf')`
    * **`data`**. Read from a base64 data source, e.g. `url('data:font/truetype;charset=utf-8;base64,AAEAAAALAIAAAwAwR1NVQrD+....')`, the above data field is only a part of the actual data.

::: warning
You can name `fontFamily` in `addRule` as you wish in your page, any string is OK. But this is not the real font-family name of the font file. The real name or system name for the font is stored in binrary data of ttf file. You must ensure that the real font-family name of font file is unique. Or your font may not be successfully registered to device and your text may display as a '?'.

Specially, if you are using http://www.iconfont.cn/ to build your iconfont. Make sure that you set a unique enough font-family name for your font in project settings.

Calling `addRule` in `beforeCreate` is recommended.
:::

[Demo](http://dotwe.org/vue/7e328ee2ac9b7205c9ee37f4e509263d).
