---
title: Android APIs
type: references
group: API
order: 2.2
version: 2.1
---

# WXSDKInstace

Weex Native 和 JavaScript 交互通信.

## 自定义发送事件

向JS环境发送一些事件，比如`click`事件

```
void fireEvent(elementRef,type)
void fireEvent(elementRef,type, data)
void fireEvent(elementRef,type,data,domChanges)
```

* `elementRef`(_String_)：产生事件的组件id

* `type`(_String_): 事件名称，weex默认事件名称格式为"onXXX",比如`OnPullDown `

* `data`(_Map<String, Object>_): 需要发送的一些额外数据，比如`click`时，view大小，点击坐标等等。

* `domChanges`(_Map<String, Object>_): 目标组件的属性和样式发生的修改内容


## 结果回调

JS调用时，有的场景需要返回一些数，比如以下例子，返回x、y坐标

```
public class WXLocation extends WXModule {

      @JSMethod
      public void getLocation(JSCallback callback){
      //Get the code for the location information .....
      Map<String,String> data=new HashMap<>();
      data.put("x","x");
      data.put("y","y");
      //notify once
      callback.invoke(data);
      //Continuous connection
      callback.invokeAndKeepAlive(data);
      //Invoke method and invokeAndKeepAlive two methods of choice  }
}
```

## OnWXScrollListener

如果想要拿到instance滚动的信息，需要在`WXSDKInstance`上注册`registerOnWXScrollListener` ，详细参数见`OnWXScrollListener `



## 其它的一些接口介绍
### 设置instance显示的大小

使用`mWXSDKInstance.setSize()`来改变instance容器显示的大小


### 降级

Weex在开发过程中，会不断增加新的feature，但是这些feature可能在老版本上不兼容。这种情况下，native可以在`IWXRenderListener`的`onException`中进行判断，如果错误信息是 "|"格式. 并且分割后，"|"前第一个字符串等于1，这时候native可以直接降级到h5页面或者提示用户当前版本不支持。
