<template>
  <div class="home" ref="wrapper">
    <div class="">
      <div class="search-box">
        <div class="ipt-box">
          <van-search v-model="value" shape="round" background="#ffffff" placeholder="臻悦尚品，搜你所爱" />
        </div>
        <div class="message" @click="notice()"><img src="../../assets/message.png" alt="" /></div>
      </div>
      <ly-tab v-model="selected" :items="navList" :options="options" @change="handleChange" />
      <!--:is实现多个组件实现同一个挂载点-->
      <component :is="currentView" :clientDetails="clientDetails"></component>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios'
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
        navList: [{
            label: '首页',
            id: 0
          },
          {
            label: '服装',
            id: 1
          },
          {
            label: '鞋',
            id: 2
          },
          {
            label: '包包',
            id: 3
          },
          {
            label: '饰品',
            id: 4
          },
          {
            label: '美妆',
            id: 5
          },
          {
            label: '潮牌',
            id: 6
          },
          {
            label: '海淘大牌',
            id: 7
          }
        ],
        options: {
          activeColor: '#FF9900' //设置选中颜色
        }
      };
    },
    methods: {
      // ly-tab组件的绑定事件函数
      handleChange(item, index) {
        console.log(item, index);
        this.clientDetails = index;
        if (index == 0) {
          this.currentView = 'tab1';
        } else {
          this.currentView = 'tab2';
        }
      },
      notice() {
        this.$router.push('/notice');
      },
      login() {
        // axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf3d1b1cced96f432&secret=215574f93f80993e397610a0ffbd51f5')
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      }
    },
    components: {
      tab1,
      tab2
    },
    mounted() {
      // this.$nextTick(() => {
      //   this.scroll = new BScroll(this.$refs.wrapper, {click: true,tap: true});
      // });
      this.login()
    }
  }
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
    -webkit-transform: translateZ(0);
    transform: translateZ(0);

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
