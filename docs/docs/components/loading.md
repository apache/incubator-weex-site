# &lt;loading&gt;

## Summary

::: warning
The `<loading>` Component provide a pullup to loading function for some special containers, its usage and attributes are similar to the `<refresh>` Component.
> **Note：** To be rendered properly, the `<loading>` Component must appear inside the special Component such as `<scroller>`、`<list>`、`<hlist>`、`<vlist>`、`<waterfall>`.
:::

```vue{5}
<scroller>
  <div v-for="num in lists">
    <text>{{num}}</text>
  </div>
  <loading>
    <text>Loading</text>
  </loading>
</scroller>
```

## Child Components

 - Any other components, like the `<text>` and `<image>` components, can be put inside the loading component.

 - `<loading-indicator>`: This is a dedicated component which provides a default loading animation effect, can only be used inside the `<refresh>` or the `<loading>` components.

 ```vue{3}
 <loading>
   <text>Loading</text>
   <loading-indicator></loading-indicator>
 </loading>
 ```

## Attributes

 - Support all common attributes, check out [common attributes](../common/common-attrs)

| Attribute      | Type     | Value            | Default Value     |
| ------------- | ------ | -------------------------- | ------- |
| `display` | String | show / hide             | show      |

#### `display`

 - `show`：The loading animation will be started if a `<loading-indicator>` is included in the loading component.

 - `hide`：Collapse the loading view. It also hides the `<loading-indicator>` and stops the loading animation if there's a `<loading-indicator>` included in the loading component.

> **Note：** The visibility of `<loading>` component can be controlled by display attribute with the value show and hide. A `display="show"` should always be paired with a `display="hide"` statement.


## Styles

 - Please check out the [common styles](/wiki/common-styles.html)

## Events

### `loading`

 - Triggered when the scroller or list is pulled up.

 ```vue
 <loading @loading="onloading" :display="loadinging ? 'show' : 'hide'">
   <text>Loading ...</text>
   <loading-indicator></loading-indicator>
 </loading>
 ```

## Example

 - Complete example goes [here](http://dotwe.org/vue/70db1e2d322a50065369033cb9a5b58f)
