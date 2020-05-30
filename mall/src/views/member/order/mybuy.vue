<template>
  <div class="order">
    <van-tabs v-model="activeName">
      <van-tab v-for="item in tabList" :title="item.title" :key="item.id"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue';
import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
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
