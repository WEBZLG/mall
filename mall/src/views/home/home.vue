<template>
  <div class="home" ref="wrapper">
    <div class="">
      <div class="search-box">
        <div class="ipt-box">
          <van-search v-model="value" shape="round" background="#ffffff" placeholder="臻悦尚品，搜你所爱" />
        </div>
        <div class="message" @click="notice()"><img width="100%" height="100%" src="../../assets/message.png" alt="" /></div>
      </div>
      <ly-tab v-model="selected" :items="navList" :options="options" @change="handleChange" />
      <!--:is实现多个组件实现同一个挂载点-->
      <component :is="currentView" :clientDetails="clientDetails" :dataList="dataList"></component>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios';
  import {
    Swipe,
    SwipeItem
  } from 'vant';
  import {
    Lazyload
  } from 'vant';
  import {
    Search
  } from 'vant';
  import BScroll from 'better-scroll';
  import tab1 from '@/views/home/components/index.vue';
  import tab2 from '@/views/home/components/goods.vue';
  import {
    Toast
  } from 'vant';

  Vue.use(Toast);
  Vue.use(Search);
  Vue.use(Lazyload);
  Vue.use(Swipe);
  Vue.use(SwipeItem);
  export default {
    name: '',
    data() {
      return {
        value: '',
        selected: 0,
        currentView: 'tab1',
        clientDetails: 0,
        dataList: [],
        navList: [{
          label: '首页',
          id: 0
        }],
        options: {
          activeColor: '#FF9900' //设置选中颜色
        }
      };
    },
    mounted() {
      // this.$nextTick(() => {
      //   this.scroll = new BScroll(this.$refs.wrapper, {click: true,tap: true});
      // });
      // this.getCode();
      var that = this;
      setTimeout(function(){
        that.getData();

      },500)
        // this.getUserInfo();
    },

    methods: {
      // ly-tab组件的绑定事件函数
      handleChange(item, index) {
        this.clientDetails = item.id;
        if (index == 0) {
          this.currentView = 'tab1';
        } else {
          this.currentView = 'tab2';
        }
      },
      notice() {
        this.$router.push('/notice');
      },

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
        this.https.post('/default/index', param, '').then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            that.dataList = res.data;
            for (var i = 0; i < res.data.cat_list.length; i++) {
              var obj = {
                label: res.data.cat_list[i].name,
                id: res.data.cat_list[i].id
              }
              that.navList = that.navList.concat(obj)
            }
          } else {
            Toast.fail(res.message);
          }
        });
      },

    },
    components: {
      tab1,
      tab2
    }
  };
</script>

<style lang="less">
  .home {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 100px;
    background-color: #ffffff;
    overflow: auto;
    // 防止抖动
    // -webkit-transform: translateZ(0);
    // transform: translateZ(0);

    .ipt-box {
      margin-right: 30px;
    }

    .message {
      width: 42px;
      height: 42px;
    }

    .ly-tabbar {
      border: none;
      box-shadow: none;

      .ly-tab-list {
        padding: 20px 30px;
      }
    }

    .ly-tab-active-bar {
      display: none;
    }
  }
</style>
