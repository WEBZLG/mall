<template>
  <div class="fans">
    <van-nav-bar title="我的粉丝" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <van-tabs v-model="active" scrollspy sticky>
        <van-tab v-for="item in tabList" :title="item.title">{{item.title}}</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { Tab, Tabs } from 'vant';

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
      ]
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

<style></style>
