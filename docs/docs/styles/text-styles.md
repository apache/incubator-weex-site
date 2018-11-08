# 文本样式

文本类组件支持一些特殊的 CSS 属性设置文本的样式，如字体、字号、文本颜色等, 这类组件目前包括 `<text>`、 `<input>` 和 `<textarea>`。

## `color`

设置文字颜色，值为色值或颜色关键字，支持 RGB（`rgb(255, 0, 0)`），RGBA（`rgba(255, 0, 0, 0.5)`），十六进制（`#ff0000`），精简写法的十六进制（`#f00`），色值关键字（`red`）。具体可参考 [CSS 颜色单位](./css-units.html#css-颜色单位)。

```html
<style scope>
.title {
  color: rgba(0, 0, 0, 0.8);
}
.content {
  color: #666;
}
</style>
```

## `lines`

指定文本行数，值为整数。**仅在 `<text>` 组件中支持**。默认值是 `0` 代表不限制行数。

通常与 `text-overflow` 配合限制文本行数，超过则文本末尾显示省略号。

```html
<style scope>
.content {
  lines: 3;
  text-overflow: ellipsis;
  color: #666;
}
</style>
```

## `text-overflow`

设置内容超长时的省略样式。**仅在 `<text>` 组件中支持**。通常与 `lines` 配合限制文本行数，超过则文本末尾显示省略号。可选值为：

- `clip`：截断，不做任何处理。
- `ellipsis`：内容超长时在文本末尾显示省略号。

```html
<style scope>
.content {
  lines: 3;
  text-overflow: ellipsis;
  color: #666;
}
</style>
```

## `font-size`

设置文字大小，**仅支持 `px` 单位。**文字默认大小为 36px。

```html
<style scope>
.title {
  font-size: 40px;
}
</style>
```

## `font-style`

设置字体类别，可选值 `normal` | `italic`，默认为 `normal`。

```html
<style scope>
.title {
  font-style: italic;
}
</style>
```

## `font-weight`

设置字体粗细程度，可选值为 `normal` | `bold` | `100` | `200` | `300` | `400` | `500` | `600` | `700` | `800` | `900`，默认为 `normal`。

- `normal` 等同于 400, `bold` 等同于 700；
- iOS 支持以上可选值；Android 仅支持 400 和 700，其他值会设为 400 或 700；
- 暂不支持 `lighter`, `bolder` 等其他值。

```html
<style scope>
.title {
  font-weight: bold;
}
</style>
```

## `text-decoration`

设置文本装饰，可选值为：

- `none`：无任何装饰，默认为 `none`。
- `underline`：文本下划线。
- `line-through`：文本删除线。

```html
<style scope>
.title {
  text-decoration: underline;
}
</style>
```

## `text-align`

设置文本对齐方式，可选值为：

- `left`：左对齐，默认为 `none`。
- `center`：水平居中对齐。
- `right`：右对齐。

```html
<style scope>
.title {
  text-align: center;
}
</style>
```

## `font-family`

设置文本设置字体，该属性**不保证**在不同平台、不同设备间的一致性。如所选设置在平台上不可用，将会降级到平台默认字体。

```html
<style scope>
.title {
  font-family: Arial;
}
</style>
```

该属性可配合 `dom.addRule()` 方法为 `<text>` 设置自定义字体，详情可查看 [`<text>` 组件](/docs/text.html#自定义字体)。
