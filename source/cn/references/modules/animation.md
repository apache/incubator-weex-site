---
title: animation
type: references
group: 内置模块
order: 9.01
version: 2.1
---

# 动画

## 简介

``animation`` 模块可以用来在组件上执行动画。

JS-Animation可以对组件执行一系列简单的变换 (位置、大小、旋转角度、背景颜色和不透明度)。

举个例子，如果有一个 `<image>` 组件，通过动画你可以对其进行移动、旋转、拉伸或收缩等动作。

> **Note:** 如果需要使用CSS动画，参考 [transition](../../wiki/common-styles.html#property)。


## 基本用法

### animation.transition(erf, options, callback)

```javascript
animation.transition(ref1, {
    styles: {
        backgroundColor: '#FF0000',
        transform: 'translate(250px, 100px)',
    },
        duration: 800, //ms
        timingFunction: 'ease',
        needLayout:false,
        delay: 0 //ms
    }, function () {
        modal.toast({ message: 'animation finished.' })
    })
```

## 属性

### `ref `：

将要执行动画的元素。

例如指定动画的元素 ``ref`` 属性为 ``test`` , 可以通过调用 `this.$refs.test` 来获取元素的引用。

### `options`：

- `styles`(object):设置不同样式过渡效果的键值对，下表列出了所有合法的参数：

  | 参数名             | 描述                                   | 值类型             | 默认值             |
  | --------------- | ---------------------------------------- | ---------- | --------------- |
  | width           | 动画执行后应用到组件上的宽度值。设置为 `needLayout` `true` 如果你需要影响布局。               | length     | computed width               |
  | height          | 动画执行后应用到组件上的高度值。设置为 `needLayout` `true` 如果你需要影响布局。       | length     | computed height              |
  | backgroundColor | 动画执行后应用到组件上的背景颜色                         | string          | computed backgroundColor            |
  | opacity         | 动画执行后应用到组件上的不透明度值                        | computed opacity   | `1`             |
  | transformOrigin | 定义变化过程的中心点. 参数 `x-aris` 可能的值为 `left`、`center`、`right`、长度值或百分比值, 参数 `y-axis` 可能的值为 `top`、`center`、`bottom`、长度值或百分比值 | `x-axis y-axis` | `center center` |
  | transform       | 变换类型，可能包含rotate`, `translate`, `scale`及其他属性。| object| 无 |

  * `transform`支持的字段如下：

    | 名称                                       | 描述                              | 值类型     | 默认值  |
    | ---------------------------------------- | ------------------------------- | ------- | ---- |
    | `translate`/`translateX`/`translateY`    | 指定元素要移动到的位置                     | 像素值或百分比 | 0    |
    | `rotate`                                 | 指定元素将被旋转的角度，单位是度                | number  | 0    |
    | `scale`/`scaleX`/`scaleY`                | 按比例放大或缩小元素                      | number  | 1    |
    | `rotate`/`rotateX` <span class="api-version">v0.14+</span> /`rotateY` <span class="api-version">v0.14+</span> | 指定元素将被旋转的角度，单位是度                | number  | 无    |
    | `perspective` <span class="api-version">v0.16+</span> | 观察者距离z=0平面的距离，在Android 4.1及以上有效 | number  | 正无穷  |

    > (注:如果想同时执行多个动画只需要用空格隔开，比如)
      ```
     transform: 'translate(250px, 100px) scale(1.5)'
      ```

* `duration  `(number)：指定动画的持续时间 (单位是毫秒)，默认值是 `0`，表示瞬间达到动画结束状态。
* `delay ` (number)：指定请求动画操作到执行动画之间的时间间隔 (单位是毫秒)，默认值是 `0`，表示没有延迟，在请求后立即执行动画。
* `needLayout` (boolean)：动画执行是否影响布局，默认值是false。
* `timingFunction ` (string)：描述动画执行的速度曲线，用于描述动画已消耗时间和动画完成进度间的映射关系。默认值是 `linear`，表示动画从开始到结束都拥有同样的速度。下表列出了所有合法的属性：

| 属性名                            | 描述                                       |
| ------------------------------ | ---------------------------------------- |
| `linear`                       | 动画从头到尾的速度是相同的                            |
| `ease`                         | 动画速度逐渐变慢                                 |
| `ease-in`                      | 动画速度由慢到快                                 |
| `ease-out`                     | 动画速度由快到慢                                 |
| `ease-in-out`                  | 动画先加速到达中间点后减速到达终点                        |
| `cubic-bezier(x1, y1, x2, y2)` | 在三次贝塞尔函数中定义变化过程，函数的参数值必须处于 0 到 1 之间。更多关于三次贝塞尔的信息请参阅 [cubic-bezier](http://cubic-bezier.com/) 和 [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). |

### `callback ` 
`callback`是动画执行完毕之后的回调函数。在iOS平台上，你可以获取动画执行是否成功的信息。

  > **注意: 在0.16.0+版本后，iOS上可以获取 animation 是否执行成功的信息，callback中的`result`参数会有两种，分别是是`Success`与`Fail`。**
  
  > **注意: Android 的callback 函数不支持result参数**

## 示例
[animation demo](http://dotwe.org/vue/a6c03edd4c5bbd6caea29cac688269a0)
