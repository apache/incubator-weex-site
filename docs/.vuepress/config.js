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
        nav: [
          { text: 'Tutorial', link: '/guide/' },
          { text: 'Docs', link: '/docs/api/android-apis' }
        ],
        sidebar: {
          '/guide/': [
            {
              title: 'Getting Started',
              collapsable: false,
              children: [
                ['getting-started/install', 'Install'],
                ['getting-started/integrate-to-your-app', 'Integrate to Your App']
              ]
            },
            {
              title: 'Basic',
              collapsable: false,
              children: [
                ['basic/front-end-frameworks', 'Front-End Frameworks'],
                ['basic/platform-difference', 'Platform Difference'],
                ['basic/use-vue-in-weex', 'Use Vue.js on Weex']
              ]
            },
            {
              title: 'Develop',
              collapsable: false,
              children: [
                ['develop/setup-develop-environment', 'Setup Develop Environment'],
                ['develop/integrate-devtool-to-android', 'Integrate Devtool to Android'],
                ['develop/integrate-devtool-to-ios', 'Integrate Devtool to iOS']
              ]
            },
            {
              title: 'Debug',
              collapsable: false,
              children: [['debug/debug', 'Debug']]
            },
            {
              title: 'Extend',
              collapsable: false,
              children: [
                ['extend/extend-android', 'Extend Android'],
                ['extend/extend-ios', 'Extend iOS'],
                ['extend/extend-ios-with-swift', 'Extend iOS with swift'],
                ['extend/extend-web', 'Extend Web Renderer'],
                ['extend/extend-framework', 'Extend JS framework']
              ]
            },
            {
              title: 'Advanced',
              collapsable: false,
              children: [
                ['advanced/asset-path', 'Asset Path'],
                ['advanced/downgrade', 'Downgrade'],
                ['advanced/use-vuex-and-vue-router', 'Use Vuex and vue-router'],
                ['advanced/mobile-app-architecture', 'Mobile App Architecture'],
                ['advanced/weex-page-architecture', 'Weex Page Architecture']
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
              collapsable: true,
              children: [
                ['api/android-apis', 'Android APIs'],
                ['api/ios-apis', 'iOS APIs'],
                ['api/weex-variable', 'Weex Variable'],
                ['api/js-service', 'JS Service'],
                ['api/broadcastchannel', 'BroadcastChannel']
              ]
            },
            {
              title: 'Build-in Components',
              collapsable: true,
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
                ['components/textarea', '<textarea>'],
                ['components/input', '<input>'],
                ['components/waterfall', '<waterfall>'],
                ['components/video', '<video>'],
                ['components/web', '<web>']
              ]
            },
            {
              title: 'Build-in Modules',
              collapsable: true,
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
              title: 'Style',
              collapsable: true,
              children: [
                ['styles/common-styles', 'Common Styles'],
                ['styles/text-styles', 'Text Styles'],
                ['styles/css-units', 'CSS Units'],
                ['styles/color-name', 'Color name']
              ]
            },
            {
              title: 'Event',
              collapsable: true,
              children: [
                ['events/common-events', 'Common Events'],
                ['events/event-bubbling', 'Event Bubble'],
                ['events/gesture', 'Gesture']
              ]
            },
            {
              title: 'Compatibility',
              collapsable: true,
              children: [['compatibility/compatibility', 'Compatibility']]
            }
          ]
        }
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        nav: [
          { text: '教程', link: '/zh/guide/' },
          { text: '文档', link: '/zh/docs/api/android-apis' }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              title: 'Getting Started',
              collapsable: false,
              children: [
                ['getting-started/install', 'Install'],
                ['getting-started/integrate-to-your-app', 'Integrate to Your App']
              ]
            },
            {
              title: 'Basic',
              collapsable: false,
              children: [
                ['basic/front-end-frameworks', 'Front-End Frameworks'],
                ['basic/platform-difference', 'Platform Difference'],
                ['basic/use-vue-in-weex', 'Use Vue.js on Weex']
              ]
            },
            {
              title: 'Develop',
              collapsable: false,
              children: [
                ['develop/setup-develop-environment', 'Setup Develop Environment'],
                ['develop/integrate-devtool-to-android', 'Integrate Devtool to Android'],
                ['develop/integrate-devtool-to-ios', 'Integrate Devtool to iOS']
              ]
            },
            {
              title: 'Debug',
              collapsable: false,
              children: [['debug/debug', 'Debug']]
            },
            {
              title: 'Extend',
              collapsable: false,
              children: [
                ['extend/extend-android', 'Extend Android'],
                ['extend/extend-ios', 'Extend iOS'],
                ['extend/extend-ios-with-swift', 'Extend iOS with swift'],
                ['extend/extend-web', 'Extend Web Renderer'],
                ['extend/extend-framework', 'Extend JS framework']
              ]
            },
            {
              title: 'Advanced',
              collapsable: false,
              children: [
                ['advanced/asset-path', 'Asset Path'],
                ['advanced/downgrade', 'Downgrade'],
                ['advanced/use-vuex-and-vue-router', 'Use Vuex and vue-router'],
                ['advanced/mobile-app-architecture', 'Mobile App Architecture'],
                ['advanced/weex-page-architecture', 'Weex Page Architecture']
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
          '/zh/docs/': [
            {
              title: 'API',
              collapsable: true,
              children: [
                ['api/android-apis', 'Android APIs'],
                ['api/ios-apis', 'iOS APIs'],
                ['api/weex-variable', 'Weex Variable'],
                ['api/js-service', 'JS Service'],
                ['api/broadcastchannel', 'BroadcastChannel']
              ]
            },
            {
              title: 'Build-in Components',
              collapsable: true,
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
                ['components/textarea', '<textarea>'],
                ['components/input', '<input>'],
                ['components/waterfall', '<waterfall>'],
                ['components/video', '<video>'],
                ['components/web', '<web>']
              ]
            },
            {
              title: 'Build-in Modules',
              collapsable: true,
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
              title: 'Style',
              collapsable: true,
              children: [
                ['styles/common-styles', 'Common Styles'],
                ['styles/text-styles', 'Text Styles'],
                ['styles/css-units', 'CSS Units'],
                ['styles/color-name', 'Color name']
              ]
            },
            {
              title: 'Event',
              collapsable: true,
              children: [
                ['events/common-events', 'Common Events'],
                ['events/event-bubbling', 'Event Bubble'],
                ['events/gesture', 'Gesture']
              ]
            },
            {
              title: 'Compatibility',
              collapsable: true,
              children: [['compatibility/compatibility', 'Compatibility']]
            }
          ]
        }
      }
    }
  }
};
