# &lt;cell&gt;

## Summary

This component must be used as a subcomponent of a [`list`](./list.html) [`recycler`](./list.html) [`waterfall`](./waterfall.html) component.

## Child Components

This type of component supports all kinds of weex component as its child components. But you should not add another scroller or list into a cell.

## Attributes

* **keep-scroll-position** boolean. It controls whether to keep the last sliding position after inserting the cell.
* **insert-animation** string, cell insert animation. Only support `none` and `default` now.
* **delete-animation** string, cell delete animation. Only support `none` and `default` now.
* **recycle** boolean, <Badge text="iOS" type="warning"/>, <Badge text="Android" type="warning"/>, default true. It controls whether the cell's view in a list should be recycled when the UITableView is scrolling. You should always use true for iOS. On Android recycle is always true, you can use false to prevent image and text data rebinding.

## Styles

* **common styles**. Check out [common styles](../styles/common-styles.html).

::: tip
* You can't give `<cell>` a `flex` value. Width of `<cell>` is equal to the width of its parent list/recycler/waterfall component, and you don't need to specify its height.
* Cell itself is a container and its layout info is managed by parent component such as list. So `margin` should not be specified for a cell.	
:::

## Events

* **common events**. Check out [common events](../events/common-events.html).

## Vue Example

Please refer to
* [list](./list.html)
* [waterfall](./waterfall.html)

## Rax Example

```jsx
import RecyclerView from 'rax-recyclerview';
```

```jsx
<RecyclerView.Cell>{...}</RecyclerView.Cell>
```

[rax-recyclerview doc](https://rax.js.org/docs/components/recyclerview)

