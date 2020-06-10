<template>
  <div class="content">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in dataList.banner_list" :key="index"><img v-lazy="item.pic_url" /></van-swipe-item>
    </van-swipe>
    <!-- 按钮导航 -->
    <div class="nav-btn-list flex">
      <div class="nav-btn">
        <div class="nav-icon"><img src="../../../assets/button1.png" alt="" /></div>
        <p>拼图活动</p>
      </div>
      <div class="nav-btn">
        <div class="nav-icon"><img src="../../../assets/button2.png" alt="" /></div>
        <p>秒杀专区</p>
      </div>
      <div class="nav-btn">
        <div class="nav-icon"><img src="../../../assets/button3.png" alt="" /></div>
        <p>优惠折扣</p>
      </div>
      <div class="nav-btn">
        <div class="nav-icon"><img src="../../../assets/button4.png" alt="" /></div>
        <p>优惠券</p>
      </div>
      <div class="nav-btn">
        <div class="nav-icon"><img src="../../../assets/button5.png" alt="" /></div>
        <p>满减活动</p>
      </div>
      <div class="nav-btn">
        <div class="nav-icon"><img src="../../../assets/button6.png" alt="" /></div>
        <p>热销排行</p>
      </div>
      <div class="nav-btn">
        <div class="nav-icon"><img src="../../../assets/button7.png" alt="" /></div>
        <p>家具日用</p>
      </div>
      <div class="nav-btn">
        <div class="nav-icon"><img src="../../../assets/button8.png" alt="" /></div>
        <p>品牌专区</p>
      </div>
      <div class="nav-btn">
        <div class="nav-icon"><img src="../../../assets/button9.png" alt="" /></div>
        <p>时尚生活</p>
      </div>
      <div class="nav-btn">
        <div class="nav-icon"><img src="../../../assets/button10.png" alt="" /></div>
        <p>大牌好货</p>
      </div>
    </div>
    <!-- 会员 -->
    <div class="vip"><img src="../../../assets/ad1.png" alt="" /></div>
    <!-- 每日爆品 -->
    <div class="day-hot">
      <h3 class="caption">每日爆品</h3>
      <div class="vip"><img src="../../../assets/daily_banner1.png" alt="" /></div>
      <div class="goods-list">
        <div class="goods-item" @click="getDetail()">
          <div class="goods-pic"><img src="../../../assets/item_large1.png" alt="" /></div>
          <div class="goods-desc">
            <p class="goods-title">袖卫衣 8NN</p>
            <div class="good-price flex">
              <p class="old-price">￥1200</p>
              <p class="brokerage">
                <span class="good-icon"><img src="../../../assets/money.png" alt="" /></span>
                佣金￥9.99
              </p>
            </div>
            <div class="goods-share flex">
              <p class="new-price">
                <span class="size">￥</span>
                1699
              </p>
              <div class="btn-bot">
                <button type="button" class="sm-btn">复制文字</button>
                <button type="button" class="sm-btn">分享图片</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 超级爆款 -->
    <div class="super-hot">
      <h3 class="caption">超级爆品</h3>
      <div class="vip"><img src="../../../assets/daily_banner1.png" alt="" /></div>
      <div class="goods-list">
        <div class="goods-item" @click="getDetail()">
          <div class="goods-pic"><img src="../../../assets/item_large1.png" alt="" /></div>
          <div class="goods-desc">
            <p class="goods-title">袖卫衣 8NN00000</p>
            <div class="good-price flex">
              <p class="old-price">￥1200</p>
              <p class="brokerage">
                <span class="good-icon"><img src="../../../assets/money.png" alt="" /></span>
                佣金￥9.99
              </p>
            </div>
            <div class="goods-share flex">
              <p class="new-price">
                <span class="size">￥</span>
                1699
              </p>
              <div class="btn-bot">
                <button type="button" class="sm-btn">复制文字</button>
                <button type="button" class="sm-btn">分享图片</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Lazyload } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(Lazyload);
export default {
  props: ['clientDetails'],
  data() {
    return {
      images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
      dataList:[]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      var that = this;
      let param = {
        id: 1,
        platform: 'wx',
        token: 'eTV7sqoeEANNeFyTqS-g0yVk5rEpaZ_S'
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
        } else {
          Toast.fail(res.message);
        }
      });
    },
    getDetail() {
      this.$router.push({ name: 'detail' });
    }
  },
  watch: {
    clientDetails(newVal) {
      console.log(newVal);
    }
  }
};
</script>

<style lang="less">
.van-swipe {
  height: 314px;
  border-radius: 10px;
  overflow: hidden;
}

.van-swipe__indicator {
  height: 10px;
  width: 10px;
  background-color: #ffffff;
}
.van-swipe__indicator--active {
  background-color: #eeaa07;
}
.nav-btn-list.flex {
  flex-wrap: wrap;
  margin-top: 28px;
}
.nav-btn {
  flex: 0 0 20%;
  text-align: center;
  margin-bottom: 40px;
}
.nav-icon {
  height: 96px;
  width: 96px;
  margin-bottom: 18px;
  margin: 0 auto;
}
.ly-tab-item {
  font-size: 32px;
}

.old-price {
  font-size: 20px;
  color: #444444;
  font-weight: bold;
  text-decoration: line-through;
}
.brokerage {
  color: #ff9900;
  font-weight: bold;
}
.new-price {
  font-size: 40px;
  color: #f34e81;
  font-weight: bold;
}
.size {
  font-size: 20px;
}
.good-icon {
  display: inline-block;
  vertical-align: text-top;
  height: 23px;
  width: 21px;
}
</style>
