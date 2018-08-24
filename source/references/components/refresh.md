---
title: <refresh>
type: references
group: Build-in Components
order: 8.10
version: 2.1
---

# &lt;refresh&gt;

### <span class="weex-version">v0.6.1+</span>

The `<refresh>` Component provide a pulldown-refresh function for some special containers, its usage and attributes are similar to the `<loading>` Component.
> **Note：** To be rendered properly, the `<refresh>` Component must appear inside the special Component such as `<scroller>`、`<list>`、`<hlist>`、`<vlist>`、`<waterfall>`.

 - Example:

```
<list>
  <refresh>
    ...
  </refresh>
  ...
</list>
```

 - Complete example goes [here](http://dotwe.org/vue/b9fbd9b7a0b0aaa46e3ea46e09213539)

## Child Components

 - Any other components, like the `<text>` and `<image>` components, can be put inside the refresh component.

 - `<loading-indicator>`: This is a dedicated component which provides a default refresh animation effect, can only be used inside the `<refresh>` or the `<loading>` components.

 - Example:

```
<refresh>
  <text>Refreshing</text>
  <loading-indicator></loading-indicator>
  ...
</refresh>
```
 - Complete example goes [here](http://dotwe.org/vue/b9fbd9b7a0b0aaa46e3ea46e09213539)

## Attributes

 - Support all common attributes, check out [common attributes](../common/common-attrs)

| Attribute      | Type     | Value            | Default Value     |
| ------------- | ------ | -------------------------- | ------- |
| `display` | String | show / hide             | show      |

#### `display`

 - `show`：The refresh animation will be started if a `<loading-indicator>` is included in the refresh component.

 - `hide`：Collapse the refresh view. It also hides the `<loading-indicator>` and stops the loading animation if there's a `<loading-indicator>` included in the refresh component.

> **Note：** The visibility of `<refresh>` component can be controlled by display attribute with the value show and hide. A `display="show"` should always be paired with a `display="hide"` statement.

 - Example:

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
 - Complete example goes [here](http://dotwe.org/vue/b9fbd9b7a0b0aaa46e3ea46e09213539)

## Styles

 - Please check out the [common styles](/wiki/common-styles.html)

## Events

### `refresh`

 - Triggered when the scroller or list is pulled down.

### `pullingdown` <span class="weex-version">v0.6.1+</span>

 - Triggered when the scroller or list is pulled down. The attributes `dy`, `pullingDistance`, `viewHeight` and `type` are accessible from the `event` object :

  - `dy` : The offset between two scroll actions
  - `pullingDistance` : The distance of pulling
  - `viewHeight` : The height of refreshView
  - `type` : "pullingdown" constant string type for this event


 - Example:

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
 - Complete example goes [here](http://dotwe.org/vue/b9fbd9b7a0b0aaa46e3ea46e09213539)



## Example

 - Complete example goes [here](http://dotwe.org/vue/b9fbd9b7a0b0aaa46e3ea46e09213539)
