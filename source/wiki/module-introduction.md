---
title: Module
type: wiki
group: concept
order: 5.3
version: 2.1
---
## What is a module?
A module is a set of method operations. You can `require` it and call its methods. During the initialization of WeexSDK, some internal modules have already been registered by the engine.

## Native module registration process
  ![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/300d1b44bb5b94f6f6c0322a355fa574.png)

## Built-in modules
`stream` module: it provides a method called `fetch` which can invoke a network request to specified server. You can get more details [here](../references/modules/stream.html). 

For example: 

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

## Difference between module method and component method
For a module method, you can call the method after require and it doesn't rely on any component instance. For component method, you must get the ref for component first and then call the [component method](./component-introduction.html)
