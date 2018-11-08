# &lt;video&gt;

`<video>` 组件可以让我们在 Weex 页面中嵌入视频内容。**该组件只包含基础视频播放能力，如需复杂能力，建议自行实现。**

::: warning
- `<video>` 需要显式的设置其宽高样式，否则在 App 中无法渲染。
:::

```html
<template>
  <div>
    <video class="video" :src="src" auto-play="true" @pause="onpause" controls="true"></video>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        src:'http://7xodnm.com1.z0.glb.clouddn.com/03000A01005A5363D9CB5F514325B3E6018933-6359-951A-945C-0D482B330E2A.mp4'
      }
    }
  }
</script>

<style scoped>
  .video {
    width: 630px;
    height: 350px;
  }
</style>
```

## 子组件

`<video>` 不支持子组件。

## 属性

| 参数        | 说明                | 类型   | 默认值 |
| ---------- | -------------      | -----  | ----- |
| `src` | 内嵌的视频指向的 URL | string | - |
| `play-status` | 可选值为 `play`/`pause`，用来控制视频的播放状态 | string | pause |
| `auto-play` | 当页面加载初始化完成后，用来控制视频是否立即播放 | boolean | false |

::: warning
部分浏览器禁止页面自动播放视频或音频，`auto-play` 属性在这些浏览器中将会失效。建议为 `<video>` 组件添加 `controls="true"` 的属性，该属性是 W3C 标准属性，在浏览器中生效，将显示 video 元素控制栏。
:::

## 事件

- `start`: 当开始播放或从暂停状态继续播放时触发，事件回调参数为标准 `Event` 对象。
- `pause`: 当暂停播放时触发，事件回调参数为标准 `Event` 对象。
- `finish`: 当播放结束后触发，事件回调参数为标准 `Event` 对象。
- `fail`: 当播放失败时触发，事件回调参数为标准 `Event` 对象。

## Demo

- [自动播放](http://dotwe.org/vue/342d32830f51f72df6acab21fb1c21bd)
- [手动控制播放状态](http://dotwe.org/vue/7bdf54dce22def3d3850f65d95f5eac9)

  <IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1rqI5n9zqK1RjSZPxXXc4tVXa-750-1334.gif" />