# &lt;waterfall&gt;

## Summary

A component providing waterfall layout over list component.

## Child Components

Notes: The waterfall only supports the following child components: cell, header, refresh, loading and fixed-position components. Other kinds of components will not be guaranteed to be displayed correctly.

* cell: presents the content for a single data item in waterfall
* header: components that need to stretch across multiple columns. It can be sticky by using css position.

## Attributes

* **column-width** : This property describes the width of columns in waterfall elements.
  * `auto`: means that the column width will be determined by other properties(e.g., column-count, if it has a non-auto value).
  * `<length>`: describes the optimal column width. The actual column width may be wider (to fill the available space), or narrower (only if the available space is smaller than the specified column width). Specified values must be greater than 0.
* **column-count**:This property describes the number of columns of a multicol element.
  * `auto`: means that the number of columns will be determined by other properties (e.g., column-width, if it has a non-auto value).
  * `<integer>`: describes the optimal number of columns into which the content of the element will be flowed. Values must be greater than 0. If both column-width and column-count have non-auto values, the integer value describes the maximum number of columns.
* **column-gap**:sets the gap between columns. if `normal` is specified,  the gap will be `32`.
* **left-gap**:sets the gap between left edge and left cell. if `none` is specified,  the gap will be `0`<span class="api-version">v0.19+</span>.
* **right-gap**:sets the gap between right edge and right most cell. if `none` is specified,  the gap will be `0`<span class="api-version">v0.19+</span>.

To see other attributes in list,  please checkout [List Component Attributes](./list.html)

## Styles

common styles: check out [common styles for components](/docs/styles/common-styles.html)

* support flexbox related styles
* support box model related styles
* support position related styles
* support opacity, background-color etc.

## Events

common events: check out the [common events](/docs/events/common-events.html)

* support onclick event. Check out [common events](/docs/events/common-events.html)
* support onappear / ondisappear event. Check out [common events](/docs/events/common-events.html)

## API

All subcomponents in waterfall support the scrollToElement API in [dom module](../modules/dom.html)

## Example

[waterfall example](http://dotwe.org/vue/7a9195643e9e8da352b0d879cdbe68c0)
