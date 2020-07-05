<template>
  <div class="mine">
    <div class="top-bg">
      <img width="100%" height="100%" src="../../assets/my_bg.png" alt="" />
      <div class="message">
        <div class="head"><img width="100%" height="100%" :src="dataList.avatar_url" alt="暂无" /></div>
        <div class="name-type">
          <div class="flex">
            <p class="name">{{ dataList.nickname || '臻悦用户' }}</p>
            <div class="flex">
              <div class="vip-icon">
                <img v-if="dataList.level == -1" width="100%" height="100%" src="../../assets/visitor.png" alt="" />
                <!-- <img width="100%" height="100%"   src="../../assets/little_chief.png" alt="" /> -->
                <img v-if="dataList.level == 1" width="100%" height="100%" src="../../assets/large_chief.png" alt="" />
                <img v-if="dataList.level == 2" width="100%" height="100%" src="../../assets/member.png" alt="" />
              </div>
              <span class="type">{{ dataList.level_name }}</span>
            </div>
          </div>
          <div class="copy-code flex">
            <p class="code">{{ dataList.mobile || '手机号码' }}</p>
            <div class="copy-icon" @click="bindPhone(dataList.mobile)"><img width="100%" height="100%" src="../../assets/edit.png" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="my-card" @click.stop="share()"><img src="../../assets/card.png" width="100%" alt="" /></div>
      <van-cell-group>
        <van-cell value="" is-link to="/order">
          <template #title>
            <span class="icon"><img width="100%" height="100%" src="../../assets/wddd.png" /></span>
            <span class="custom-title">我的订单</span>
          </template>
        </van-cell>
        <van-cell value="" is-link to="/collect">
          <template #title>
            <span class="icon"><img width="100%" height="100%" src="../../assets/wdsc.png" /></span>
            <span class="custom-title">我的收藏</span>
          </template>
        </van-cell>
        <van-cell value="" is-link to="/book">
          <template #title>
            <span class="icon"><img width="100%" height="100%" src="../../assets/txl.png" /></span>
            <span class="custom-title">通讯录</span>
          </template>
        </van-cell>
        <van-cell value="" is-link to="/address">
          <template #title>
            <span class="icon"><img width="100%" height="100%" src="../../assets/dzgl.png" /></span>
            <span class="custom-title">地址管理</span>
          </template>
        </van-cell>
        <van-cell value="" is-link  :to="{ name: 'about', params: { typeId: 0 }}">
          <template #title>
            <span class="icon"><img width="100%" height="100%" src="../../assets/gywm.png" /></span>
            <span class="custom-title">关于我们</span>
          </template>
        </van-cell>
        <van-cell value="" is-link  :to="{ name: 'about', params: { typeId: 1 }}">
          <template #title>
            <span class="icon"><img width="100%" height="100%" src="../../assets/lxwm.png" /></span>
            <span class="custom-title">联系我们</span>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- <div class="vip" @click="goVip"><img width="100%" height="100%" src="../../assets/ad1.png" alt="" /></div> -->
      <!-- <van-button type="default" round plain size="large">退出登录</van-button> -->
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <vue-canvas-poster :painting="painting" @success="success"></vue-canvas-poster>
          <div class="qrcode" ref="qrCodeUrl"></div>
          <div class="shareCode" @touchstart="gotouchstart" @touchmove="gotouchmove" @touchend="gotouchend"><img
              crossorigin="anonymous" width="100%" :src="shareCode" alt="" /></div>
        </div>
      </div>
  </van-overlay>
  </div>
</template>

<script>
  var timeOutEvent = 0; //定时器
  import Vue from 'vue';
  import {
    Button,
    Cell,
    CellGroup,
    Toast,
    Overlay
  } from 'vant';
  import html2canvas from "html2canvas";
  import QRCode from 'qrcodejs2';
  Vue.use(Overlay);
  Vue.use(Toast);
  Vue.use(Button);
  Vue.use(Cell);
  Vue.use(CellGroup);
  export default {
    name: '',
    data() {
      return {
        dataList: '',
        show: false,
        shareCode: '',
        shareUrl: '',
        painting: {},
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      bindPhone(e){
        this.$router.push({
          name: 'bindPhone',
          params:{
            phone:e
          }
        });
      },
      goVip() {
        this.$router.push({
          name: 'vip'
        });
      },
      // 获取个人详情
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
        this.https.get('/user/index', param, '').then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            that.dataList = res.data.user_info;
          } else {
            Toast.fail(res.msg);
          }
        });
      },
      success(src) {
        // console.log(src);
        this.shareCode = src;
      },
      fail(err) {
        console.log('fail', err);
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
      // 长按事件
      gotouchstart() {
        let that = this;
        clearTimeout(timeOutEvent); //清除定时器
        timeOutEvent = 0;
        timeOutEvent = setTimeout(function() {
          //执行长按要执行的内容，
        }, 600); //这里设置定时
      },
      //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
      gotouchend() {
        clearTimeout(timeOutEvent);
        if (timeOutEvent != 0) {
          //这里写要执行的内容（尤如onclick事件）
        }
      },
      //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      gotouchmove() {
        clearTimeout(timeOutEvent); //清除定时器
        timeOutEvent = 0;
      },
      // 分项
      share(goods) {
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
        this.https.post('/user/bus-card', param, '').then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            that.cardData = res.data;
            var qrcode = new QRCode(this.$refs.qrCodeUrl, {
              text: 'http://wap.shinecrystal.cn/tabbar/home?invitation_code='+res.data.invitation_code, // 需要转换为二维码的内容
              width: 116,
              height: 116,
              colorDark: '#000000',
              colorLight: '#ffffff',
              correctLevel: QRCode.CorrectLevel.H
            })
            let canvas = qrcode._el.querySelector("canvas");
            var base64Text = canvas.toDataURL("image/png");
            console.log(base64Text)
            this.painting = {
              width: '630px',
              height: '1120px',
              background: '#ffffff',
              views: [{
                  type: 'image',
                  url:res.data.bg,
                  css: {
                    top: '0px',
                    left: '0px',
                    width: '630px',
                    height: '1120px'
                  }
                },
                {
                    type: 'image',
                    url:require('../../assets/cardbg.png'),
                    css: {
                      left: '40px',
                      bottom: '42px',
                      right:'40px',
                      width: '552px',
                      height: '367px'
                    }
                  },
                  {
                      type: 'image',
                      url:res.data.avatar,
                      css: {
                        left: '100px',
                        bottom: '269px',
                        width: '80px',
                        height: '80px',
                        borderRadius:'40px'
                      }
                    },
                {
                  type: 'text',
                  text:'我的邀请码',
                  css: {
                    bottom: '188px',
                    left: '101px',
                    maxLines: 1,
                    fontSize: '24px',
                    color:'#333333'
                  }
                },
                {
                  type: 'text',
                  text:res.data.invitation_code,
                  css: {
                    bottom: '130px',
                    left: '101px',
                    maxLines: 1,
                    fontSize: '36px',
                    color:'#333333'
                  }
                },
                {
                  type: 'text',
                  text: res.data.nickname,
                  css: {
                    bottom: '292px',
                    left: '137px',
                    maxLines: 1,
                    fontSize: '28px',
                    color: '#F34E81'
                  }
                },
                // {
                //   type: 'text',
                //   text: res.data.level_name,
                //   css: {
                //     bottom: '103px',
                //     left: '30px',
                //     width: '569px',
                //     maxLines: 1,
                //     textDecoration: 'line-through',
                //     fontSize: '20px',
                //     color: '#F34E81'
                //   }
                // },
                {
                  type: 'text',
                  text: '请长按图片进行保存分享',
                  css: {
                    bottom: '80px',
                    left: '30px',
                    width: '569px',
                    maxLines: 1,
                    textAlign: 'center',
                    fontSize: '24px',
                    color: '#F34E81'
                  }
                },
                {
                  type: 'image',
                  url: base64Text,
                  css: {
                    bottom: '113px',
                    right: '103px',
                    color: '#000',
                    background: '#fff',
                    width: '116px',
                    height: '116px',
                    borderColor: '#fff'
                  }
                }
              ]
            };
            this.show = true;
          } else {
            Toast.fail(res.msg);
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .mine {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 100px;
    overflow: auto;
    background: #f8f8f8;

    .shareCode {
      width: 630px;
      height: 1120px;
      margin: 10% auto 0;
      position: relative;
    }

    .qrcode {
      display: none;
      height: 116px;
      width: 116px;
    }

    .my-card {
      position: absolute;
      left: 30px;
      right: 30px;
      top: 280px;
    }

    .top-bg {
      position: relative;
      height: 340px;
    }

    .message {
      position: absolute;
      left: 60px;
      right: 60px;
      top: 20%;
      display: flex;
      color: #ffffff;
      font-weight: bold;
    }

    .head {
      height: 114px;
      width: 114px;
      border: 6px solid #ffffff;
      border-radius: 50%;
      overflow: hidden;
    }

    .vip-icon {
      width: 43px;
      height: 43px;
      margin: 0 -20px 0 10px;
      position: relative;
      z-index: 1;
    }

    .copy-icon {
      width: 27px;
      // height: 28px;
      margin-left: 20px;
    }

    .name-type {
      line-height: 60px;
      margin-left: 40px;
    }

    .name {
      font-size: 36px;
    }

    .type {
      display: block;
      width: 140px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      background: rgba(211, 131, 123, 1);
      border-radius: 17px;
    }

    .copy-code {
      font-size: 28px;
      justify-content: inherit;
    }

    .icon {
      display: inline-block;
      // vertical-align: text-top;
      height: 28px;
      width: 28px;
    }

    .van-cell {
      padding: 32px 30px;
    }

    .van-cell-group {
      border-radius: 10px;
      overflow: hidden;
      margin-top: 170px;
    }

    .vip {
      margin: 30px 0;
    }

    .van-button--default {
      height: 80px;
      color: #f34e81;
      font-size: 32px;
      font-weight: bold;
      border: 2px solid #f34e81;
      margin-bottom: 30px;
    }

  }
</style>
