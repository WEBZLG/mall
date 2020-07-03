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
            <div class="copy-icon"><img width="100%" height="100%" src="../../assets/edit.png" alt="" /></div>
          </div>
          <button type="button" class="my-card" @click.stop="share(goods)">我的名片</button>
        </div>
      </div>
    </div>
    <div class="content">
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
        <van-cell value="" is-link>
          <template #title>
            <span class="icon"><img width="100%" height="100%" src="../../assets/gywm.png" /></span>
            <span class="custom-title">关于我们</span>
          </template>
        </van-cell>
        <van-cell value="" is-link>
          <template #title>
            <span class="icon"><img width="100%" height="100%" src="../../assets/lxwm.png" /></span>
            <span class="custom-title">联系我们</span>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="vip" @click="goVip"><img width="100%" height="100%" src="../../assets/ad1.png" alt="" /></div>
      <!-- <van-button type="default" round plain size="large">退出登录</van-button> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Toast } from 'vant';
Vue.use(Toast);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
export default {
  name: '',
  data() {
    return {
      dataList: ''
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    goVip() {
      this.$router.push({ name: 'vip' });
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
    // 分项
    share(goods) {
      console.log(goods);
      this.goodsInfo = goods;
      this.shareUrl = this.$root.posterUrl + goods.id;
      this.painting = {
        width: '630px',
        height: '806px',
        background: '#ffffff',
        views: [
          {
            type: 'image',
            url: goods.pic_url.toString(),
            css: {
              top: '0px',
              left: '0px',
              width: '630px',
              height: '504px'
            }
          },
          {
            type: 'text',
            text: goods.name,
            css: {
              bottom: '245px',
              left: '30px',
              right: '30px',
              width: '569px',
              maxLines: 2,
              fontSize: '26px'
            }
          },
          {
            type: 'text',
            text: '￥' + goods.price,
            css: {
              bottom: '142px',
              left: '30px',
              width: '569px',
              maxLines: 1,
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#F34E81'
            }
          },
          {
            type: 'text',
            text: '￥' + goods.original_price,
            css: {
              bottom: '103px',
              left: '30px',
              width: '569px',
              maxLines: 1,
              textDecoration: 'line-through',
              fontSize: '20px',
              color: '#F34E81'
            }
          },
          {
            type: 'text',
            text: '请长按图片进行保存分享',
            css: {
              bottom: '30px',
              left: '30px',
              width: '569px',
              maxLines: 1,
              textAlign: 'center',
              fontSize: '24px',
              color: '#F34E81'
            }
          },
          {
            type: 'qrcode',
            content: this.$root.posterUrl + goods.id,
            css: {
              bottom: '104px',
              right: '30px',
              color: '#000',
              background: '#fff',
              width: '82px',
              height: '82px',
              borderWidth: '10px',
              borderColor: '#fff'
            }
          }
        ]
      };
      this.show = true;
    },
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
  .my-card {
    height: 40px;
    line-height: 40px;
    border-radius: 40px;
    font-size: 22px;
    color: #f34e81;
    outline: none;
    border: none;
    background-color: #ffffff;
    position: absolute;
    right: 0;
    top: 68px;
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
    margin-top: -56px;
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
