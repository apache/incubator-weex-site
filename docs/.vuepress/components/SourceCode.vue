<template>
  <div class="wrapper">
    <iframe class="iframe"
      ref="iframe"
      :src="url"
      :style="{ height }"
      @load="onLoad"
      frameborder="0"></iframe>
    <div class="controls" v-if="showControls">
      <div class="btn" @click="openURL">
        <span class="btn-text">Open</span>
      </div>
    </div>
  </div>
</template>

<script>
  const baseURL = 'https://editor.weex.alibaba-inc.com'
  function setParams (url, params) {
    const querys = []
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key) && params[key]) {
        querys.push({ name: key, value: params[key] })
      }
    }
    if (url && querys.length) {
      url += ('?' + querys.map(x => `${x.name}=${x.value}`).join('&'))
    }
    return url
  }
  export default {
    props: ['hash', 'file', 'line', 'mode', 'buttons'],
    data () {
      return {
        url: this.createURL(),
        showControls: false,
        height: 'auto'
      }
    },
    created () {
      if (this.line) {
        this.height = this.calculateHeight() + 'px'
      }
    },
    methods: {
      createURL () {
        let url = this.src ? this.src : `${baseURL}/source/${this.hash}`
        const params = []
        if (this.file) {
          url += `/${this.file}`
        }
        return setParams(url, { line: this.line })
      },
      onLoad () {
        // const $iframe = this.$refs.iframe
        if (this.buttons !== 'none') {
          this.showControls = true
        }
      },
      calculateHeight () {
        const lineHeight = 19
        if (this.line) {
          var pair = this.line.split(/\-|\~/i)
          var begin = parseInt(pair[0], 10)
          var end = parseInt(pair[1], 10) || begin
          return (end - begin + 1) * lineHeight + 20
        }
      },
      openURL () {
        try {
          const url = setParams(`${baseURL}/vue/${this.hash}`, {
            file: this.file,
            line: this.line
          })
          window.open(url)
        } catch (e) {}
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px 2%;
    box-sizing: border-box;
  }
  .iframe {
    width: 100%;
    height: auto;
  }
  .controls {
    position: absolute;
    top: 18px;
    right: 3%;
  }
  .controls .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #5f5f5f;
    border-radius: 5px;
    background-color: rgba(255,255,255,.1);
    color: #969696;
    cursor: pointer;
    padding: 3px 8px;
    font-size: 13px;
  }
  .controls .btn:hover {
    box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
  }
</style>
