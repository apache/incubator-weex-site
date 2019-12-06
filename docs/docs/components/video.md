# Summary
::: danger
You should consider `<video>` as demo purpose, and re-implement it your favourite video library.
:::

The video component can be used to embed video content in a Weex page.

# Child Components

A `text` is the only valid type of child component.

# Attributes

* **src**, string. The URL of the video to embed.
* **play-status**, string. Valid options are 'play' | 'pause'. Use it to control video's play status. Default value is `pause`。
* **auto-play**, boolean. Use it to control whether it is playing when the page initialization finished. Defalut value is false.
* **poster**, string, <Badge text="v0.18+ & iOS" type="warning"/>. Post image URL of this video if any.
* **controls**, string, <Badge text="v0.19+" type="warning"/>. If set to `nocontrols`, native video component will hide its play-back control panel.

# Styles

* **common styles**. support [common styles](../styles/common-styles.html).

# Events

* **start** Triggered when playback state is Playing.
* **pause** Triggered when playback state is Paused.
* **finish** Triggered when playback state is Finished.
* **fail** Triggered when playback state is Failed.

# Vue Example

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
* [Demo](http://dotwe.org/vue/01d3d27073a471bb234b1a76e130d197)
* [Demo of autoplay](http://dotwe.org/vue/342d32830f51f72df6acab21fb1c21bd)
* [Demo of controls](http://dotwe.org/vue/7bdf54dce22def3d3850f65d95f5eac9)

## Rax Example

`rax-video` is the component `<video>` of rax, which can run in web and weex.

```jsx
import { createElement, Component, render } from "rax";
import Video from "rax-video";
import Driver from "driver-universal";

render(
  <Video
    style={{ width: '750rpx', height: '400rpx' }}
    autoPlay
    src="https://cloud.video.taobao.com/play/u/2780279213/p/1/e/6/t/1/d/ld/36255062.mp4"
  />,
  document.body,
  { driver: Driver }
);
```

[rax-video doc](https://rax.js.org/docs/components/video)

