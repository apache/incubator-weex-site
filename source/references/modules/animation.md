---
title: animation
type: references
order: 9.01
version: 2.1
---

# Animation

## Overview

The `animation` module is used to perform animation on components. 

JS-Animation can perform a series of simple transformations  (position, size, rotation, background color, and opacity) on the component with Javascript.

For example, if you have a `image` component, you can move, rotate, grow, or shrink it by animation.

> **Note:** Ref [transition](../../wiki/common-styles.html#property) if you want to use CSS animation.

## Basic Usage

### animation.transition(ref, options, callback)

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

## Attributes

### ``ref``

The element that will be animated.

For example, if the value of `ref` for an element is `test`, you can start an animation with `this.$refs.test`.

### ``options``

- `styles` (object): Specify the names and values of styles to which a transition effect should be applied. The supported styles are listed in the following table:        

  | name            | description                              | value type            | default value   |
  | :-------------- | :--------------------------------------- | :-------------------- | :-------------- |
  | width           | The width applied to the component after the animation finished. Set `needLayout` to true if you want the change to be persistence. | length                | computed width            |
  | height          | The height applied to the component after the animation finished. Set `needLayout` to true if you want the change to be persistence. | length                | computed height            |
  | backgroundColor | The background color applied to the component after the animation finished. | string                | computed backgroundColor            |
  | opacity         | The opacity applied to the component after the animation finished. | number between 0 to 1 | computed opacity             |
  | transformOrigin | The pivot of transition. The possible values for `x-aris` are `left`/`center`/`right`/length or percent, and possible values of `y-axis` are `top`/`center`/`bottom`/ length or percent | `x-axis y-axis`       | `center center` |
  | **transform**   | Transform object, which may include `rotate`, `translate`, `scale` and etc. | object                | none            |

  * The following table illustrate the detail of ``transform``.

    | name                                     | description                              | value type       | default value     |
    | :--------------------------------------- | :--------------------------------------- | :--------------- | :---------------- |
    | translate/translateX/translateY          | Specifies the location which the element will be translated to. | pixel or percent | 0       |
    | rotate/rotateX <span class="api-version">v0.14+</span> /rotateY <span class="api-version">v0.14+</span> | Specifies the angle of which the element will be rotated, the unit is degree. | number           | 0              |
    | perspective <span class="api-version">v0.16+</span> | 3D perspective. The distance between the z=0 plane and the user. Supported for **Android 4.1** and above. | number           | positive infinity |
    | scale/scaleX/scaleY                      | Stretch or shrink the element.           | number           | 1             |

- `duration` (number): Specify the duration of animation execution, the default value is `0`, meaning that the component get the desired property immediately.    
- `delay` (number): Specify the waiting time before the animation starts. The default value is `0`.   
- `needLayout`(boolean)：Whether the change to layout(width/height/etc..) is persistence and takes affect after the animation. Default value is `false`
- `timingFunction` (string): Used to describe how the intermediate values are calculated for the CSS properties being affected by the animation effect. default value is `linear`, the supported values are listed in the following table:    

  | name                           | description                              |
  | :----------------------------- | :--------------------------------------- |
  | `linear`                       | Specifies a transition effect with the same speed from start to end |
  | `ease`                         | Specifies a transition effect with a slower and slower speed |
  | `ease-in`                      | Specifies a transition effect with a slow start |
  | `ease-out`                     | Specifies a transition effect with a slow end |
  | `ease-in-out`                  | Specifies a transition effect with a slow start and end |
  | `cubic-bezier(x1, y1, x2, y2)` | Define your own values in the cubic-bezier function. Possible values are parameter values from 0 to 1. More information about cubic-bezier please visit [cubic-bezier](http://cubic-bezier.com/) and [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). |

### ``callback``

Callback is a function called after the completion of animation. In iOS platform, you can use function to get information of animation execution.

>**Note: after WeexSDK0.16.0, in iOS platform can get animation's message about completion, there are two types of parameters with `result`, is `Success`and `Fail`, Android can not support until now.**

> **Note: Android doesn't support the result parameter.**

### Example
- [animation demo](http://dotwe.org/vue/2d1b61bef061448c1a5a13eac9624410)
