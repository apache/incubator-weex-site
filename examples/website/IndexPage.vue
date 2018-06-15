<template>
  <div class="article-wrapper">
    <aside :class="['doc-nav', 'aside', language]">
      <div class="github">
        <a href="https://github.com/apache/incubator-weex-site/tree/master/examples" target="_blank" class="repo-link">
          <img class="github-logo" src="https://img.alicdn.com/tfs/TB1ciMDbwvD8KJjy0FlXXagBFXa-120-120.png" alt="apache/incubator-weex-site">
        </a>
      </div>
      <ul class="tab-list">
        <li :class="['tab-item', currentTab === tab.type ? 'active-tab' : '']"
          v-for="tab in tabs" :key="tab.type"
          @click="toggleTab(tab.type)">
          <span class="tab-title">{{tab.name | i18n}}</span>
        </li>
      </ul>
    </aside>
    <example-list class="article" :language="language" :type="currentTab" :category="selectedCategory"></example-list>
  </div>
</template>

<script>
  import getExamples from '../index'
  import ExampleList from './ExampleList.vue'

  const examples = getExamples({ filterTODO: false })
  export default {
    components: { ExampleList },
    data () {
      return {
        currentTab: 'component',
        language: Vue.config.language || 'en'
      }
    },
    computed: {
      tabs () {
        if (!Array.isArray(examples)) {
          return []
        }
        return examples.map(category => {
          const item = Object.assign({}, category)
          delete item.group
          return item
        })
      },
      selectedCategory () {
        if (!Array.isArray(examples)) {
          return {}
        }
        return examples.filter(tab => tab.type === this.currentTab)[0]
      }
    },
    methods: {
      toggleTab (tabType, hash) {
        if (this.tabs.some(tab => tab.type === tabType) && tabType !== this.currentTab) {
          this.currentTab = tabType
          if (typeof location !== 'undefined') {
            location.hash = `#${tabType}` + (hash ? `/${hash}` : '')
          }
        }
      }
    }
  }
</script>
