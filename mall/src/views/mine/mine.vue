<template>
  <div class="mine">
    <div class="top-bg">
      <img src="../../assets/my_bg.png" alt="" />
      <div class="message">
        <div class="head"><img src="../../assets/sort1.png" alt="" /></div>
        <div class="name-type">
          <div class="flex">
            <p class="name">ada_wang</p>
            <div class="flex">
              <div class="vip-icon">
                <img src="../../assets/visitor.png" alt="" />
                <!--  <img src="../../assets/little_chief.png" alt="" />
                <img src="../../assets/large_chief.png" alt="">
                <img src="../../assets/member.png" alt=""> -->
              </div>
              <span class="type">注册用户</span>
            </div>
          </div>
          <div class="copy-code flex">
            <p class="code">188****9909</p>
            <div class="copy-icon"><img src="../../assets/edit.png" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <van-cell-group>
        <van-cell value="" is-link to="/order">
          <template #title>
            <span class="icon"><img src="../../assets/wddd.png" /></span>
            <span class="custom-title">我的订单</span>
          </template>
        </van-cell>
        <van-cell value="" is-link to="/collect">
          <template #title>
            <span class="icon"><img src="../../assets/wdsc.png" /></span>
            <span class="custom-title">我的收藏</span>
          </template>
        </van-cell>
        <van-cell value="" is-link to="/book" >
          <template #title>
            <span class="icon"><img src="../../assets/txl.png" /></span>
            <span class="custom-title">通讯录</span>
          </template>
        </van-cell>
        <van-cell value="" is-link to="/address">
          <template #title>
            <span class="icon"><img src="../../assets/dzgl.png" /></span>
            <span class="custom-title">地址管理</span>
          </template>
        </van-cell>
        <van-cell value="" is-link>
          <template #title>
            <span class="icon"><img src="../../assets/gywm.png" /></span>
            <span class="custom-title">关于我们</span>
          </template>
        </van-cell>
        <van-cell value="" is-link>
          <template #title>
            <span class="icon"><img src="../../assets/lxwm.png" /></span>
            <span class="custom-title">联系我们</span>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="vip"><img src="../../assets/ad1.png" alt="" /></div>
      <!-- <van-button type="default" round plain size="large">退出登录</van-button> -->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Button
  } from 'vant';
  import {
    Cell,
    CellGroup
  } from 'vant';
  Vue.use(Button);
  Vue.use(Cell);
  Vue.use(CellGroup);
  export default {
    name: '',
    data() {
      return {

      }
    }
  }
</script>

<style lang="less" scoped>
  .mine {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 100px;
    overflow: auto;
    background: #f8f8f8;

    .top-bg {
      position: relative;
      height: 340px;
    }

    .message {
      position: absolute;
      left: 10%;
      top: 20%;
      display: flex;
      color: #ffffff;
      font-weight: bold;
    }

    .head {
      height: 114px;
      width: 114px;
      border: 6px solid #ffffff;
      border-radius: 50%;
      overflow: hidden;
    }

    .vip-icon {
      width: 43px;
      height: 43px;
      margin: 0 -20px 0 10px;
      position: relative;
      z-index: 1;
    }

    .copy-icon {
      width: 27px;
      height: 28px;
      margin-left: 20px;
    }

    .name-type {
      line-height: 60px;
      margin-left: 40px;
    }

    .name {
      font-size: 36px;
    }

    .type {
      display: block;
      width: 140px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      background: rgba(211, 131, 123, 1);
      border-radius: 17px;
    }

    .copy-code {
      font-size: 28px;
      justify-content: inherit;
    }

    .icon {
      display: inline-block;
      vertical-align: text-top;
      height: 28px;
      width: 28px;
    }

    .van-cell {
      padding: 32px 30px;
    }

    .van-cell-group {
      border-radius: 10px;
      overflow: hidden;
      margin-top: -56px;
    }

    .vip {
      margin: 30px 0;
    }

    .van-button--default {
      height: 80px;
      color: #F34E81;
      font-size: 32px;
      font-weight: bold;
      border: 2px solid #F34E81;
      margin-bottom: 30px;
    }
  }
</style>
