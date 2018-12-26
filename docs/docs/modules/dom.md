# Dom

## Overview

The `dom` module is used to manipulate the components in weex pages.

You can use these APIs to get a component's bounding rect in the page, or scroll a list to some specific component, or add a font-face rule to the page and so on.

> **Note:** The `addRule` method is currently used only with font-face supportability.

## API

### scrollToElement(ref, options)

Scroll the scrollable component to the referenced component. This API should only be used in the children components of a scrollable component, such as in a `<scroller>` or `<list>` component.

> **NOTE:** You can use `weex.requireModule('dom')` to requrie the dom module, and use `weex.requireModule('dom').scrollToElement` to call this API.

#### Arguments

* `ref`*(Node)*: the referenced component who is meant to scroll into the view.
* `options`*(object)*:
  * `offset`*(number)*: An space on top of the ref component, which is also scrolling down to the visual viewport. Default is `0`.
  * `animated` *(bool)*: <sup class="wx-v">0.10+</sup> Indicates whether a scroll animation should be played. If set to false, the ref component will jump into the view without any transition animation. Default is true.

#### Example

[Scroll To Floor](http://dotwe.org/vue/56e0d256cbb26facd958dbd6424f42b2)

### getComponentRect(ref, callback) <span class="api-version">v0.9.4+</span>

`support: >=0.9.4`

You can get the bounding rect of the referenced component using this API.

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

If you want to get the bounding rect of outside viewport of the weex container, you can specify the `ref` as a literal string `'viewport'`, like `getComponentRect('viewport', callback)`.

#### Example

[get box's rect](http://dotwe.org/vue/d69ec16302e06300096c7285baef538a)


### addRule(type, contentObject) <span class="api-version">v0.12.0+</span>

`support: >=0.12.0`

Weex provide the ability of loading custom through **DOM.addRule**. Developers can load *iconfont* and *custom font* by specifying the **font-family**.

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

#### Note
> **Note:** You can name `fontFamily` in `addRule` as you wish in your page, any string is OK. But this is not the real font-family name of the font file. The real name or system name for the font is stored in binrary data of ttf file. You must ensure that the real font-family name of font file is unique. Or your font may not be successfully registered to device and your text may display as a '?'.

> **Note:** Specially, if you are using http://www.iconfont.cn/ to build your iconfont. Make sure that you set a unique enough font-family name for your font in project settings.

> **Note:** Calling `addRule` in `beforeCreate` is recommended.

#### Example
Check the custom font [example](http://dotwe.org/vue/7e328ee2ac9b7205c9ee37f4e509263d).

## DEMO

[<IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1hVg_n8LoK1RjSZFuXXXn0XXa-262-433.png" />](http://dotwe.org/vue/d8459936b12ed070ccf6bf5b953aa344)

<!-- [![](https://img.alicdn.com/tfs/TB1hVg_n8LoK1RjSZFuXXXn0XXa-262-433.png)](http://dotwe.org/vue/d8459936b12ed070ccf6bf5b953aa344) -->

<details>
  <summary>Code</summary>

```vue
  <template>
    <div class="root">
      <list class="list">
        <cell v-for="item in items" v-bind:key="item.title">
          <div :ref="`widget${item.title}`" class="widget">
            <text>widget{{item.title}}</text>
            <text>iconfont{{item.title}}</text>
            <text :style="{fontFamily:`iconfont${item.title}`, fontSize: '50px'}">&#xe748;</text>
          </div>
        </cell>
      </list>
      <div class="btn-holder">
        <text class="btn" @click="getComponentRect">getComponentRect of 10</text>
        <text class="btn" @click="scrollToElement">scroll to 10</text>
        <text class="btn" @click="addRule">addRule</text>
      </div>
      <div class="message">
        <text>{{message}}</text>
      </div>
    </div>
  </template>

  <script>
const dom = weex.requireModule('dom');
const modal = weex.requireModule('modal');

export default {
  data() {
    return {
      targetIndex: 10,
      items: [],
      trigger: '',
      message: ''
    };
  },
  created() {
    const targetIndex = this.targetIndex;
    const items = [];
    for (let i = 0; i < 30; i++) {
      items.push({
        title: i,
        desc: i === targetIndex ? '&#xe748;' : ''
      });
    }
    this.items = items;
  },
  methods: {
    getStyle(i) {
      return {};
    },
    addRule() {
      const targetIndex = this.targetIndex;
      modal.toast({
        message: `addRule to iconfont${targetIndex}`
      });
      this.scrollToElement();
      dom.addRule('fontFace', {
        fontFamily: `iconfont${targetIndex}`,
        src: "url('http://at.alicdn.com/t/font_zn5b3jswpofuhaor.ttf')"
      });
    },
    scrollToElement() {
      const element = this.$refs[`widget${this.targetIndex}`][0];
      dom.scrollToElement(element);
    },
    getComponentRect() {
      const element = this.$refs[`widget${this.targetIndex}`][0];
      dom.getComponentRect(element, data => {
        this.message = JSON.stringify(data);
      });
    }
  }
};
</script>


  <style scoped>
.root {
  width: 700px;
  margin-left: 25px;
}
.list {
  height: 600px;
  width: 700px;
}
.widget {
  height: 150px;
  width: 700px;
  border-width: 1px;
}
.btn-holder {
  flex-direction: row;
  margin-top: 10px;
}
.btn {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #00b4ff;
  margin-right: 10px;
  color: #fff;
}
.message {
  margin-top: 10px;
  border-width: 1px;
  height: 300px;
  width: 700px;
}
</style>
```

</details>
