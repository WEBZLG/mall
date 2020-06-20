<template>
  <div class="deposit">
    <van-nav-bar title="提现" left-arrow @click-left="onClickLeft" />
    <div class="money">
      <p class="label">提现金额：</p>
      <van-field v-model="number" type="number" placeholder="输入金额" />
      <p class="have">
        可提现金额：￥9632
        <span class="total">全部提现</span>
      </p>
      <van-button round type="primary" size="large" color="#FF9900" class="dep-btn">提现</van-button>
    </div>
    <van-cell-group>
      <van-cell title="提现历史" is-link  to="/depositList"/>
      <van-cell title="结算账单" is-link  />
    </van-cell-group>
    <div class="descript">
      <p class="label">提现说明</p>
      <p class="text">这是测试的提现说明内容，你所看到的是测试的提现说明内容。这 是测试的提现说明内容，你所看到的是测试的提现说明内容。这是 测试的</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { Field } from 'vant';
import { Button } from 'vant';
import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Button);
Vue.use(Field);
Vue.use(NavBar);
export default {
  name: 'desposit',
  data() {
    return {
      number: ''
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less">
.deposit {
  .money {
    padding: 30px;
    background-color: #ffffff;
    .label {
      font-size: 28px;
    }
    .van-cell {
      padding: 20px 0;
      font-size: 48px;
      font-weight: bold;
      .van-field__control {
        color: #f34e81;
        font-weight: 400;
      }
    }
    .have{
      padding: 20px 0 30px;
      color: #999999;
      .total{
        color: #f34e81;
        margin-left: 20px;
      }
    }
    .dep-btn {
      height: 80px;
    }
  }
  .van-cell-group{
    margin: 20px 0;
    .van-cell{
      padding: 30px;
    }
  }
  .descript{
    padding: 30px;
    background-color: #FFFFFF;
    .label{
      margin-bottom: 30px;
    }
    .text{
      font-size: 24px;
      color: #999999;
    }
  }
}
</style>
