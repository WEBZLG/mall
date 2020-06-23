<template>
  <div>
    <van-nav-bar title="臻悦尚品推荐官" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <div class="pic1">
        <img src="../../../assets/pic1.jpg" alt="" width="100%">
      </div>
      <div class="pic2">
        <img src="../../../assets/pic2.jpg" alt="" width="100%">
      </div>
      <div class="pic3">
        <img src="../../../assets/pic3.jpg" alt="" width="100%">
      </div>
      <div class="pic4">
        <img src="../../../assets/pic4.jpg" alt="" width="100%">
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    NavBar
  } from 'vant';
  Vue.use(NavBar);
  export default {
    name: 'vip',
    data() {
      return {

      }
    },
    methods:{
      onClickLeft() {
        this.$router.back();
      },
    }
  }
</script>

<style lang="less">
  .mid-view{
    position: absolute;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
</style>
