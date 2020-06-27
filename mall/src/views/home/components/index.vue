<template>
  <div class="content">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in dataList.banner_list" :key="index"><img width="100%" height="100%" v-lazy="item.pic_url" /></van-swipe-item>
    </van-swipe>
    <!-- 按钮导航 -->
    <div class="nav-btn-list flex">
      <div class="nav-btn" v-for="(item, index) in dataList.nav_list" :key="index">
        <div class="nav-icon"><img width="100%" height="100%" :src="item.icon_pic" alt="暂无图标" /></div>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <!-- 会员 -->
    <div class="vip" @click="goVip"><img width="100%" height="100%" src="../../../assets/ad1.png" alt="" /></div>
    <!-- 每日爆品 -->
    <div class="day-hot" v-for="(item, index) in dataList.tag_list" :key="index">
      <h3 class="caption">{{ item.name }}</h3>
      <div class="vip"><img width="100%" height="100%" :src="item.show_pic" alt="暂无" /></div>
      <div class="goods-list">
        <div class="goods-item" v-for="(goods, idx) in item.goods_list" :key="idx">
          <div class="goods-pic" @click="getDetail(goods.id)"><img width="100%" height="100%" :src="goods.pic_url" alt="" /></div>
          <div class="goods-desc">
            <p class="goods-title" @click="getDetail(goods.id)">{{ goods.name }}</p>
            <div class="good-price flex">
              <p class="old-price">￥{{ goods.original_price }}</p>
              <p class="brokerage">
                <span class="good-icon"><img width="100%" height="100%" src="../../../assets/money.png" alt="" /></span>
                推广佣金￥{{ goods.virtual_sales }}
              </p>
            </div>
            <div class="goods-share flex">
              <p class="new-price">
                <span class="size">￥</span>
                {{ goods.price }}
              </p>
              <div class="btn-bot">
                <button type="button" class="sm-btn hotCopy" data-clipboard-action="copy" :data-clipboard-text="goods.name" @click="copyLink('.hotCopy')">复制文字</button>
                <button type="button" class="sm-btn" @click.stop="share(goods)">分享</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="shareBox" id="shareBox" v-if="goodsInfo.id">
            <!--            <div><img :src="goodsInfo.pic_url" alt="" width="100" /></div>
            <p>{{ goodsInfo.name }}</p>
            <p>{{ goodsInfo.price }}</p> -->
            <div class="shareCode"><img :src="this.$root.posterUrl + goodsInfo.id" width="100%" /></div>
            <button type="button" class="save-btn" @click.stop="save">保存{{goodsInfo.id}}</button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Vue from 'vue';
import { Lazyload } from 'vant';
import { Toast } from 'vant';
import { Overlay } from 'vant';
import html2canvas from "html2canvas"
Vue.use(Toast);
Vue.use(Lazyload);
Vue.use(Overlay);
export default {
  props: ['clientDetails', 'dataList'],
  data() {
    return {
      // dataList:[]
      goodsInfo: '',
      show: false
    };
  },
  mounted() {
    // this.getData();
    console.log(this.dataList);
    console.log(this.$root.posterUrl);
  },
  methods: {
    share(goods) {
      this.goodsInfo = goods;
      this.show = true;
      console.log(goods);
       html2canvas(document.querySelector("#capture")).then(canvas => {
           document.body.appendChild(canvas)
       });

    },
    goVip() {
      this.$router.push({ name: 'vip' });
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
      console.log(id);
      this.$router.push({ name: 'detail', params: { gid: id } });
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
.shareCode {
  margin: 0 auto;
  margin-top: 20%;
}
.save-btn {
  border: 1px solid #ffffff;
  color: #ffffff;
  background: inherit;
  margin: 38px auto;
  display: block;
}
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
