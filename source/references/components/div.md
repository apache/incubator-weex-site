---
title: <div>
type: references
group: Build-in Components
order: 8.03
version: 2.1
---

# &lt;div&gt;

### Summary

The most fundamental component which is a container to wrap any other components. It supports all the common styles, attributes and layout of flexbox.

alias: `<container>` (deprecated)

### Child Components

This type of component supports all kinds of weex component as its child components including its own kind.

### Attributes

There is no specific attribute for this component.

### Styles

**common styles**: check out the [common styles](/wiki/common-styles.html)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

**common events**: check out the [common events](/wiki/common-events.html)

- support `click` event. Check out [common events](/wiki/common-events.html)
- support `appear` / `disappear` event. Check out [common events](/wiki/common-events.html)

### Examples

```html
<template>
  <div>
    <div class="box"></div>
  </div>
</template>

<style scoped>
  .box {
    border-width: 2px;
    border-style: solid;
    border-color: #BBB;
    width: 250px;
    height: 250px;
    margin-top: 250px;
    margin-left: 250px;
    background-color: #EEE;
  }
</style>
```

[try it](http://dotwe.org/vue/edfbd1806508cb86254b03dc0b8e28ac)

