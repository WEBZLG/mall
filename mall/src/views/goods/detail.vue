<template>
  <div class="detail">
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <div class="go-vip">
        成为会员再省20%
        <span class="right-icon"><img src="../../assets/next_w.png" alt="" /></span>
      </div>
      <!-- 轮播图 -->
      <van-swipe :autoplay="0">
        <van-swipe-item v-for="(image, index) in detailData.pic_list" :key="index"><img v-lazy="image.pic_url" /></van-swipe-item>
      </van-swipe>
      <div class="handle flex">
        <div class="price">
          <p class="new-price">
            <span class="size">￥</span>
            {{ detailData.price }}
          </p>
          <p class="old-price">￥{{ detailData.original_price }}</p>
        </div>
        <div class="btn-box">
          <div>
            <p class="brokerage">
              <span class="good-icon"><img src="../../assets/money.png" alt="" /></span>
              佣金￥9.99
            </p>
          </div>
          <div class="btn-bot">
            <button type="button" class="sm-btn">复制文字</button>
            <!-- <button type="button" class="sm-btn">分享图片</button> -->
          </div>
        </div>
      </div>
      <div class="descript">
        <p class="title">{{ detailData.name }}</p>
        <div class="flex ">
          <p>推广次数：189</p>
          <p>销量：{{ detailData.sales_volume }}</p>
        </div>
      </div>
      <div class="parameter">
        <van-cell-group>
          <van-cell title="已选:黑色" is-link @click="showSku" />
          <van-cell title="送至:深圳市666666666" is-link @click="showAddress" />
        </van-cell-group>
        <van-action-sheet v-model="showGoods">
          <div class="content">
            <div class="chooseItem" v-for="item in detailData.attr_group_list" :key="item.attr_group_id">
              <h3>{{item.attr_group_name}}</h3>
              <div>
                <div v-for="attr in item.attr_list" :key="attr.id">{{attr.attr_name}}</div>
               </div>
            </div>
          </div>
        </van-action-sheet>
        <van-action-sheet v-model="showAddr">
          <div class="content">
            <div v-for="item in addrDataList" :key="item.id">
              <div class="flex item-fans">
                <div class="info">
                  <div class="flex name-type">
                    <div>
                      <p class="name">
                        <span>{{ item.name }}</span>
                        <span>{{ item.mobile }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="wechat">{{ item.address }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-action-sheet>
      </div>
      <div class="detail-pic"><img src="../../assets/spxq.png" alt="" /></div>
      <div class="detail-pics"><div v-html="detailData.detail"></div></div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="star" text="收藏" v-if="detailData.is_favorite == 0" @click="addLike(detailData.id)" />
      <van-goods-action-icon icon="star" text="收藏" v-if="detailData.is_favorite == 1" color="#ff5000" @click="disLike(detailData.id)" />
      <van-goods-action-icon icon="share" text="分享" color="#07c160" />
      <van-goods-action-icon icon="cart" text="购物车" @click="goCart" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart(detailData.id)" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { ActionSheet } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Sku } from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { Toast } from 'vant';
Vue.use(Toast);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Sku);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(ActionSheet);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(NavBar);
export default {
  name: 'detail',
  data() {
    return {
      detailData: '',
      showGoods: false,
      showAddr: false,
      addrDataList: [],
      images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
      goodsId: 1,
      tid: ''
    };
  },
  mounted() {
    let id = this.$route.params.gid;
    let tid = this.$route.params.tid;
    console.log(tid);
    localStorage.setItem('listTypeId', tid);
    this.getData(id);
  },
  methods: {
    goCart() {
      this.$router.replace('/tabbar/cart');
    },
    onClickLeft() {
      this.$router.back();
    },

    showSku() {
      this.showGoods = true;
    },
    showAddress() {
      this.getAddressData();
      this.showAddr = true;
    },
    // 获取详情
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
      this.https.get('/default/goods', param, '&id=' + id).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.detailData = res.data;
        } else {
          Toast.fail(res.message);
        }
      });
    },
    //添加喜欢
    addLike(id) {
      var that = this;
      let param = {
        id: 1,
        platform: 'wx',
        token: this.$root.token
      };
      let params = {
        goods_id: id
      };
      this.https.post('/user/favorite-add', param, '', params).then(res => {
        if (res.code == 0) {
          that.detailData.is_favorite = 1;
        } else {
          Toast.fail(res.message);
        }
      });
    },
    //取消喜欢
    disLike(id) {
      var that = this;
      let param = {
        id: 1,
        platform: 'wx',
        token: this.$root.token
      };
      let params = {
        goods_id: id
      };
      this.https.post('/user/favorite-remove', param, '', params).then(res => {
        if (res.code == 0) {
          that.detailData.is_favorite = 0;
        } else {
          Toast.fail(res.message);
        }
      });
    },
    //取消喜欢
    addCart(id) {
      var that = this;
      let param = {
        id: 1,
        platform: 'wx',
        token: this.$root.token
      };
      let params = {
        goods_id: id,
        attr: attr,
        num: num
      };
      this.https.post('/cart/add-cart', param, '', params).then(res => {
        if (res.code == 0) {
          Toast.success('添加成功！');
        } else {
          Toast.fail(res.message);
        }
      });
    },
    // 获取列表
    getAddressData() {
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
      this.https.get('/user/address-list', param, '').then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.addrDataList = res.data.list;
        } else {
          Toast.fail(res.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.van-sku-actions .van-button--danger {
  background: #f34e81 !important;
}
.van-goods-action-button--danger {
  background: #f34e81;
}
.van-sku-actions .van-button--warning {
  background: #ff9900 !important;
}
.van-goods-action-button--warning {
  background: #ff9900;
}
.detail {
  background-color: #f8f8f8;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .mid-view {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 100px;
    overflow: auto;
    .van-popup--bottom {
      bottom: 100px;
    }
    .go-vip {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 999;
      width: 276px;
      height: 60px;
      line-height: 60px;
      color: #ffffff;
      text-align: center;
      background: rgba(238, 79, 120, 1);
      opacity: 0.8;
      border-radius: 30px 0px 0px 30px;
      .right-icon {
        display: inline-block;
        width: 15px;
        height: 26px;
        vertical-align: middle;
      }
    }
    .detail-pic {
      height: 120px;
    }
    .detail-pics img {
      height: inherit;
    }
  }
  .parameter {
    margin: 20px 0;
    .van-cell {
      padding: 8px 32px;
    }
  }
}
.good-icon {
  display: inline-block;
  vertical-align: text-top;
  height: 23px;
  width: 21px;
}
.van-swipe {
  height: 600px;
}
.handle {
  height: 110px;
  padding: 0 30px;
  border-bottom: 1px solid #f8f8f8;
  background: url(../../assets/xq_bg.png) no-repeat;
  background-size: cover;
  .new-price {
    font-size: 48px;
    color: #ffffff;
  }
  .old-price {
    color: #ffffff;
  }
  .brokerage {
    text-align: right;
    padding-bottom: 8px;
  }
}
.descript {
  padding: 20px 30px;
  background-color: #ffffff;
  font-weight: bold;
  .title {
    font-size: 32px;
    padding-bottom: 20px;
  }
}
</style>
