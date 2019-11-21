<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

    <router-link
      :to="$localePath"
      class="home-link"
    >
      <img
        class="logo"
        v-if="$site.themeConfig.logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      >
    </router-link>
    <span class="version">
      <a class="version-bg" :href="$site.themeConfig.versionLink">
        <img src="./version-bg.svg" :alt="$site.themeConfig.version">
        <span class="version-no">{{$site.themeConfig.version}}</span>
      </a>
    </span>

    <div class="links">
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <SearchBox v-else-if="$site.themeConfig.search !== false"/>

      <NavLinks class="can-hide"/>

      <!-- repo link -->
      <a
        v-if="repoLink"
        :href="repoLink"
        class="repo-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img class="github-icon" src="./github.svg" alt="github">
      </a>
    </div>
  </header>
</template>

<script>
import SidebarButton from './SidebarButton.vue'
import AlgoliaSearchBox from './AlgoliaSearchBox'
import SearchBox from './SearchBox.vue'
import NavLinks from './NavLinks.vue'

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    },

    repoLink () {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo)
          ? repo
          : `https://github.com/${repo}`
      }
    },
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.navbar
  padding 0.7rem 1.5rem
  line-height $navbarHeight - 1.4rem
  position relative
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 10px
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .version
    position relative
    .version-bg
      position absolute
      line-height 0
      top -6px
    .version-no
      position absolute
      top 7.5px
      left 8px
      font-size 12px
      transform scale(0.84)
      color: #fff
  .links
    font-size 0.9rem
    position absolute
    right 1.5rem
    top 0.7rem
    display flex
    justify-content center
  .repo-link
    width 2.2rem
    height 2.2rem
    margin-left 1.5rem
    .github-icon
      width 2.2rem
      height 2.2rem

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .repo-link
      display none
</style>
