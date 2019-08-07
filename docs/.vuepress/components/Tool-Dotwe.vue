<template>
  <div class="wrap">
    <div class="warning">
      <p class="warning-icon">WARNING</p>
      <p>{{lang === 'en-US' ? 'Online Playground is a third party editor, and is not developed nor maintained by Apache Weex.' : 'Online Playground 是三方编辑器, 不由 Apache Weex 开发或维护。'}}</p>
    </div>
    <img class="editor hide" src="https://img.alicdn.com/tfs/TB1OFpuI4naK1RjSZFBXXcW7VXa-1936-1188.png" />
    <div class="link">
      <h3 class="title">{{lang === 'en-US' ? 'Online Editor' : '在线编辑器'}}</h3>
      <div class="desc">{{lang === 'en-US' ? 'Weex Online Editor for developers. Developer don\'t need install anything. Also, it\'s convenient for talking about some developing issue.' : 'Weex 在线编辑器，无需安装任何环境，马上开始Weex代码开发。交流Weex代码的利器！'}}</div>
      <a href="http://editor.weex.io" target="_blank" class="btn">{{lang === 'en-US' ? 'Open Editor' : '打开在线编辑器'}}</a>
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
  position: relative;
  display: flex;
  height: calc(100vh - 3.6rem);
  margin-top: 3.6rem !important;
  padding-left: 11rem;
  background: url(https://img.alicdn.com/tfs/TB1WrU8IQvoK1RjSZPfXXXPKFXa-2438-1420.png) 10rem 0 / cover no-repeat;
}
.warning {
  position: absolute;
  width: 100%;
  border-color: #f63;
  background-color: #fff2ee;
  padding: .1rem 1rem;
  border-left-width: .2rem;
}
.warning-icon {
  padding-left: 21px;
  color: #606273;
  background: url(https://gw.alicdn.com/tfs/TB1mwIBAwHqK1RjSZJnXXbNLpXa-16-16.svg) 0 5px no-repeat;
  font-weight: 600;
  margin-bottom: -.4rem;
}
.warning-icon + p {
  color: #4d0000;
}
.editor {
  margin-top: 7.2rem;
  height: calc(100vh - 3.6rem - 7.2rem);
}
.link {
  margin-left: -140px;
  width: 250px;
}
.title {
  padding-top: 150px;
  margin-top: 0;
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
  margin-bottom: 32px;
}
.btn {
  display: inline-block;
  width: 176px;
  height: 48px;
  line-height: 48px;
  color: #fff;
  font-size: 16px;
  background: #00B4FF;
  border-radius: 2px;
  margin-left: 4px;
  margin-right: 4px;
  text-align: center;
}
.btn:hover {
  text-decoration: none !important;
}

@media (max-width: 1200px) { 
  .hide {
    display: none;
  }
  .link {
    margin-left: 0;
    width: auto;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
  }
  .wrap {
    display: block;
  }
}

@media (max-width: 720px) {
  .wrap {
    padding-left: 0;
    background-position-x: 0;
  }
}
</style>
