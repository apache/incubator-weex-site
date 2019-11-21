---
title: Android APIs
type: references
group: API
order: 2.2
version: 2.1
---

# WXSDKInstance

## Custom events
Used for a custom control for event notifications, such as custom click events, response drop events, and so on.

```
void fireEvent(elementRef,type)
void fireEvent(elementRef,type, data)
void fireEvent(elementRef,type,data,domChanges)
```

* `elementRef`(_String_): The event occurred for the control ID。

* `type`(_String_): Custom events, Weex defaults to a custom event starting with onXxxxx. OnPullDown (drop-down event)

* `data`(_Map<String, Object>_): Need to reveal the parameters, such as the current control of the size, coordinates and other information。

* `domChanges`(_Map<String, Object>_): Update ref for the control's Attribute and Style

## Event callback
Used for Module callback, for example, after the completion of positioning Module need to notify JS. Use as follows:

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
Weex gets the scroll event You can register `registerOnWXScrollListener` via `WXSDKInstance`

## Other Introduction

### setSize

You can use the `mWXSDKInstance.setSize()` method to change the size of the Weex container.

### Downgrade

Weex in the development stage will add some new features and new methods, but these new features and functions must be upgraded to achieve the SDK, for the application should not be upgraded how to deal with it? You can use the downgrade feature.

Native can be handled by the `onException` method in interface `IWXRenderListener`, and if it is an active demoulding errCode is a character that is divided by "|". "|" The preceding character is 1 for active demotion, and the Native side can jump to the corresponding H5 page. Or otherwise prompted the user's current environment does not support Weex.
