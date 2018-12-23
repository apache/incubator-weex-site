# &lt;cell&gt;

## Summary

This component must be used as a subcomponent of a [`list`](./list.html) [`recycler`](./list.html) [`waterfall`](./waterfall.html) component.

## Child Components

This type of component supports all kinds of weex component as its child components.

## Attributes

**Notes:** You can't give `<cell>` a `flex` value. Width of `<cell>` is equal to the width of its parent list/recycler/waterfall component, and you don't need to specify its height.

* **keep-scroll-position** boolean, <span class="api-version">v0.11+</span>. It controls whether to keep the last sliding position after inserting the cell.

* **insert-animation** string, cell insert animation. Only support `none` and `default` now.
* **delete-animation** string, cell delete animation. Only support `none` and `default` now.

* **recycle** boolean, <span class="api-version">iOS</span>, default true. It controls whether the cell's view in a list should be recycled when the UITableView is scrolling. You should always use true for iOS.

## Styles

* **common styles**. Check out [common styles](../styles/common-styles.html).

**Notes:** Cell itself is a container and its layout info is managed by parent component such as list. So `margin` should not be specified for a cell.

## Events

* **common events**. Check out [common events](../events/common-events.html).

## Example

Please refer to
* [list](./list.html)
* [waterfall](./waterfall.html)
