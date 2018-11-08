# dom

用于对 weex 页面里的组件节点进行一部分特定操作。

- `scrollToElement`
  将 list 的某个子节点滚动到当前视口
- `getComponentRect`
  获取某个组件的 bounding rect 布局信息
- `addRule`
  添加 font-face rule

## API

### scrollToElement(ref, options)

让页面滚动到 ref 对应的组件

::: warning 注意

- `这个 API 只能用于可滚动组件的子节点，例如 <scroller>，<list>, <waterfall> 等可滚动组件中`
  :::

* `ref`
  你要滚动到的那个节点

- `options {object}`
  参数

  | key                        | 描述                       | 默认值 |
  | -------------------------- | -------------------------- | ------ |
  | options.offset {number}    | 一个到其可见位置的偏移距离 | 0      |
  | options.animated {boolean} | 是否需要附带滚动动画       | true   |

调用示例：

```javascript
const element = this.$refs['kkk'][0];
dom.scrollToElement(element, { offset: 0 });
```

[滚动到某层](http://dotwe.org/vue/56e0d256cbb26facd958dbd6424f42b2)

### getComponentRect(ref, callback)

- `ref`
  节点元素
- `callback: function(ret){}`
  回调，其中 `ret {object}` 格式如下:

  ```json
  // top, bottom, left, right 是相对于 `viewport` 的位置
  {
    "result": true,
    "size": {
      "bottom": 60,
      "height": 15,
      "left": 0,
      "right": 353,
      "top": 45,
      "width": 353
    }
  }
  ```

  调用示例：

  ```javascript
  const element = this.$refs['kkk'][0];
  dom.getComponentRect(element, function(ret) {
    if (ret.result) {
      console.log(ret.size);
    } else {
      console.log('获取失败');
    }
  });
  ```

[获取 box 的布局信息](http://dotwe.org/vue/96b4a0f35da552d2dfea3579d11120e4)

::: tip

- 此方法需要在节点渲染后调用才能获取正确的信息，可在 `mounted` 或 更新数据后 `updated` 中调用
- 如果想要获取到 Weex 视口容器的布局信息，可以指定 ref 为字符串 'viewport'，即 getComponentRect('viewport', callback).

:::

### addRule(type, contentObject)

`支持版本: >=0.12.0`
addRule 是可以为 dom 添加一条规则，目前支持自定义字体 fontFace 规则，构建自定义的 font-family，可以在 text 使用

- fontFace

  ```javascript
  const domModule = weex.requireModule('dom');
  domModule.addRule('fontFace', {
    fontFamily: 'iconfont2',
    src: "url('http://at.alicdn.com/t/font_1469606063_76593.ttf')"
  });
  ```

  ::: tip

  - addRule 目前仅支持添加 ‘font-face’
  - 字体只支持 ttf 和 woff

  :::

[add rule fontface](http://dotwe.org/vue/95b2c6716f37066d5f44c5c75c979394)

## DEMO

[<IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1hVg_n8LoK1RjSZFuXXXn0XXa-262-433.png" />](http://dotwe.org/vue/d8459936b12ed070ccf6bf5b953aa344)

<!-- [![](https://img.alicdn.com/tfs/TB1hVg_n8LoK1RjSZFuXXXn0XXa-262-433.png)](http://dotwe.org/vue/d8459936b12ed070ccf6bf5b953aa344) -->

<details>
  <summary>代码</summary>

```vue
  <template>
    <div class="root">
      <list class="list">
        <cell v-for="item in items" v-bind:key="item.title">
          <div :ref="`widget${item.title}`" class="widget">
            <text>widget{{item.title}}</text>
            <text>iconfont{{item.title}}</text>
            <text :style="{fontFamily:`iconfont${item.title}`, fontSize: '50px'}">&#xe748;</text>
          </div>
        </cell>
      </list>
      <div class="btn-holder">
        <text class="btn" @click="getComponentRect">getComponentRect of 10</text>
        <text class="btn" @click="scrollToElement">scroll to 10</text>
        <text class="btn" @click="addRule">addRule</text>
      </div>
      <div class="message">
        <text>{{message}}</text>
      </div>
    </div>
  </template>

  <script>
const dom = weex.requireModule('dom');
const modal = weex.requireModule('modal');

export default {
  data() {
    return {
      targetIndex: 10,
      items: [],
      trigger: '',
      message: ''
    };
  },
  created() {
    const targetIndex = this.targetIndex;
    const items = [];
    for (let i = 0; i < 30; i++) {
      items.push({
        title: i,
        desc: i === targetIndex ? '&#xe748;' : ''
      });
    }
    this.items = items;
  },
  methods: {
    getStyle(i) {
      return {};
    },
    addRule() {
      const targetIndex = this.targetIndex;
      modal.toast({
        message: `addRule to iconfont${targetIndex}`
      });
      this.scrollToElement();
      dom.addRule('fontFace', {
        fontFamily: `iconfont${targetIndex}`,
        src: "url('http://at.alicdn.com/t/font_zn5b3jswpofuhaor.ttf')"
      });
    },
    scrollToElement() {
      const element = this.$refs[`widget${this.targetIndex}`][0];
      dom.scrollToElement(element);
    },
    getComponentRect() {
      const element = this.$refs[`widget${this.targetIndex}`][0];
      dom.getComponentRect(element, data => {
        this.message = JSON.stringify(data);
      });
    }
  }
};
</script>


  <style scoped>
.root {
  width: 700px;
  margin-left: 25px;
}
.list {
  height: 600px;
  width: 700px;
}
.widget {
  height: 150px;
  width: 700px;
  border-width: 1px;
}
.btn-holder {
  flex-direction: row;
  margin-top: 10px;
}
.btn {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #00b4ff;
  margin-right: 10px;
  color: #fff;
}
.message {
  margin-top: 10px;
  border-width: 1px;
  height: 300px;
  width: 700px;
}
</style>
```

</details>
