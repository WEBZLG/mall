<template>
  <div class="order-detail">
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <div class="detail-bg"><img src="../../../assets/ddxq_bg.png" alt="" /></div>
      <div class="content">
        <div class="order-status">
          <span class="detail-icon"><img src="../../../assets/dfk.png" alt="" /></span>
          <p class="status">待付款</p>
        </div>
<!--        <div class="order-status">
          <span class="detail-icon"><img src="../../../assets/yfk.png" alt="" /></span>
          <p class="status">已付款</p>
        </div>
        <div class="order-status">
          <span class="detail-icon"><img src="../../../assets/ywc.png" alt="" /></span>
          <p class="status">已完成</p>
        </div>
        <div class="order-status">
          <span class="detail-icon"><img src="../../../assets/wx.png" alt="" /></span>
          <p class="status">无效</p>
        </div> -->
        <div class="contact-bg">
          <p class="information">
            <span class="name">Ada_Wang</span>
            12299887766
          </p>
          <p class="address">广东省深圳市南山区高新科技园北区1号</p>
        </div>
        <div class="goods-item">
          <div class="flex goods-child">
            <div class="goods-pic"><img src="../../../assets/item_large1.png" alt="" /></div>
            <div class="goods-desc">
              <p class="goods-title">Burberry/博柏利【20春夏】女装 服饰 棕色棉 质翻领经典格纹衬衣</p>
              <div class="flex">
                <p class="new-price">￥2,329</p>
                <p>x1</p>
              </div>
            </div>
          </div>
          <div class="flex goods-child">
            <div class="goods-pic"><img src="../../../assets/item_large1.png" alt="" /></div>
            <div class="goods-desc">
              <p class="goods-title">Burberry/博柏利【20春夏】女装 服饰 棕色棉 质翻领经典格纹衬衣</p>
              <div class="flex">
                <p class="new-price">￥2,329</p>
                <p>x1</p>
              </div>
            </div>
          </div>
          <div class="flex goods-child">
            <div class="goods-pic"><img src="../../../assets/item_large1.png" alt="" /></div>
            <div class="goods-desc">
              <p class="goods-title">Burberry/博柏利【20春夏】女装 服饰 棕色棉 质翻领经典格纹衬衣</p>
              <div class="flex">
                <p class="new-price">￥2,329</p>
                <p>x1</p>
              </div>
            </div>
          </div>
          <div class="flex goods-child">
            <div class="goods-pic"><img src="../../../assets/item_large1.png" alt="" /></div>
            <div class="goods-desc">
              <p class="goods-title">Burberry/博柏利【20春夏】女装 服饰 棕色棉 质翻领经典格纹衬衣</p>
              <div class="flex">
                <p class="new-price">￥2,329</p>
                <p>x1</p>
              </div>
            </div>
          </div>
          <div class="flex goods-child">
            <div class="goods-pic"><img src="../../../assets/item_large1.png" alt="" /></div>
            <div class="goods-desc">
              <p class="goods-title">Burberry/博柏利【20春夏】女装 服饰 棕色棉 质翻领经典格纹衬衣</p>
              <div class="flex">
                <p class="new-price">￥2,329</p>
                <p>x1</p>
              </div>
            </div>
          </div>
          <div class="flex goods-child">
            <div class="goods-pic"><img src="../../../assets/item_large1.png" alt="" /></div>
            <div class="goods-desc">
              <p class="goods-title">Burberry/博柏利【20春夏】女装 服饰 棕色棉 质翻领经典格纹衬衣</p>
              <div class="flex">
                <p class="new-price">￥2,329</p>
                <p>x1</p>
              </div>
            </div>
          </div>
        </div>
        <div class="module flex">
          <p>快递</p>
          <p>普通快递（免费）</p>
        </div>
        <div class="module flex">
          <p>优惠券</p>
          <p>20元优惠券</p>
        </div>
        <div class="module total">
          <div class="flex">
            <p>商品总额</p>
            <p>￥3636</p>
          </div>
          <div class="flex">
            <p>优惠券</p>
            <p>-￥20</p>
          </div>
          <div class="flex">
            <p>运费</p>
            <p>￥0</p>
          </div>
        </div>
      </div>
      <div class="bottom flex">
        <p class="price">
          <span class="size">￥</span>
          3122
        </p>
        <van-button round type="info" size="small" color="#FF9900" class="pay-btn">去支付</van-button>
        <!-- <van-button round type="info" size="small" color="#FF9900" class="pay-btn">查看物流</van-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { Button } from 'vant';

Vue.use(Button);
Vue.use(NavBar);
export default {
  name: '',
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less">
.order-detail {
  .mid-view {
    position: absolute;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 108px;
    overflow: auto;
  }
  .detail-bg {
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }
  .content {
    position: relative;
    .detail-icon {
      display: inline-block;
      vertical-align: middle;
      height: 36px;
      width: 36px;
      margin: 40px 20px;
    }
    .status {
      color: #ffffff;
      font-size: 36px;
      font-weight: bold;
      display: inline-block;
      vertical-align: middle;
    }
    .contact-bg {
      height: 152px;
      background: url(../../../assets/address_bg2.png) no-repeat;
      background-size: cover;
      padding: 30px;
      font-size: 28px;
      box-sizing: border-box;
      color: #999999;
      .information {
        font-weight: bold;
        color: #333333;
        height: 56px;
        .name {
          margin-right: 20px;
        }
      }
    }
    .goods-item {
      display: inherit;
      background-color: #ffffff;
      border-radius: 10px;
      margin: 20px 0px;
      padding: 30px;

      .goods-child {
        margin-bottom: 30px;
        &:last-child {
          margin-bottom: 0;
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
      }
    }
    .module {
      background-color: #ffffff;
      padding: 40px 30px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .total {
      line-height: 42px;
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    padding: 24px 30px;
    .pay-btn {
      height: 60px;
      width: 193px;
    }
    .price {
      font-weight: bold;
      font-size: 40px;
      color: #f34e81;
    }
    .size {
      font-size: 28px;
    }
  }
}
</style>
