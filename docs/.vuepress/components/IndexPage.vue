<template>
  <div>
    <div class="wrap">
      <div class="banner">
        <img class="weex-img" src="https://img.alicdn.com/tfs/TB1C_xcqMHqK1RjSZJnXXbNLpXa-974-980.png" width="35%" height="100%" />
        <div class="weex-desc">
          <h1>{{weex.desc}}</h1>
          <a class="quick-start" :href="lang == 'en-US' ? '/guide/introduction.html' : '/zh/guide/introduction.html'">{{weex.getStartedBtn}} <img src="https://img.alicdn.com/tfs/TB1_hg2qCzqK1RjSZFpXXakSXXa-15-12.svg" /></a>
        </div>
      </div>
      <div class="character">
        <div class="c-desc">
          <h3>{{weex.charc1Title}}</h3>
          <div>{{weex.charc1Content}}</div>
        </div>
        <img src="https://img.alicdn.com/tfs/TB1M2MYqzTpK1RjSZKPXXa3UpXa-1152-912.png" width="50%" height="100%" />
      </div>

      <div class="character-o">
        <img class="pc" src="https://img.alicdn.com/tfs/TB17PA7qAzoK1RjSZFlXXai4VXa-2000-1216.png" width="100%"/>
        <div class="c-desc pr">
          <h3>{{weex.charc2Title}}</h3>
          <div>{{weex.charc2Content}}</div>
        </div>
        <img class="mobile" src="https://img.alicdn.com/tfs/TB17PA7qAzoK1RjSZFlXXai4VXa-2000-1216.png" width="100%"/>
      </div>

      <div class="character">
        <div class="c-desc">
          <h3>{{weex.charc3Title}}</h3>
          <div>{{weex.charc3Content}}</div>
        </div>
        <img src="https://img.alicdn.com/tfs/TB1UrQ4qAvoK1RjSZFNXXcxMVXa-808-1180.png" width="50%" height="100%" />
      </div>

      <div class="character-o">
        <img class="pc" src="https://img.alicdn.com/tfs/TB1H7I2qxTpK1RjSZFKXXa2wXXa-2000-1216.png" width="100%"/>
        <div class="c-desc pr">
          <h3>{{weex.charc4Title}}</h3>
          <div>{{weex.charc4Content}}</div>
        </div>
        <img class="mobile" src="https://img.alicdn.com/tfs/TB1H7I2qxTpK1RjSZFKXXa2wXXa-2000-1216.png" width="100%"/>
      </div>

      <div class="eagle">
        <div>{{weex.startText}}</div>
        <a class="start-btn" :href="lang == 'en-US' ? '/guide/introduction.html' : '/zh/guide/introduction.html'">{{weex.getStartedBtn}}</a>
      </div>
    </div>
    <License v-show="isApache" />
  </div>
</template>

<script>

import langZH from '../data/lang-zh';
import langEN from '../data/lang-en';
import License from '../sub-components/License.vue';

export default {
  data() {
    if (this.lang == 'en-US') {
      return {
        weex: langEN.weex,
        isApache: window.location.href.indexOf('weex.apache.org') !== -1
      }
    }
    return {
      weex: langZH.weex,
      isApache: window.location.href.indexOf('weex.apache.org') !== -1
    }
  },
  props: ['lang'],

  components: {
    License
  }
}
</script>


<style scoped>
.wrap {
  padding-left: 10%;
  padding-right: 10%;
  background: url(https://img.alicdn.com/tfs/TB1hqc7qrvpK1RjSZFqXXcXUVXa-2880-1792.png) 0 0 / 100% no-repeat;
}
.banner {
  display: flex;
}
.weex-img {
  margin-top: 8%;
}
.weex-desc {
  padding-top: 5%;
  padding-left: 5%;
}
.weex-desc > h1 {
  line-height: 56px;
  font-size: 40px;
  color: #FFFFFF;
}
.quick-start {
  display: inline-block;
  width: 176px;
  height: 48px;
  line-height: 46px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #fff;
  border-radius: 2px;
  color: #fff;
  font-size: 18px;
}
.c-desc {
  width: 30%;
}
.c-desc > h3 {
  line-height: 40px;
  font-size: 28px;
  color: #373D41;
}
.c-desc > div {
  line-height: 24px;
  font-size: 14px;
  color: #373D41;
  line-height: 24px;
}
.eagle {
  height: 500px;
  background: url(https://img.alicdn.com/tfs/TB1tQQ7qxTpK1RjSZFMXXbG_VXa-604-498.svg) center no-repeat;
  text-align: center;
  overflow: hidden;
}
.eagle > div {
  margin-top: 223px;
  margin-bottom: 28px;
  line-height: 40px;
  font-size: 32px;
  color: #373D41;
}
.eagle > .start-btn {
  display: inline-block;
  width: 240px;
  height: 48px;
  line-height: 48px;
  background: #00B4FF;
  border-radius: 2px;
  color: #fff;
  font-size: 16px;
}
@media screen and (max-width: 1200px) {
  .weex-desc > h1 {
    font-size: 24px;
    line-height: 36px;
  }
  .quick-start {
    width: 146px;
    height: 38px;
    line-height: 36px;
    font-size: 14px;
  }
  .c-desc > h3 {
    font-size: 24px;
  }
}
@media screen and (max-width: 720px) {
  .weex-desc > h1 {
    font-size: 14px;
    line-height: 20px;
  }
  .quick-start {
    width: 80px;
    height: 26px;
    line-height: 24px;
    font-size: 12px;
  }
  .quick-start > img {
    display: none;
  }
  
}
@media screen and (max-width: 820px) {
  .pc {
    display: none;
  }
  .character, .character-o {
    text-align: center;
  }
  .c-desc {
    width: 100%;
  }
  .c-desc > h3 {
    margin-top: 30px;
    font-size: 16px;
    line-height: 24px;
  }
  .c-desc > div {
    text-align: left;
  }
}
@media screen and (min-width: 820px) {
  .mobile {
    display: none;
  }
  .character {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .character-o {
    position: relative;
  }
  .c-desc.pr {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 50px;
  }
}

</style>

