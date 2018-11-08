<template>
  <div class="wrapper">
    <div class="iPhone-img">
      <img src="https://img.alicdn.com/tfs/TB1dZ.4nY2pK1RjSZFsXXaNlXXa-435-895.svg" width="323">
      <img class="img" :src="$withBase(imgSrc)" width="284" height="505">
    </div>
  </div>
</template>

<script>
export default {
  props: ['imgSrc']
}
</script>

<style>
.wrapper {
  position: relative;
  height: 644px;
}
.iPhone-img {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.img {
  position: absolute;
  left: 17px;
  top: 81px;
}
</style>