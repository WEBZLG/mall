<template>
  <div class="address">
    <van-nav-bar title="地址管理" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <van-swipe-cell>
        <div>
          <div class="flex item-fans">
            <div class="info">
              <div class="flex name-type">
                <div>
                  <p class="name">
                    <span>Ada_Wang</span>
                    <span>Ada_Wang</span>
                  </p>
                </div>
                <div class="default">默认</div>
              </div>
              <div class="flex">
                <div class="wechat">请填写微信号请填写微信号请填写微信号请填写微信号请填写微信号</div>
                <div class="active-icon"><img src="../../../assets/edit2.png" alt="" /></div>
              </div>
            </div>
          </div>
        </div>
        <template #right>
          <van-button square type="primary" text="设为默认" />
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
    <div class="btn-box">
      <van-button type="default" round plain size="large">添加收货地址</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { SwipeCell } from 'vant';
import { NavBar } from 'vant';
import { Button } from 'vant';
Vue.use(Button);
Vue.use(NavBar);
Vue.use(SwipeCell);
export default {
  name: 'address',
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

<style lang="less" scoped>
.address {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 140px;
  background-color: #f8f8f8;

  .default {
    width: 60px;
    height: 28px;
    background: rgba(243, 78, 129, 1);
    border-radius: 5px;
    font-size: 24px;
    color: #ffffff;
    text-align: center;
    line-height: 32px;
  }
  .item-fans {
    padding: 20px 30px;
    background-color: #ffffff;
    margin: 20px 30px;
    border-radius: 10px;
    line-height: 56px;
  }
  .van-button--normal {
    padding: 0;
    width: 134px;
    height: 152px;
  }

  .info {
    flex: 1;
  }
  .vip-icon {
    height: 43px;
    width: 43px;
    position: relative;
    z-index: 1;
  }
  .active-icon {
    height: 26px;
    width: 26px;
  }
  .name-type {
    font-size: 28px;
    .name {
      font-weight: bold;
    }
  }
  .wechat {
    color: #999999;
    width: 580px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .type {
    width: 140px;
    height: 34px;
    background: rgba(0, 0, 0, 1);
    opacity: 0.34;
    border-radius: 17px;
    color: #ffffff;
    text-align: center;
    margin-left: -20px;
    font-size: 24px;
    line-height: 34px;
  }
  .btn-box{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 30px;
    background-color: #F8F8F8;
  }
  .van-button--default {
    height: 80px;
    color: #ffffff;
    font-size: 32px;
    font-weight: bold;
    background-color: #FF9900;
  }
}
</style>
