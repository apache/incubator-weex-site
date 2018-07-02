---
title: dom
type: references
group: 内置模块
order: 9.03
version: 2.1
---

# dom

`dom` 模块用于对 weex 页面里的组件节点进行一部分特定操作。

你可以使用该模块来获取某个组件的 bounding rect 布局信息，或者将 list 的某个子节点滚动到当前视口，或者添加一个 font-face rule，等等。

> **Note:** API `addRule` 目前仅支持添加 'font-face'.

## API

### scrollToElement(ref, options)

让页面滚动到 ref 对应的组件，这个 API 只能用于可滚动组件的子节点，例如 `<scroller>`，`<list>` 等可滚动组件中。

> 要在你的 `.vue` 文件中使用这个 API，可以使用 `weex.requireModule('dom').scrollToElement`。

#### 参数

- `ref {Node}`：你要滚动到的那个节点
- `options {Object}`:
- `offset {number}`: 一个到其可见位置的偏移距离，默认是 `0`
- `animated {boolean}` <sup class="wx-v">0.10+</sup>：是否需要附带滚动动画，默认是`true`

#### 示例

[滚动到某层](http://dotwe.org/vue/56e0d256cbb26facd958dbd6424f42b2)

### getComponentRect(ref, callback) <span class="api-version">v0.9.4+</span>

`支持版本: >=0.9.4`

通过标签的 `ref` 获得其布局信息，返回的信息在 `callBack` 中，格式参考如下：

```javascript
{
  result: true,
  size: {
    bottom: 60,
    height: 15,
    left: 0,
    right: 353,
    top: 45,
    width: 353
  }
}
```

如果想要获取到 Weex 视口容器的布局信息，可以指定 `ref` 为字符串 `'viewport'`，即 `getComponentRect('viewport', callback)`.

#### 示例

[获取 box 的布局信息](http://dotwe.org/vue/d69ec16302e06300096c7285baef538a)


### addRule(type, contentObject) <span class="api-version">v0.12.0+</span>

`支持版本: >=0.12.0`

addRule是可以为dom 添加一条规则，目前支持自定义字体fontFace规则，构建自定义的font-family，可以在[text](../components/text.html#iconfont)使用

#### fontFace

```javascript
const domModule = weex.requireModule('dom')
domModule.addRule('fontFace', {
  'fontFamily': "iconfont2",
  'src': "url('http://at.alicdn.com/t/font_1469606063_76593.ttf')"
})
```

**注意事项**

`addRule` 方法里的 `fontFamily` 可以随意取。这个名字不是字体真正的名字。字体真正的名字（font-family），也就是注册到系统中的名字是保存在字体二进制文件中的。你需要确保你使用的字体的真正名字（font-family）足够特殊，否则在向系统注册时可能发生冲突，导致注册失败，你的字符被显示为‘?’。

如果你使用 http://www.iconfont.cn/ 来构建你的 iconfont。确保在项目设置中，设置一个特殊的 font-family 名字。默认是 “iconfont”，但极大可能发生冲突。

#### 示例

[add rule fontface](http://dotwe.org/vue/95b2c6716f37066d5f44c5c75c979394)
