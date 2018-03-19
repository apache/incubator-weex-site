---
title: module
type: wiki
group: concept
order: 5.3
version: 2.1
---
## what's module
  module is a set of method operation, you can `require` it and call method in it. During the initialization of WeexSDK, some internal modules has been registered to the engine.

## native module process of module registration
  ![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/300d1b44bb5b94f6f6c0322a355fa574.png)

## internal module

`stream` module: it provide a method called `fetch` which can invoke a network request to specified server, you can get more details [here](../references/modules/stream.html). 

for example: 

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

## differnce between module method and component method
  For module method you can call after require the target module and it doesn't rely on any component instance.  For component method you must get the ref for component first and then call the [component method](./component-introduction.html)