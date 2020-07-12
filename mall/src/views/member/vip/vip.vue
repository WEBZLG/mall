<template>
  <div>
    <van-nav-bar title="臻悦尚品推荐官" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <div class="pic1"><img src="../../../assets/pic1.jpg" alt="" width="100%" /></div>
      <div class="pic2">
        <img src="../../../assets/pic2.jpg" alt="" width="100%" />
        <div class="btn-box">
          <van-button type="default" round plain size="small" @click="buyVip()">立即开通</van-button>
        </div>
      </div>
      <div class="pic3"><img src="../../../assets/pic3.jpg" alt="" width="100%" /></div>
      <div class="pic4"><img src="../../../assets/pic4.jpg" alt="" width="100%" /></div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Button,
    NavBar,
    Toast
  } from 'vant';
  Vue.use(Toast);
  Vue.use(Button);
  Vue.use(NavBar);
  export default {
    name: 'vip',
    data() {
      return {};
    },
    mounted(){
      if (this.$root.userInfo.level > -1) {
        // 跳转
      } else {
        this.getMemberInfo()
      }
    },
    methods: {
      onClickLeft() {
        this.$router.back();
      },
      getMemberInfo(){
        this.https.post('/user/member',{
          id: 1,
          platform: 'wx',
          token: this.$root.token
        },'').then(res => {
          console.log(res);
        });
      },
      buyVip() {
        var that = this;
        let param = {
          id: 1,
          platform: 'wx',
          token: this.$root.token
        };
        let params = {
          level_id:2,
          pay_type:'WECHAT_PAY'
        }
        Toast.loading({
          duration: 0,
          message: '加载中...',
          forbidClick: true
        });
        this.https.post('/user/submit-member', param, '',params).then(res => {
          console.log(res);
          // Toast.clear();
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
             this.$router.back();
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
                $this.router.push({'name':couponList})
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
  .mid-view {
    position: absolute;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;

    .pic2 {
      position: relative;

      .btn-box {
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
        bottom: 80px;

        button {
          width: 300px;
          height: 80px;
          background: rgba(255, 153, 0, 1);
          border-radius: 40px;
          border: none;
          color: #ffffff;
          font-size: 32px;
          font-weight: bold;
        }
      }
    }
  }
</style>
