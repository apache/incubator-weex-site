// import Vue from 'vue'
import IndexPage from './IndexPage.vue'

// window.Vue = Vue
const language = window.currentLanguage || navigator.language
Vue.config.language = language.match(/^zh[_-]?\w*$/i) ? 'zh' : 'en'

function i18n (text) {
  if (typeof text === 'string') {
    return text
  }
  if (Object.prototype.toString.call(text) === '[object Object]') {
    const lang = Vue.config.language || 'en'
    return text[lang] || ''
  }
}

function parseHash () {
  if (typeof location === 'undefined' || !location.hash) {
    return {}
  }
  const res = /^#(\w+)(\/([-_+\w]+))?/.exec(location.hash)
  return { tab: res[1], hash: res[3] }
}

function relative (url) {
  const targetURL = new URL(url)
  if (targetURL.hostname === location.hostname) {
    return targetURL.pathname
  }
  // return url
  return targetURL.pathname
}

Vue.filter('i18n', i18n)
Vue.filter('relative', relative)
Vue.mixin({
  methods: { i18n, parseHash },
  watch: {
    language () {
      Vue.config.language = this.language
      this.$forceUpdate()
    }
  }
})

IndexPage.el = '#root'
const app = new Vue(IndexPage)

const hashRE = /^#(\w+)(\/([-_+\w]+))?/
function switchToTab () {
  const { tab, hash } = parseHash()
  app.toggleTab(tab, hash)
}
window.onhashchange = switchToTab
switchToTab()
