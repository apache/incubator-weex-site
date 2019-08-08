# &lt;richtext&gt; <Badge text="v0.20+" type="warning"/>

## Summary

Richtext is used to achieve inline `<span>` or `<a>` combined with inline-block `<image> `. It also supports nested `<span>`, `<image>` and `<a>` with style inheritance and override. Thus, richtext can be considered as a more general `<text>` with more powerful usage.

Only `<span>`, `<a>` and `<image>` are valid children of `<richtext>`. `<span>` and `<a>` are considered as `display:inline`, while `<image>` is considered as `display:inline-block`, which are default values and cannot be changed.

Children of `<richtext>` can be classified as two types of node, **internal** and **external**.
* Internal node can have children nodes.
* External node is not allowed to have any children.
* `<span>` and `<a>` are internal nodes, while `<image>` is external node.

Richtext can be seen as a tree, and the max height of the tree is 255. Any style on a node of which the height is greater than 255 has no effect.

Notes
* `<a>` on iOS will have a `color:blue` style, and children of `<a>` can not override this style. This only happens on iOS. There is no default style and override restriction for `<a>` on Android.
* `<image>` in richtext must have `width` and `height` styles.
* The content area of `<image>` will remain blank until the corresponding image is downloaded and there is no way to display a placeholder image.
* Richtext cannot be nested.

## Attributes

Supported attributes of children of a `richtext`.

#### image

* **src**. Image source.
* **pseudo-ref**. A ref assigned by developers and passed to the callback function of **itemclick**.

#### a

* **herf**. The herf.
* **pseudo-ref**. A ref assigned by developers and passed to the callback function of **itemclick**.

#### span

`<span>` does not support any attribute. A text must be set as the content of `<span>`, e.g. `<span>Hello World</span>`.

## Styles

Only limited css styles listed below are supported by richtext.

* `<span>`, `<a>` and `<richtext>` itself
    * styles can be inherited
        * color
        * font-family
        * font-size
        * font-style
        * font-weight
        * line-height
    * styles cannot be inherited
        * background-color
* `<span>`
    * styles cannot be inherited
        * text-decoration: none | underline | line-through, the default value is none
* `<richtext>`
    * styles cannot be inherited
        * lines: the max line of richtext. Must be a **positive integer**.
* `<image>`
    * styles cannot be inherited
        * width
        * height

## Events

* **common events**. Support [common events](../events/common-events.html).
* **itemclick**. Only works on `img` and `a`:
   * `img` tag:
      * None of parents is an `a` tag when the `img` tag is clicked.
      * If the first condition is not satisfied, Weex will try to open the hyperlink of `a` tag instead.
      * **pseudo-ref** of img will be passed to the callback function of onitemclick.
   * `a` tag:
      * The href property is 'click://' (This condition is required on iOS and is optional on Android).
      * The `a` tag has a `pseudo-ref` property whose value will be sent with the itemclick event. **Please be noted that the default jump behavior on `a` tag will be disabled at this moment.`[Demo](http://editor.weex.io/p/sunshl/Contribute/commit/b21e1133830b48767c6d00d712e415b2)
    * If `itemclick` is specified on nested nodes, only the event on the outer node will take effect.

## Example

[Demo](http://dotwe.org/vue/8a817e1acb46c2910caf1b53b8016a48)
