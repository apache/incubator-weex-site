---
title: Component
type: wiki
group: 概念
order: 5.3
version: 2.1
---

### 什么是 component

 简单来讲，`component` 就类似 `Weex` 渲染引擎上的 `Widget`, 符合一定的规则的 `Widget`, 可以被 Weex engine 在初始化的时候正确的加载，开发者在 `DSL` 书写对应的标签名字(在注册的时提供的注册名字)， 比如内置的一些组件 `div`，`image` 和 `text`。它可以读取特定的属性，展示用户数据，承载和触发事件，如果 Weex 内置的组件不能满足你的开发需求，可以自定义你自己的 component。


### component 方法

 component 方法是组件支持的方法，JavaScript 可以直接对对应标签声明 `ref` 属性之后，直接可以调用对应方法的一个特性，例如下面例子。

 ```html
  <template>
    <mycomponent ref='mycomponent'></mycomponent>
  </template>
  <script>
    module.exports = {
      created:function() {
        this.$refs.mycomponent.focus();
      }
    }
  </script>
  ```
