---
title: <a>
type: references
group: Build-in Components
order: 8.01
version: 2.1
---

`<a>` is mainly used for navigation between weex pages。

> **Note:** The behavior of `<a>` is similar to [`<div>`](./div.html) except for the aspect mentioned in current page.

> **Note:** It's forbidden to add text directly to `<a>`, use [`<text>`](./text.html) to wrap your text instead.

## Basic Usage
Wrap the element navigating from with `<a>`

    <a href="http://dotwe.org/raw/dist/a5e3760925ac3b9d68a3aa0cc0298857.bundle.wx">
      <text>Jump</text>
    </a> 

Refer the [demo](http://dotwe.org/vue/1cec564d6e25c169a0a9a92db3a00955).

## Attributes:
| Attribute       | Type    |Value| Default Value|
| -------------   | ------  | --- | ------------ |
| `href` | String | {URL}   | -   | -            |

### `href`
`href` defines the URL that current page will navigate. `href` **must** point to a weex page, the behavior of other case is **undefined**.

## Style
Support [common styles](../../wiki/common-styles.html).

## Events
Support [common events](../../wiki/common-events.html)

### `click`
> **Notes:** The execution order of callback function of click and href is **undefined**. Do **not** use click event to do the preprocessing of `href`.

## Examples
* [Basic usage for `<a>`](http://dotwe.org/vue/1cec564d6e25c169a0a9a92db3a00955) .