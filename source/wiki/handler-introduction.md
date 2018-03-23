---
title: Handler
type: wiki
group: concept
order: 5.2
version: 2.1
---

### what's handler
 handler(adapter) is just like service in WeexSDK engine, it can service for component and module, you can use it directly in component、module and other native code.

### handler caller

handler decouples the interface implementation and its interface. You don't need to care more details about the implementation as a handler user, this can be done by the handler developer and the instance of handler will be only one during the lifecycle of application. You can define your own handler interface(protocol in iOS) and use it in any native code.

### the difference between module and handler

- position in app

   ![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/f027878afe0f3ff96444a32c3a92b230.png)  
   Assume that we have three weex page(WeexSDK instance) in navigation stacks, and they all use fetch module method during the render of page. There will be an instance of fetch module class in every page(WeexSDK instance) destroyed with page destroyed, but there will be only one for the instance of handler class.

- usage

  handler can be called in any native code including weex native component, module and other handlers, it cannot be used in javaScript directly.
  module can export some methods by native developers to front-end developers, it can be used in javaScript code.

### introduction to internal handler 

 - navigationHandler

    There is a default implementation for navigation insterface(protocol), this handler can be used in navigation module methods which complete pop and push operations.

 - imageLoaderHandler

    The image component is a container for image, you can specify url to load image, the logic for download image is in the imageLoaderHandler handler, image component only display image contents.

	WeexSDK doesn't provide default loader for image handler.

 - AppMonitorHandler
   
    There are some metrics collected during the render progress, and module caller frequency also collect, you can got these metrics by implementing `AppMonitorHandler` handler.
    WeexSDK doesn't provide default handler for `AppMonitorHandler`.
 
 - JSExceptionHandler
    
    There are some runtime exceptions during the execution of javaScript code, JSExceptionHandler provide the monitor for javaScript exception, WeexSDK will invoke this handler while exceptions occurs.

	WeexSDK doesn't provide default handler for `JSExceptionHandler`.

 - URLRewriteHandler

    image、video and web load content from specified url by adopting this rewrite rules, you can define your own rules for custom path.

    WeexSDK provide default handler for `URLRewriteHandler`. Get more details about the default [rewrite rules](../guide/advanced/path.html)
