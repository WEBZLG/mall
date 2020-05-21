<template>
  <div class="detail">
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <!-- 轮播图 -->
      <van-swipe :autoplay="0">
        <van-swipe-item v-for="(image, index) in images" :key="index"><img v-lazy="image" /></van-swipe-item>
      </van-swipe>
      <div class="handle flex">
        <div class="price">
          <p class="new-price">
            <span class="size">￥</span>
            1699
          </p>
          <p class="old-price">￥109.00</p>
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
            <button type="button" class="sm-btn">分享图片</button>
          </div>
        </div>
      </div>
      <div class="descript">
        <p class="title">Prada小号尼龙双肩背包 1BZ677_V44_F0002 _V_OOO 19年秋冬</p>
        <div class="flex ">
          <p>推广次数：189</p>
          <p>销量：555</p>
        </div>
      </div>
      <div class="parameter">
        <van-cell-group>
          <van-cell title="已选:黑色" is-link @click="chooseSku" />
          <van-cell title="送至:深圳市666666666" is-link />
          <van-cell :title="'快递:' + mall" is-link @click="chooseMall" />
        </van-cell-group>
        <van-sku v-model="showSku" :sku="sku" :goods="goods" :goods-id="goodsId" :hide-stock="sku.hide_stock" @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked" />
        <van-action-sheet v-model="showMall" :actions="actions" @select="onSelect" />
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" />
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
      showMall: false,
      mall: '普通快递(免费)',
      images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
      actions: [{ id: 0, name: '普通快递(免费)' }, { id: 1, name: '顺丰快递(20元)' }],
      showSku: false,
      goodsId: 1,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '颜色', // skuKeyName：规格类目名称
            v: [
              {
                id: '30349', // skuValueId：规格值 id
                name: '红色', // skuValueName：规格值名称
                imgUrl: 'https://img.yzcdn.cn/2.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: 'https://img.yzcdn.cn/2p.jpg' // 用于预览显示的规格类目图片
              },
              {
                id: '1215',
                name: '蓝色',
                imgUrl: 'https://img.yzcdn.cn/2.jpg',
                previewImgUrl: 'https://img.yzcdn.cn/2p.jpg'
              }
            ],
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: '尺寸',
            k_id: '2',
            v: [
              {
                id: '1193',
                name: '1'
              },
              {
                id: '1194',
                name: '2'
              }
            ],
            k_s: 's2',
            count: 2
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 数据结构见下方文档
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      console.log(item);
      this.mall = item.name;
      this.showMall = false;
    },
    chooseMall() {
      this.showMall = true;
    },
    chooseSku() {
      this.showSku = true;
    },
    onBuyClicked() {},
    onAddCartClicked() {}
  }
};
</script>

<style lang="less" scoped>
.detail {
  background-color: #f8f8f8;
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
