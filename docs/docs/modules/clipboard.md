# clipboard <Badge text="0.8+" type="warn" vertical="middle"/>

- getString 获取粘贴板内容
- setString 设置粘贴板内容

## 使用场景

以前当我们收到一条短信验证码信息时，除了人肉拷贝，我们无法获取拷贝短信的内容。这是非常苦恼的。目前很多手机自带一键复制短信中的验证码到剪贴板功能，再配合使用 clipboard.getString() 接口，就可以直接获取到验证码信息，并且进行下一步操作，例如帮助用户自动填到对应输入框中。

::: warning 注意

- 仅支持文本拷贝
- 出于安全考虑和平台限制，只支持 Android 和 iOS，不支持 html5。

:::

## API

### getString(callback) <Badge text="only in android & ios" type="warning" />

> <small>从系统粘贴板读取内容</small>

- `callback: function(ret)`

  ret {Object} 为 callback 函数的参数，有两个属性:
  | key | 描述 |
  | ---------- | -------------------------------- |
  | ret.data | 获取到的文本内容 |
  | ret.result | 返回状态，可能为 success 或 fail |

  ```javascript
  clipboard.getString(ret => {
    this.message = ret.result === 'success' ? ret.data : '';
  });
  ```

### setString(text)

> <small>将一段文本复制到剪切板，相当于手动复制文本。</small>

- `text {string}`：要复制到剪切板的字符串。

  ```javascript
  clipboard.setString('要复制到剪贴板的内容');
  ```

## Demo

### setString + getString

[<IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1tzJaomzqK1RjSZFpXXakSXXa-265-438.png" />](http://dotwe.org/vue/2e3e71b2f296c69228ae0cbd5e5854fe)

<!-- [![](/clipboard-1.png)](http://dotwe.org/vue/2e3e71b2f296c69228ae0cbd5e5854fe) -->

<details>
  <summary>代码</summary>

```vue
<template>
  <div>
    <div class="row">
      <text class="label">set to clipboard: </text>
      <input :value="text" class="input" type="text"
        :autofocus="true" @input="handleChange"
      />
    </div>
    <div class="row btn-holder">
      <text class="btn" @click="handleSet">setString</text>
      <text class="btn" @click="handleGet">getString(not supported in web)</text>
    </div>
    <div class="row">
      <text class="label">get from clipboard: </text>
      <text>{{message}}</text>
    </div>
  </div>
</template>

<script>
const clipboard = weex.requireModule('clipboard');
const modal = weex.requireModule('modal');

export default {
  data() {
    return {
      text: '',
      message: ''
    };
  },
  methods: {
    handleSet() {
      clipboard.setString(this.text);
      modal.toast({
        message: 'set success',
        duration: 0.3
      });
    },
    handleGet() {
      clipboard.getString(ret => {
        this.message = ret.result === 'success' ? ret.data : '';
      });
    },
    handleChange(e) {
      this.text = e.value;
    }
  }
};
</script>

<style scoped>
.row {
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: #333;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
}
.label {
  width: 250px;
}
.input {
  width: 400px;
  height: 50px;
  color: black;
  border-width: 1px;
  border-color: black;
}
.btn-holder {
  justify-content: space-around;
}
.btn {
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  border-width: 1px;
  border-color: black;
  background-color: #238fff;
  color: #fff;
}
</style>
```

</details>
