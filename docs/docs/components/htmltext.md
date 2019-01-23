## Summary

> Only support Android platform now

Html Component can support all html tags in theory by two different scenarios

- Use [Html.fromHtml](https://developer.android.com/reference/android/text/Html.html#fromHtml(java.lang.String)) to transform raw string  to what support by [TextView](https://developer.android.com/reference/android/widget/TextView) (supported tags can be found [here](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/text/Html.java#781))
- The rest tags that can't be well done by [TextView](https://developer.android.com/reference/android/widget/TextView) (eg: `video`,`img`) or **no way to do**( eg:`table`) we use native views to render which is primary reason to design this component.

For now, only support `img`,`video`,`table`, but can DIY by implementing **[IWxHtmlTagAdapter](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/adapter/IWxHtmlTagAdapter.java)**, or check how default adapter(**[DefaultHtmlTagAdapter](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java)**) do.

Here is a sample：

```
<html-text :html-text="formatHtml"
           :html-option="htmlOption">
     <div> Any Header View</div>
     <div> Any Footer View</div>
</html-text>
```

## Attributes

- **html-text**

  The origin raw html text, looks like [this](https://www.yuque.com/tuyong/records/xdb5u8/html), contains all kinds of rich text tags...

- **html-option**

  inner configs about how to render specified tag:

  ```
  htmlOption: {
            image: { 
              resize: 'cover'
            },
            table: { 
              template: ''
            },
            tags:['img','table','video']
          },
  ```

  - **image**

    img tag, how to handle image(like [image](http://weex-project.io/cn/references/components/image.html#shu-xing)'s attribute )

  - **table**

    table tag's html template to control how to render table,the default template can be found [here](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/HtmlComponent.java#L40). it's wrapped by **WRAP_PARENT** [WebView](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/AtMostWebView.java) default.

  - **tags**

    tags array that will be handled, what show above is default three tags(`img`,`table`,`video`), you can add any specail tag in this array, and [custom implement](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java#L102) by native view. And once change the default value, all need be supported tags(**Especially default three tags**) must in tag array, or it can't be handled well

- **Header&Footer**

  We can add header and footer in `html-text`, Only **the direct first two** subview can be [parsed](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/WxHtmlComponent.java#L115) by [WxHtmlComponent](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/WxHtmlComponent.java) , which means the first one is Header, and the second one is Footer. but the header&footer view-self can be any of views as you wish. The other direct views will be ignored.

- **Tag Click Event**

  There are default [empty click listeners](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java#L93), and can be customed by overide [getTagViewClickListener](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java#L92)which contains many useful information

- **Common Event** 

  support all [common event](../events/common-events.html) in theory.



## Custom things

In most of user case, we need custom your own things because the default one is too simple to handle the complex situation.

Here is a relation of mapping:

| `<img>..</img>,<img .../>`         | [getDefaultImageView](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java#L156) |
| ---------------------------------- | ------------------------------------------------------------ |
| `<table> ..</table>`               | [getDefaultTabView](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java#L106) |
| `<video ..>..</video>,<video ../>` | [getDefaultVideo](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java#L131) |
| ` textView supported tag`          | [getDefaultTextView](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java#L192) |

Two way to DIY:

- Add need supported tags to attribute `htmlOption`  in  JS side.
- Custom implement **[IWxHtmlTagAdapter](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/adapter/IWxHtmlTagAdapter.java)**or extend**[DefaultHtmlTagAdapter](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java)**, override the relative method, the raw string only contains tag self info will be return . For example ,the `img` tag's result will looks like :`<img src=''; style=''; height='' .../>`,  then do whatever you want by resolving the attributes that you care.

## Example

Can simple copy [this ](https://www.yuque.com/tuyong/records/xdb5u8/html)raw html string as `html-text`'s value

```
<html-text style="background-color: white;padding: 20px"
           class="main-list"
           :html-text="formatHtml"
           :html-option="htmlOption">
    <div style="background-color: coral; height: 200px; width: 750px">
        <text class="i-slg iconfont" style="font-size: 40px">This is Header</text>
    </div>

    <div style="background-color: #0088fb; height: 100px; width: 750px; margin-top: 20px">
        <text class="i-slg iconfont" style="font-size: 40px;">This is Footer</text>
    </div>

    <div style="background-color: chartreuse; height: 200px; width: 750px"></div>
</html-text>
```

The result is below:
![](https://ws4.sinaimg.cn/large/006tNc79ly1fzgislx5gvj30mg0qgtbj.jpg)