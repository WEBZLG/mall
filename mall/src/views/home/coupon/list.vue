<template>
  <div class="coupon">
    <van-nav-bar title="优惠券" left-arrow @click-left="onClickLeft" />
    <div class="coupon-list">
      <div class="not-item" v-for="item in dataList">
        <img src="../../../assets/yhq_bg.png" width="100%" alt="">
        <div class="conpon-text">
          <h3>￥{{item.sub_price}}元优惠券</h3>
          <div class="flex">
            <p>{{item.min_price_desc}}</p>
            <p>有效期：{{item.begin_time}}-{{item.end_time}}</p>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="dataList.length == 0">
        <div class="no-icon"><img width="100%" height="100%" src="../../../assets/nodata.png" alt="" /></div>
        <p class="no-text">暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Toast,
    NavBar
  } from 'vant';
  Vue.use(NavBar);
  Vue.use(Toast);
  export default {
    name: 'couponList',
    data() {
      return {
        dataList: ''
      };
    },
    mounted() {
      this.getData()
    },
    methods: {
      onClickLeft() {
        this.$router.back();
      },
      // 获取列表
      getData() {
        var that = this;
        let param = {
          id: 1,
          platform: 'wx',
          token: this.$root.token
        };
        Toast.loading({
          duration: 0,
          message: '加载中...',
          forbidClick: true
        });
        this.https.post('/coupon/index', param, '&status=0').then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            that.dataList = res.data.list;
          } else {
            Toast.fail(res.msg);
          }
        });
      },
    }
  };
</script>

<style lang="less" scoped>
  .coupon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #F8F8F8;

    .not-item {
      position: relative;
      margin: 20px 30px;

      .conpon-text {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        color: #ffffff;
        box-sizing: border-box;
        padding: 0 30px;
      }

    }
  }
</style>
