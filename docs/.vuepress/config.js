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
    version: 'v0.20',
    versionLink: '/release-note.html',
    logo: 'https://img.alicdn.com/tfs/TB1WtVjogHqK1RjSZFgXXa7JXXa-78-39.svg',
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        lastUpdated: 'Last Updated',
        editLinkText: 'Edit this page on GitHub',
        scoreText: {
          good: 'Excellent doc',
          bad: 'Unusable doc'
        },
        nav: [
          { text: 'Guide', link: '/guide/' },
          { text: 'Docs', link: '/docs/' },
          { text: 'Tools', link: '/tools/' },
          { text: 'Community', link: '/community/' },
          { text: 'Blog', link: '/blog/' }
        ],
        sidebar: {
          '/guide/': [
            {
              title: 'Getting Started',
              collapsable: false,
              children: [
                ['introduction', 'Introduction'],
                ['front-end-frameworks', 'Front-End Frameworks'],
                ['platform-difference', 'Platform Difference'],
                ['use-vue-in-weex', 'Use Vue in Weex'],
                ['use-rax-in-weex', 'Use Rax in Weex']
              ]
            },
            {
              title: 'Develop',
              collapsable: false,
              children: [
                ['develop/setup-develop-environment', 'Setup Develop Environment'],
                ['develop/create-a-new-app', 'Create a New App'],
                ['develop/integrate-to-android-app', 'Integrate to Android'],
                ['develop/integrate-to-iOS-app', 'Integrate to iOS']
              ]
            },
            {
              title: 'Debug',
              collapsable: false,
              children: [
                ['debug/integrate-devtool-to-android', 'Integrate Devtool to Android'],
                ['debug/integrate-devtool-to-ios', 'Integrate Devtool to iOS'],
                ['debug/debug', 'Debug']
              ]
            },
            {
              title: 'Extend',
              collapsable: false,
              children: [
                ['extend/extend-android', 'Extend Android'],
                ['extend/extend-ios', 'Extend iOS'],
                ['extend/extend-ios-with-swift', 'Extend iOS with Swift'],
                ['extend/extend-web', 'Extend Web Renderer']
              ]
            },
            {
              title: 'Advanced',
              collapsable: false,
              children: [
                ['advanced/asset-path', 'Asset Path'],
                ['advanced/downgrade', 'Downgrade'],
                ['advanced/use-vuex-and-vue-router', 'Use Vuex and vue-router']
              ]
            },
            {
              title: 'Contribute',
              collapsable: false,
              children: [
                ['contribute/how-to-contribute', 'How To Contribute'],
                ['contribute/development-process', 'Development Process'],
                ['contribute/bug-report-guidelines', 'Bug Report Guidelines']
              ]
            }
          ],
          '/docs/': [
            {
              title: 'API',
              collapsable: false,
              children: [
                ['api/weex-variable', 'Weex Variable'],
                ['api/android-apis', 'Android APIs'],
                ['api/ios-apis', 'iOS APIs'],
                ['api/js-service', 'JS Service'],
                ['api/broadcast-channel', 'BroadcastChannel']
              ]
            },
            {
              title: 'Built-in Components',
              collapsable: false,
              children: [
                ['components/a', '<a>'],
                ['components/div', '<div>'],
                ['components/text', '<text>'],
                ['components/image', '<image>'],
                ['components/list', '<list>'],
                ['components/cell', '<cell>'],
                ['components/loading', '<loading>'],
                ['components/refresh', '<refresh>'],
                ['components/recycle-list', '<recycle-list>'],
                ['components/scroller', '<scroller>'],
                ['components/slider', '<slider>'],
                ['components/indicator', '<indicator>'],
                ['components/textarea', '<textarea>'],
                ['components/input', '<input>'],
                ['components/waterfall', '<waterfall>'],
                ['components/video', '<video>'],
                ['components/web', '<web>'],
                ['components/richtext', '<richtext>']
              ]
            },
            {
              title: 'Built-in Modules',
              collapsable: false,
              children: [
                ['modules/animation', 'animation'],
                ['modules/clipboard', 'clipboard'],
                ['modules/dom', 'dom'],
                ['modules/globalEvent', 'globalEvent'],
                ['modules/meta', 'meta'],
                ['modules/modal', 'modal'],
                ['modules/navigator', 'navigator'],
                ['modules/picker', 'picker'],
                ['modules/storage', 'storage'],
                ['modules/stream', 'stream'],
                ['modules/webview', 'webview'],
                ['modules/websockets', 'webSockets']
              ]
            },
            {
              title: 'Styles',
              collapsable: false,
              children: [
                ['styles/common-styles', 'Common Styles'],
                ['styles/text-styles', 'Text Styles'],
                ['styles/css-units', 'CSS Units'],
                ['styles/color-name', 'Color name']
              ]
            },
            {
              title: 'Events',
              collapsable: false,
              children: [
                ['events/common-events', 'Common Events'],
                ['events/event-bubbling', 'Event Bubble'],
                ['events/gesture', 'Gesture']
              ]
            }
          ],
          '/tools/': [
            ['playground', 'Playground App'],
            ['toolkit', 'Weex Toolkit'],
            ['extension', 'VSCode Extension']
          ],
          '/community/': [['roadmap', 'Roadmap'], ['weex-third-party-extensions', 'Weex Third Party Plugins']],
          '/blog/': [
            ['write-a-blog', 'Write a Blog']
          ]
        }
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        lastUpdated: '上次更新',
        editLinkText: '在 GitHub 上编辑此页',
        scoreText: {
          good: '文档写得很棒',
          bad: '文档写得很差'
        },
        nav: [
          { text: '指南', link: '/zh/guide/' },
          { text: '文档', link: '/zh/docs/' },
          { text: '工具', link: '/zh/tools/' },
          { text: '社区', link: '/zh/community/' },
          { text: '博客', link: '/zh/blog/' }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              title: '快速上手',
              collapsable: false,
              children: [
                ['introduction', '简介'],
                ['front-end-frameworks', '前端框架'],
                ['platform-difference', '平台差异'],
                ['use-vue-in-weex', '在Weex中使用Vue.js'],
                ['use-rax-in-weex', '在Weex中使用Rax.js']
              ]
            },
            {
              title: '开发',
              collapsable: false,
              children: [
                ['develop/setup-develop-environment', '设置开发环境'],
                ['develop/create-a-new-app', '创建一个新的app'],
                ['develop/integrate-to-android-app', '集成到Android应用'],
                ['develop/integrate-to-iOS-app', '集成到iOS应用']
              ]
            },
            {
              title: '调试',
              collapsable: false,
              children: [
                ['debug/integrate-devtool-to-android', '集成Devtool到Android'],
                ['debug/integrate-devtool-to-ios', '集成Devtool到iOS'],
                ['debug/debug', 'Debug']
              ]
            },
            {
              title: '扩展',
              collapsable: false,
              children: [
                ['extend/extend-android', '扩展Android能力'],
                ['extend/extend-ios', '扩展iOS能力'],
                ['extend/extend-ios-with-swift', '使用Swift扩展iOS能力'],
                ['extend/extend-web', '扩展Web组件']
              ]
            },
            {
              title: '高阶特性',
              collapsable: false,
              children: [
                ['advanced/asset-path', '资源路径'],
                ['advanced/downgrade', '降级方案'],
                ['advanced/use-vuex-and-vue-router', '使用Vuex和vue-router']
              ]
            },
            {
              title: '贡献',
              collapsable: false,
              children: [
                ['contribute/how-to-contribute', 'How To Contribute'],
                ['contribute/development-process', 'Development Process'],
                ['contribute/bug-report-guidelines', 'Bug Report Guidelines']
              ]
            }
          ],
          '/zh/docs/': [
            {
              title: 'API',
              collapsable: false,
              children: [
                ['api/weex-variable', 'Weex Variable'],
                ['api/android-apis', 'Android APIs'],
                ['api/ios-apis', 'iOS APIs'],
                ['api/js-service', 'JS Service'],
                ['api/broadcast-channel', 'BroadcastChannel']
              ]
            },
            {
              title: 'Built-in Components',
              collapsable: false,
              children: [
                ['components/a', '<a>'],
                ['components/div', '<div>'],
                ['components/text', '<text>'],
                ['components/image', '<image>'],
                ['components/list', '<list>'],
                ['components/cell', '<cell>'],
                ['components/loading', '<loading>'],
                ['components/refresh', '<refresh>'],
                ['components/recycle-list', '<recycle-list>'],
                ['components/scroller', '<scroller>'],
                ['components/slider', '<slider>'],
                ['components/indicator', '<indicator>'],
                ['components/textarea', '<textarea>'],
                ['components/input', '<input>'],
                ['components/waterfall', '<waterfall>'],
                ['components/video', '<video>'],
                ['components/web', '<web>'],
                ['components/richtext', '<richtext>']
              ]
            },
            {
              title: 'Built-in Modules',
              collapsable: false,
              children: [
                ['modules/animation', 'animation'],
                ['modules/clipboard', 'clipboard'],
                ['modules/dom', 'dom'],
                ['modules/globalEvent', 'globalEvent'],
                ['modules/meta', 'meta'],
                ['modules/modal', 'modal'],
                ['modules/navigator', 'navigator'],
                ['modules/picker', 'picker'],
                ['modules/storage', 'storage'],
                ['modules/stream', 'stream'],
                ['modules/webview', 'webview'],
                ['modules/websockets', 'webSockets']
              ]
            },
            {
              title: 'Styles',
              collapsable: false,
              children: [
                ['styles/common-styles', 'Common Styles'],
                ['styles/text-styles', 'Text Styles'],
                ['styles/css-units', 'CSS Units'],
                ['styles/color-name', 'Color name']
              ]
            },
            {
              title: 'Events',
              collapsable: false,
              children: [
                ['events/common-events', 'Common Events'],
                ['events/event-bubbling', 'Event Bubble'],
                ['events/gesture', 'Gesture']
              ]
            }
          ],
          '/zh/tools/': [
            ['playground', 'Playground App'],
            ['toolkit', 'Weex Toolkit'],
            ['extension', 'VSCode Extension']
          ],
          '/zh/community/': [['roadmap', 'Roadmap'], ['weex-third-party-extensions', 'Weex 三方插件']],
          '/zh/blog/': [
            ['write-a-blog', '写一篇博客'],
            ['weex-auto-test-locating', 'Weex自动化测试元素定位方案']
          ]
        }
      }
    }
  }
};
