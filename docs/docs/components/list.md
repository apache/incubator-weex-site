# &lt;list&gt;

## Summary

The List component, which inspired by Android RecyclerView, is a core component, and it provides the most popular features for using a list of items. The list component only supports vertical orientation, for horizontal orientation list check [recycle-list](https://weex.apache.org/docs/components/recycle-list.html) component

It can provide excellent experience and performance while still maintaining smooth scroll and low memory usage.

[list simple demo](http://dotwe.org/vue/edd19cdf2f03fbe857b76fadd65a08c3)

![mobile_preview](../images/list_demo.jpg)

[list loadmore demo](http://dotwe.org/vue/2170622cc99895e5ad6af89d06355b84)

[list sticky header](http://dotwe.org/vue/2ecfe0a1c7b820c9d9c9965e1a8cde19)

[list cell appear event](http://dotwe.org/vue/ce0e953112b132e5897725b3149f3924)


## Child Components

Notes: The list now supports the following child components: cell, header, refresh, loading and fixed-position components. Other kinds of components will not be guaranteed to be displayed correctly.

* cell defines the attributes and behavior of the cells that appear in list.
* header sticks to the top when it reaches the top of the screen.
* refresh used inside list to add pull-down-to-refresh functionality.
* loading used inside list to add pull-up-to-load-more functionality.


## Attributes

* `show-scrollbar`: true/false whether show the scroll bar or not, default value is true
* `loadmoreoffset` : `Number` default value is 0. The loadmore event will be triggered when the list is loadmoreoffset left to reach the bottom of the list view. e.g. a list has total content length of 1000, and the loadmoreoffset is set to 400, the loadmore event will be triggered when 600 has beed scrolled and there is less than 400 left.
* `loadmoreretry` : `Number` default value 0，whether to reset loadmore related UI when loadmore failed, will be deprecated in further release.
* `offset-accuracy`：`Number` default value is 0, the vertical offset distance required to trigger the scroll event.
* `pagingEnabled`: `Boolean` default value is false. supporting pager style snapping in vertical orientation. support version: <Badge text="v0.20+" type="warning"/>. Example : [pagingEnabled](http://dotwe.org/vue/1323c218072f17f10e14a5c336dac3c4)
* scrollable: `Boolean` default value is true.  set whether list is scrollable.

Please checkout [Scroller Component Attributes](./scroller.html) to have a look at the inherited attributes from direct parent.

## Styles


common styles: check out [common styles for components](/docs/styles/common-styles.html)

* support flexbox related styles
* support box model related styles
* support position related styles
* support opacity, background-color etc.

## Events

onloadmore  0.5 used with loadmoreoffset attribute. if the view has less than loadmoreoffset to scroll down, the onloadmore event will be triggered.

scroll  <sup class="wx-v">0.12+</sup> used with offset-accuracy attribute. This event is fired when the list scrolls. The current contentOffset value is given in this event callback. See details in [scroll event demo](http://dotwe.org/vue/9ef0e52bacaa20182a693f2187d851aa).

common events: check out the [common events](/docs/events/common-events.html)

* support onclick event. Check out [common events](/docs/events/common-events.html)
* support onappear / ondisappear event. Check out [common events](/docs/events/common-events.html)


## API

All cells or cell's subcomponents in list support the scrollToElement API in [dom module](../modules/dom.html)

#### Difference between loading child component and onloadmore event

loading is a child component that can response to the onloading  event, and this event can only be triggered when the  scroller/list has been scrolled down to the bottom.
onloadmore is an event that will be triggered when the rest of the scroller/list is less than loadmoreoffset long.

## Restrictions

Nested lists or scrollers within the same direction are not supported. In other words. nested lists/scroller must have different directions.
For example, a vertical list nested in a vertical list or scroller is not allowed. However, a vertical list nested in a horizontal list or scroller is legal.


[load more demo](http://dotwe.org/vue/d31c85e7cd2dc54fa098e920a5376c38)
