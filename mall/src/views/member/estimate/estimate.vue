<template>
  <div class="estimate">
    <van-nav-bar title="预估收益" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <van-tabs v-model="active" swipe-threshold="5">
        <van-tab v-for="item in tabList" :title="item.title" :key="item.id">
          <van-cell-group>
            <van-cell title="单元格" :value="item.title" />
          </van-cell-group>
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottom flex">
        <div>*统计包含2020-05-01至2020-05-31的数据</div>
        <van-button type="primary" plain hairline size="small">查看说明</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { Tab, Tabs } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Button } from 'vant';

Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NavBar);
export default {
  name: 'fans',
  data() {
    return {
      tabList: [
        {
          id: 0,
          title: '本月预估'
        },
        {
          id: 1,
          title: '上月预估'
        },
        {
          id: 2,
          title: '近30天预估'
        }
      ],
      active: 0
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClick(name, title) {
      Toast(title);
    }
  }
};
</script>

<style lang="less">
.estimate {
  .van-tab--active {
    font-weight: bold;
  }
  .van-tabs__line {
    background-color: #ff9900;
  }
  .van-cell-group{
    padding: 0 30px;
  }
  .van-cell{
    padding: 30px 0;
  }
  .van-cell__value{
    color: #F34E81;
    font-weight: bold;
  }
  .bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 30px;
    color: #999999;
    background-color: #ffffff;
  }
  .van-button--plain.van-button--primary{
    width:120px;
    height:40px;
    border:2px solid rgba(243,78,129,1);
    border-radius:20px;
    color: #F34E81;
    font-weight: bold;
    outline: none;
    font-size: 22px;
    padding: 0;
  }
  .van-hairline--surround:after{
    border: none;
  }
}
</style>
