## 简介

> 此组件目前只支持Android平台

Html字符串组件理论上可以支持任意HTML字符串中的任意tag的解析，分两种情况

- [Html.fromHtml](https://developer.android.com/reference/android/text/Html.html#fromHtml(java.lang.String)) 支持传统 [TextView](https://developer.android.com/reference/android/widget/TextView) 能支持的标签(具体标签类型可以[在此](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/text/Html.java#781)查看)
- 那些不能完美被 [TextView](https://developer.android.com/reference/android/widget/TextView) 支持的标签(如 `video`,`img`等)或者完全没有方案支持的标签(如`table`),通过转换成Android原生组件渲染

目前内置支持了`img`,`video`,`table`三个标签,并且支持通过继承**[IWxHtmlTagAdapter](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/adapter/IWxHtmlTagAdapter.java)**自定义实现功能,可以参考默认的实现**[DefaultHtmlTagAdapter](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java)**

简单的使用案例：

```
<html-text :html-text="formatHtml"
           :html-option="htmlOption"
           @headerAppear=""
           @headerDisappear=""
           @footerAppear=""
           @footerDisappear="">
     <div> Any Header View</div>
     <div> Any Footer View</div>
</html-text>
```

## 属性

- **html-text**

  原始html文本字符串, 包含了各种HTML标签,[跟此类似](https://www.yuque.com/tuyong/records/xdb5u8/html)

- **html-option**

  自定义tag相关的属性配置，完整&默认配置如下

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

  - image

    `img`和`video`标签封面图片的缩放style, 和 [image](http://weex-project.io/cn/references/components/image.html#shu-xing) 的属性相同

  - table

    `table`标签的html模板,用于决定`table`渲染的样式,默认的模板[在此](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/HtmlComponent.java#L40). 在native 中用[自适应WebView](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/AtMostWebView.java)的方式承载

  - tags

    配置需要解析的标签名的数组,默认是`img`,`table`,`video`三个标签,一旦改变此值会完全按照配置的标签进行解析;如果需要添加新的标签名,需要带上默认的三个标签,否则不予解析

- **Header&Footer**

  头部和尾部View, `html-text`节点最前的两个**直接**子节点会被解析依次作为 Header 和 Footer, 多余的**直接**子节点会被忽略. 子节点可以是任意的组件,可以任意嵌套,任意设置属性

- **标签点击事件**

  默认所有自定义标签的点击均为[空实现](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java#L93)，需要重载 [getTagViewClickListener](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java#L92) 此方法实现

- **通用事件**  理论上支持所有[通用事件](../events/common-events.html)
  - header&footer对应的appear和disappear事件
    - headerAppear - 头部显示事件
    - headerDisappear - 头部隐藏事件
    - footerAppear - 底部显示事件
    - footerDisappear - 底部隐藏事件



## 自定义

由于扩展性考虑,默认的实现均比较简约,因此大部分场景是需要自定义实现的

目前标签和接口相关的映射关系表

| `<img>..</img>,<img .../>`         | [getDefaultImageView](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java#L156) |
| ---------------------------------- | ------------------------------------------------------------ |
| `<table> ..</table>`               | [getDefaultTabView](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java#L106) |
| `<video ..>..</video>,<video ../>` | [getDefaultVideo](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java#L131) |
| ` textView supported tag`          | [getDefaultTextView](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java#L192) |

自定义通常分两步

- JS端中在`htmlOption`属性中的`tags`添加需要新支持的标签
- 实现**[IWxHtmlTagAdapter](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/adapter/IWxHtmlTagAdapter.java)**接口或者继承**[DefaultHtmlTagAdapter](https://github.com/brucetoo/incubator-weex/blob/10c5576f4d9384967fad67759f2ec2ed39f36530/android/sdk/src/main/java/com/taobao/weex/ui/component/html/adapter/DefaultHtmlTagAdapter.java)**默认实现,重载对应的方法, 组件自身会将包含对应标签的字符串返回,比如 `img`的字符串类似于`<img src=''; style=''; height='' .../>`, 自行在字符串汇总读取对应的属性值做对应的Native View映射.

## 示例

可以拷贝[此链接](https://www.yuque.com/tuyong/records/xdb5u8/html)的字符串设置为`html-text`属性

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

效果如下图:
![](https://ws4.sinaimg.cn/large/006tNc79ly1fzgislx5gvj30mg0qgtbj.jpg)
