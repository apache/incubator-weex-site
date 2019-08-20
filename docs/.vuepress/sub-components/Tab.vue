<template>
  <div class="tabs">
    <div :class="['tab', index === 0 ? 'active' : null]" @click="select(0)">{{lang === 'en-US' ? 'Latest' : '最新'}}</div>
    <div :class="['tab', index === 1 ? 'active' : null]" @click="select(1)">{{lang === 'en-US' ? 'Topper' : '热门'}}</div>
    <div :class="['tab', index === 2 ? 'active' : null]" @click="select(2)">{{lang === 'en-US' ? 'My Favorite' : '我的收藏'}}</div>
    <div :class="['tab', index === 3 ? 'active' : null]" @click="select(3)">{{lang === 'en-US' ? 'My Works' : '我的发布'}}</div>
  </div>
</template>

<script>
export default {
  props: ['lang'],
  data() {
    return {
      index: 0
    }
  },
  methods: {
    select(index) {
      this.index = index;
      this.$emit('onChange', index)
    }
  }
}
</script>


<style scoped>
.tabs {
  background-color: #F3F5F8;
  display: flex;
  height: 40px;
  line-height: 40px;
}
.tab {
  width: 112px;
  text-align: center;
  border-right: 1px solid #e9ebec;
  cursor: pointer;
  font-size: 14px;
}
.tab.active {
  background-color: #fff;
  color: #00b4ff;
  position: relative;
}
.tab.active:before {
  position: absolute;
  left: 0;
  top: 0;
  content: '';
  width: 100%;
  height: 3px;
  background-color: #00b4ff;
}
</style>
