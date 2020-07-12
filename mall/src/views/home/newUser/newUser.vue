<template>
  <div class="group">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
    <!-- <div class="vip"><img width="100%" height="100%"   src="../../../assets/daily_banner1.png" alt="" /></div> -->
    <div class="goods-list content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <div class="goods-item" v-for="(item,index) in dataList" :key="index">
        <div class="goods-pic" @click="getDetail(item.id)"><img width="100%" height="100%" :src="item.cover_pic" alt="暂无" /></div>
        <div class="goods-desc">
          <p class="goods-title" @click="getDetail(item.id)">{{item.name}}</p>
          <div class="good-price flex">
            <p class="groupNum">销量：{{item.sales}}件</p>
            <p class="brokerage">
            </p>
          </div>
          <div class="goods-share flex">
            <p class="new-price">
              <span class="size">￥</span>
              {{item.price}}
            </p>
            <div class="btn-bot">
              <p></p>
              <button type="button" class="sm-btn"  @click.stop="getDetail(item.id)">立即购买</button>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="dataList.length == 0">
        <div class="no-icon"><img width="100%" height="100%" src="../../../assets/nodata.png" alt="" /></div>
        <p class="no-text">暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Toast,
    NavBar,
    Overlay
  } from 'vant';

  Vue.use(NavBar);
  Vue.use(Toast);
  Vue.use(Overlay);
  export default {
    props: ['clientDetails'],
    data() {
      return {
        dataList: '',
        tid: '',
        title: '新人专享',
      };
    },
    mounted() {
      var id = this.$route.params.gid;

      this.tid = id;
      this.getData(id)
    },
    methods: {
      onClickLeft() {
        this.$router.back();
      },
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          // let last = this.list[this.list.length - 1];
          // for (let i = 1; i <= 10; i++) {
          //   this.list.push(last + i);
          // }
          this.loading = false;
        }, 2500);
      },
      // 详情
      getDetail(id) {
        this.$router.push({
          name: 'userDetail',
          params: {
            gid: id
          }
        });
      },
      // 获取列表
      getData(id) {
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
        this.https.post('/xinren/goods-list', param, '' ).then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            that.dataList = res.data.list;
          } else {
            Toast.fail(res.msg);
          }
        });
      },
    },
    watch: {
      clientDetails(newVal) {
        this.getData(newVal)
      }
    }
  };
</script>

<style lang="less">
  .group {

    .goods-list {
      margin-top: 0;
      position: absolute;
      top: 92px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: auto;
    }
    .good-icon {
      display: inline-block;
      vertical-align: text-top;
      height: 23px;
      width: 21px;
    }
    .groupNum{
      margin-top: 24px;
    }
  }
</style>
