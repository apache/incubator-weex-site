# &lt;slider&gt;

## Summary

A slide's player to show slides (mostly pictures) one page by another. The default interval between two slides is 3 seconds.

## Child Components

It supports all kinds of weex components as its slides. The `indicator` component should be only used as a child component of `slider`. An `indicator` cannot have any sub component.

## Attributes

* **auto-play**, boolean. This value determines whether the slides plays automatically after the page rendering finished. The default value is false.
* **interval**, number in millisecond. This value determines time interval for each page displayed in slider.
* **index**, number. This value determines the  index of current shown slide. The default value is 0.
* **offset-x-accuracy**, number. Set the scroll event trigger precision, precision value represents the rolling distance of a page width ratio.
* **show-indicators**, boolean. Set whether to display indicator.
* **infinite**, boolean. Set whether the page in the slider can be scrolled. The default value is true.
* **scrollable**, boolean. Set whether slider pages can be switched by sliding gestures. The default value is true.
* **keep-index**, boolean, <span class="api-version">Android</span>. Set whether to maintain the index of the page after the data changes.
* **forbid-slide-animation**, boolean, <span class="api-version">v0.20+ & iOS</span>. On iOS animation is enabled by default, and here we provide this attribute to shutdown animation on iOS.

## Styles

* **common styles**. Check out [common styles for components](../styles/common-styles.html).

## Events

* **common events**. Check out the [common events](../events/common-events.html).
* **change**. Triggerd when the slide's index is changed. The event object contains the attribute of `index`, which is the index number of the currently shown slide.
* **scroll**, <span class="api-version">v0.11+</span>. This event is fired when scrolling. The current `offsetXRatio` value is given in this event callback. And `offsetXRatio` means the current slide offset ratio which value range is [-1, 1]. Negative value means the slide is shifted to left and positive value means to right. For example, -0.2 means 20% of the current slide is slided beyonds left border of the slider.

## Example
```html
<template>
  <div>
    <slider class="slider" interval="3000" auto-play="true">
      <div class="frame" v-for="img in imageList">
        <image class="image" resize="cover" :src="img.src"></image>
      </div>
    </slider>
  </div>
</template>

<style scoped>
  .image {
    width: 700px;
    height: 700px;
  }
  .slider {
    margin-top: 25px;
    margin-left: 25px;
    width: 700px;
    height: 700px;
    border-width: 2px;
    border-style: solid;
    border-color: #41B883;
  }
  .frame {
    width: 700px;
    height: 700px;
    position: relative;
  }
</style>

<script>
  export default {
    data () {
      return {
        imageList: [
          { src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
          { src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
          { src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'}
        ]
      }
    }
  }
</script>
```
* [Demo](http://dotwe.org/vue/0c43ffd743c90b3bd9f5371062652e60)
* [Demo of setting scroll event](http://dotwe.org/vue/00aff16c6c1c9e9c1209d2db70b94b24)
* [Demo of auto-play with indicator](http://dotwe.org/vue/7c9c0f5cc6e4571a962b8f0cf627fab3)
* [Demo Ocean](http://dotwe.org/vue/c851d5fe09e54709a6128dbc5bf74a6e)
