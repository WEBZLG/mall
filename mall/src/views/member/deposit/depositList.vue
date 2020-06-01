<template>
  <div class="deposit-list">
    <van-nav-bar title="提现历史" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-cell title="提现" value="-￥200" label="2020.05.30 18:42" />
      <van-cell title="提现" value="-￥200" label="2020.05.30 18:42" />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(NavBar);
export default {
  name: '',
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
.deposit-list {
  .van-cell__value {
    color: #f34e81;
    font-weight: bold;
  }
  .van-cell-group {
    margin: 20px 30px;
    background-color: inherit;
    .van-cell {
      margin-bottom: 20px;
      border-radius: 10px;
    }
  }
}
</style>
