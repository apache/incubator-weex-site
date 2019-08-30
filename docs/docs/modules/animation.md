# animation

The `animation` module is used to perform animation on components. 

JS-Animation can perform a series of simple transformations  (position, size, rotation, background color, and opacity) on the component with Javascript.

For example, if you have a `image` component, you can move, rotate, grow, or shrink it by animation.

One can invoke `animation.transition(ref, options, callback)` to start animation. Ref the following code snippets.
```javascript
animation.transition(test, {
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
* [Demo](http://dotwe.org/vue/2d1b61bef061448c1a5a13eac9624410)

::: warning Only for Android
It may cause crash with exception **Unable to create layer for xxx** if the size ( *width or height* ) of your component with `animation` exceeds the maximum as your component makes the OpenGL memory zone OutOfMemory.

The maximum of the size for your component is device dependent, but you are in the danger zone if the size is bigger than screen's size.
:::

:::tip
Ref [transition](../styles/common-styles.html#property) or [transform](../styles/common-styles.html#transform) if you prefer CSS animation.
:::

# API

## transition

#### transition(ref, options, callback)

* **@ref**, the element that will be animated. For example, if the value of `ref` for an element is `test`, you can start an animation with `this.$refs.test`.
* **@options**, animation properties such as keys, duration.
  * **`styles`**, `styles` specifies the names and values of styles to which a transition effect should be applied. The supported styles are listed below:
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
  * **`duration`**, `duration` *number* specifies the duration of animation execution, the default value is `0`, meaning that the component get the desired property immediately.
  * **`delay`**, `delay` *number* specifies the waiting time before the animation starts. The default value is `0`. 
  * **`needLayout`**, `needLayout` *boolean* Specifies whether the change to layout(width/height/etc..) is persistence and takes affect after the animation. Default value is `false`
  * **`timingFunction`**, `timingFunction` *string* describes how the intermediate values are calculated for the CSS properties being affected by the animation effect. default value is `linear`, the supported values are listed in the following:
    * `linear`: Specify a transition effect with the same speed from start to end.
    * `ease-in`: Specify a transition effect with a slow start and fast end.
    * `ease-out`: Specify a transition effect with a fast start and slow end.
    * `ease-in-out`: Specify a transition effect with a slow start, fast intermediate and slow end.
    * `cubic-bezier(x1, y1, x2, y2)`: Define your own values in the cubic-bezier function. Possible values are parameter values from 0 to 1. More information about cubic-bezier please visit [cubic-bezier](http://cubic-bezier.com/) and [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)

* **@callback**, callback is a function called after the completion of animation. In iOS platform, you can use function to get information of animation execution.

::: tip
* On iOS platform you can get animation's message about completion, there are two types of parameters with `result`, is `Success`and `Fail`, Android can not support until now.
* Android doesn't support the result parameter.
:::

#### Animated properties in styles
* **`width`**, the `width` applied to the component after the animation finished. Set `needLayout` to true if you want the change to be persistence. The default value is `computed width`.support `wx` as unit.
* **`height`**, the `height` applied to the component after the animation finished. Set `needLayout` to true if you want the change to be persistence. The default value is `computed height`.support `wx` as unit.
* **`backgroundColor`**, the `backgroundColor` applied to the component after the animation finished. The default value is `computed backgroundColor`.
* **`opacity`**, the `opacity` applied to the component after the animation finished. The default value is `computed opacity`.
* **`transformOrigin`**, the `transformOrigin` indicate the pivot of the element being animated. The possible values for `x-axis` are `left`/`center`/`right`/length or percent, and possible values of `y-axis` are `top`/`center`/`bottom`/ length or percent. The default value is `center center`.
* **`transform`**, transform object, which may include `rotate`, `translate`, `scale` and etc. The detail of  transform is illustrated below.
  * `translate/translateX/translateY`: Specify the location which the element will be translated to.The unit is number or percent and the default value is 0.support `wx` as unit.
  * `rotate/rotateX/rotateY`**v0.14+**: Specify the angle of which the element will be rotated. The unit is **degree** and the default value is 0.
  * `perspective`**v0.16+**: The distance between the z=0 plane and the user. Supported for **Android 4.1** and above. The unit is number and the default value is positive infinity.
  * `scale/scaleX/scaleY`: Stretch or shrink the element. The unit is number and the default value is 1.
:::


