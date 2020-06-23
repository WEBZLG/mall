<template>
  <div class="recommend">
    <van-nav-bar title="商品列表" left-arrow @click-left="onClickLeft" />
    <div class="flex content">
      <div class="recommend-item" v-for="item in dataList" :key="item.id" @click="getDetail(item.id)">
        <div class="recommend-pic"><img width="100%" height="100%"   :src="item.pic_url" alt="" /></div>
        <div class="recommend-text">
          <p class="title">{{item.name}}</p>
          <div class="flex">
            <p class="old-price">￥{{item.original_price}}</p>
            <p class="new-price">
              <span class="size">￥</span>
              {{item.price}}
            </p>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="dataList.length == 0">
        <div class="no-icon"><img width="100%" height="100%"   src="../../assets/nodata.png" alt="" /></div>
        <p class="no-text">暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import { NavBar } from 'vant';
Vue.use(NavBar);
Vue.use(Toast);
export default {
  name: 'goodsList',
  data() {
    return {
      dataList:[],
      tid:''
    };
  },
  mounted() {
    var id =  this.$route.params.gid;
    this.tid = id;
    console.log(id)
    if(id==undefined){
    let id = localStorage.getItem('listTypeId')
    this.tid = id;
    console.log(id)
     this.getData(id);
    }else{
      this.getData(id);
    }
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    getDetail(e) {
      this.$router.push({ name: 'detail',params: {gid: e,tid:this.tid}});
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
      this.https.get('/default/goods-list', param, '&cat_id=' + id).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.dataList = res.data.list;
        } else {
          Toast.fail(res.message);
        }
      });
    },
  }
};
</script>

<style lang="less">
.recommend {
  .content {
    padding-top: 30px;
    flex-wrap: wrap;
  }
  .recommend-text {
    padding: 20px;
  }
  .recommend-item {
    flex: 0 0 48%;
    background-color: #ffffff;
    border-radius: 10px 10px 0px 0px;
    overflow: hidden;
    margin-bottom: 30px;
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
