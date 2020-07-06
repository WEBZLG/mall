<template>
  <div class="popularize">
    <div class="filter-box">
      <div class="flex filter" @click="show = true">
        <div>
          <span>{{ value1 }}</span>
          <span class="down-icon"><img width="100%" height="100%"   src="../../../assets/down.png" alt="" /></span>
        </div>
        <p>至</p>
        <div>
          <div>
            <span>{{ value2 }}</span>
            <span class="down-icon"><img width="100%" height="100%"   src="../../../assets/down.png" alt="" /></span>
          </div>
        </div>
      </div>
      <van-calendar v-model="show"  type="range" @confirm="onConfirm"  color="#FF9900"/>
    </div>
    <div class="goods-list">
      <div class="goods-item" v-for="(item,index) in dataList.list" :key="index">
        <p class="time">推广时间:</p>
        <div class="flex">
          <div class="goods-pic"><img width="100%" height="100%"   src="../../../assets/item_large1.png" alt="" /></div>
          <div class="goods-desc">
            <p class="goods-title">Burberry/博柏利【20春夏】女装 服饰 棕色棉 质翻领经典格纹衬衣</p>
            <p class="new-price">￥2,329</p>
          </div>
        </div>
      </div>
      <div v-if="dataList.list">
       <div class="no-data" v-if="dataList.list.length == 0">
          <div class="no-icon"><img width="100%" height="100%"   src="../../../assets/nodata.png" alt="" /></div>
          <p class="no-text">暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Calendar } from 'vant';
import { Toast } from 'vant';
import { Dialog } from 'vant';
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Calendar);
export default {
  name: '',
  // props:['dataList'],
  data() {
    return {
      dataList:[],
      show: false,
      value1: '开始时间',
      value2: '结束日期'
    };
  },
  mounted() {
    this.getData(2,'','')
  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.value1 = `${this.formatDate(start)}`;
      this.value2 = `${this.formatDate(end)}`;
      this.getData(2, this.value1, this.value2)
    },
    // 获取列表
    getData(type,sTime,eTime) {
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
      this.https.post('/profit/order', param, '&type='+type+'&sTime='+sTime+'&eTime='+eTime).then(res => {

        Toast.clear();
        if (res.code == 0) {
          that.dataList = res.data.list;

        } else {
          Toast.fail(res.msg);
        }
      });
    },
  }
};
</script>

<style lang="less">
.popularize {
  .filter-box {
    padding: 40px 30px;
    background-color: #ffffff;
    margin-top: 20px;
  }
  .filter {
    justify-content: space-around;
    height: 60px;
    line-height: 60px;
    border-radius: 60px;
    background-color: #f5f5f5;
  }
  .down-icon {
    // height: 15px;
    width: 26px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
  }
  .goods-list {
    padding-top: 0;
    position: fixed;
    top: 426px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
  .goods-item {
    display: inherit;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 20px 30px;
    padding: 30px;
  }
  .goods-pic {
    height: 100px;
    width: 100px;
  }
  .goods-title {
    font-size: 24px;
  }
  .new-price {
    color: #f34e81;
    font-weight: bold;
  }
  .time {
    color: #999999;
    margin-bottom: 30px;
  }
}
</style>
