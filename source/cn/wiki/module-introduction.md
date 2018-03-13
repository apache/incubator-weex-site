---
title: module
type: wiki
group: 概念
order: 4.3
version: 2.1
---
## 什么是 module
  moudle 是完成一个操作的方法集合，在 Weex 的页面中，允许开发者 `require` 引入，调用 `module` 中的方法，WeexSDK 在启动时候，已经注册了一些内置的 module。

## module 注册过程
   native 端注册moudle 的流程如下图:
  ![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/300d1b44bb5b94f6f6c0322a355fa574.png)

## 内置 module
`stream` module, 开发者可以利用它给服务端发送网络请求，接受数据返回，开发者可以在 Weex 的页面中执行如下代码：
  ```javaScript
	 var stream = weex.requireModule('stream');
	stream.fetch({
        method: 'GET',
        url: 'http://httpbin.org/get',
        type:'jsonp'
      }, function(ret) {
		  console.log('in completion')
      },function(response){
        console.log('in progress')
      });
  ```
  查看 [stream](../references/modules/stream.html) 完整文档

## module 方法
  require 之后直接可以调用，相对于 [component 方法](./component-introduction.html) 可以不依赖特定的组件实例。