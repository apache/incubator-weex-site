# &lt;textarea&gt;

## 简介

`<textarea>` 与 [`<input>`](./input.md) 组件类似，可用于接受用户输入数据。`<textarea>` 支持多行文本输入。 `<textarea>` 支持 `<input>` 支持的所有的属性、样式和事件。


## 子组件

`<textarea>` 不支持子组件。

## 属性

除了支持 `input` 支持的所有属性外，`textarea` 还支持 `row` 属性，用于指定输入的行数。

* **row**, number, 默认值为2。

## 样式

#### 通用样式

* 支持所有[通用样式](../styles/common-styles.html)。

#### 伪类样式

* **active**
* **disabled**
* **enbaled**
* **focus**

`active` 和 `focus` 的区别在于，当光标位于输入框里时，它就是 focus 状态，而只有触摸输入框时它才是 active 的状态。

#### 文本样式

* 请参考[文本样式](../styles/text-styles.html)

## 事件

* **通用事件** 支持所有[通用事件](../events/common-events.html)。
* **input**. 当输入状态时，会不断触发。
  * @param value: 当前文本。
* **change**. 当用户完成了输入时触发。
  * @param value: 当前文本。
* **focus**. 当输入框获得焦点时触发。
* **blur**. 当输入框失去焦点时触发。
* **return**. 当用户点击了“回车”按钮时触发，会返回此时“回车”按钮的动作类型。
  * @param value: 当前文本。
  * @param returnKeyType, "default" | "go" | "next" | "search" | "send" | "done".
* **keyboard**. 当键盘弹起或收起时触发。
  * @param isShow: boolean, 显示或隐藏键盘。
  * @param keyboardSize: 键盘的高度，以前端使用的样式单位返回。

## 示例

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

* [示例](http://dotwe.org/vue/a1877866e8b91ffa1e6ea9bc66c200fa)
* [事件示例](http://dotwe.org/vue/2ba8ebc4e6970e1e86725c3e80296e40)
* [绑定示例](http://dotwe.org/vue/d884b0c18891a05d653253c0f0a94bc1)
