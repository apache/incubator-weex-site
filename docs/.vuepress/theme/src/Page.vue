<template>
  <div class="page">
    <slot name="top"/>

    <Content :custom="false"/>

    <div class="page-nav" v-if="prev || next">
      <p class="inner">
        <span
          v-if="prev"
          class="prev"
        >
          ←
          <router-link
            v-if="prev"
            class="prev"
            :to="prev.path"
          >
            {{ prev.title || prev.path }}
          </router-link>
        </span>

        <span
          v-if="next"
          class="next"
        >
          <router-link
            v-if="next"
            :to="next.path"
          >
            {{ next.title || next.path }}
          </router-link>
          →
        </span>
      </p>
    </div>

    <div class="page-edit">
      <div
        class="last-updated"
        v-if="lastUpdated"
      >
        <span class="prefix">{{ lastUpdatedText }}: </span>
        <span class="time">{{ lastUpdated }}</span>
      </div>

      <div
        class="edit-link"
        v-if="editLink"
      >
        <a
          :href="editLink"
          target="_blank"
          rel="noopener noreferrer"
        >{{ editLinkText }}</a>
        <OutboundLink/>
        <a
          :href="issueLink()"
          target="_blank"
          rel="noopener noreferrer"
          class="issueText"
        >{{ openIssueText }}</a>
        <OutboundLink/>
      </div>

      <div class="score">
        <span class="choice"><img @click="scorePlus" class="score-icon" :src="scoreGood ? 'https://img.alicdn.com/tfs/TB1DOvPqCzqK1RjSZPxXXc4tVXa-20-18.svg' : 'https://img.alicdn.com/tfs/TB1h7TSqpYqK1RjSZLeXXbXppXa-20-18.svg'" />{{ scoreText.good }}</span>
        <span class="choice"><img @click="scoreMinus" class="score-icon bad" :src="scoreBad ? 'https://img.alicdn.com/tfs/TB1DOvPqCzqK1RjSZPxXXc4tVXa-20-18.svg' : 'https://img.alicdn.com/tfs/TB1h7TSqpYqK1RjSZLeXXbXppXa-20-18.svg'" />{{ scoreText.bad }}</span>
      </div>
    </div>

    <div v-show="isApache" class="license-wrap">
      <License />
    </div>

    <slot name="bottom"/>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import { resolvePage, normalize, outboundRE, endingSlashRE } from './util'
import License from './License.vue';

export default {
  props: ['sidebarItems'],

  components: {
    License
  },

  data() {
    return {
      scoreGood: false,
      scoreBad: false,
      path: '',
      isApache: window.location.href.indexOf('weex.apache.org') !== -1
    }
  },

  watch: {
    $route() {
      if (!this.path) {
        this.path = this.$route.path;
      } else if (this.path !== this.$route.path) {
        // console.log(this.$route.path, this.path)
        this.scoreGood = false;
        this.scoreBad = false;
      }
    }
  },

  computed: {
    lastUpdated () {
      if (this.$page.lastUpdated) {
        return new Date(this.$page.lastUpdated).toLocaleDateString(this.$lang)
      }
    },

    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },

    prev () {
      const prev = this.$page.frontmatter.prev
      if (prev === false) {
        return
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page, this.sidebarItems)
      }
    },

    next () {
      const next = this.$page.frontmatter.next
      if (next === false) {
        return
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    },

    editLink () {
      if (this.$page.frontmatter.editLink === false) {
        return
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }
      if (docsRepo && editLinks) {
        return this.createEditLink(repo, docsRepo, docsDir, docsBranch, path)
      }
    },

    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      )
    },

    issueLink() {
      return function() { 
        return `https://github.com/apache/incubator-weex-site/issues/new?body=${encodeURIComponent(location.href)}`
      }
    },

    openIssueText() {
      return (
        this.$themeLocaleConfig.openIssueText ||
        this.$site.themeConfig.openIssueText ||
        null
      )
    },

    scoreText () {
      return (
        this.$themeLocaleConfig.scoreText ||
        this.$site.themeConfig.scoreText ||
        null
      )
    }
  },

  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo)
          ? docsRepo
          : repo
        return (
          base.replace(endingSlashRE, '') +
           `/${docsBranch}` +
           (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
           path +
           `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`

      return (
        base.replace(endingSlashRE, '') +
        `/edit/${docsBranch}` +
        (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
        path
      )
    },

    scorePlus () {
      if (this.scoreGood) return;
      if (axios) {
        axios.post(`${this.API_PREFIX}/api/like/islike`, qs.stringify({url: this.$route.path, islike: 1 })).then(() => {
          this.scoreGood = true;
          this.scoreBad = false;
        }).catch(err => console.error(err))
      }
    },

    scoreMinus () {
      if (this.scoreBad) return;
      if (axios) {
        axios.post(`${this.API_PREFIX}/api/like/islike`, qs.stringify({url: this.$route.path, islike: 0 })).then(() => {
          this.scoreGood = false;
          this.scoreBad = true;
        }).catch(err => console.error(err))
      }
    }
  }
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

function find (page, items, offset) {
  const res = []
  items.forEach(item => {
    if (item.type === 'group') {
      res.push(...item.children || [])
    } else {
      res.push(item)
    }
  })
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === page.path) {
      return res[i + offset]
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'
@require './styles/wrapper.styl'

.page
  padding-bottom 2rem

.page-edit
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  overflow auto
  .edit-link
    margin-left 1rem
    display inline-block
    a
      color #606273
      margin-right 0.25rem
      text-decoration underline
      font-style italic
      font-size 14px
    .issueText
      margin-left 16px
  .last-updated
    font-size 14px
    display inline-block
    .prefix
      font-weight 500
      color #373D41
    .time
      font-weight 400
      color #373D41
  .score
    float right
    display flex
    font-size 14px
    color #8A94AC
    .choice 
      margin-left 1rem
      display flex
      align-items center
      .score-icon
        margin-right 0.3rem
        cursor pointer
      .bad
        transform rotate(180deg)
        position relative
        top 2px

.page-nav
  @extend $wrapper
  padding-top 1rem
  padding-bottom 0
  .inner
    min-height 2rem
    margin-top 0
    margin-bottom 0
    border-bottom 1px solid $borderColor
    overflow auto // clear float
  .next
    float right

.license-wrap
  margin-top 3rem
  margin-left 11rem
  margin-right -4rem

@media (max-width: $MQMobile)
  .license-wrap
    margin-left 0
    margin-right 0
  .page-edit
    margin-left 0
  .page-nav
    margin-left 0
    .edit-link
      margin-bottom .5rem
    .last-updated
      font-size .8em
      float none
      text-align left

</style>
