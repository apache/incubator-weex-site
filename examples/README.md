# Weex Vue Examples

Simple examples of using [Weex](http://weex.apache.org/) and [Vue.js](https://vuejs.org/).

+ **[The Examples Website](http://weex.apache.org/examples.html)** ([Mirror at Alibaba Cloud](http://weex-project.io/examples.html))
+ [Weex Online Playground](http://dotwe.org/vue)
+ [Weex Playground App](https://weex-project.io/playground.html)

## How to Add Examples

1. Write an example on the [online playground](http://dotwe.org/vue).
2. Clone this project and add the example description to the corresponding file within this folder.
3. Send a pull request to [apache/incubator-weex-site](https://github.com/apache/incubator-weex-site).

### Examples Category

+ `components.js`: [Built-in components of Weex](http://weex.apache.org/references/components/index.html).
+ `modules.js`: [Built-in modules of Weex](http://weex.apache.org/references/modules/index.html).
+ `syntax.js`: The syntax of Weex DSL framework (Vue.js).
+ `styles.js`: Supported CSS styles of Weex.
+ `cases.js`: Common usage cases of Weex.
+ `others.js`: Misc examples, those who don't know where to put it.

### Examples Description

+ **`hash`**: **[Required]** The md5 hash in the [online playground](http://dotwe.org/vue) example's link address.
+ **`title`**: **[Required]** A brief title of the example. It's better to have both Chinese and English titles.
+ **`screenshot`**: [Optional] The screen shot of the example. In order to be consistent, the image size should be 540x844 or larger. It's better to upload the image to a CDN and just offer an address.

> For the screen shot of examples, if you find it hard to satisfy the requirement, you can use this placeholder image instead: https://img.alicdn.com/tfs/TB1IoEFxGmWBuNjy1XaXXXCbXXa-540-844.png

```js
examples: [{
  hash: '44e635d920aaac5e3bbcbe293b6f0b81',
  // title: 'Need Screenshot', // use the same title for all languages
  title: { zh: '缺截图', en: 'Need Screenshot' }, // set titles for different languages
  screenshot: 'https://img.alicdn.com/tfs/TB1IoEFxGmWBuNjy1XaXXXCbXXa-540-844.png'
}]
```

<hr>

## 如何添加例子

1. 在 [online playground](http://dotwe.org/vue) 写例子。
2. 克隆当前项目，把例子的描述添加到当前目录里相应的文件中。
3. 给 [apache/incubator-weex-site](https://github.com/apache/incubator-weex-site) 提 PR。

### 例子分类

+ `components.js`: [Weex 的内置组件](http://weex-project.io/cn/references/components/index.html).
+ `modules.js`: [Weex 的内置模块](http://weex-project.io/cn/references/modules/index.html).
+ `syntax.js`: 使用了 Vue.js 语法的例子。
+ `styles.js`: 样式相关的例子。
+ `cases.js`: 常见的实际用例。
+ `others.js`: 其他不知道怎么分类例子。

### 例子的描述

+ **`hash`**: **[必填]** [online playground](http://dotwe.org/vue) 例子 URL 里的 md5 hash 字符串。
+ **`title`**: **[必填]** 例子的标题，要简短，最好是中英文都有。
+ **`screenshot`**: [选填] 例子的截图，不应该包含导航栏和状态栏。为了保持一致，图片大小要求是 540x844 或者更高。最好能把图片传到 CDN 上然后提供图片地址。

> 如果你觉得例子里的截图很难搞定，也可用这张图代替： https://img.alicdn.com/tfs/TB1IoEFxGmWBuNjy1XaXXXCbXXa-540-844.png

```js
examples: [{
  hash: '44e635d920aaac5e3bbcbe293b6f0b81',
  // title: 'Need Screenshot', // 所有语言都用这个标题
  title: { zh: '缺截图', en: 'Need Screenshot' }, // 针对不同语言设置标题
  screenshot: 'https://img.alicdn.com/tfs/TB1IoEFxGmWBuNjy1XaXXXCbXXa-540-844.png'
}]
```
