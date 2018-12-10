---
title: <slider>
type: references
group: 内置组件
order: 8.21
version: 2.1
---

Slider 组件用于在一个页面中展示多个图片，在前端这种效果被称为轮播图。默认的轮播间隔为3秒。

## 子组件

支持任意类型的 Weex 组件作为其子组件。你也可以放置一个 `indicator` 组件用于显示轮播指示器。`indicator` 也只能作为 `Slider` 的子组件使用。

## 属性

* **auto-play**, boolean. 组件渲染完成时，是否自动开始播放，默认为 false.
* **interval**, number（ms）. 轮播间隔，默认为 3000ms。
* **index**, number. 设置显示slider的第几个页面。
* **offset-x-accuracy**, number. 控制 `onscroll` 事件触发的频率，默认值为10，表示两次 `onscroll` 事件之间滚动容器至少滚动了10px。将该值设置为较小的数值会提高滚动事件采样的精度，但同时也会降低页面的性能。
* **show-indicators**, boolean. 是否显示指示器。
* **infinite**, boolean. 设置是否可以无限轮播，默认为 true。
* **scrollable**, boolean. 设置是否可以通过滑动手势来切换页面，默认为 true。
* **keep-index**, boolean, <span class="api-version">Android</span>. 设置轮播器中的数据发生变化后是否保持变化前的页面序号。
* **forbid-slide-animation**, boolean, <span class="api-version">v0.7+ & iOS</span>. iOS 平台默认支持动画，使用该属性可以强制关闭切换时的动画。

## 样式

* **通用样式** 该组件支持所有[通用样式](/cn/wiki/common-styles.html)。

## 事件

* **通用事件** 支持所有[通用事件](/cn/wiki/common-events.html)。
* **change** 当轮播索引改变时，触发该事件。
* **scroll**, <span class="api-version">v0.11+</span> 列表发生滚动时将会触发该事件。

## 示例
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
[try it](http://dotwe.org/vue/0c43ffd743c90b3bd9f5371062652e60)
