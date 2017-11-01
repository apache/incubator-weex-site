---
title: <refresh>
type: references
group: Build-in Components
order: 8.09
version: 2.1
---

# &lt;refresh&gt;

### <span class="weex-version">v0.6.1+</span>

The `<refresh>` Component provide a pulldown-refresh function for some special containers, its usage and attributes are similar to the `<loading>` Component.
> **Note：** To be rendered properly, the `<refresh>` Component must appear inside the special Component such as `<scroller>`、`<list>`、`<hlist>`、`<vlist>`、`<waterfall>`.

 - Simple example :

```
<list>
  <refresh>
    ...
  </refresh>
  ...
</list>
```
 - Complete example goes [here](http://dotwe.org/vue/26937c1c74022e79608af118b21bfbc7)

## Child Components

 - Any other components, like the `<text>` and `<image>` components, can be put inside the refresh component.

 - `<loading-indicator>`: There is a special Component named loading-indicator used only inside the `<refresh>` or the `<loading>` Components, which implemented with default animation effect for the refresh component.

 - Simple example :

```
<refresh>
  <text>Refreshing</text>
  <loading-indicator></loading-indicator>
  ...
</refresh>
```
 - Complete example goes [here](http://dotwe.org/vue/26937c1c74022e79608af118b21bfbc7)

## Attributes

 - Support all common attributes, check out [common attributes](../common/common-attrs)

| Attribute      | Type     | Value            | Default Value     |
| ------------- | ------ | -------------------------- | ------- |
| `display` | String | show / hide             | show      |

#### `display`

 - `show`：If a `<loading-indicator>` Component is included in the `<refresh>` Component, it will display and start the animation.

 - `hide`：Collapse the refresh view. If a `<loading-indicator>` Component is included in the `<refresh>` Component, it will hide and stop the animation.

> **Note：** The display and hide of `<refresh>` Components can only be controlled by an attribute named `display` which has the value of show and hide.

 - Simple example :

```
<template>
  <list>
    <refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
      ...
    </refresh>
    ...
  </list>
</template>

<script>
  ...
  methods: {
    onrefresh (event) {
      this.refreshing = true
      setTimeout(() => {
        this.refreshing = false
      }, 2000)
    },
  }
</script>
```
 - Complete example goes [here](http://dotwe.org/vue/26937c1c74022e79608af118b21bfbc7)

## Styles

 - Support all common styles, check out [common styles](../common/common-style)

## Events

### `onrefresh`

 - Triggered when the scroller or list has been pulled down.

### `onpullingdown` <span class="weex-version">v0.6.1+</span>

 - Triggered when the scroller or list has been pulled down. you can get `dy`, `pullingDistance`, `viewHeight` and `type` from onpullingdown `event` object :

  - `dy` : The offset between two scroll actions
  - `pullingDistance` : The distance of pulling
  - `viewHeight` : The height of refreshView
  - `type` : "pullingdown" constant string type for this event


 - Simple example :

```
<scroller>
  <refresh @refresh="onrefresh" @pullingdown="onpullingdown">
    ...
  </refresh>
  ...
</scroller>

<script>
  export default {
    methods: {
      onrefresh (event) {
        ...
      },
      onpullingdown (event) {
        console.log("dy: " + event.dy)
        console.log("pullingDistance: " + event.pullingDistance)
        console.log("viewHeight: " + event.viewHeight)
        console.log("type: " + type)
      }
    }
  }
</script>
```
 - Complete example goes [here](http://dotwe.org/vue/26937c1c74022e79608af118b21bfbc7)

## Usage Notes

 - On the Android platform, it is not allowed for the refresh view to be pushed back when it is been pulling down or its onrefresh event is tiggered, while it is allow as for iOS platform and HTML5.

## Examples

 - Complete example goes [here](http://dotwe.org/vue/26937c1c74022e79608af118b21bfbc7)
