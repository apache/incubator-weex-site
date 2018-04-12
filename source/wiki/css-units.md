---
title: CSS Units
type: wiki
group: Style
order: 3.3
version: 2.1
---

<!-- toc -->

## CSS `color` units

```css
.classA {
  /* 3-chars hex */
  color: #0f0;
  /* 6-chars hex */
  color: #00ff00;
  /* rgba */
  color: rgb(255, 0, 0);
  /* rgba */
  color: rgba(255, 0, 0, 0.5);
  /* transparent */
  color: transparent;
  /* Basic color keywords */
  color: orange;
  /* Extended color keywords */
  color: darkgray;
}
```

## Notes

* Not support `hsl()`, `hsla()`, `currentColor`, or 8-character hexadecimal color.

* Performance of `rgb(a,b,c)` or `rgba(a,b,c,d)` is much worse than other color formats, please select the appropriate color format.

build-in color name you can see [Color Names](./color-names.html).

## CSS `length` units

In weex we only support px length units. It will resolve to a numeric type in the JavaScript runtime and native renderer.
You can use it like this :

```css
.classA { font-size: 48px; line-height: 64px; }
```

Other length units in the CSS standard like `em`, `rem`, and `pt` are not supported.

## CSS `number` units

You can use `number` on property [`opacity`](./common-styles.html) and [`lines`](./text-styles.html).


## CSS `percentage` units (Not support now)
