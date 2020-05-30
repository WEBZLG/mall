<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="activeName">
      <van-tab title="我推广的" name="a">
        <popularize></popularize>
      </van-tab>
      <van-tab title="我购买的">
        <mybuy></mybuy>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { Tab, Tabs } from 'vant';
import popularize from './popularize.vue'
import mybuy from './mybuy.vue'
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NavBar);
export default {
  name: 'order',
  data() {
    return {
      tabList: [
        {
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
    };
  },
  components:{
    popularize,
    mybuy
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

<style></style>
