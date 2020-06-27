<template>
  <div class="order-detail">
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <div class="detail-bg"><img width="100%" height="100%"   src="../../../assets/ddxq_bg.png" alt="" /></div>
      <div class="content">
<!--        <div class="order-status" v-if="order_id == ''">
          <span class="detail-icon"><img width="100%" height="100%"   src="../../../assets/dfk.png" alt="" /></span>
          <p class="status">订单预览</p>
        </div>
        <div class="order-status" v-if="order_id != ''">
          <span class="detail-icon"><img width="100%" height="100%"   src="../../../assets/dfk.png" alt="" /></span>
          <p class="status">待付款</p>
        </div> -->
        <div class="order-status" >
          <span class="detail-icon"><img width="100%" height="100%"   src="../../../assets/yfk.png" alt="" /></span>
          <p class="status">已付款</p>
        </div>
<!--        <div class="order-status" v-if="dataList.is_confirm==1">
          <span class="detail-icon"><img width="100%" height="100%"   src="../../../assets/ywc.png" alt="" /></span>
          <p class="status">已完成</p>
        </div> -->
<!--        <div class="order-status">
          <span class="detail-icon"><img width="100%" height="100%"   src="../../../assets/wx.png" alt="" /></span>
          <p class="status">无效</p>
        </div> -->
        <div class="contact-bg" v-if="dataList.address">
          <p class="information">
            <span class="name">{{ dataList.name }}</span>
            {{ dataList.mobile }}
          </p>
          <p class="address">{{ dataList.address}}</p>
        </div>
        <div class="goods-item">
          <div class="flex goods-child" v-for="(item,index) in dataList.goods_list" :key="index">
            <div class="goods-pic"><img width="100%" height="100%"   :src="item.goods_pic" alt="暂无" /></div>
            <div class="goods-desc">
              <p class="goods-title">{{ item.name }}</p>
              <div class="flex">
                <p class="new-price">￥{{ item.total_price }}</p>
                <p>x1</p>
              </div>
            </div>
          </div>
        </div>
        <div class="module flex">
          <p>快递</p>
          <p>普通快递（免费）</p>
        </div>
        <!--        <div class="module flex">
          <p>优惠券</p>
          <p>20元优惠券</p>
        </div> -->
        <div class="module total">
          <div class="flex">
            <p>商品总额</p>
            <p>￥{{ dataList.goods_total_price }}</p>
          </div>
          <!--      <div class="flex">
            <p>优惠券</p>
            <p>-￥20</p>
          </div> -->
          <div class="flex">
            <p>运费</p>
            <p>￥0</p>
          </div>
        </div>
      </div>
      <div class="bottom flex">
        <p class="price">
          <span class="size">￥</span>
          {{dataList.total_price }}
        </p>
<!--        <van-button round type="info" size="small" color="#FF9900" class="pay-btn" v-if="order_id == ''" @click="submitOrder">提交订单</van-button>
        <van-button round type="info" size="small" color="#FF9900" class="pay-btn" v-if="order_id != ''" @click="payFor">去支付</van-button> -->
        <van-button round type="info" size="small" color="#FF9900" class="pay-btn"  v-if="dataList.is_send==1">查看物流</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { Button } from 'vant';
import { Toast } from 'vant';
import wx from 'weixin-jsapi';

Vue.use(Toast);
Vue.use(Button);
Vue.use(NavBar);
export default {
  name: 'payOrderDetail',
  data() {
    return {
      dataList: '',
      totalPrice: '',
      order_id: ''
    };
  },
  mounted() {
    var dataList = this.$route.params.data;
    this.dataList = dataList;
    // for (var i = 0; i < dataList.list.length; i++) {
    //   this.totalPrice = this.totalPrice * 1 + dataList.list[i].single_price * 1;
    // }
    // localStorage.setItem('goodsId', dataList.goods_info.goods_id);
    console.log(dataList);
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    // 提交订单
    submitOrder() {
      var that = this;
      let param = {
        id: 1,
        platform: 'wx',
        token: this.$root.token
      };
      that.dataList.goods_info['num'] = 1;

      let params = {
        offline: 0,
        address_name: that.dataList.address.name,
        address_mobile: that.dataList.address.mobile,
        address_id: that.dataList.address.id,
        payment: 0,
        goods_info: JSON.stringify(that.dataList.goods_info),
        cart_id_list: that.dataList.goods_card_list
      };
      Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      });
      this.https.post('/order/submit', param, '', params).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.order_id = res.data.order_id;
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    // 订单详情
    orderDetail() {
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
      this.https.get('/order/detail', param, '&order_id='+that.order_id,).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          // that.dataList = res.data
          that.$router.push({name:'orderDetail',params:{data:res.data}})
          // Toast.success(res.msg);
          console.log(that.dataList)
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    // 支付
    payFor() {
      var that = this;
                  that.orderDetail()
                  return false;
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
      this.https.get('/order/pay-data', param, '&pay_type=WECHAT_PAY' + '&order_id_list=[' + that.order_id + ']').then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          if (typeof WeixinJSBridge == 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
          } else {
            this.onBridgeReady(res.data);
          }
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    onBridgeReady(res) {
      let that = this;
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          appId: res.appId, //公众号名称，由商户传入
          timeStamp: res.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: res.nonceStr, //随机串
          package: res.package,
          signType: 'MD5', //微信签名方式：
          paySign: res.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == 'get_brand_wcpay_request:ok') {
            that.orderDetail()
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          }
        }
      );
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
