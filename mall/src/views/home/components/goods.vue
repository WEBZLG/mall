<template>
  <div class="content">
    <!-- <div class="vip"><img width="100%" height="100%"   src="../../../assets/daily_banner1.png" alt="" /></div> -->
    <div class="goods-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="goods-item" v-for="(item,index) in dataList" :key="index">
        <div class="goods-pic" @click="getDetail(item.id)"><img width="100%" height="100%"  :src="item.pic_url" alt="暂无" /></div>
        <div class="goods-desc">
          <p class="goods-title"  @click="getDetail(item.id)">{{item.name}}</p>
          <!-- <p class="good-type">海外|自营</p> -->
          <div class="good-price flex">
            <p class="old-price">￥{{item.original_price}}</p>
            <p class="brokerage">
              <span class="good-icon"><img width="100%" height="100%"   src="../../../assets/money.png" alt="" /></span>
              推广佣金￥9.99
            </p>
          </div>
          <div class="goods-share flex">
            <p class="new-price">
              <span class="size">￥</span>
              {{item.price}}
            </p>
            <div class="btn-bot">
              <button type="button" class="sm-btn">复制文字</button>
              <button type="button" class="sm-btn">分享</button>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="dataList.length == 0">
        <div class="no-icon"><img width="100%" height="100%"   src="../../../assets/nodata.png" alt="" /></div>
        <p class="no-text">暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Toast } from 'vant';
  Vue.use(Toast);
export default {
  props: ['clientDetails'],
  data() {
    return {
      dataList:''
    };
  },
  mounted() {
    this.getData(this.clientDetails)
  },
  methods: {
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
      this.$router.push({ name: 'detail',params:{gid:id}});
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
      this.https.post('/default/goods-list', param, '&cat_id='+id).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          console.log(that.dataList)
          that.dataList = res.data.list;
        } else {
          Toast.fail(res.message);
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

<style>
.goods-list {
  margin-top: 0;
}
</style>
