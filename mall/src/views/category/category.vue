<template>
  <div class="category">
    <div class="search-box">
      <div class="ipt-box"><van-search v-model="value" shape="round" background="#ffffff" placeholder="臻悦尚品，搜你所爱" /></div>
    </div>
    <div class="listWrapper">
      <!--左边-->
      <div class="leftWrapper">
        <ul class="wrapper">
          <li class="categoryItem" v-for="(cate, index) in categoriesData" :class="{ selected: currentIndex === index }" @click="clickLeftLi(index)" :key="cate.id" ref="menuList">
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
import { Lazyload } from 'vant';
import { Search } from 'vant';
Vue.use(Search);
Vue.use(Lazyload);
export default {
  name: '',
  data() {
    return {
      value: '',
      categoriesData: [{ id: 0, name: '女装' }, { id: 1, name: '女包' },{ id: 2, name: '女装' }, { id: 3, name: '女包' },{ id: 4, name: '女装' }, { id: 5, name: '女包' },{ id: 6, name: '女装' }, { id: 7, name: '女包' },{ id: 8, name: '女装' }, { id: 9, name: '女包' },{ id: 10, name: '女装' }, { id: 11, name: '女包' },{ id: 12, name: '女装' }, { id: 13, name: '女包' },{ id: 14, name: '女装' }, { id: 15, name: '女包' }],
      categoriesDetailData: [
        {
          id: 0,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 1,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 2,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤',
          url: '../assets/sort1.png'
        }
      ],
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
    // 1. 初始化操作(数据和界面)
    async _initData() {
      // 1.1 获取左边的数据
      // let leftRes = await getCategoryData();
      // if (leftRes.success) {
      //   this.categoriesData = leftRes.data.cate;
      //   console.log(leftRes.data.cate);
      // }
      // 1.2 获取右边的数据
      // let rightRes = await getCategoryDetailData('/lk001');
      // if (rightRes.success) {
      //   this.categoriesDetailData = rightRes.data.cate;
      // }
      // 1.3. 隐藏loading框
      // this.isShowLoading = false;

      // 1.4.初始化滚动视图
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
      // let param;
      // if (index >= 9) {
      //   param = `/lk0${index + 1}`;
      // } else {
      //   param = `/lk00${index + 1}`;
      // }
      // let rightRes = await getCategoryDetailData(param);
      // if (rightRes.success) {
      //   this.categoriesDetailData = rightRes.data.cate;
      // }
      // this.isShowLoadingGif = false;
      this.categoriesDetailData = [
        {
          id: 0,
          title: 'T恤2',
          url: '../assets/sort1.png'
        },
        {
          id: 1,
          title: 'T恤2',
          url: '../assets/sort1.png'
        },
        {
          id: 2,
          title: 'T恤2',
          url: '../assets/sort1.png'
        },
        {
          id: 3,
          title: 'T恤2',
          url: '../assets/sort1.png'
        }
      ]
    }
  }
};
</script>

<style lang="less">
.category {
  .listWrapper {
    display: flex;
    position: absolute;
    top: 124px;
    bottom: 100px;
    width: 100%;
    overflow: hidden;
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
