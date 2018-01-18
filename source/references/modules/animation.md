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

> **Note:** Now,Weex only support use animation in Javascript. CSS Animation is different from this,we will soon support CSS Animation.

## Basic Usage

### animation.transition(el, options, callback)

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

## Attributes

### ``el``

An element that will be animated.

For example , specify the `el` attribute for the element you want to animated as `element`, so you can get this element by calling `this.refs.element`.

### ``options``

- `styles` (object): Specify the names and values of styles to which a transition effect should be applied. The allowed attributes are listed in the following table:        

| name            | description                              | value type            | default value   |
| :-------------- | :--------------------------------------- | :-------------------- | :-------------- |
| width           | The width applied to the component after the animation finished. | length                | none            |
| height          | The height applied to the component after the animation finished. | length                | none            |
| backgroundColor | The background color applied to the component after the animation finished. | string                | none            |
| opacity         | The opacity applied to the component after the animation finished. | number between 0 to 1 | `1`             |
| transformOrigin | The povit of transition. The possible values for `x-aris` are `left`/`center`/`right`/length or percent, and possible values of `y-axis` are `top`/`center`/`bottom`/ length or percent | `x-axis y-axis`       | `center center` |
| **transform**   | Transform function to be applied to the element. The properties in the following table are supported | object                | none            |

``transform`` also have many parameters,please see the table below.

| name                                     | description                              | value type       | default value     |
| :--------------------------------------- | :--------------------------------------- | :--------------- | :---------------- |
| translate/translateX/translateY          | Specifies the location of which the element will be translated to. | pixel or percent | none              |
| rotate/rotateX <span class="api-version">v0.14+</span> /rotateY <span class="api-version">v0.14+</span> | Specifies the angle of which the element will be rotated, the unit is degree. | number           | none              |
| perspective <span class="api-version">v0.16+</span> | The distance between the z=0 plane and the user in order to give to the 3D-positioned element some perspective. Supported for Android 4.1 and above. | number           | positive infinity |
| scale/scaleX/scaleY                      | Stretch or shrink the element.           | number           | none              |

- `duration` (number): Specifies the number of milliseconds of animation execution, the default value is `0`, means that no animation will occur.    
- `delay` (number): Specifies the amount of milliseconds to wait between a change being requested to a property that is to be transitioned and the start of the transition effect. The default value is `0`.   
- `needLayout`(boolean)：Whether or not the layout animation occurs when animation is executed，default value is `false`
- `timingFunction` (string): Used to describe how the intermediate values of the styles being affected by a transition effect are calculated, default value is `linear`, the allowed attributes are listed in the following table:    

| name                           | description                              |
| :----------------------------- | :--------------------------------------- |
| `linear`                       | Specifies a transition effect with the same speed from start to end |
| `ease`                         | Specifies a transition effect with a slower and slower speed |
| `ease-in`                      | Specifies a transition effect with a slow start |
| `ease-out`                     | Specifies a transition effect with a slow end |
| `ease-in-out`                  | Specifies a transition effect with a slow start and end |
| `cubic-bezier(x1, y1, x2, y2)` | Define your own values in the cubic-bezier function. Possible values are parameter values from 0 to 1. More information about cubic-bezier please visit [cubic-bezier](http://cubic-bezier.com/) and [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). |

### ``callback``

Callback which is a function called after the completion of animation. In iOS platform, you can use function to get animation processing's information.

>**Note: after WeexSDK0.16.0, in iOS platform can get animation's message about completion, there are two types of parameters with `result`, is `Success`and `Fail`, Android can not support until now.**

### Example
- [animation demo](http://dotwe.org/vue/2d1b61bef061448c1a5a13eac9624410)
