# &lt;refresh&gt;

## Summary

::: warning
The `<refresh>` Component provide a pulldown-refresh function for some special containers, its usage and attributes are similar to the `<loading>` Component.

To be rendered properly, the `<refresh>` Component must appear inside the special Component such as `<scroller>`、`<list>`、`<hlist>`、`<vlist>`、`<waterfall>`.
:::

```vue{2}
<scroller>
  <refresh>
    <text>Refreshing...</text>
  </refresh>
  <div v-for="num in lists">
    <text>{{num}}</text>
  </div>
</scroller>
```

## Child Components

 - Any other components, like the `<text>` and `<image>` components, can be put inside the refresh component.

 - `<loading-indicator>`: This is a dedicated component which provides a default refresh animation effect, can only be used inside the `<refresh>` or the `<loading>` components.

```vue{2}
<refresh>
  <text>Refreshing</text>
  <loading-indicator></loading-indicator>
</refresh>
```

## Attributes

 - Support all common attributes;

| Attribute      | Type     | Value            | Default Value     |
| ------------- | ------ | -------------------------- | ------- |
| `display` | String | show / hide             | show      |

#### `display`

 - `show`：The refresh animation will be started if a `<loading-indicator>` is included in the refresh component.

 - `hide`：Collapse the refresh view. It also hides the `<loading-indicator>` and stops the loading animation if there's a `<loading-indicator>` included in the refresh component.

> **Note：** The visibility of `<refresh>` component can be controlled by display attribute with the value show and hide. A `display="show"` should always be paired with a `display="hide"` statement.

## Styles

 - Please check out the [common styles](../styles/common-styles.html)

## Events

### `refresh`

 - Triggered when the scroller or list is pulled down.

### `pullingdown` <span class="weex-version">v0.6.1+</span>

 - Triggered when the scroller or list is pulled down. The attributes `dy`, `pullingDistance`, `viewHeight` and `type` are accessible from the `event` object :

  - `dy` : The offset between two scroll actions
  - `pullingDistance` : The distance of pulling
  - `viewHeight` : The height of refreshView
  - `type` : "pullingdown" constant string type for this event

```vue{2}
  <refresh @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
    <text>Refreshing ...</text>
    <loading-indicator></loading-indicator>
  </refresh>
```



## Example

 - Complete example goes [here](http://dotwe.org/vue/b9fbd9b7a0b0aaa46e3ea46e09213539)

## Rax Example

`rax-refreshcontrol` is the component `<refresh>` of rax, which can run in web and weex.

```jsx
import { createElement, Component, render } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Driver from 'driver-universal';
import RecyclerView from 'rax-recyclerview';
import RefreshControl from 'rax-refreshcontrol';

class RefreshControlDemo extends Component {
  state = {
    isRefreshing: false,
    loaded: 0,
    refreshText: '↓ Pull To Refresh'
  };

  handleRefresh = (e) => {
    this.setState({
      isRefreshing: true,
      refreshText: 'Refreshing',
    });
    setTimeout(() => {
      // update Data
      this.setState({
        isRefreshing: false,
        refreshText: '↓ Pull To Refresh',
      });
    }, 1000);
  };

  render() {
    return (
      <View>
        <RecyclerView
          refreshControl={null}>
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.handleRefresh}
          >
            <Text>{this.state.refreshText}</Text>
          </RefreshControl>
          <RecyclerView.Cell>
            <View>
              <Text>this is list</Text>
            </View>
          </RecyclerView.Cell>
        </RecyclerView>
      </View>
   );
  }
}

render(<RefreshControlDemo/>, document.body, { driver: Driver });
```

[rax-refreshcontrol doc](https://rax.js.org/docs/components/refreshcontrol)

