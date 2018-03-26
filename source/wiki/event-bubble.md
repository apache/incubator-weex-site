---
title: Event Bubble
type: wiki
group: Event
order: 4.2
version: 2.1
---

<!-- toc -->

<span class="api-version">v0.13+</span>

> **Note:** This feature works only on weex's native platforms (i.e., on Android and iOS), but not on the web with latest [web renderer](https://github.com/weexteam/weex-vue-render) yet.

If you are a web developer, then you are probably familiar with the event bubbling mechanism, and you may expect Weex to work the same way. However, Weex didn't implement this mechiansim util version 0.13.

To those developers who are not familiar with the event bubbling, Here are some explanations about it, and the concept is rather easy.

## Concept

Take clicking as a example. When a click event fired on a `<video>` element that has a parent element (e.g. a parent `div` component), web browsers run two different phases - the capturing phase and the bubbling phase. We use bubbling phase a lot in web development, and use capturing less.

In the capturing phase, The browser checks to see if the element's outer-most ancestor (on web, may be a `<html>`) has an corresponding event handler registered on it, and runs it if so. Then it moves on to the next element inside `<html>` and does the same thing, then the next one, and so on until it reaches the element that was actually clicked on.

In the bubbling phase, the exact opposite occurs: The browser checks to see if the element that was actually clicked on has an onclick event handler registered on it in the bubbling phase, and runs it if so. Then it moves on to the next immediate ancestor element and does the same thing, then the next one, and so on until it reaches the `<html>` element.

![event bubbling concept](https://mdn.mozillademos.org/files/14075/bubbling-capturing.png)

We usually register our event listeners on the bubbling phase, so that we use bubbling a lot. But if you want to turn this off, you can use `stopPropagation` method of the event object. The standard event object has a function available on it called `stopPropagation`, which when invoked on a handler's event object makes it so that handler is run, but the event doesn't bubble any further up the chain, so no more handlers will be run.

Weex implemented this event bubbling phase in the 0.13 SDK, and for the record, the event bubbling phase is not enabled by default - You should use a attribute `bubble=true` on the root element to turn this feature on.

## How To Use

The event bubbling is not enabled by default, you should use `bubble="true"` in the root element to turn it on.

```html
<template>
  <!-- Use it in the root element to turn it on. -->
  <div bubble="true">
    ...
  </div>
</template>
```

## Stop Bubbling

In the event handler function, you can use the `event.stopPropagation()` method to prevent the event from escalating, which is exactly like the event's method with the same name in [DOM standard](https://dom.spec.whatwg.org/#dom-event-stoppropagation). Note that `event.stopPropagation()` differs from `bubble = "true"`, which affects only the current elements and the propagation of parent elements, without affecting the propagation of child elements; the latter is a switching mechanism that is added for compatibility, Will be a global shutdown or open the bubble mechanism, the two can co-exist.

```javascript
{
  handleClick (event) {
    // Stop event propagation.
    event.stopPropagation()
  }
}
```

## Notice

One thing should be noticed: **For compatibility reason, Weex does not turn on event bubbling by default. You need to add `bubble = "true"` on the root element's properties to turn on the bubbling mechanism. Otherwise, Weex will keep working in the old way, without the event bubbling effect.**

## Examples

- [enable event bubbling](http://dotwe.org/vue/fa2957ce3e9eb47ad9ae1da22d845e95): Use Weex playground APP to scan the qr-code, and then click on the middle of the rectangle with a line of text 'click me' on, you can see the event bubbling up, being handled with every listener binding on each div element, printing messages which indicate that they are indeed been reached by the event.

- [stop event propagation](http://dotwe.org/vue/2cc80e19c9b2430fb780234628065a69): Use Weex playground APP to scan the qr-code, and then click on the middle of the rectangle with a line of text 'click me' on, you can see the event bubbling is disturbed, no longer continue to spread to the root element.
