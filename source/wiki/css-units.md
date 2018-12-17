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

### Notes

> `hsl()`, `hsla()`, `currentColor`, nor 8-character hexadecimal color are not supported.

> `6-chars hex` format is the most efficient way. Use it unless you have a special reason.

> build-in [color names](./color-names.html).

## CSS `length` units
`px` is the only supported length units.
You can use it like this :

```css
.classA { font-size: 48px; line-height: 64px; }
```

> Other length units in the CSS standard like `em`, `rem`, and `pt` are not supported.

## CSS `number` units
You can use `number` on following properties:
* [opacity](./common-styles.html)
* [lines](./text-styles.html)
* [flex](./common-styles.html)

## CSS `percentage` (Not support)