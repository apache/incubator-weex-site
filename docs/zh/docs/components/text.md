# &lt;text&gt;

## 简介

`<text>` 是 Weex 内置的组件，用来将文本按照指定的样式渲染出来.

> **注意：** `<text>` 里直接写文本头尾空白会被过滤，如果需要保留头尾空白，暂时只能通过数据绑定写头尾空格。

> **注意：** `<text>`不支持子组件。

## 样式
* 支持 **[通用样式](../styles/common-styles.html)。**
* 支持 **[文本样式](../styles/text-styles.html)。**

## 属性
除了动态文本，text组件不支持其他属性
### dynamic text
下列代码片段可以实现文字内容和JS变量的绑定。

      <template>
        <div>
          <text >{{content}}</text>
        </div>
      </template>
      <script>
        module.exports = {
          data: function(){
            return {
                content: "Weex is an cross-platform development solution that builds high-performance, scalable native applications with a Web development experience. Vue is a lightweight and powerful progressive front-end framework. "
            }
          }
      }
      </script>

## 事件
支持 **[通用事件](../events/common-events.html)**。

## 其他
### 文字高度
文字高度的计算规则比较复杂，但大致上遵循以下优先级进行计算，排在前面的优先级最高。
1. 文字节点的`max-height`/`min-height`样式。
2. 文字节点的`flex`属性且文字的父节点上有`flex-direction:column`样式。
3. 文字节点的`height`样式。
4. 文字节点的`align-items:stretch`如果文字父节点有 `flex-direction:row`样式。
5. 文字内容和文字本身的[样式](../styles/text-styles.html)。
6. 其他相关CSS属性。


### 自定义字体
`支持版本:v0.12.0`

支持ttf和woff字体格式的自定义字体, 可以通过调用 `dom` module 里面的 [addRule](../modules/dom.html)方法, 构建自定义的`font-family`使用, addRule 建议在 `beforeCreate` 或者更早时调用

## 示例
* [`<text>`的基本用法](http://dotwe.org/vue/7d2bf6e112ea26984fd5930663f092e0)