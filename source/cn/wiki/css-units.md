---
title: CSS 单位
type: wiki
group: 样式
order: 3.3
version: 2.1
---

<!-- toc -->

## CSS `color` 单位

支持以下写法：

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

### 注意

> 不支持 `hsl()`, `hsla()`, `currentColor`

> `6-chars hex`是性能最好的颜色使用方式。除非有特殊原因，请使用`6-chars hex`格式。

>  颜色名称可查看 [颜色名称列表](./color-names.html)。

## CSS `length` 单位

在 Weex 中，我们只支持 `px` 长度单位。
```css
.classA { font-size: 48px; line-height: 64px; }
```

> 不支持类似 `em`，`rem`，`pt` 这样的 CSS 标准中的其他长度单位。

## CSS `number` 单位
number可用于以下CSS属性：
* [opacity](./common-styles.html)
* [lines](./text-styles.html)
* [flex](./common-styles.html)

## CSS `percentage` 单位 (暂不支持)