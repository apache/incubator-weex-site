# &lt;video&gt;

## 简介

Video 组件用于在页面中嵌入视频内容。

## 子组件

`text` 是唯一合法的子组件。

## 属性

* **src**, string. 内嵌的视频指向的URL。
* **play-status**, string. 可选值为 `play` | `pause`，用来控制视频的播放状态，`play` 或者 `pause`，默认值是 `pause`。
* **auto-play**, boolean. 当页面加载初始化完成后，用来控制视频是否立即播放，默认值是 `false`。
* **poster**, string, <Badge text="v0.18+ & iOS" type="warning"/>. 指定视频首图的图片链接。
* **controls**, string, <Badge text="v0.19+" type="warning"/>. 可选值为  `controls` | `nocontrols`，控制视频播放组件是否显示回放控制面板，默认会显示，当指定为 `nocontrols` 时不显示回放控制面板。

## 样式

* **通用样式** 支持所有[通用样式](../styles/common-styles.html)。

## 事件

* **start** 当 playback 的状态是 Playing 时触发。
* **pause** 当 playback 的状态是 Paused 时触发。
* **finish** 当 playback 的状态是 Finished 时触发。
* **fail** 当 playback 状态是 Failed 时触发。

## 示例

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
* [示例](http://dotwe.org/vue/01d3d27073a471bb234b1a76e130d197)
* [自动播放示例](http://dotwe.org/vue/342d32830f51f72df6acab21fb1c21bd)
* [手动控制示例](http://dotwe.org/vue/7bdf54dce22def3d3850f65d95f5eac9)