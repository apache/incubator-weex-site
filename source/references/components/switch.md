---
title: <switch> (deprecated)
type: references
group: Build-in Components
order: 8.22
version: 2.1
---

<span class="weex-version">v0.6.1+</span>

> **deprecated:** This built-in component will be deprecated soon. There're some reasons for this deprecation, such as the inconsistency of user experience on different ends, and the component's appearance sometimes being not as expected. Therefore we strongly suggest developers build this component as a customized component using weex's DSL and its rendering ability.

`<switch>` is a checkbox-like UI component.

> **Note:** The appearance of switch component is a bit of different in three ends (iOS, Android, Web) in consideration of different platform styles.

| Android | Web | iOS |
| -------- | --- | --- |
| ![Android](https://img.alicdn.com/tfs/TB1xIEqnfDH8KJjy1XcXXcpdXXa-314-242.png) | ![Web](https://img.alicdn.com/tfs/TB1ugX2k5qAXuNjy1XdXXaYcVXa-308-276.png) | ![iOS](https://img.alicdn.com/tfs/TB1t3X2k5qAXuNjy1XdXXaYcVXa-318-270.png) |

> **Note:** Layout style attributes listed below such as `width`, `height`, `margin` are not supported.

## Basic Usage

```html
<switch></switch>
```

See the [example](http://dotwe.org/vue/00f4b68b3a86360df1f38728fd0b4a1f).

## Attributes

| Attribute     | Type   | Value                      | Default Value |
| ------------- | ------ | -------------------------- | ------------- |
| `checked`     | Boolean |   true / false            | false         |
| `disabled`    | Boolean |   true / false            | false         |

### `checked`

Indicates this component's status is set to true or false.

### `disabled`

Indicates this component is not available for interaction.

## Component Methods

None.

## Events

* `appear` / `disappear` event. check out [common events](/wiki/common-events.html)
* `click` / `longpress`: check out [common events](/wiki/common-events.html)
* `change`: check out [common events](/wiki/common-events.html)

## Parameters of events' object for onchange event:

* `value`: the value of the component who dispatched this event, which is the boolean value true or false.
* `timestamp`: the time stamp of the event.

## Styles

> **Notes:** There are several style properties that you mustn't use on this component. And here are all the invalid properties:

* `width`
* `height`
* `min-width`
* `min-height`
* `margin` and `margin-xxx`
* `padding` and `padding-xxx`
* `border` and `border-xxx`

> **Notes:** If the container of `<switch>` is not set to `align-items:flex-start`, the switch in android will be stretched.

common styles: check out [common styles for components](/wiki/common-styles.html)

## Usage Notes

- The `width` and `height` in the styles of `<switch>` won't effect the component's apparence and layout.
- `<switch>` can not have any nested child component.

## Examples

- [Simple Switch](http://dotwe.org/vue/00f4b68b3a86360df1f38728fd0b4a1f)
- [Switch List](http://dotwe.org/vue/9068f28ba80e871d89dabb9fccff5cc6)
