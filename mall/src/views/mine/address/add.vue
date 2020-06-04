<template>
  <div class="add">
    <van-nav-bar title="地址管理" left-arrow @click-left="onClickLeft" />
    <van-address-edit :area-list="areaList" show-set-default :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @change-detail="onChangeDetail" />
  </div>
</template>

<script>
import areaList from './area.js';
import Vue from 'vue';
import { Toast } from 'vant';
import { AddressEdit } from 'vant';
import { NavBar } from 'vant';
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(AddressEdit);
export default {
  name: 'add',
  data() {
    return {
      areaList,
      dataObj: {},
      name:'',
      mobile:'',
      province:'',
      city:'',
      districe:'',
      detail:'',
      is_default:'',
      address_id:''
    };
  },
  methods: {
    // 保存
    onSave(e) {
      console.log(e)
      var that = this;
      let param = {
        id: 1,
        platform: 'wx',
        token: 'eTV7sqoeEANNeFyTqS-g0yVk5rEpaZ_S'
      };
      return false;
      Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      });
      this.https.get('/user/favorite-list', param, '').then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.dataList = res.data.list;
        } else {
          Toast.fail(res.message);
        }
      });
    },
    onClickLeft() {
      this.$router.back();
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  }
};
</script>

<style class="less">
.van-address-edit .van-button--danger {
  height: 80px;
  border: 1px solid #ff9900;
  background-color: #ff9900;
}
.van-switch--on {
  background-color: #ff9900;
}
</style>
