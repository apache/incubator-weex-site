# dom

`dom` 模块用于对 weex 页面里的组件节点进行一部分特定操作。

- `scrollToElement`
  将 list 的某个子节点滚动到当前视口
- `getComponentRect`
  获取某个组件的 bounding rect 布局信息
- `addRule`
  添加 font-face rule
- `getLayoutDirection`<Badge text="0.20.0+" type="warn" vertical="middle"/>
  获取某个组件的布局方向（rtl、lrt、inherit）

# API

## scrollToElement

让页面滚动到 ref 对应的组件，这个 API 只能用于可滚动组件的子节点，例如 `<scroller>`，`<list>`, `<waterfall>` 等可滚动组件中。

#### scrollToElement(ref, options)

* **@ref**，要滚动到的那个节点。
* **@options**
  * **`offset`**，一个到其可见位置的偏移距离，默认是 `0`。
  * **`animated`**，是否需要附带滚动动画，默认是 true。

[示例](http://dotwe.org/vue/56e0d256cbb26facd958dbd6424f42b2)

## getComponentRect

获取某个元素 View 的外框。

#### getComponentRect(ref, callback)

* **@ref**，要滚动到的那个节点。
* **@callback**，异步方法，通过回调返回信息。 

回调方法中的数据样例：
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

::: tip
如果要获取 viewport 的包围框，第一个参数  `ref` 可以指定为 `'viewport'`。
:::

[Demo](http://dotwe.org/vue/d69ec16302e06300096c7285baef538a)

::: tip

- 此方法需要在节点渲染后调用才能获取正确的信息，可在 `mounted` 或 更新数据后 `updated` 中调用
- 如果想要获取到 Weex 视口容器的布局信息，可以指定 ref 为字符串 'viewport'，即 getComponentRect('viewport', callback).

:::

## getLayoutDirection <Badge text="0.20.0+" type="warn" vertical="middle"/>

获取当前的布局方向，是 Left to Right，还是 Right to Left。

#### getLayoutDirection(ref, callback)

* **@ref**，要操作的节点。
* **@callback**，回调方法中返回排版方向信息。

callback方法返回数据样例：
```json
{
  "result": "rtl",
}
```

示例
```javascript
const element = this.$refs['kkk'][0];
dom.getLayoutDirection(element, function(ret) {
  console.log(ret.result);
});
```

## addRule <Badge text="0.12.0+" type="warn" vertical="middle"/>

Weex 提供 **DOM.addRule** 以加载自定义字体。开发者可以通过指定 **font-family**加载 *iconfont* 和 *custom font*。

开发者可以使用下面的代码加载自定义字体：
```javascript
const domModule = weex.requireModule('dom')
domModule.addRule('fontFace', {
    'fontFamily': "iconfont2",
    'src': "url('http://at.alicdn.com/t/font_1469606063_76593.ttf')"
});
```

#### addRule(type, contentObject)

* **@fontFace** 协议名称，不可修改。
* **@fontFamily** font-family的名称。
* **@src** 字体地址，url('') 是保留字段，其参数如下:
    * **`http`**. 从HTTP请求加载, e.g. `url('http://at.alicdn.com/t/font_1469606063_76593.ttf')`
    * **`https`**. 从HTTPS请求加载, e.g. `url('https://at.alicdn.com/t/font_1469606063_76593.ttf')`
    * **`local`**, *Android ONLY*. 从assets目录读取, e.g. `url('local://foo.ttf')`,  **foo.ttf** 是文件名在你的assets目录中.
    * **`file`**. 从本地文件读取, e.g. `url('file://storage/emulated/0/Android/data/com.alibaba.weex/cache/http:__at.alicdn.com_t_font_1469606063_76593.ttf')`
    * **`data`**. 从base64读取, e.g. `url('data:font/truetype;charset=utf-8;base64,AAEAAAALAIAAAwAwR1NVQrD+....')`, 上述data字段不全。

::: warning 注意
`addRule` 方法里的 `fontFamily` 可以随意取。这个名字不是字体真正的名字。字体真正的名字（font-family），也就是注册到系统中的名字是保存在字体二进制文件中的。你需要确保你使用的字体的真正名字（font-family）足够特殊，否则在向系统注册时可能发生冲突，导致注册失败，你的字符被显示为‘?’。

如果你使用 http://www.iconfont.cn/ 来构建你的 iconfont。确保在项目设置中，设置一个特殊的 font-family 名字。默认是 “iconfont”，但极大可能发生冲突。

调用`addRule` 在 `beforeCreate` 中是被推荐的。
:::

[示例](http://dotwe.org/vue/7e328ee2ac9b7205c9ee37f4e509263d).
