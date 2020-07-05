<template>
  <div class="addressC">
    <van-nav-bar title="地址管理" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <van-swipe-cell v-for="item in dataList" :key="item.id">
        <div>
          <div class="flex item-fans">
            <div class="info">
              <div class="flex name-type">
                <div>
                  <p class="name">
                    <span>{{ item.name }}</span>
                    <span>{{ item.mobile }}</span>
                  </p>
                </div>
                <div class="default" v-if="item.is_default == 1">默认</div>
              </div>
              <div class="flex">
                <div class="wechat">{{ item.address }}</div>
                <div class="active-icon" @click="editFun(item.id)"><img width="100%" height="100%"   src="../../../assets/edit2.png" alt="" /></div>
              </div>
            </div>
          </div>
        </div>
        <template #right>
          <van-button square type="primary" text="设为默认" @click="defaultFun(item.id)" />
          <van-button square type="danger" text="删除" @click="deleteFun(item.id)" />
        </template>
      </van-swipe-cell>
      <div class="no-data" v-if="dataList.length == 0">
        <div class="no-icon"><img width="100%" height="100%"   src="../../../assets/nodata.png" alt="" /></div>
        <p class="no-text">暂无数据</p>
      </div>
    </div>
    <div class="btn-box"><van-button type="default" round plain size="large" @click="add()">添加收货地址</van-button></div>
  </div>
</template>

<script>
import Vue from 'vue';
import { SwipeCell } from 'vant';
import { NavBar } from 'vant';
import { Button } from 'vant';
import { Toast } from 'vant';
import { Dialog } from 'vant';

Vue.use(Toast);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(SwipeCell);
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
    editFun(id) {
      this.$router.push({ name: 'edit', params: { aid: id } });
    },
    onClickLeft() {
      this.$router.back();
    },
    add() {
      this.$router.push('/add');
    },
    // 获取列表
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
      this.https.get('/user/address-list', param, '').then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.dataList = res.data.list;
        } else {
          Toast.fail(res.message);
        }
      });
    },
    // 删除地址
    deleteFun(id) {
      var that = this;
      let param = {
        id: 1,
        platform: 'wx',
        token: this.$root.token
      };
      Dialog.confirm({
        message: '确定删除吗？'
      })
        .then(res => {
          Toast.loading({
            duration: 0,
            message: '加载中...',
            forbidClick: true
          });
          this.https.get('/user/address-delete', param, '&address_id=' + id).then(res => {
            console.log(res);
            Toast.clear();
            if (res.code == 0) {
              Toast.success('删除成功');
              that.getData();
            } else {
              Toast.fail(res.message);
            }
          });
        })
        .catch(() => {});
    },
    // 设置默认地址
    defaultFun(id) {
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
      this.https.get('/user/address-set-default', param, '&address_id=' + id).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          Toast.success('设置成功');
          that.getData();
        } else {
          Toast.fail(res.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.addressC {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 140px;
  background-color: #f8f8f8;
  .mid-view{
    position: absolute;
        top: 96px;
        left: 0;
        right: 0;
        bottom: 0px;
  }
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
  .btn-box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 30px;
    background-color: #f8f8f8;
  }
  .van-button--default {
    height: 80px;
    color: #ffffff;
    font-size: 32px;
    font-weight: bold;
    background-color: #ff9900;
  }
  .van-button--primary {
    background-color: #ff9900;
    border: 1px solid #ff9900;
    margin: 0px -4px 0 0;
  }
  .van-button--danger {
    background-color: #ff354d;
    border: 1px solid #ff354d;
    margin: 0px 0 0 -4px;
  }
}
</style>
