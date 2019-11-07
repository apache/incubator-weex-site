# &lt;slider&gt;

## 简介

Slider 组件用于在一个页面中展示多个图片，在前端这种效果被称为轮播图。默认的轮播间隔为3秒。

## 子组件

支持任意类型的 Weex 组件作为其子组件。你也可以放置一个 `indicator` 组件用于显示轮播指示器。`indicator` 也只能作为 `Slider` 的子组件使用。`indicator` 不能再包含其它子组件了。

## 属性

* **auto-play**, boolean. 组件渲染完成时，是否自动开始播放，默认为 false.
* **interval**, number（ms）. 轮播间隔，默认为 3000ms。
* **index**, number. 设置显示slider的第几个页面。
* **offset-x-accuracy**, number. 控制 `onscroll` 事件触发的频率，默认值为10，表示两次 `onscroll` 事件之间滚动容器至少滚动了10px。将该值设置为较小的数值会提高滚动事件采样的精度，但同时也会降低页面的性能。
* **show-indicators**, boolean. 是否显示指示器。尽管`show-indicator`的默认值是true，本属性只有在slider下包含 [`<indicator>`](indicator.html) 时才有意义。
* **infinite**, boolean. 设置是否可以无限轮播，默认为 true。
* **scrollable**, boolean. 设置是否可以通过滑动手势来切换页面，默认为 true。
* **keep-index**, boolean, <Badge text="Android" type="warning"/>. 设置轮播器中的数据发生变化后是否保持变化前的页面序号。
* **forbid-slide-animation**, boolean, <Badge text="v0.20+ & iOS" type="warning"/>. iOS 平台默认支持动画，使用该属性可以强制关闭切换时的动画。

## 样式

* **通用样式** 支持所有[通用样式](../styles/common-styles.html)。

## 事件

* **通用事件** 支持所有[通用事件](../events/common-events.html)。
* **change** 当轮播索引改变时，触发该事件。该事件给前端的参数中含有 `index`表示当前切换到的序号。
* **scroll** 列表发生滚动时将会触发该事件。在参数中有 `offsetXRatio`，它表示当前图片偏移的比率，取值范围是 [-1, 1]。负值表示当前图片向左滑，正值表示向右划。比如 -0.2 表示当前图片向左滑，并且有 20% 的区域超出了容器边缘。

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
* [示例](http://dotwe.org/vue/0c43ffd743c90b3bd9f5371062652e60)
* [滚动事件示例](http://dotwe.org/vue/00aff16c6c1c9e9c1209d2db70b94b24)
* [自动播放和indicator示例](http://dotwe.org/vue/7c9c0f5cc6e4571a962b8f0cf627fab3)
* [Ocean示例](http://dotwe.org/vue/c851d5fe09e54709a6128dbc5bf74a6e)

## Rax 示例

`rax-slider` 是 `<slider>` 组件的上层封装，抹平了 Web 和 Weex 的展现

```jsx
import { createElement, Component, render, createRef } from 'rax';
import View from 'rax-view';
import Image from 'rax-image';
import Slider from 'rax-slider';
import Driver from 'driver-universal';

const App  = () => {
  const handleChange = (idx) {
    console.log('change to ', idx);
  }

  return (
    <View>
      <Slider
        className="slider"
        width="750"
        height="500"
    autoPlay
        onChange={handleChange}
      >
        <View style={styles.itemWrap}>
          <Image style={styles.image} source={{height: 500, width: 375, uri: '//gw.alicdn.com/tfs/TB19NbqKFXXXXXLXVXXXXXXXXXX-750-500.png'}} />
        </View>
        <View style={styles.itemWrap}>
          <Image style={styles.image} source={{height: 500, width: 375, uri: '//gw.alicdn.com/tfs/TB1tWYBKFXXXXatXpXXXXXXXXXX-750-500.png'}} />
        </View>
        <View style={styles.itemWrap}>
          <Image style={styles.image} source={{height: 500, width: 375, uri: '//gw.alicdn.com/tfs/TB1SX_vKFXXXXbyXFXXXXXXXXXX-750-500.png'}} />
        </View>
      </Slider>
    </View>
  );
}

render(<App />, document.body, { driver: Driver });
```

[rax-slider 文档](https://rax.js.org/docs/components/slider)

