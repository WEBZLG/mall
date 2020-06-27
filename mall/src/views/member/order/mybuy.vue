<template>
  <div class="buy">
    <div class="filter-box">
      <div class="flex filter" @click="show = true">
        <div>
          <span>{{ value1 }}</span>
          <span class="down-icon"><img width="100%" height="100%" src="../../../assets/down.png" alt="" /></span>
        </div>
        <p>至</p>
        <div>
          <div>
            <span>{{ value2 }}</span>
            <span class="down-icon"><img width="100%" height="100%" src="../../../assets/down.png" alt="" /></span>
          </div>
        </div>
      </div>
      <van-calendar v-model="show" type="range" @confirm="onConfirm"  color="#FF9900"/>
    </div>
    <!--    <van-tabs v-model="activeName" swipe-threshold="5">
      <van-tab v-for="item in tabList" :title="item.title" :key="item.id"></van-tab>
    </van-tabs> -->
    <div class="goods-list">
      <div class="goods-item" v-for="(item, index) in dataList" :key="index">
        <div class="flex status" @click="orderDetail(item.order_id)">
          <p class="time">推广时间:{{ item.addtime }}</p>
          <p class="new-price" v-if="item.is_pay == 0">待付款</p>
          <p class="new-price" v-if="item.is_pay == 1">已付款</p>
        </div>
        <div class="flex goods-child" v-for="(goods, idx) in item.goods_list" :key="idx">
          <div class="goods-pic"><img width="100%" height="100%" :src="goods.goods_pic" alt="暂无" /></div>
          <div class="goods-desc">
            <p class="goods-title">{{ goods.goods_name }}</p>
            <div class="flex">
              <p class="new-price">￥{{ goods.price }}</p>
              <p>x{{ goods.num }}</p>
            </div>
          </div>
        </div>
        <div class="total-price">
          <p>
            总计:
            <span class="new-price">￥{{ item.total_price }}</span>
            (含运费￥0)
          </p>
        </div>
        <div class="total-price btn-box flex">
          <p @click="defaultOrder(item.order_id)">取消订单</p>
          <van-button round type="info" size="small" color="#FF9900" class="pay-btn" @click="payFor(item.order_id)">去支付</van-button>
        </div>
      </div>
      <div class="no-data" v-if="dataList.length == 0">
        <div class="no-icon"><img width="100%" height="100%" src="../../../assets/nodata.png" alt="" /></div>
        <p class="no-text">暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Tab, Tabs } from 'vant';
import { Calendar } from 'vant';
import { Button } from 'vant';
import { Toast } from 'vant';
import { Dialog } from 'vant';
import wx from 'weixin-jsapi';
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Calendar);
Vue.use(Tab);
Vue.use(Tabs);
export default {
  name: 'order',
  // props: ['dataList'],
  data() {
    return {
      dataList: [],
      tabList: [{
          id: 0,
          title: '注册用户'
        },
        {
          id: 1,
          title: '会员'
        },
        {
          id: 2,
          title: '小队长'
        },
        {
          id: 3,
          title: '大队正'
        },
        {
          id: 4,
          title: '核心队长'
        }],
      active: 0,
      activeName: 'a',
      show: false,
      value1: '开始时间',
      value2: '结束日期'
    };
  },
  mounted() {
    this.getData(1, '', '');
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClick(name, title) {
      Toast(title);
    },
    formatDate(date) {
      console.log(date)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.value1 = `${this.formatDate(start)}`;
      this.value2 = `${this.formatDate(end)}`;
      this.getData(1, this.value1, this.value2)
    },

    orderDetail() {
      this.$router.push('/orderDetail');
    },
    // 获取列表
    getData(type, sTime, eTime) {
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
      this.https.post('/profit/order', param, '&type=' + type + '&start_time=' + sTime + '&end_time=' + eTime).then(res => {
        Toast.clear();
        if (res.code == 0) {
          that.dataList = res.data.list;
          console.log(res.data);
        } else {
          Toast.fail(res.message);
        }
      });
    },
    // 取消订单
    defaultOrder(oid) {
      var that = this;
      Dialog.confirm({
        message: '确定取消订单？'
      })
        .then(res => {
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
          this.https.get('/order/revoke', param, '&order_id=' + oid).then(res => {
            console.log(res);
            Toast.clear();
            if (res.code == 0) {
              Toast.success('取消成功！');
              that.getData(1, '', '');
            } else {
              Toast.fail(res.message);
            }
          });
        })
        .catch(() => {});
    },
    // 支付
    payFor(oid) {
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
      this.https.get('/order/pay-data', param, '&pay_type=WECHAT_PAY' + '&order_id_list=[' + oid + ']').then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          if (typeof WeixinJSBridge == 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady, false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady);
            }
          } else {
            that.onBridgeReady(res.data);
          }
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    onBridgeReady(res) {
      console.log(res)
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
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            this.getData(1, '', '')
          }
        }
      );
    }
  }
};
</script>

<style lang="less">
.buy {
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
    // top: 426px;
    top: 340px;
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

    .new-price {
      color: #f34e81;
      font-weight: bold;
    }
  }

  .goods-pic {
    height: 100px;
    width: 100px;
  }

  .goods-title {
    font-size: 24px;
  }

  .time {
    color: #999999;
  }

  .status {
    margin-bottom: 30px;
  }

  .goods-child {
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .total-price {
    text-align: right;
  }

  .pay-btn {
    height: 60px;
    width: 193px;
    margin-top: 30px;
  }

  .btn-box {
    align-items: baseline;
    margin-top: 30px;
    border-top: 1px solid #dcdcdc;
  }
}
</style>
