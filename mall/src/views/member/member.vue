<template>
  <div class="member">
    <div class="top-bg">
      <img width="100%" height="100%"   src="../../assets/vip_bg.jpg" alt="" />
      <div class="message">
        <div class="head"><img width="100%" height="100%"   :src="dataList.avatar_url" alt="暂无" /></div>
        <div class="name-type">
          <div class="flex">
            <p class="name">{{dataList.nickname||'臻悦用户'}}</p>
            <div class="flex">
              <div class="vip-icon">
                <img width="100%" height="100%"   src="../../assets/visitor.png" alt="" />
                <!--  <img width="100%" height="100%"   src="../../assets/little_chief.png" alt="" />
                <img width="100%" height="100%"   src="../../assets/large_chief.png" alt="">
                <img width="100%" height="100%"   src="../../assets/member.png" alt=""> -->
              </div>
              <span class="type">{{dataList.level_name}}</span>
            </div>
          </div>
          <div class="copy-code flex">
            <p class="code">邀请码:{{dataList.mobile||'暂无'}}</p>
            <div class="copy-icon"><img width="100%" height="100%"   src="../../assets/copy.png" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="deposit" @click="deposit()">
        <img width="100%" height="100%"   src="../../assets/vip_ad1.png" alt="">
      </div>
      <div class="model-item">
        <van-cell value="" is-link to="/fans">
          <template #title>
            <span class="custom-title">我的粉丝</span>
            <span class="icon"><img width="100%" height="100%"   src="../../assets/open.png" /></span>
          </template>
        </van-cell>
        <div class="flex">
          <div class="item">
            <p class="number">{{zcyh}}人</p>
            <p class="part-type">注册用户</p>
          </div>
          <div class="line"></div>
          <div class="item">
            <p class="number">{{xtz}}人</p>
            <p class="part-type">小团长</p>
          </div>
          <div class="line"></div>
          <div class="item">
            <p class="number">{{dtz}}人</p>
            <p class="part-type">大团长</p>
          </div>
          <div class="line"></div>
          <div class="item">
            <p class="number">{{hxtz}}人</p>
            <p class="part-type">核心团长</p>
          </div>
        </div>
      </div>
      <div class="model-item">
        <van-cell value="" is-link to="/estimate">
          <template #title>
            <span class="custom-title">预估收益</span>
            <span class="icon"><img width="100%" height="100%"   src="../../assets/open.png" /></span>
          </template>
        </van-cell>
        <div class="flex">
          <div class="item">
            <p class="number">￥{{ygDataList.extension_money}}</p>
            <p class="part-type">推广收益</p>
          </div>
          <div class="line"></div>
          <div class="item">
            <p class="number">￥{{ygDataList.team_money}}</p>
            <p class="part-type">团队收益</p>
          </div>
          <div class="line"></div>
          <div class="item">
            <p class="number">￥{{ygDataList.extension_money}}</p>
            <p class="part-type">总收益</p>
          </div>
        </div>
      </div>
      <div class="model-item">
        <van-cell value="" is-link to="/account">
          <template #title>
            <span class="custom-title">到账收益</span>
            <span class="icon"><img width="100%" height="100%"   src="../../assets/open.png" /></span>
          </template>
        </van-cell>
        <div class="flex">
          <div class="item">
            <p class="number">￥{{dzDataList.today_money}}</p>
            <p class="part-type">今日到账</p>
          </div>
          <div class="line"></div>
          <div class="item">
            <p class="number">￥{{dzDataList.yesterday_money}}</p>
            <p class="part-type">昨日到账</p>
          </div>
          <div class="line"></div>
          <div class="item">
            <p class="number">￥{{dzDataList.total_money}}</p>
            <p class="part-type">总到账</p>
          </div>
        </div>
      </div>
<!--      <div class="model-item">
        <van-cell value="" is-link to="/order">
          <template #title>
            <span class="custom-title">我的订单</span>
            <span class="icon"><img width="100%" height="100%"   src="../../assets/open.png" /></span>
          </template>
        </van-cell>
        <div class="flex">
          <div class="item">
            <p class="number">***</p>
            <p class="part-type">今日购买订单</p>
          </div>
          <div class="line"></div>
          <div class="item">
            <p class="number">***</p>
            <p class="part-type">今日推广订单</p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Cell,
    CellGroup
  } from 'vant';
  import {
    Toast
  } from 'vant';
  import {
    Dialog
  } from 'vant';
  Vue.use(Toast);
  Vue.use(Cell);
  Vue.use(CellGroup);
  export default {
    name: '',
    data() {
      return {
        dataList:'',
        ygDataList: {},
        dzDataList: {},
        zcyh:'',
        xtz:'',
        dtz:'',
        hxtz:''
      };
    },
    mounted() {
      this.getYgData();
      this.getDzData();
      this.getFansData();
      this.getData()
    },
    methods: {
      deposit() {
        this.$router.push('/deposit')
      },
      // 预估收益
      getYgData() {
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
        this.https.post('/profit/estimate', param, '').then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            that.ygDataList = res.data;
          } else {
            Toast.fail(res.msg);
          }
        });
      },
      // 到账收益
      getDzData() {
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
        this.https.post('/profit/arrive', param, '').then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            that.dzDataList = res.data;
          } else {
            Toast.fail(res.msg);
          }
        });
      },
      // 我的粉丝
      getFansData() {
        var that = this;
        let param = {
          id: 1,
          platform: 'wx',
          token: this.$root.token
        };
        let status = '';
        Toast.loading({
          duration: 0,
          message: '加载中...',
          forbidClick: true
        });
        this.https.post('/profit/my_fans', param, '').then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            that.fansDataList = res.data;
            that.zcyh = res.data[0].count
            that.xtz = res.data[3].count
            that.dtz = res.data[4].count
            that.hxtz = res.data[2].count
          } else {
            Toast.fail(res.msg);
          }
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
          this.https.get('/user/index', param, '' ).then(res => {
            console.log(res);
            Toast.clear();
            if (res.code == 0) {
              that.dataList = res.data.user_info;
            } else {
              Toast.fail(res.msg);
            }
          });
        },
    }
  };
</script>

<style lang="less" scoped>
  .member {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 100px;
    overflow: auto;
    background: #f8f8f8;

    .top-bg {
      position: relative;
      height: 340px;
    }

    .message {
      position: absolute;
      left: 10%;
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

    .deposit {
      margin-bottom: 40px;
    }

    .model-item {
      border-radius: 10px;
      background: #ffffff;
      overflow: hidden;
      padding-bottom: 48px;
      margin-bottom: 20px;
    }

    .mint-cell img {
      display: inline;
      width: 34px;
      height: 28px;
    }

    .item {
      flex: 1;
      text-align: center;
    }

    .number {
      font-size: 32px;
      color: #F34E81;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .line {
      height: 100px;
      border-right: 1px solid #dcdcdc;
    }

    .icon {
      display: inline-block;
      width: 34px;
      vertical-align: middle;
    }

    .van-cell:not(:last-child):after {
      border: none;
    }
  }
</style>
