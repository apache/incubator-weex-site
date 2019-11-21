<template>
  <div>
    <h3 class="title">{{lang === 'en-US' ? 'Code Demos' : '代码示例'}}</h3>
    <div class="wrap">
      <div class="demo" v-for="item in list" :key="item.index">
        <a :href="item.prefix" target="_blank">
          <div class="pic-wrap">
            <img class="demo-pic" :src="item.imgoss" width="202" height="316" />
          </div>
          <div class="demo-name">{{item.title}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import list from '../data/code-demos.js'

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
  width: 970px;
  display: flex;
  flex-wrap: wrap;
}
.demo {
  padding: 20px;
  padding-bottom: 0;
  margin-bottom: 30px;
}
.demo a:hover{
  text-decoration: none;
}
.demo-pic {
  display: block;
}
.demo-name {
  text-align: center;
  line-height: 17px;
  font-size: 12px;
  color: #373D41;
  margin-top: 12px;
}
.pic-wrap {
  position: relative;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.16);
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

.pic-wrap img {
  transition: box-shadow .2s ease,transform .2s ease;
}

.pic-wrap:hover .icons {
  opacity: 1;
}

.pic-wrap:hover img {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.16);
}
</style>
