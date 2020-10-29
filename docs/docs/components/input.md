# &lt;input&gt;

## Summary

The weex builtin component `input` is used to create input controls to receive the user's input characters. How a `input` component works varies considerably depending on the value of its `type` attribute, such as `text`, `password`, `url`, `email`, `tel` etc.

## Child Components

No child should be added to a `input`.

## Attributes

* `type`: the type of controls to display. The default value is `text`, if this attribute is not specified. Possible values are `text`, `date`, `datetime`, `email`, `password`, `tel`, `time`, `url`, `number`. each of which has the same meaning with W3C standard.

* `value`: the default value(text) of the control.

* `placeholder`: a hint to the user of which can be entered to the control. The placeholder text must have no carriage returns or line-feeds.

* `disabled`: a boolean attribute indicates that the form control is not available for interaction. In particular, the click event will not be dispatched on disabled controls.

* `autofocus`: a boolean attribute lets you specify that a form control should have input focus when the page loads.

* `singleline`: a boolean sttribute sets the properties of this field (lines, horizontally scrolling, transformation method) to be for a single-line input.

* `lines`: makes the input exactly this many lines tall.

* `max` constrain the max date when `type` is `date`, format is `yyyy-MM-dd`

* `min` constrain the min date when `type` is `date`, format is `yyyy-MM-dd`

* `maxlength`: a number value to specify maxlength of input.

* `return-key-type`: the keybord returen key type support `defalut`, `go`, `next`, `search`, `send`, `done`.

* `auto-capitalization-type`: the keybord auto capitalization type support `none`, `words`, `sentences`, `allCharacters`.

* `upriseOffset`: <Badge text="v0.21+ & iOS" type="warn" vertical="middle"/> the additional vertical margin between bottom of input and top of keyboard if the keyboard would cover the input. Default is 20 system pixels on iOS.

* `hideDoneButton`: <Badge text="iOS" type="warn" vertical="middle"/>, hide the "Done" button toolbar on keyboard.


## Styles

#### Common Styles
* Support [common styles](../styles/common-styles.html).

::: tip 
Input component does not support separate border styles for edges. You can wrap another div out of the input.
:::

#### Pseudo Styles
* Pseudo-class: `input` component support the following pseudo-classes:
  * `active`
  * `focus`
  * `disabled`
  * `enabled`

#### Text Styles  
* Support [text styles](/docs/styles/text-styles.html)
  * support `color` style.
  * support `font-size` style.
  * support `font-style` style.
  * support `font-weight` style.
  * support `text-align` style.

#### Custom Styles
* **placeholder-color** the color of placeholder. Default value is '#999999'.

## Events

* **common events**. support [common events](/docs/events/common-events.html).
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
  * @param keyboardSize: keyboard size in web pixel format.

::: tip 
Input component does not support the common-event `click`. Please listen to the `input` or `change` event instead.
:::


### Methods

 - `focus()` <Badge text="0.8+" type="warning" />

  The `focus()` method is used to give focus to an input component and tigger soft keybord(if it can be focused).

 - `blur()`<Badge text="0.9+" type="warning" />

  The `blur()` method is used to remove focus from an input component and close soft keybord(if it has focus).

- `setSelectionRange(selectionStart,selectionEnd)`  <Badge text="0.11+" type="warning" /><Badge text="only support android & ios" type="warning" />

  Set text selection range of input or textarea

  - `selectionStart {number}`:set starting location text selection range
  - `selectionEnd {number}`:set end location text selection range

- `getSelectionRange(callback[selectionStart,selectionEnd])`  <Badge text="0.11+" type="warning" /><Badge text="only support android & ios" type="warning" />

    Get text selection range of input or textarea

    - `selectionStart {number}`:get starting location text selection range
    - `selectionEnd {number}`: get end location text selection range

- `setTextFormatter(params)`<Badge text="0.18+" type="warning" /><Badge text="only support android & ios" type="warning" />

     This is a very useful feature,can be used to set a set of rules for the input to formatting the input content in real-time.

    - `params {object}`：formatting rules, contains the following parameters:
      - `formatRule {regexp}`: Regular expression used to format the match
      - `formatReplace {string}`: Contents to replace after format matching
      - `recoverRule {regexp}`: Regular expressions to restore original content from formatted content
      - `recoverReplace {string}`: Content to replace when restoring original content

For details of `setTextFormatter`, please refer to [sample](http://dotwe.org/vue/bea3cb0cad697829d8d343552a2b7b77)
### Notes
::: warning

input does not support the common-event `click`. Please listen to the `input` or `change` event instead.

:::

### Parameters of events' object

* for `input` and `change` events:
  - `value`: the value of the component who dispatched this event.
  - `timestamp`: the time stamp of the event.
* for `focus` and `blur` events:
  - `timestamp`: the time stamp of the event.

## Vue Example
- [input with normal content and binding actions Example] (http://dotwe.org/vue/c2c9a853e5184d8ade57d1d93432f31f)
- [ date & time Example ](http://dotwe.org/vue/23ec083078356ef0e31618164e5a184b)

- [return-key-type Example](http://dotwe.org/vue/2ab797dc2ffe865f33a5727d0fdd2408)
- [setTextFormatter Example](http://dotwe.org/vue/bea3cb0cad697829d8d343552a2b7b77)
- [Other Examples](http://dotwe.org/vue/aec5342b15d3c01b3b427384a71b0874)

[try it](http://dotwe.org/vue/3470e4d0194f3879a72d38e2ab02cc9f)

## Rax Example

`rax-textinput` is the component `<textarea>` of rax, which can run in web and weex.

```jsx
import { createElement, render } from "rax";
import Driver from 'driver-universal';
import TextInput from "rax-textinput";

function App() {
  return (
    <TextInput autoFocus={true} />
  );
}

render(<App />, document.body, { driver: Driver });
```

[rax-textinput doc](https://rax.js.org/docs/components/textinput)

