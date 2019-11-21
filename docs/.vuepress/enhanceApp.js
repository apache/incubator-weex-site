var marked = require('marked');

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  require('jsdom-global')(undefined, {
    url: 'https://weex.io'
  });

  Vue.mixin({
    methods: {
      marked: function(input) {
        return marked(input);
      }
    }
  });

  Vue.prototype.API_PREFIX = 'https://fast.dotwe.org';
};
