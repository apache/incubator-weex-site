<template>
  <main ref="container" class="example-panel">
    <section class="example-section" v-for="(category, i) in category.group" :key="`${category.type}-${i}`">
      <h2 :ref="category.type" class="title" @click="scrollTo(category.type)">{{category.title || category.name | i18n}}</h2>
      <p class="desc" v-if="category.desc || category.docLink">
        <span class="text" v-if="category.desc">{{category.desc | i18n}}</span>
        <a class="link" v-if="category.docLink" :href="category.docLink | i18n | relative">Read more</a>
      </p>
      <div class="example-list">
        <figure class="example-card" v-for="example in category.examples" :key="example.hash | i18n">
          <a class="preview" target="_blank" :href="example.hash | i18n | url">
            <img class="screenshot" :src="example.screenshot | i18n">
          </a>
          <figcaption class="message">{{example.title | i18n}}</figcaption>
        </figure>
      </div>
    </section>
  </main>
</template>

<script>
  export default {
    props: ['type', 'category', 'language'],
    filters: {
      url (hash) {
        return `http://dotwe.org/vue/${hash}`
      }
    },
    methods: {
      scrollTo (hash) {
        if (!hash) {
          hash = this.parseHash().hash
        }
        const $container = this.$refs.container
        const $tabs = this.$refs[hash]
        if ($tabs && $tabs.length) {
          // TODO: smooth scroll
          $container.scrollTop = $tabs[0].offsetTop
          if (typeof location !== 'undefined') {
            location.hash = `#${this.type}/${hash}`
          }
        } else {
          $container.scrollTop = 0
        }
      }
    },
    mounted () { this.scrollTo() },
    updated () { this.scrollTo() }
  }
</script>
