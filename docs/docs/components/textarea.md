---
title: <textarea>
type: references
group: Build-in Components
order: 8.24
version: 2.1
---

# &lt;textarea&gt;
<span class="weex-version">v0.8+</span>


### Summary

The weex builtin component `textarea` is used to create interactive controls to accept data from users. It can be a multi-line [input](./input.html).

**Notes:** `<textarea>` support all event which `<input>` had.

### Child Components

This component supports no child components.

### attributes

The `textarea` component supports all the properties of the `text` component, in addition to the following properties:

- `rows:`&lt;number&gt; a number which can specify the height of textarea, default is `2`.

### Styles

**Pseudo-class**<span class="api-version">v0.9.5+</span>: `textarea` component support the following pseudo-classes:

* `active`
* `focus`
* `disabled`
* `enabled`

**text styles**: checkout [text styles](/wiki/text-styles.html)

- support `color` style.
- support `font-size` style.
- support `font-style` style.
- support `font-weight` style.
- support `text-align` style.


**common styles**: check out [common styles for components](/wiki/common-styles.html)

- support flexbox related styles.
- support box model related styles.
- support ``position`` related styles.
- support ``opacity``, ``background-color`` etc.

### Events

- `input`: the value of an element changes.
- `change`: the change event is fired when a change to the component's value is commited by the user. It always come after a ``blur`` event.
- `focus`: a component has received focus.
- `blur`: a component has lost focus.

**common events**: check out the [common events](/wiki/common-events.html)

- support `appear` / `disappear` event. Check out [common events](/wiki/common-events.html).

**Notes:** `<textarea>` does not support the common-event `click`. Please listen to the `input` or `change` event instead.

### Parameters of events' object

- for ``input`` and ``change`` events:
  - `value`: the value of the component who dispatched this event.
  - `timestamp`: the time stamp of the event.
- for ``focus`` and ``blur`` events:
  - `timestamp`: the time stamp of the event.

### Example

```html
<template>
  <div class="wrapper">
    <textarea class="textarea" @input="oninput" @change="onchange" @focus="onfocus" @blur="onblur"></textarea>
  </div>
</template>

<script>
  const modal = weex.requireModule('modal')

  export default {
    methods: {
      oninput (event) {
        console.log('oninput:', event.value)
        modal.toast({
          message: `oninput: ${event.value}`,
          duration: 0.8
        })
      },
      onchange (event) {
        console.log('onchange:', event.value)
        modal.toast({
          message: `onchange: ${event.value}`,
          duration: 0.8
        })
      },
      onfocus (event) {
        console.log('onfocus:', event.value)
        modal.toast({
          message: `onfocus: ${event.value}`,
          duration: 0.8
        })
      },
      onblur (event) {
        console.log('onblur:', event.value)
        modal.toast({
          message: `input blur: ${event.value}`,
          duration: 0.8
        })
      }
    }
  }
</script>

<style>
  .textarea {
    font-size: 50px;
    width: 650px;
    margin-top: 50px;
    margin-left: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    color: #666666;
    border-width: 2px;
    border-style: solid;
    border-color: #41B883;
  }
</style>
```

[try it](http://dotwe.org/vue/a1877866e8b91ffa1e6ea9bc66c200fa)
