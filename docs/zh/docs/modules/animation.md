# animation

`animation` 模块用来在组件上执行动画。可以对组件执行一系列简单的变换 (位置、大小、旋转角度、背景颜色和不透明度)。

```vue
<template>
  <div class="wrapper">
    <div ref="test" class="box"></div>
  </div>
</template>
<script>
  const animation = weex.requireModule('animation')
  export default {
    mounted() {
      animation.transition(this.$refs.test, {
        styles: {
          height: '100px'
        },
        duration: 800, //ms
        timingFunction: 'ease',
        delay: 100 //ms
      })
    }
  }
</script>
<style scoped>
  .box {
    width: 250px;
    height: 250px;
    background-color: #DDD;
  }
</style>
```

::: warning 注意
* 涉及动画的需求，建议使用 animation 模块方法。相比于 css 动画 animation 模块方法有更好的兼容性。
:::

## API

### animation.transition(element, options, callback)

**element**：`[必选]`将要执行动画的元素。

```vue
<template>
  <div class="wrapper">
    <div ref="test"></div>
  </div>
</template>
<script>
  export default {
    mounted() {
     // 例如指定动画的元素 element 属性为 test , 可以通过调用 this.$refs.test 来获取元素的引用。
     console.log(this.$refs.test);
    }
  }
</script>
```

**options**：`[必选]`指定动画参数
- styles(object):设置不同样式过渡效果的键值对，下表列出了所有合法的参数：
    | 参数        | 描述              | 值类型   | 默认值 |
    | ---------- | -------------     | -----  | ----- |
    | width|动画执行后应用到组件上的宽度值|number|无|
    | height|动画执行后应用到组件上的高度值|number|无|
    | backgroundColor|动画执行后应用到组件上的背景颜色|string|无|
    | opacity|动画执行后应用到组件上的不透明度值|number|1|
    | transformOrigin|定义变化过程的中心点. 参数 x-aris 可能的值为 left、center、right、长度值或百分比值, 参数 y-axis 可能的值为 top、center、bottom、长度值或百分比值|x-axis y-axis|center center|
    | transform|定义应用在元素上的变换类型，支持的属性请见下方附录部分|object|无|
- duration(number)：指定动画的持续时间 (单位是毫秒)，默认值是 0，表示没有动画效果。
- delay (number)：指定请求动画操作到执行动画之间的时间间隔 (单位是毫秒)，默认值是 0，表示没有延迟，在请求后立即执行动画。如下图，控制不同的间隔可实现特定效果。
<div style="text-align: center"><img src="https://img.alicdn.com/tfs/TB15iA.nVzqK1RjSZSgXXcpAVXa-539-428.gif" width="300"></div>
- needLayout (boolean)：节点动画执行时是否产生布局动画即LayoutAnimation，默认值是false。
    <div style="dispaly:flex;">
      <img src="https://img.alicdn.com/tfs/TB1x74XoirpK1RjSZFhXXXSdXXa-300-320.gif" width="300"/>
      <img src="https://img.alicdn.com/tfs/TB175RXomzqK1RjSZFHXXb3CpXa-300-320.gif" width="300"/>
    </div>
    上图为会影响布局的元素 `height` 变化动画：左侧为浏览器动画，右侧为客户端动画。

    在浏览器上执行动画当布局变化时，会自动将视图运动到它们新的位置上。但客户端 layout 都是独立的，
    布局动画变化时，可能不会影响其他元素。当您的动画不符合您的预期时，可设置此参数，保障三端动画一致。

    请用客户端扫描示例二维码[体验动画差异](http://dotwe.org/vue/45e8b954d93216510782b3b6c0889298)
- timingFunction (string)：描述动画执行的速度曲线，用于使动画变化更为平滑。默认值是 linear，表示动画从开始到结束都拥有同样的速度。下表列出了所有合法的属性：
    | 参数        | 描述              |
    | ---------- | -------------     |
    |linear|动画从头到尾的速度是相同的|
    |ease|动画速度逐渐变慢|
    |ease-in|动画速度由慢到快|
    |ease-out|动画速度由快到慢|
    |ease-in-out|动画先加速到达中间点后减速到达终点|
    |cubic-bezier(x1, y1, x2, y2)|在三次贝塞尔函数中定义变化过程，函数的参数值必须处于 0 到 1 之间。更多关于三次贝塞尔的信息请参阅 cubic-bezier 和 Bézier curve.|

**callback**：`[可选]`是动画执行完毕之后的回调函数。

## Demo
[体验示例](http://dotwe.org/vue/a0f4ed064a6b46a2b8f63ab3843d7aee)

上述示例点击灰色方块后，便可看到操作动画。

[循环动画](http://dotwe.org/vue/97e01e1b7f8992de287b0a690b54511c)

目前 WEEX 没有提供可循环的属性，循环动画可像上述 Demo 在 callback 回调中执行下一次动画形成循环。

### 附录
WEEX transform 支持的对应属性，可以参见下表：

```js
// 注:如果想同时执行多个动画只需要用空格隔开，比如
transform: 'translate(250px, 100px) scale(1.5)'
```
| 参数        | 描述              | 值类型   | 默认值 |
| ---------- | -------------     | -----  | ----- |
|translate/translateX/translateY|指定元素要移动到的位置|像素值或百分比	|无|
|rotate|指定元素将被旋转的角度，单位是度|number|无|
|scale/scaleX/scaleY|按比例放大或缩小元素|number|无|
|rotateX/rotateY 需要 WEEX v0.14+ |指定元素将被旋转的角度，单位是度|number|无|
|perspective 需要 WEEX v0.16+ |观察者距离z=0平面的距离，在Android 4.1及以上有效|number|无|