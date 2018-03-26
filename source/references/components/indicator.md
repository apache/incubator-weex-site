---
title: <indicator>
type: references
group: Build-in Components
order: 8.05
version: 2.1
---

# &lt;indicator&gt;

### Summary

The `<indicator>` component usually used to show an indicator effect, it must be used as a subcomponent of a [`slider`](./slider.html) component.

### Child Components

This component dosen not supports any child components.

### Attributes

There is no specific attribute for this component.

### Styles

Threr are some private styles for `<indicator>` :
- `item-color`: &lt;colors&gt; This style attribute sets the normal item, default is `#CCCCCC`.
- `item-selectedColor`: &lt;colors&gt; This style attribute sets the selected item, default is `#444444`.
- `item-size`: &lt;length&gt; The radius of the indicator elements, default is `5px`

**common styles**: see [common styles](/wiki/common-styles.html)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles

**Note:** There are some specific details about the style `width` and `height` on this component: the position of indicator will not only depend on the `top`, `left`, `bottom` and `right`, but also depend on the value of `width` and `height`. Imagine there is a virtual container outside the indicator, and it inherit the `width` and `height` of the indicator. The `top`, `left`, `right` and `bottom` will always take effect on this container, not the indicator points themselves, and the indicator points will be positioned in the center of it. And also you should know the default `width` and `height` is the parent slider's `width` and `height`.

**Note:** `background-color` is not recommended to apply on this component, and you should use `item-color` and `item-selectedColor` instead.

### Events

**common events**: check out the [common events](/wiki/common-events.html)

- support `click` event. Check out [common events](/wiki/common-events.html)
- support `appear` / `disappear` event. Check out [common events](/wiki/common-events.html)

### Example

[indicator demo](http://dotwe.org/vue/e1b4fd8a37ed4cafd8f5e161698754aa)
