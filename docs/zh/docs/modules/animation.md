# animation

`animation` 模块可以用来在组件上执行动画。JS-Animation可以对组件执行一系列简单的变换 (位置、大小、旋转角度、背景颜色和不透明度)。

举个例子，如果有一个 `<image>` 组件，通过动画你可以对其进行移动、旋转、拉伸或收缩等动作。

:::tip
如果需要使用CSS动画，参考 [transition](../styles/common-styles.html#property) 或 [transform](../styles/common-styles.html#transform)。
:::

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

* [示例](http://dotwe.org/vue/2d1b61bef061448c1a5a13eac9624410)

# 文档

## transition

#### transition(ref, options, callback)

* **@ref**，将要执行动画的元素。例如指定动画的元素 ``ref`` 属性为 ``test``，可以通过调用 `this.$refs.test` 来获取元素的引用。
* **@options**，动画参数
  * **`styles`**，设置不同样式过渡效果的键值对，下表列出了所有合法的参数：
    * width
    * height
    * backgroundColor 
    * opacity
    * transformOrigin
    * transform
      * translate/translateX/translateY
      * rotate/rotateX/rotateY
      * perspective
      * scale/scaleX/scaleY
  * **`duration`**，`duration  `(number)：指定动画的持续时间 (单位是毫秒)，默认值是 `0`，表示瞬间达到动画结束状态。
  * **`delay`**，`delay ` (number)：指定请求动画操作到执行动画之间的时间间隔 (单位是毫秒)，默认值是 `0`，表示没有延迟，在请求后立即执行动画。
  * **`needLayout`**，`needLayout` (boolean)：动画执行是否影响布局，默认值是false。
  * **`timingFunction`**，`timingFunction ` (string)：描述动画执行的速度曲线，用于描述动画已消耗时间和动画完成进度间的映射关系。默认值是 `linear`，表示动画从开始到结束都拥有同样的速度。下表列出了所有合法的属性：
    * `linear`:动画从头到尾的速度是相同的
    * `ease-in`:动画速度由慢到快
    * `ease-out`:动画速度由快到慢 
    * `ease-in-out`:动画先加速到达中间点后减速到达终点
    * `cubic-bezier(x1, y1, x2, y2)`:在三次贝塞尔函数中定义变化过程，函数的参数值必须处于 0 到 1 之间。更多关于三次贝塞尔的信息请参阅 [cubic-bezier](http://cubic-bezier.com/) 和 [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)。
* **@callback**，`callback`是动画执行完毕之后的回调函数。在iOS平台上，你可以获取动画执行是否成功的信息。

::: tip @style 中可以做动画的属性
* **`width`**，`width`表示动画执行后应用到组件上的宽度值。如果你需要影响布局，设置`needLayout`为`true`。默认值为`computed width`。
* **`height`**，`height`表示动画执行后应用到组件上的高度值。如果你需要影响布局，设置设置为 `needLayout`为`true`。默认值为`computed width`。
* **`backgroundColor`**，`backgroundColor`动画执行后应用到组件上的背景颜色，默认值为computed backgroundColor。
* **`opacity`**，`opacity`表示动画执行后应用到组件上的不透明度值，默认值为computed opacity。
* **`transformOrigin`**，`transformOrigin`定义变化过程的中心点，如`transformOrigin: x-axis y-axis` 参数 `x-axis` 可能的值为 `left`、`center`、`right`、长度值或百分比值，参数 `y-axis` 可能的值为 `top`、`center`、`bottom`、长度值或百分比。默认值为`center center`。
* **`transform`**，`transform`变换类型，可能包含rotate`，`translate`，`scale`及其他属性。默认值为空。
  * `translate`/`translateX`/`translateY`指定元素要移动到的位置。单位是长度或百分比，默认值是0.
  * `rotate`/`rotateX`/`rotateY`**v0.16+** 指定元素将被旋转的角度。单位是度 *角度度*，默认值是0
  * `scale`/`scaleX`/`scaleY`按比例放大或缩小元素。单位是数字，默认值是1
  * `perspective`**v0.16+** 观察者距离z=0平面的距离，在**Android 4.1**及以上有效。单位值数字，默认值为正无穷。
:::

:::tip
* iOS上可以获取 animation 是否执行成功的信息，callback中的`result`参数会有两种，分别是是`Success`与`Fail`。
* Android 的callback 函数不支持result参数。
:::
