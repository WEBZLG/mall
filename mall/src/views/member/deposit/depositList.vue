<template>
  <div class="deposit-list">
    <van-nav-bar title="提现历史" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-cell v-for="item in dataList" :key="item.id" :title="item.status" value="￥200" label="2020.05.30 18:42" />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Toast } from 'vant';
Vue.use(Toast);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(NavBar);
export default {
  name: '',
  data() {
    return {
      dataList:[]
    };
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
      this.https.get('/share/cash-detail', param, '').then(res => {
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
