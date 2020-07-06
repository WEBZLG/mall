<template>
  <div class="add">
    <van-nav-bar title="地址管理" left-arrow @click-left="onClickLeft" />
    <van-address-edit :area-list="areaList"  :area-columns-placeholder="['请选择', '请选择', '请选择']" :address-info="addressinfo" @save="onSave" @change-detail="onChangeDetail" />
<!--    <van-field readonly clickable label="城市" :value="values" placeholder="选择城市" @click="showPicker = true" />
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker show-toolbar :columns="columns" value-key="text" @cancel="showPicker = false" @confirm="onConfirm" ref="getValue"/>
    </van-popup> -->
  </div>
</template>

<script>
import areaList from './area.js';
import columns from './areacode.js';
import Vue from 'vue';
import { Toast } from 'vant';
import { AddressEdit } from 'vant';
import { NavBar } from 'vant';
import { Picker } from 'vant';
import { Field } from 'vant';
import { Popup } from 'vant';

Vue.use(Popup);
Vue.use(Field);
Vue.use(Picker);
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(AddressEdit);
export default {
  name: 'add',
  data() {
    return {
      columns,
      areaList,
      value: '',
      showPicker: false,
      values:'',
      address_id:'',
      addressinfo:{
          name:'',
          tel:'',
          addressDetail:'',
          province:'',
          city:'',
          county:'',
          areaCode:''
      },
    };
  },
  mounted() {
    this.columns = this.columns.columns
    var id = this.$route.params.aid;
    this.address_id = id;
    this.exitFun(id);
  },
  methods: {
    onConfirm(picker, value, index) {
      var ref = this.$refs.getValue.getColumnValues();
      console.log(ref)
      console.log(picker)
      // this.values = value;
      this.showPicker = false;
    },
    // 保存
    onSave(e) {
      var that = this;
      let param = {
        id: 1,
        platform: 'wx',
        token: this.$root.token
      };
      let columns = this.columns;
      let province,city,county;
      for(var i=0;i<columns.length;i++){
        if(columns[i].text==e.province){
          province = columns[i].id;
          for (var j=0;j<columns[i].children.length;j++) {
            if(columns[i].children[j].text==e.city){
              city = columns[i].children[j].id;
              for (var k=0;k<columns[i].children[j].children.length;k++) {
                if(columns[i].children[j].children[k].text==e.county){
                  county = columns[i].children[j].children[k].id;
                }
              }
            }
          }
        }
      }
      let params = {
        name: e.name,
        mobile: e.tel,
        province_id: province,
        city_id: city,
        district_id: county,
        detail: e.addressDetail,
        label_name: e.areaCode,
        'address_id':that.address_id
      };
      console.log(params);
      Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      });
      this.https.post('/user/address-save', param, '', params).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          Toast.success('保存成功');
          if(e.isDefault==true){
            this.defaultFun(res.data.id)
          };
          setTimeout(function(){
            that.onClickLeft();
          },1000)
        } else {
          Toast.fail(res.msg);
        }
      });
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
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    // 地址详情
    exitFun(id) {
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
      this.https.get('/user/address-detail', param, '&id=' + id).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.addressinfo.name=res.data.name
          that.addressinfo.tel=res.data.mobile
          // that.addressinfo.province=res.data.name
          // that.addressinfo.city=res.data.name
          // that.addressinfo.county=res.data.name
          that.addressinfo.addressDetail=res.data.detail
          that.addressinfo.areaCode=res.data.area_code
        } else {
          Toast.fail(res.msg);
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
