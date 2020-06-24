<template>
  <div>
    <van-nav-bar title="臻悦尚品推荐官" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <div class="pic1"><img src="../../../assets/pic1.jpg" alt="" width="100%" /></div>
      <div class="pic2">
        <img src="../../../assets/pic2.jpg" alt="" width="100%" />
        <div class="btn-box"><van-button type="default" round plain size="small" @click="buyVip()">立即开通</van-button></div>
      </div>
      <div class="pic3"><img src="../../../assets/pic3.jpg" alt="" width="100%" /></div>
      <div class="pic4"><img src="../../../assets/pic4.jpg" alt="" width="100%" /></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'vant';
import { NavBar } from 'vant';
Vue.use(Button);
Vue.use(NavBar);
export default {
  name: 'vip',
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less">
.mid-view {
  position: absolute;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  .pic2 {
    position: relative;
    .btn-box {
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
      bottom: 80px;
      button{
        width:300px;
        height:80px;
        background:rgba(255,153,0,1);
        border-radius:40px;
        border: none;
        color: #ffffff;
        font-size: 32px;
        font-weight: bold;
      }
    }
  }
}
</style>
