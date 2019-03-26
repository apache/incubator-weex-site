# &lt;textarea&gt;

## Summary

`textarea` is used to create interactive controls to accept keyboard input from users. It can be a multi-line [input](./input.html). `<textarea>` supports all attributes, styles and events that `<input>` supports.

## Child Components

No child should be added to a `textarea`.

## Attributes

The `textarea` component supports all the properties of the `input` component. Besides, it support the `row` attributes.

* **row**, number, default is 2. Specify the rows of a textarea.

## Styles

#### Common styles

* Checkout [common styles](../styles/common-styles.html).

#### Pseudo-class styles

* **active**
* **disabled**
* **enbaled**
* **focus**

The difference between `active` and `focus` is that when the cursor is inside the input, it is focused. While only when you touch down the input, it is in active status.

#### Text styles

* Checkout [text styles](../styles/text-styles.html)

## Events

* **common events**. support [common events](../events/common-events.html).
* **input**. Fired when the text is being changed.
	* @param value: current text of the input.
* **change**. Fired when the user finished and make a commit.
	* @param value: current text of the input.
* **focus**. Fired when the input become focused.
* **blur**. Fired when the input lost focus.
* **return**. Fired when return key is pressed.
	* @param value: current text of the input.
	* @param returnKeyType, "default" | "go" | "next" | "search" | "send" | "done".
* **keyboard**. Fired when keyborad is shown or hidden.
	* @param isShow: boolean, showing or hiding the keyboard.
	* @param keyboardSize: keyboard height in web pixel format.

## Example

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

* [Demo](http://dotwe.org/vue/a1877866e8b91ffa1e6ea9bc66c200fa)
* [Demo of events](http://dotwe.org/vue/2ba8ebc4e6970e1e86725c3e80296e40)
* [Demo of binding](http://dotwe.org/vue/d884b0c18891a05d653253c0f0a94bc1)
