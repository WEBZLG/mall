<template>
  <div class="category">
    <div class="search-box">
      <div class="ipt-box">
        <van-search v-model="value" shape="round" background="#ffffff" placeholder="臻悦尚品，搜你所爱" />
      </div>
    </div>
    <div class="listWrapper">
      <!--左边-->
      <div class="leftWrapper">
        <ul class="wrapper">
          <li class="categoryItem" v-for="(cate, index) in categoriesData" :class="{ selected: currentIndex === index }"
            @click="clickLeftLi(index)" :key="cate.id" ref="menuList">
            <span class="textWrapper">{{ cate.name }}</span>
          </li>
        </ul>
      </div>
      <!--右边-->
      <ContentView :categoriesDetailData="categoriesDetailData" />
    </div>
  </div>
</template>

<script>
  import ContentView from '@/views/category/components/content.vue';
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import {Lazyload} from 'vant';
  import {Search} from 'vant';
  import { Toast } from 'vant';

  Vue.use(Toast);
  Vue.use(Search);
  Vue.use(Lazyload);
  export default {
    name: '',
    data() {
      return {
        value: '',
        categoriesData: [],
        categoriesDetailData: [],
        currentIndex: 0
      };
    },
    mounted() {
      // 初始化数据
      this._initData();
      // 处理首页点击显示对应的列表数据
      setTimeout(() => {
        if (this.$route.params.currentIndex > -1) {
          this.clickLeftLi(this.$route.params.currentIndex + 1);
        }
      }, 800);
    },
    components: {
      ContentView
    },
    methods: {
      async _initData() {
        var that = this;
        // 1.1 获取左边的数据
        let param = {
          id: 1,
          platform: 'wx',
          token: this.$root.token
        };
        Toast.loading({
          duration: 0,
          message: '加载中...',
          forbidClick: true,
        });
        this.https.post('/default/cat-list', param, '').then(res => {
          console.log(res);
          Toast.clear();
          if(res.code==0){
            that.categoriesData = res.data.list
            that.categoriesDetailData = res.data.list[0].list
            // this.getList(res.data.list[0].id)
          }else{
            Toast.fail(res.message);
          }
        });
        // 1.3.初始化滚动视图
        this.$nextTick(() => {
          if (!this.leftScroll) {
            this.leftScroll = new BScroll('.leftWrapper', {
              probeType: 3,
              click: true,
              scrollY: true,
              tap: true,
              mouseWheel: true
            });
          } else {
            this.leftScroll.refresh();
          }
        });
      },
      // 2. 处理左边的点击
      async clickLeftLi(index) {
        console.log(index);
        // this.isShowLoadingGif = true;
        // 2.1 改变索引
        this.currentIndex = index;
        // 2.2 滚动到对应的位置
        setTimeout(() => {
          let menuLists = this.$refs.menuList;
          let el = menuLists[index];
          // 2.3 滚动到对应元素上
          this.leftScroll.scrollToElement(el, 300);
        }, 100);

        // 2.4 获取右边的数据
        this.categoriesDetailData =this.categoriesData[index].list
        // this.getList(this.categoriesData[index].id)
      },
      // getList(tid){
      //   let data = {
      //     id: 1,
      //     platform: 'wx',
      //     token: this.$root.token
      //   };
      //   this.https.post('/default/topic-list', data, '&type='+tid).then(res => {
      //     console.log(res);
      //     if(res.code==0){
      //       this.categoriesDetailData = res.data.list
      //     }
      //   });
      // }
    }
  };
</script>

<style lang="less">
  .category {
    .search-box{
      padding: 30px;
    }
    .listWrapper {
      display: flex;
      position: absolute;
      top: 124px;
      bottom: 100px;
      width: 100%;
      overflow: hidden;
      background-color: #ffffff;
    }

    .leftWrapper {
      width: 210px;
      background-color: #f8f8f8;
    }

    .categoryItem {
      padding: 30px 0;
      position: relative;
      text-align: center;
    }

    .categoryItem .textWrapper {
      font-size: 32px;
    }

    .categoryItem.selected .textWrapper {
      color: #ff9900;
      font-weight: bold;
    }
  }
</style>
