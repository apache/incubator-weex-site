---
title: <video>
type: references
group: Build-in Components
order: 8.25
version: 2.1
---

The video component can be used to embed video content in a Weex page.

## Child Components

A `text` is the only valid type of child component.

## Attributes

* **src**, string. The URL of the video to embed.
* **play-status**, string. Valid options are 'play' | 'pause'. Use it to control video's play status. Default value is `pause`。
* **auto-play**, boolean. Use it to control whether it is playing when the page initialization finished. Defalut value is false.
* **poster**, string, <span class="weex-version">v0.18+ & iOS</span>. Post image URL of this video if any.
* **controls**, string, <span class="weex-version">v0.19+</span>. If set to `nocontrols`, native video component will hide its play-back control panel.

## Styles

* **common styles**. Check out [common styles for components](/wiki/common-styles.html).

## Events

* **start** Triggered when playback state is Playing.
* **pause** Triggered when playback state is Paused.
* **finish** Triggered when playback state is Finished.
* **fail** Triggered when playback state is Failed.

## example

```html
<template>
  <div>
    <video class="video" :src="src" autoplay controls
      @start="onstart" @pause="onpause" @finish="onfinish" @fail="onfail"></video>
    <text class="info">state: {{state}}</text>
  </div>
</template>

<style scoped>
  .video {
    width: 630px;
    height: 350px;
    margin-top: 60px;
    margin-left: 60px;
  }
  .info {
    margin-top: 40px;
    font-size: 40px;
    text-align: center;
  }
</style>

<script>
  export default {
    data () {
      return {
        state: '----',
        src:'http://flv2.bn.netease.com/videolib3/1611/01/XGqSL5981/SD/XGqSL5981-mobile.mp4'
      }
    },
    methods:{
      onstart (event) {
        this.state = 'onstart'
      },
      onpause (event) {
        this.state = 'onpause'
      },
      onfinish (event) {
        this.state = 'onfinish'
      },
      onfail (event) {
        this.state = 'onfinish'
      }
    }
  }
</script>
```
[try it](http://dotwe.org/vue/01d3d27073a471bb234b1a76e130d197)
