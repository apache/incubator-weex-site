# Introduction

`<div>` is a base container component.support all 

- [common styles](/wiki/common-styles.html)
- [common events](/wiki/common-events.html)
- flexbox layout

similar to `div` in `html`

## Child Components

`<div>` is base container component ，support all compenents as child (include `div` self)

## Attributes

* **common attributes**. 

## Styles

* **common styles**. support [common styles](../styles/common-styles.html).

## Events
* **common events**. support [common events](../events/common-events.html).

## Other

* don't add text in `<div>`directly。if need show text, use `<text>`,see Example
* `<div>` can't scroll automatic in native. even component's height above screen's height
* `<div>` for good performance,depth level don't be too deep, suggest __depth level < 14__

## Example


- code 

	``` vue{2}
	<template>
  	<div>
    	<text>Hello World!</text>
  	</div>
	</template>
	```

- [try it](http://dotwe.org/vue/57cc2dd8955b0ead3e5b46e3df2f58b9) （naitve can't scroll automatic）you scan use [&lt;list&gt;](/docs/list.html)、[&lt;scroller&gt;](/docs/scroller.html) for scroll