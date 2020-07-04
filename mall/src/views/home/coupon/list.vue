<template>
  <div class="notice">
    <van-nav-bar title="优惠券" left-arrow @click-left="onClickLeft" />
    <div class="not-item">
      <p class="title">
        <em>[公告]</em>
        系统升级维护统治
      </p>
      <p class="descript">尊敬的用户您好，本店将在本店将在本店将在本店将在本店将在6月1日凌晨2点至4点...</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';

Vue.use(NavBar);
export default {
  name: 'notice',
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

<style lang="less" scoped>
  .notice{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #F8F8F8;
    .not-item{
      padding: 30px;
      border-radius: 10px;
      background-color: #ffffff;
      margin: 30px;
      line-height: 50px;
      font-size: 28px;
      .title{
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .descript{
        color: #999999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
