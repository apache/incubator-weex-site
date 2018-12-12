# Introduction 

&lt;a&gt;  used to implement jumps between pages.
## Attributes

* **href** string. target url of jump，target page must be a weex page.
it is a undefined behavior if target page is a `html`


## Styles

* **common styles**. Check out [common styles](/wiki/common-styles.html).

## Events

* **common events**. Check out the [common events](/wiki/common-events.html).

## Other

- don't add text in `<a>` directly

-  the order of event (`click` and `href`) is unpredictable , so don't do the logic which before `herf` jumps in `click`


## Example


```
<a href="http://emas-ha-remote-log-poc.oss-cn-beijing.aliyuncs.com/eweex/app/biz-docs-com-mod/upload/271ccdca-db41-423d-981c-c7c6751ba479/show_1.js">
  <text>main page</text>
</a> 
```

[try it](http://dotwe.org/vue/3b789771e48be92a70bd682f084b84b5)

