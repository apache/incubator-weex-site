<template>
  <div class="sidebar">
    <NavLinks/>
    <slot name="top"/>
    <ul class="sidebar-links" v-if="items.length" ref="sidebarList">
      <li v-for="(item, i) in items" :key="i">
        <SidebarGroup
          v-if="item.type === 'group'"
          :item="item"
          :first="i === 0"
          :open="i === openGroupIndex"
          :collapsable="item.collapsable"
          @toggle="toggleGroup(i)"
        />
        <SidebarLink v-else :item="item"/>
      </li>
    </ul>
    <slot name="bottom"/>
  </div>
</template>

<script>
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import NavLinks from './NavLinks.vue'
import { isActive } from './util'

export default {
  components: { SidebarGroup, SidebarLink, NavLinks },

  props: ['items'],

  data () {
    return {
      openGroupIndex: 0
    }
  },

  created () {
    this.refreshIndex()
  },

  mounted() {
    this.updateEmas();
  },

  watch: {
    '$route' () {
      this.refreshIndex();
      this.updateEmas();
    }
  },

  methods: {
    refreshIndex () {
      const index = resolveOpenGroupIndex(
        this.$route,
        this.items
      )
      if (index > -1) {
        this.openGroupIndex = index
      }
    },

    toggleGroup (index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index
    },

    isActive (page) {
      return isActive(this.$route, page.path)
    },

    updateEmas() {
      const url = window.location.href;
      const path = this.$route.path;
      const isEmasURL = ((url.indexOf('emas.weex.io') !== -1) || (url.indexOf('weex.emas-poc.com') !== -1));
      const sidebarList = this.$refs.sidebarList
      if (isEmasURL) {
        sidebarList && (sidebarList.style.display = 'block');
      } else {
        if (this.$route.path.indexOf('/zh/community/') !== -1) {
          sidebarList && (sidebarList.style.display = 'none');
          // 打包编译时会做存在性校验，报 Cannot read property 'lastElementChild' of undefined
          // 在社区tab下，由英文切换到中文，sidebarList.lastElementChild 并不是 EMAS DOM 节点
          // 所以需要统筹判断一下 sidebarList.lastElementChild 是不是 EMAS DOM 节点，如果是，则直接隐藏，如果不是，则异步隐藏
          const isEmas = (sidebarList && sidebarList.lastElementChild.innerText.indexOf('企业级服务') !== -1)
          if (isEmas) {
            sidebarList && (sidebarList.lastElementChild.style.display = 'none')
            sidebarList && (sidebarList.style.display = 'block');
          } else {
            setTimeout(function() {
              sidebarList && (sidebarList.lastElementChild.style.display = 'none')
              sidebarList && (sidebarList.style.display = 'block');
            }, 0) 
          }
        } else {
          if (sidebarList && sidebarList.lastElementChild.style.display === 'none') {
            sidebarList.lastElementChild.style.display = 'block';
          }
          sidebarList && (sidebarList.style.display = 'block');
        }
      }
    }
  }
}

function resolveOpenGroupIndex (route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'group' && item.children.some(c => isActive(route, c.path))) {
      return i
    }
  }
  return -1
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  .sidebar-links
    display none
    padding 1.5rem 0

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    .sidebar-links
      display none
      padding 1rem 0
</style>
