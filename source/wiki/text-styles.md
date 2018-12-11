---
title: Text Styles
type: wiki
group: Style
order: 3.2
version: 2.1
---

<!-- toc -->

Text alike components share some common style rules. The text alike components currently includes [`text`](../references/components/text.html)、[`input`](../references/components/input.html) and [`richtext`](../references/components/richtext.html)

## Properties

- `color`: &lt;colors&gt; this property set the foreground color of an component's text content.
    * The property `color` support multiple formats of values, contains rgb, rgba, #fff, #ffffff, named-color. Example:
        ```css
        .my-class { color: red; }
        .my-class { color: #f00; }
        .my-class { color: #ff0000; }
        .my-class { color: rgb(255, 0, 0); }
        .my-class { color: rgba(255, 0, 0, 0.5); }
        ```
- `font-size`: &lt;length&gt; this property specifies the size of the font.
- `font-style`: &lt;enum&gt; `normal` | `italic`. This property lets you select italic or normal faces within a font-family. Default value is `normal`.
- `font-weight`<span class="api-version">v0.9+</span>:
  * values: `normal`, `bold`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`
  * normal is equal to 400, bold equel to 700
  * default value: `normal`
  * apply to: `<text>`, `<input>`
  * ios support showing 9 kind of font-weight.
  * android support showing 2 kind of font-weight:400,700, other value will map to 400 or 700
  * Some standard values like `lighter`, `bolder`, number unit are not supported.
  * The effect not apply to all elements, just `<text>` and `<input>`. In another way, it's not inherited.
- `text-decoration`: &lt;enum&gt; `none` | `underline` | `line-through`. This property is used to set the text formatting to underline or line-through. The default value is `none`.
    >> Only support for `<text>` and `<ricthext>`
- `text-align`: &lt;enum&gt; `left` | `center` | `right`. This property describes how inline content like text is aligned in its parent component. The default value is `left`.
- `font-family`:&lt;string&gt; this property set the font-family of the text. This property **doesn't guarantee** the given font will always be set to the text. If the specified font cannot be found at the device, a typeface fallback will occur and the default typeface will be load. The fallback mechanism may vary in different devices. If you want load your own font-family, ref [custom-font](../references/modules/custom_font.html) instead.
- `text-overflow`:&lt;enum&gt; `clip` | `ellipsis`. This property determines how overflowed content that is not displayed is signaled to users. It can be clipped, display an ellipsis.
   >> Only support for `<text>` and `<ricthext>`
- `lines`: &lt;number&gt; positive number. This is the max lines of text that would be displayed, the default value is 0 which means there is no restriction on text lines. If the text is not enough, the actual number of line may be shorter than the specified value.

## Note
* [The list of color keywords.](./color-names.html)

