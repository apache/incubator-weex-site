---
title: picker
type: references
group: Build-in Modules
order: 9.08
version: 2.1
---

# picker

<span class="weex-version">v0.9+</span>

## Summary

A series of stream api. It provides function: pick data,pick date,pick time

## API
### `pick(options, callback[options])`

pick data(single column)

#### Arguments

- `options {Object}`:pick options
  - `index {number}`:default selected row
  - `items {array}`:picker's data
  - `textColor {color}`：text color in the picker item
  - `selectionColor {color}`：the background color of the selected item in the picker
  - `confirmTitle {string}`：confirm button text
  - `cancelTitle {string}`：cancel button text
  - `confirmTitleColor {color}`：confirm button text color
  - `cancelTitleColor {color}`：cancel button text color
  - `title {string}`：title of dialog
  - `titleColor {color}`：text color of the dialog title
  - `titleBackgroundColor {color}`：background color of the dialog title

- `callback {function (ret)}`:the callback function after executing this action.`ret {Object}` is `callback` 's parameter:
  - `result {string}`:result is one of success,cancel,error
  - `data {number}`:the selected index,it exists when result is success.

### `pickDate(options, callback[options])`

pick date

#### Arguments

- `options {Object}`:pick date options
  - `value {string}`:Required，date picker selected value by default，date's form is yyyy-MM-dd
  - `max {string}`:optional，date’s max value
  - `min {string}`:optional，date's min value

- `callback {function (ret)}`：the callback function after executing this action.ret {Object} is callback 's parameter:
  - `result {string}`:result is one of success,cancel,error
  - `data {string}`:the selected value，the  form of data is yyyy-MM-dd ,it exists when result is success.

### `pickTime(options, callback[options])`

pick time

#### Arguments

- `options {Object}`:pick time options
  - `value {string}`:required，the form of value is HH:mm

- `callback {function (ret)}`:the callback function after executing this action.ret {Object} is callback 's parameter：
  - `result {string}`:result is one of success,cancel,error
  - `data {string}`:the selected value，the form of data is HH:mm,it exists when result is success.

## DEMO

[usage demo](http://dotwe.org/vue/060faedd0952f518d2d5322a5fb5ea2f)

<IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1idhbogHqK1RjSZJnXXbNLpXa-544-960.gif" />
