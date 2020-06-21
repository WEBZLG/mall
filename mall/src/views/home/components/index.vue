<template>
  <div class="content">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in dataList.banner_list" :key="index"><img v-lazy="item.pic_url" /></van-swipe-item>
    </van-swipe>
    <!-- 按钮导航 -->
    <div class="nav-btn-list flex">
      <div class="nav-btn" v-for="(item, index) in dataList.nav_list" :key="index">
        <div class="nav-icon"><img :src="item.icon_pic" alt="暂无图标" /></div>
        <p>{{item.name}}</p>
      </div>
    </div>
    <!-- 会员 -->
    <div class="vip"><img src="../../../assets/ad1.png" alt="" /></div>
    <!-- 每日爆品 -->
    <div class="day-hot" v-for="(item, index) in dataList.tag_list" :key="index">
      <h3 class="caption">{{item.name}}</h3>
      <div class="vip"><img :src="item.show_pic" alt="暂无" /></div>
      <div class="goods-list">
        <div class="goods-item" v-for="(goods, idx) in item.goods_list" :key="idx">
          <div class="goods-pic"  @click="getDetail(goods.id)"><img :src="goods.pic_url" alt="" /></div>
          <div class="goods-desc">
            <p class="goods-title">{{goods.name}}</p>
            <div class="good-price flex">
              <p class="old-price">￥{{goods.original_price}}</p>
              <p class="brokerage">
                <span class="good-icon"><img src="../../../assets/money.png" alt="" /></span>
                佣金￥{{goods.virtual_sales}}
              </p>
            </div>
            <div class="goods-share flex">
              <p class="new-price">
                <span class="size">￥</span>
                {{goods.price}}
              </p>
              <div class="btn-bot">
                <button type="button" class="sm-btn hotCopy" data-clipboard-action="copy"  data-clipboard-text="袖卫衣 8NN00000" @click="copyLink('.hotCopy')">复制文字</button>
                <button type="button" class="sm-btn" @click.stop="share">分享图片</button>
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
  props: ['clientDetails','dataList'],
  data() {
    return {
      images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
      // dataList:[]
    };
  },
  mounted() {
    // this.getData();
    console.log(this.dataList)
  },
  methods: {
    share(){
      console.log('分项')
    },
    copyLink(className) {
       let that = this;
       let clipboard = new this.clipboard(className);
       clipboard.on('success', function(e) {
          Toast.success('复制成功');
       });
       clipboard.on('error', function() {
          Toast.fail('复制失败');
       });
     },
    getData() {
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
    getDetail(id) {
      console.log(id)
      this.$router.push({ name: 'detail',params:{gid:id}});
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
