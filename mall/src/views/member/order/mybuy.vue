<template>
  <div class="buy">
    <div class="filter-box">
      <div class="flex filter">
        <div>
          <span @click="show1 = true">{{ value1 }}</span>
          <van-calendar v-model="show1" @confirm="onConfirm1" />
          <span class="down-icon"><img src="../../../assets/down.png" alt="" /></span>
        </div>
        <p>至</p>
        <div>
          <div>
            <span @click="show2 = true">{{ value2 }}</span>
            <van-calendar v-model="show2" @confirm="onConfirm2" />
            <span class="down-icon"><img src="../../../assets/down.png" alt="" /></span>
          </div>
        </div>
      </div>
    </div>
    <van-tabs v-model="activeName" swipe-threshold="5">
      <van-tab v-for="item in tabList" :title="item.title" :key="item.id"></van-tab>
    </van-tabs>
    <div class="goods-list">
      <div class="goods-item" @click="orderDetail()" v-for="(item,index) in dataList.list" :key="index">
        <div class="flex status">
          <p class="time">推广时间:{{item.addtime}}</p>
          <p class="new-price" v-if="item.is_pay==0">待付款</p>
          <p class="new-price" v-if="item.is_pay==1">已付款</p>
        </div>
        <div class="flex goods-child" v-for="(goods,idx) in item.goods_list" :key="idx">
          <div class="goods-pic"><img :src="goods.goods_pic" alt="暂无"/></div>
          <div class="goods-desc">
            <p class="goods-title">{{goods.goods_name}}</p>
            <div class="flex">
              <p class="new-price">￥{{goods.price}}</p>
              <p>x{{goods.num}}</p>
            </div>
          </div>
        </div>
        <div class="total-price">
          <p>
            总计:
            <span class="new-price">￥{{item.total_price}}</span>
            (含运费￥0)
          </p>
        </div>
        <div class="total-price btn-box">
          <van-button round type="info" size="small" color="#FF9900" class="pay-btn">去支付</van-button>
        </div>
      </div>
      <div v-if="dataList.list">
      <div class="no-data" v-if="dataList.list.length == 0">
        <div class="no-icon"><img src="../../../assets/nodata.png" alt="" /></div>
        <p class="no-text">暂无数据</p>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Tab,
    Tabs
  } from 'vant';
  import {
    Calendar
  } from 'vant';
  import {
    Button
  } from 'vant';

  Vue.use(Button);
  Vue.use(Calendar);
  Vue.use(Tab);
  Vue.use(Tabs);
  export default {
    name: 'order',
    props: ['dataList'],
    data() {
      return {
        tabList: [{
            id: 0,
            title: '注册用户'
          },
          {
            id: 1,
            title: '会员'
          },
          {
            id: 2,
            title: '小队长'
          },
          {
            id: 3,
            title: '大队正'
          },
          {
            id: 4,
            title: '核心队长'
          }
        ],
        active: 0,
        activeName: 'a',
        date1: '',
        date2: '',
        show1: false,
        show2: false,
        value1: '开始时间',
        value2: '结束日期'
      };
    },
    mounted() {
      console.log(this.dataList)
    },
    methods: {
      onClickLeft() {
        this.$router.back();
      },
      onClick(name, title) {
        Toast(title);
      },
      formatDate(date) {
        return `${date.getMonth() + 1}/${date.getDate()}`;
      },
      onConfirm1(date) {
        this.show1 = false;
        this.value1 = this.formatDate(date);
      },
      onConfirm2(date) {
        this.show2 = false;
        this.value2 = this.formatDate(date);
      },
      orderDetail() {
        this.$router.push('/orderDetail');
      }
    }
  };
</script>

<style lang="less">
  .buy {
    .filter-box {
      padding: 40px 30px;
      background-color: #ffffff;
      margin-top: 20px;
    }

    .filter {
      justify-content: space-around;
      height: 60px;
      line-height: 60px;
      border-radius: 60px;
      background-color: #f5f5f5;
    }

    .down-icon {
      height: 15px;
      width: 26px;
      display: inline-block;
      vertical-align: middle;
      margin-left: 20px;
    }

    .goods-list {
      padding-top: 0;
      position: fixed;
      top: 426px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: auto;
    }

    .goods-item {
      display: inherit;
      background-color: #ffffff;
      border-radius: 10px;
      margin: 20px 30px;
      padding: 30px;

      .new-price {
        color: #f34e81;
        font-weight: bold;
      }
    }

    .goods-pic {
      height: 100px;
      width: 100px;
    }

    .goods-title {
      font-size: 24px;
    }

    .time {
      color: #999999;
    }

    .status {
      margin-bottom: 30px;
    }

    .goods-child {
      margin-bottom: 30px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .total-price {
      text-align: right;
    }

    .pay-btn {
      height: 60px;
      width: 193px;
      margin-top: 30px;
    }

    .btn-box {
      margin-top: 30px;
      border-top: 1px solid #dcdcdc;
    }
  }
</style>
