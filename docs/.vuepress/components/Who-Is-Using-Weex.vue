<template>
  <div>
    <h3 class="title">{{lang === 'en-US' ? 'they are using weex' : '他们都在使用Weex'}}</h3>
    <div class="wrap">
      <div class="app" v-for="item in list" :key="item.name_CN">
        <div class="icon-wrap">
          <img class="app-icon" :src="item.icon" width="90" height="90" />
          <div class="icons">
            <a class="icon-android" :href="item.iOS" target="_blank"><img src="/iOS@2x.png" width="17" height="17"/></a>
            <a :href="item.android" target="_blank"><img src="/Android@2x.png" width="17" height="17"/></a>
          </div>
        </div>
        <div class="app-name">{{lang === 'en-US' ? item.name_EN : item.name_CN}}</div>
      </div>
    </div>
    <div class="btn"><a class="add-app" href="https://github.com/apache/incubator-weex-site/blob/master/docs/.vuepress/data/who-is-using-weex.js" target="_blank">{{lang === 'en-US' ? 'Add your App' : '我也要上墙'}}</a></div>
  </div>
</template>

<script>
import list from '../data/who-is-using-weex.js'

export default {
  props: ['lang'],
  data() {
    return {
      list,
    }
  }
}
</script>

<style scoped>
.title {
  width: 910px;
  line-height: 33px;
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: #373D41;
  text-align: center;
  margin-top: 78px;
  margin-bottom: 20px;
}
.wrap {
  width: 910px;
  display: flex;
  flex-wrap: wrap;
}
.app {
  padding: 20px;
  padding-bottom: 0;
}
.app-icon {
  display: block;
  border-radius: 15px;
}
.app-name {
  text-align: center;
  line-height: 17px;
  font-size: 12px;
  color: #373D41;
  margin-top: 12px;
}
.add-app {
  display: inline-block;
  width: 260px;
  height: 40px;
  line-height: 40px;
  background-color: #00B4FF;
  border-radius: 2px;
  color: #fff;
  font-size: 16px;
  text-align: center;
}
.btn {
  width: 910px;
  margin-top: 38px;
  text-align: center;
}
.add-app:hover {
  text-decoration: none !important;
}
.icon-wrap {
  position: relative;
}
.icons {
  opacity: 0;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 28px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: all .2s ease,transform .2s ease; 
}
.icons > a {
  flex: 1;
  font-size: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.icon-android {
  border-right: 1px solid #1D2C41
}

.icon-wrap img {
  transition: box-shadow .2s ease,transform .2s ease;
}

.icon-wrap:hover .icons {
  opacity: 1;
  transform: translateY(-2px);
}

.icon-wrap:hover img {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.16);
}
</style>
