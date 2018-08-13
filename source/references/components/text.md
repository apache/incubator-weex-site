---
title: <text>
type: references
group: Build-in Components
order: 8.23
version: 2.1
---

The weex builtin component 'text' is used to render text with specified style rule. <text> tag can contain text value only. You can use variable interpolation in the text content with the mark `{% raw %}{{}}{% endraw %}`.

> **Note:** This component supports no child components.

## Attributes
* value(string): text value of this component. This is equal to the content of 'text'.

      var textComponent = this.$el("textid");
      this.text = textComponent.attr.value;

## Styles
* Support [common styles for components](/wiki/common-styles.html)
* lines: specify the text lines. Default value is `0` for unlimited.
* Support [text styles](/wiki/text-styles.html)
  * support 'color' style.
  * support 'font-size' style. iOS: default vlaue `32`. Android: platform specify. HTML5: default value `32`.
  * support 'font-style' style.
  * support 'font-weight' style.
  * support 'text-align' style.
  * support 'text-decoration' style.
  * support 'text-overflow' style.
  * support 'line-height'(available from v0.6.1) style.

## Events
Support [common events](/wiki/common-events.html)

## Custom Typeface
`support:v0.12.0`

support `ttf` and `woff` font format to custom your text, call [addRule](../modules/custom_font.html) in dom module to build your own `font-family`, we suggest that you call `addRule` in `beforeCreate`.

## Examples
* [Basic usage for `<text>`](http://dotwe.org/vue/9ac60ccb4d1aacbdbd608dd7107ad105).

