<template>
  <div class="wrap">
    <img class="phone hide" src="https://img.alicdn.com/tfs/TB1mvFeI7voK1RjSZFwXXciCFXa-976-1420.png" />
    <div class="download">
      <h3 class="title">Weex Playground</h3>
      <div class="desc">{{lang === 'en-US' ? 'Weex Native Runtime showcase & Weex vue file preview.' : 'Weex 示例App，可扫码预览Weex代码构建后的页面。'}}</div>
      <img src="/tool-playground-qrcode.png" width="128" />
      <div class="desc2">{{lang === 'en-US' ? 'scan the qrcode and download the app' : '扫二维码下载该APP'}}</div>
      <div><a href="https://itunes.apple.com/cn/app/weex-playground/id1130862662?mt=8" target="_blank" class="btn"><img src="/tool-playground-apple-icon.png" width="12" />{{lang === 'en-US' ? 'iOS' : 'iOS版下载'}}</a><a href="http://appdownload.alicdn.com/publish/weex_playgroud/latest/weex_playgroud_10006024.apk" class="btn" ><img src="/tool-playground-android-icon.png" width="12"/>{{lang === 'en-US' ? 'Android' : 'Android版下载'}}</a></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['lang']
}
</script>


<style scoped>
.wrap {
  display: flex;
  height: calc(100vh - 3.6rem);
  margin-top: 3.6rem !important;
  padding-left: 11rem;
  background: url(https://img.alicdn.com/tfs/TB1qzBXI7voK1RjSZFNXXcxMVXa-2438-1420.png) 10rem 0 / cover no-repeat;
}
.phone {
  height: calc(100vh - 3.6rem);
}
.download {
  margin-left: 130px;
  text-align: center;
}
.title {
  margin-top: 0;
  padding-top: 140px;
  margin-bottom: 6px;
  line-height: 56px;
  font-family: PingFangSC-Semibold;
  font-size: 40px;
  color: #373D41;
}
.desc {
  line-height: 20px;
  font-size: 14px;
  color: #373D41;
  margin-bottom: 38px;
}
.desc2 {
  margin-top: 5px;
  margin-bottom: 24px;
  line-height: 22px;
  font-size: 12px;
  color: #373D41;
}
.btn {
  display: inline-block;
  width: 158px;
  height: 48px;
  line-height: 48px;
  color: #fff;
  font-size: 16px;
  background: #00B4FF;
  border-radius: 2px;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 10px;
}
.btn:hover {
  text-decoration: none !important;
}
.btn > img {
  margin-right: 5px;
}

@media (max-width: 1050px) { 
  .hide {
    display: none;
  }
}

@media (max-width: 720px) {
  .wrap {
    display: block;
    padding-left: 0;
    background-position-x: 0;
  }
  .download {
    margin-left: 0;
  }
}
</style>
