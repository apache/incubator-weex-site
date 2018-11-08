# CSS 单位

## CSS 长度单位

在 Weex 中，我们**只支持 `px` 长度单位**。并且它将在 JavaScript 运行时和本机渲染器中解析为数字类型。

::: warning 注意
- Weex 不支持类似 `em`、`rem`、`pt` 这样的 CSS 标准中的其他长度单位；
- 单位 `px` 不可省略，否则在 H5 环境无法正确渲染；
- `line-height` 不支持相对 `font-size` 计算倍数，必须是 `px`。
:::

## CSS 数值单位

在 Weex 中，除了长度单位外，还有数值单位，仅仅一个数值，后面没有 `px` 等单位。用于 `opacity`，`lines`，`flex` 等属性指定一个纯数值。

有时值必须是整数，例如：`lines`。

## CSS 百分比单位

**Weex 暂不支持百分比，如“50％”，“66.7％”等。**

## CSS 颜色单位

Weex 支持多种颜色单位：

- 颜色关键字，例如 `red`，`green` 等；
- 十六进制的 HEX 值，每个颜色包括一个 `#` 号，其后面紧跟着三组两位十六进制数，如果这三组数值各自在两位上的数字都相同，那么本单位也可缩写为 `#RGB` 的方式。例如：`#FF8800` 可以缩写为 `#F80`;
- `rgb(a,b,c)`;
- `rgba(a,b,c,d)`.

::: warning 注意
- 不支持 `hsl()`、`hsla()` 8个字符的十六进制颜色。
- 不支持 `currentColor`单位。
- `rgb(a,b,c)` 或 `rgba(a,b,c,d)` 的性能比其他颜色格式差很多，请选择合适的颜色格式。
:::

### 颜色关键字列表

| 颜色名 | 十六进制RGB值 |
| --- | --- |
| black | #000000 |
| silver | #C0C0C0 |
| gray | #808080 |
| white | #FFFFFF |
| maroon | #800000 |
| red | #FF0000 |
| purple | #800080 |
| fuchsia | #FF00FF |
| green | #008000 |
| lime | #00FF00 |
| olive | #808000 |
| yellow | #FFFF00 |
| navy | #000080 |
| blue | #0000FF |
| teal | #008080 |
| aqua | #00FFFF |
| aliceblue | #F0F8FF |
| antiquewhite | #FAEBD7 |
| aqua | #00FFFF |
| aquamarine | #7FFFD4 |
| azure | #F0FFFF |
| beige | #F5F5DC |
| bisque | #FFE4C4 |
| black | #000000 |
| blanchedalmond | #FFEBCD |
| blue | #0000FF |
| blueviolet | #8A2BE2 |
| brown | #A52A2A |
| burlywood | #DEB887 |
| cadetblue | #5F9EA0 |
| chartreuse | #7FFF00 |
| chocolate | #D2691E |
| coral | #FF7F50 |
| cornflowerblue | #6495ED |
| cornsilk | #FFF8DC |
| crimson | #DC143C |
| cyan | #00FFFF |
| darkblue | #00008B |
| darkcyan | #008B8B |
| darkgoldenrod | #B8860B |
| darkgray | #A9A9A9 |
| darkgreen | #006400 |
| darkgrey | #A9A9A9 |
| darkkhaki | #BDB76B |
| darkmagenta | #8B008B |
| darkolivegreen | #556B2F |
| darkorange | #FF8C00 |
| darkorchid | #9932CC |
| darkred | #8B0000 |
| darksalmon | #E9967A |
| darkseagreen | #8FBC8F |
| darkslateblue | #483D8B |
| darkslategray | #2F4F4F |
| darkslategrey | #2F4F4F |
| darkturquoise | #00CED1 |
| darkviolet | #9400D3 |
| deeppink | #FF1493 |
| deepskyblue | #00BFFF |
| dimgray | #696969 |
| dimgrey | #696969 |
| dodgerblue | #1E90FF |
| firebrick | #B22222 |
| floralwhite | #FFFAF0 |
| forestgreen | #228B22 |
| fuchsia | #FF00FF |
| gainsboro | #DCDCDC |
| ghostwhite | #F8F8FF |
| gold | #FFD700 |
| goldenrod | #DAA520 |
| gray | #808080 |
| green | #008000 |
| greenyellow | #ADFF2F |
| grey | #808080 |
| honeydew | #F0FFF0 |
| hotpink | #FF69B4 |
| indianred | #CD5C5C |
| indigo | #4B0082 |
| ivory | #FFFFF0 |
| khaki | #F0E68C |
| lavender | #E6E6FA |
| lavenderblush | #FFF0F5 |
| lawngreen | #7CFC00 |
| lemonchiffon | #FFFACD |
| lightblue | #ADD8E6 |
| lightcoral | #F08080 |
| lightcyan | #E0FFFF |
| lightgoldenrodyellow | #FAFAD2 |
| lightgray | #D3D3D3 |
| lightgreen | #90EE90 |
| lightgrey | #D3D3D3 |
| lightpink | #FFB6C1 |
| lightsalmon | #FFA07A |
| lightseagreen | #20B2AA |
| lightskyblue | #87CEFA |
| lightslategray | #778899 |
| lightslategrey | #778899 |
| lightsteelblue | #B0C4DE |
| lightyellow | #FFFFE0 |
| lime | #00FF00 |
| limegreen | #32CD32 |
| linen | #FAF0E6 |
| magenta | #FF00FF |
| maroon | #800000 |
| mediumaquamarine | #66CDAA |
| mediumblue | #0000CD |
| mediumorchid | #BA55D3 |
| mediumpurple | #9370DB |
| mediumseagreen | #3CB371 |
| mediumslateblue | #7B68EE |
| mediumspringgreen | #00FA9A |
| mediumturquoise | #48D1CC |
| mediumvioletred | #C71585 |
| midnightblue | #191970 |
| mintcream | #F5FFFA |
| mistyrose | #FFE4E1 |
| moccasin | #FFE4B5 |
| navajowhite | #FFDEAD |
| navy | #000080 |
| oldlace | #FDF5E6 |
| olive | #808000 |
| olivedrab | #6B8E23 |
| orange | #FFA500 |
| orangered | #FF4500 |
| orchid | #DA70D6 |
| palegoldenrod | #EEE8AA |
| palegreen | #98FB98 |
| paleturquoise | #AFEEEE |
| palevioletred | #DB7093 |
| papayawhip | #FFEFD5 |
| peachpuff | #FFDAB9 |
| peru | #CD853F |
| pink | #FFC0CB |
| plum | #DDA0DD |
| powderblue | #B0E0E6 |
| purple | #800080 |
| red | #FF0000 |
| rosybrown | #BC8F8F |
| royalblue | #4169E1 |
| saddlebrown | #8B4513 |
| salmon | #FA8072 |
| sandybrown | #F4A460 |
| seagreen | #2E8B57 |
| seashell | #FFF5EE |
| sienna | #A0522D |
| silver | #C0C0C0 |
| skyblue | #87CEEB |
| slateblue | #6A5ACD |
| slategray | #708090 |
| slategrey | #708090 |
| snow | #FFFAFA |
| springgreen | #00FF7F |
| steelblue | #4682B4 |
| tan | #D2B48C |
| teal | #008080 |
| thistle | #D8BFD8 |
| tomato | #FF6347 |
| turquoise | #40E0D0 |
| violet | #EE82EE |
| wheat | #F5DEB3 |
| white | #FFFFFF |
| whitesmoke | #F5F5F5 |
| yellow | #FFFF00 |
| yellowgreen | #9ACD32 |