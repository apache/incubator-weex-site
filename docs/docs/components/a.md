# &lt;a&gt;

## Summary

`<a>` is mainly used for navigation between weex pages。

::: tip
It's forbidden to add text directly to `<a>`, use [`<text>`](./text.html) to wrap your text instead.
:::

```Html
<a href="http://dotwe.org/raw/dist/a5e3760925ac3b9d68a3aa0cc0298857.bundle.wx">
  <text>Jump</text>
</a>
```

## Attributes

* **href** String, `href` defines the URL that current page will navigate to. `href` must point to a weex page, or behavior is undefined.

## Style

* **common styles**. Check out [common styles](../styles/common-styles.html).

## Events

* **common events**. Check out [common events](../events/common-events.html).

::: tip
The execution order of callback function of click and href is **undefined**. Do **not** use click event to do the preprocessing of `href`.
:::

## Examples

```Html
<a href="http://emas-ha-remote-log-poc.oss-cn-beijing.aliyuncs.com/eweex/app/biz-docs-com-mod/upload/271ccdca-db41-423d-981c-c7c6751ba479/show_1.js">
  <text>主会场</text>
</a> 
```

[Demo](http://dotwe.org/vue/3b789771e48be92a70bd682f084b84b5)
