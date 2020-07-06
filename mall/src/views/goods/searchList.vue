<template>
  <div class="searchList">
    <van-nav-bar title="商品搜索" left-arrow @click-left="onClickLeft" />
    <div class="search-box">
      <van-search v-model="value" shape="round" show-action placeholder="请输入搜索关键词">
        <template #action>
          <div @click="getData">搜索</div>
        </template>
      </van-search>
    </div>
    <div class="flex content">
      <div class="recommend-item" v-for="item in dataList" :key="item.id" @click="getDetail(item.id)">
        <div class="recommend-pic"><img width="100%" height="100%" :src="item.pic_url" alt="" /></div>
        <div class="recommend-text">
          <p class="title">{{ item.name }}</p>
          <div class="flex">
            <p class="old-price">￥{{ item.original_price }}</p>
            <p class="new-price">
              <span class="size">￥</span>
              {{ item.price }}
            </p>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="dataList.length == 0">
        <div class="no-icon"><img width="100%" height="100%" src="../../assets/nodata.png" alt="" /></div>
        <p class="no-text">暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar, Search, Toast } from 'vant';
Vue.use(Search);
Vue.use(NavBar);
Vue.use(Toast);
export default {
  name: 'goodsList',
  data() {
    return {
      dataList: [],
      tid: '',
      value: ''
    };
  },
  mounted() {
    let keyword = localStorage.getItem('keyword');
    console.log(keyword)
    if (keyword=='') {

    } else {
      this.value = keyword;
      this.getData();
    }
  },
  methods: {
    onClickLeft() {
      localStorage.setItem('keyword','');
      this.$router.back();
    },
    getDetail(e) {
      this.$router.push({ name: 'detail', params: { gid: e, tid: this.tid } });
    },
    // 获取列表
    getData() {
      var that = this;
      localStorage.setItem('keyword',this.value);
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
      this.https.get('/default/search', param, '&keyword=' + this.value).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.dataList = res.data.list;
        } else {
          Toast.fail(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="less">
.searchList {
  .content {
    padding-top: 30px;
    flex-wrap: wrap;
    position: absolute;
    top: 220px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
  .flex{
    align-items: inherit;
  }
  .search-box {
    padding: 30px;
  }
  .recommend-text {
    padding: 20px;
  }
  .van-search {
    width: 100%;
  }
  .van-search__action:active {
    background-color: #ffffff;
  }
  .recommend-item {
    flex: 0 0 48%;
    background-color: #ffffff;
    border-radius: 10px 10px 0px 0px;
    overflow: hidden;
    margin-bottom: 30px;
    height: 514px;
  }
  .recommend-pic {
    height: 330px;
    width: 330px;
  }
  .old-price {
    font-size: 20px;
    font-weight: bold;
    text-decoration: line-through;
    color: #444444;
    margin-bottom: 14px;
  }

  .new-price {
    font-size: 32px;
    font-weight: bold;
    color: #f34e81;

    .size {
      font-size: 20px;
    }
  }
  .title {
    height: 80px;
    font-size: 28px;
    font-weight: bold;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 20px;
  }
}
</style>
