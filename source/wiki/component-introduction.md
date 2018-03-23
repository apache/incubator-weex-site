---
title: Component
type: wiki
group: concept
order: 5.1
version: 2.1
---

### what's component

 Generally，`component` is a entity `Widget` in Weex engine, and it can be loaded if confirm to some details rules whlile the Weex engine init. It can display some detail contents, receive touch or other custom events, custom attributes. There are some internal components registered such as `div`, `image` and `text`, you can custom your own component if these can not meet your needs.


### component method

 you can call custom methods for a entity component after adding `ref` attributes, for example:

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
