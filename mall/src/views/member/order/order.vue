<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="activeName" @click="onClick">
      <van-tab title="我推广的" name="a">
        <popularize :dataList="dataList"></popularize>
      </van-tab>
      <van-tab title="我购买的" name="b">
        <mybuy  :dataList="dataList"></mybuy>
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
import { Toast } from 'vant';
import { Dialog } from 'vant';
Vue.use(Toast);
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
      dataList:[]
    };
  },
  components:{
    popularize,
    mybuy
  },
  mounted() {
    if(localStorage.getItem('activeName')){
      let name=localStorage.getItem('activeName');
      this.activeName = name;
      localStorage.setItem('activeName','')
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClick(name, title) {
      if(name=='a'){
        // this.getData(2,'','')
      }else if(name=='b'){
        // this.getData(1,'','')
      }
    },
  }
};
</script>

<style lang="less">
  .order{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: #F8F8F8;
    .new-price{
      font-size: 24px;
    }
  }

</style>
