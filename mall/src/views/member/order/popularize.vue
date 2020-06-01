<template>
  <div class="popularize">
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
    <div class="goods-list">
      <div class="goods-item">
        <p class="time">推广时间:20200601</p>
        <div class="flex">
          <div class="goods-pic"><img src="../../../assets/item_large1.png" alt="" /></div>
          <div class="goods-desc">
            <p class="goods-title">Burberry/博柏利【20春夏】女装 服饰 棕色棉 质翻领经典格纹衬衣</p>
            <p class="new-price">￥2,329</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Calendar } from 'vant';

Vue.use(Calendar);
export default {
  name: '',
  data() {
    return {
      date1: '',
      date2: '',
      show1: false,
      show2: false,
      value1: '开始时间',
      value2: '结束日期'
    };
  },
  methods: {
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
    }
  }
};
</script>

<style lang="less">
.popularize {
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
  .goods-list{
    padding-top: 0;
  }
  .goods-item {
    display: inherit;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 20px 30px;
    padding: 30px;
  }
  .goods-pic {
    height: 100px;
    width: 100px;
  }
  .goods-title {
    font-size: 24px;
  }
  .new-price {
    color: #f34e81;
    font-weight: bold;
  }
  .time {
    color: #999999;
    margin-bottom: 30px;
  }
}
</style>
