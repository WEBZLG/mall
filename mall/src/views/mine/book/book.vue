<template>
  <div class="book">
    <van-nav-bar title="通讯录" left-arrow @click-left="onClickLeft" />
    <div class="name-list">
      <van-panel title="我自己">
        <div class="flex">
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
      </van-panel>
      <van-panel title="邀请人">
        <div class="flex">
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
              <div class="wechat">微信号:666666</div>
              <div class="active-icon"><img src="../../../assets/copy2.png" alt="" /></div>
            </div>
          </div>
        </div>
      </van-panel>
      <van-panel title="我的粉丝">
        <div class="item-fans" v-for="item in dataList" :key="item.id">
          <div class="flex">
            <div class="head"><img :src="item.avatar_url" alt="暂无图片" /></div>
            <div class="info">
              <div class="flex name-type">
                <p class="name">{{ item.nickname }}</p>
                <div class="flex">
                  <div class="vip-icon">
                    <img src="../../../assets/visitor.png" alt="" />
                    <!--  <img src="../../../assets/little_chief.png" alt="" />
                    <img src="../../../assets/large_chief.png" alt="">
                    <img src="../../../assets/member.png" alt=""> -->
                  </div>
                  <span class="type">{{ item.level_name }}</span>
                </div>
              </div>
              <div class="flex">
                <div class="wechat">微信号:请填写微信号</div>
                <div class="active-icon"><img src="../../../assets/copy2.png" alt="" /></div>
              </div>
            </div>
          </div>
          <van-cell class="down-num" :title="'下级人数(' + item.child.length + ')'" is-link :to="{name:'level',params:{child:item.child}}" />
        </div>
        <div class="no-data" v-if="dataList.length == 0">
          <div class="no-icon"><img src="../../../assets/nodata.png" alt="" /></div>
          <p class="no-text">暂无粉丝</p>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { Panel } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Panel);
Vue.use(NavBar);
export default {
  name: 'book',
  data() {
    return {
      dataList: ''
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    // 获取列表
    getData() {
      var that = this;
      let param = {
        id: 1,
        platform: 'wx',
        token: 'eTV7sqoeEANNeFyTqS-g0yVk5rEpaZ_S'
      };
      let status = '';
      Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      });
      this.https.get('/share/get-team_1', param, '&status=' + status).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.dataList = res.data.list;
        } else {
          Toast.fail(res.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.book {
  .name-list {
    position: absolute;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f8f8f8;
    overflow: auto;
  }
  .head {
    height: 74px;
    width: 74px;
    border-radius: 50%;
    border: 3px solid #dcdcdc;
    overflow: hidden;
    margin-right: 20px;
  }
  .van-panel__content {
    padding: 0 30px 30px;
  }
  .item-fans {
    padding-top: 30px;
    border-bottom: 1px solid #dcdcdc;
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
    height: 34px;
    padding: 0 20px;
    background: rgba(0, 0, 0, 1);
    opacity: 0.34;
    border-radius: 17px;
    color: #ffffff;
    text-align: center;
    margin-left: -20px;
    font-size: 24px;
    line-height: 34px;
  }
  [class*='van-hairline']:after {
    border: none;
  }
  .van-cell:not(:last-child):after {
    border: none;
  }
  .van-cell-group {
    margin: 20px 30px;
    border-radius: 10px;
    overflow: hidden;
  }
  .van-cell__title {
    font-weight: bold;
  }
  .down-num {
    padding: 20px 0;
    .van-cell__title {
      font-weight: 400;
    }
  }
}
</style>
