<template>
  <div class="level">
    <van-nav-bar title="下级" left-arrow @click-left="onClickLeft" />
    <div class="name-list">
      <div class="flex item-fans">
        <div class="head"><img src="../../../assets/sort1.png" alt="" /></div>
        <div class="info">
          <div class="flex name-type">
            <p class="name">Ada_Wang</p>
            <div class="flex">
              <div class="vip-icon">
                <img src="../../../assets/visitor.png" alt="" />
                <!--  <img src="../../../assets/little_chief.png" alt="" />
                    <img src="../../../assets/large_chief.png" alt="">
                    <img src="../../../assets/member.png" alt=""> -->
              </div>
              <span class="type">注册用户</span>
            </div>
          </div>
          <div class="flex">
            <div class="wechat">微信号:请填写微信号</div>
            <div class="active-icon"><img src="../../../assets/copy2.png" alt="" /></div>
          </div>
        </div>
      </div>
      <div class="flex item-fans">
        <div class="head"><img src="../../../assets/sort1.png" alt="" /></div>
        <div class="info">
          <div class="flex name-type">
            <p class="name">Ada_Wang</p>
            <div class="flex">
              <div class="vip-icon">
                <img src="../../../assets/visitor.png" alt="" />
                <!--  <img src="../../../assets/little_chief.png" alt="" />
                    <img src="../../../assets/large_chief.png" alt="">
                    <img src="../../../assets/member.png" alt=""> -->
              </div>
              <span class="type">注册用户</span>
            </div>
          </div>
          <div class="flex">
            <div class="wechat">微信号:请填写微信号</div>
            <div class="active-icon"><img src="../../../assets/copy2.png" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';

Vue.use(NavBar);
export default {
  name: 'level',
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
.level {
  .name-list {
    // position: absolute;
    // top: 92px;
    // left: 0;
    // right: 0;
    // bottom: 0;
  }
  .head {
    height: 74px;
    width: 74px;
    border-radius: 50%;
    border: 3px solid #dcdcdc;
    overflow: hidden;
    margin-right: 20px;
  }
  .item-fans {
    padding:20px 30px;
  }
  .item-fans:last-child {
    border: none;
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
    justify-content: inherit;
    font-size: 28px;
    .flex {
      margin-left: 20px;
    }
    .name {
      font-weight: bold;
    }
  }
  .wechat {
    color: #999999;
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
}
</style>
