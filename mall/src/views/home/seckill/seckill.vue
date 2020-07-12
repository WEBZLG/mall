<template>
  <div class="seckill">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
    <!-- <div class="vip"><img width="100%" height="100%"   src="../../../assets/daily_banner1.png" alt="" /></div> -->
    <van-tabs v-model="time" @change="changeTime" class="content">
      <van-tab v-for="(item,index) in dataTimeList" :key="index">
        <template #title>
          <p>{{item.title}}</p>
          <p>{{item.status_text}}</p>
        </template>
      </van-tab>
    </van-tabs>
    <div class="goods-list content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <div class="goods-item" v-for="(item,index) in dataList" :key="index">
        <div class="goods-pic" @click="getDetail(item.goods_id)"><img width="100%" height="100%" :src="item.cover_pic" alt="暂无" /></div>
        <div class="goods-desc">
          <p class="goods-title" @click="getDetail(item.goods_id)">{{item.name}}</p>
          <div class="">
            <van-progress :percentage="item.sell_num/item.miaosha_num*100"  color="#F24E81"/>
            <p>已抢{{item.sell_num}}件</p>
          </div>
          <div class="goods-share flex">
            <p class="new-price">
              <span class="size">￥</span>
              {{item.price}}
            </p>
            <button type="button" class="sm-btn" @click.stop="getDetail(item.goods_id)">马上抢</button>
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
    Overlay,
    Tab,
    Tabs,
    Progress
  } from 'vant';
  Vue.use(Progress);
  Vue.use(Tab);
  Vue.use(Tabs);
  Vue.use(NavBar);
  Vue.use(Toast);
  Vue.use(Overlay);
  export default {
    props: ['clientDetails'],
    data() {
      return {
        dataList: '',
        dataTimeList: '',
        tid: '',
        title: '秒杀专区',
        time: ''
      };
    },
    mounted() {
      // var id = this.$route.params.gid;

      // this.tid = id;
      // this.getData(id)
      console.log(new Date().getHours())
      this.time = new Date().getHours() - 8;
      this.getTimeData();
      this.getData(new Date().getHours());
    },
    methods: {
      changeTime(time) {
        console.log(time)
        this.getData(time + 8)
      },
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
        localStorage.setItem('goodsId', id);
        this.$router.push({
          name: 'seckillDetail',
          params: {
            gid: id
          }
        });
      },
      // 获取时间列表
      getTimeData(id) {
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
        this.https.post('/miaosha/list', param, '').then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            that.dataTimeList = res.data.list;
          } else {
            Toast.fail(res.msg);
          }
        });
      },
      // 获取列表
      getData(time) {
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
        this.https.post('/miaosha/goods-list', param, '&time=' + time + '&page=1').then(res => {
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
  .seckill {

    .goods-list {
      position: absolute;
      top: 176px;
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

    .van-tabs__line {
      display: none;
    }

    .van-tab--active {
      color: rgb(255, 153, 0)
    }

    .van-tab {
      text-align: center;
    }
    .content{
      background-color: #ffffff;
    }
    .van-progress{
      margin: 20px 0;
      background: #f9b1c7;
      }
  }
</style>
