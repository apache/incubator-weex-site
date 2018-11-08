module.exports = {
  title: 'WEEX',
  description: 'Weex',
  locales: {
    '/': {
      lang: 'en-US'
    },
    '/zh/': {
      lang: 'zh-CN'
    }
  },
  theme: 'fast',
  themeConfig: {
    repo: 'apache/incubator-weex-site',
    docsRepo: 'apache/incubator-weex-site',
    docsBranch: 'draft',
    version: 'v0.19',
    versionLink: '/release-note.html',
    logo: 'https://img.alicdn.com/tfs/TB1WtVjogHqK1RjSZFgXXa7JXXa-78-39.svg',
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        nav: [{ text: 'Tutorial', link: '/guide/' }, { text: 'Docs', link: '/docs/' }],
        sidebar: {
          '/guide/': [
            {
              title: 'Getting Started',
              collapsable: false,
              children: [
                ['', 'Install'],
                ['weex', 'Overview'],
                ['dsl', 'DSL'],
                ['vue-in-weex', 'Use Vue.js on Weex']
              ]
            },
            {
              title: 'Style',
              collapsable: false,
              children: [
                ['common-styles', 'Common Styles'],
                ['text-styles', 'Text Styles'],
                ['css-units', 'CSS Units'],
                ['color-list', 'Color name']
              ]
            },
            {
              title: 'Event',
              collapsable: false,
              children: [
                ['common-events', 'Common Events'],
                ['event-bubbling', 'Event Bubble'],
                ['gesture', 'Gesture']
              ]
            },
            {
              title: 'Integrate to Your App',
              collapsable: false,
              children: [
                ['integrate-android', 'Integrate to Android'],
                ['android-api', 'Android APIs'],
                ['integrate-ios', 'Integrate to iOS'],
                ['ios-api', 'iOS API']
              ]
            },
            {
              title: 'Extend',
              collapsable: false,
              children: [
                ['extend-android', 'Extend Android'],
                ['extend-ios', 'Extend iOS'],
                ['extend-ios-with-swift', 'Extend iOS with swift'],
                ['extend-web', 'Extend Web Renderer'],
                ['extend-framework', 'Extend JS framework']
              ]
            }
          ],
          '/docs/': [
            {
              title: 'Build-in Components',
              collapsable: false,
              children: [
                ['a', '<a>'],
                ['div', '<div>'],
                ['text', '<text>'],
                ['image', '<image>'],
                ['list', '<list>'],
                ['cell', '<cell>'],
                ['loading', '<loading>'],
                ['refresh', '<refresh>'],
                ['recycle-list', '<recycle-list>'],
                ['scroller', '<scroller>'],
                ['slider', '<slider>'],
                ['textarea', '<textarea>'],
                ['input', '<input>'],
                ['waterfall', '<waterfall>'],
                ['video', '<video>'],
                ['web', '<web>']
              ]
            },
            {
              title: 'Open Source Components',
              collapsable: false,
              children: [['weex-ui', 'Weex Ui']]
            },
            {
              title: 'Build-in Modules',
              collapsable: false,
              children: [
                ['animation', 'animation'],
                ['clipboard', 'clipboard'],
                ['dom', 'dom'],
                ['globalEvent', 'globalEvent'],
                ['meta', 'meta'],
                ['modal', 'modal'],
                ['navigator', 'navigator'],
                ['picker', 'picker'],
                ['storage', 'storage'],
                ['stream', 'stream'],
                ['webview', 'webview'],
                ['websockets', 'webSockets']
              ]
            },
            {
              title: 'Weex Variable',
              collapsable: false,
              children: [
                ['variable.html#说明', '说明'],
                ['variable.html#weex-config', 'weex.config'],
                ['variable.html#weex-document', 'weex.document'],
                ['variable.html#weex-requiremodule', 'weex.requireModule()'],
                ['variable.html#weex-supports', 'weex.supports()'],
                ['variable.html#weex-isregisteredmodule', 'weex.isRegisteredModule()'],
                ['variable.html#weex-isregisteredcomponent', 'weex.isRegisteredComponent()']
              ]
            }
          ]
        }
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        nav: [{ text: '教程', link: '/zh/guide/' }, { text: '文档', link: '/zh/docs/' }],
        sidebar: {
          '/zh/guide/': [
            {
              title: '快速开始',
              collapsable: false,
              children: [
                ['', '安装'],
                ['weex', '概述'],
                ['dsl', 'DSL'],
                ['vue-in-weex', '使用 Vue.js']
              ]
            },
            {
              title: '支持的样式',
              collapsable: false,
              children: [
                ['common-styles', '通用样式'],
                ['text-styles', '文本样式'],
                ['css-units', 'CSS 单位'],
                ['color-list', '颜色列表']
              ]
            },
            {
              title: '支持的事件',
              collapsable: false,
              children: [
                ['common-events', '通用事件'],
                ['event-bubbling', '事件冒泡'],
                ['gesture', '手势']
              ]
            },
            {
              title: '集成 Weex',
              collapsable: false,
              children: [
                ['integrate-android', '集成到 Android'],
                ['android-api', '高级 Android API'],
                ['integrate-ios', '集成到 iOS'],
                ['ios-api', '高级 iOS API']
              ]
            },
            {
              title: '扩展 Weex',
              collapsable: false,
              children: [
                ['extend-android', '扩展 Android'],
                ['extend-ios', '扩展 iOS'],
                ['extend-ios-with-swift', '使用 swift 扩展 iOS'],
                ['extend-web', '扩展 HTML5'],
                ['extend-framework', '扩展前端框架']
              ]
            }
          ],
          '/zh/docs/': [
            {
              title: '内置组件',
              collapsable: false,
              children: [
                ['a', '<a>'],
                ['div', '<div>'],
                ['text', '<text>'],
                ['image', '<image>'],
                ['list', '<list>'],
                ['cell', '<cell>'],
                ['loading', '<loading>'],
                ['refresh', '<refresh>'],
                ['recycle-list', '<recycle-list>'],
                ['scroller', '<scroller>'],
                ['slider', '<slider>'],
                ['textarea', '<textarea>'],
                ['input', '<input>'],
                ['waterfall', '<waterfall>'],
                ['video', '<video>'],
                ['web', '<web>']
              ]
            },
            {
              title: '开源组件',
              collapsable: false,
              children: [['weex-ui', 'Weex Ui']]
            },
            {
              title: '内置模块',
              collapsable: false,
              children: [
                ['animation', 'animation'],
                ['clipboard', 'clipboard'],
                ['dom', 'dom'],
                ['globalEvent', 'globalEvent'],
                ['meta', 'meta'],
                ['modal', 'modal'],
                ['navigator', 'navigator'],
                ['picker', 'picker'],
                ['storage', 'storage'],
                ['stream', 'stream'],
                ['webview', 'webview'],
                ['websockets', 'webSockets']
              ]
            },
            {
              title: '实例变量',
              collapsable: false,
              children: [
                ['variable.html#说明', '说明'],
                ['variable.html#weex-config', 'weex.config'],
                ['variable.html#weex-document', 'weex.document'],
                ['variable.html#weex-requiremodule', 'weex.requireModule()'],
                ['variable.html#weex-supports', 'weex.supports()'],
                ['variable.html#weex-isregisteredmodule', 'weex.isRegisteredModule()'],
                ['variable.html#weex-isregisteredcomponent', 'weex.isRegisteredComponent()']
              ]
            }
          ]
        }
      }
    }
  }
};
