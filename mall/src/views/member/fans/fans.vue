<template>
  <div class="fans">
    <van-nav-bar title="我的粉丝" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <van-tabs v-model="active" swipe-threshold="5">
        <van-tab v-for="item in tabList" :title="item.title" :key="item.id">
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
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NavBar);
export default {
  name: 'fans',
  data() {
    return {
      tabList: [
        {
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
        }
      ],
      active: 0
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClick(name, title) {
      Toast(title);
    }
  }
};
</script>

<style lang="less">
.fans {
  .van-tab--active {
    font-weight: bold;
  }
  .van-tabs__line {
    background-color: #ff9900;
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
    padding: 20px 30px;
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
