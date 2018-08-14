---
title: custom font
type: references
group: Build-in Modules
order: 9.03
version: 2.1
---

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

Reference [custom Font](./custom_font.html) for more detail.