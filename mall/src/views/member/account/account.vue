<template>
  <div class="account">
    <van-nav-bar title="到账收益" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <van-tabs v-model="active" swipe-threshold="5">
        <van-tab v-for="item in tabList" :title="item.title" :key="item.id">
          <div>
            <div class="change-date" @click="showPopup" v-if="item.id==3">{{ nowDay }} <span class="down-icon"><img src="../../../assets/down.png" alt=""></span></div>
            <van-popup v-model="show" position="bottom" :style="{ height: '35%' }">
              <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="show = false" @confirm="confirmPicker" />
            </van-popup>
          </div>
          <van-cell-group><van-cell title="单元格" :value="item.title" /></van-cell-group>
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottom flex">
      <div>*统计包含2020-05-01至2020-05-31的数据</div>
      <van-button type="primary" plain hairline size="small">查看说明</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { Tab, Tabs } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Button } from 'vant';
import { Popup } from 'vant';
import { DatetimePicker } from 'vant';
import { Toast } from 'vant';
import { Dialog } from 'vant';
Vue.use(Toast);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
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
          title: '本月到账'
        },
        {
          id: 1,
          title: '上月到账'
        },
        {
          id: 2,
          title: '近30天到账'
        },
        {
          id: 3,
          title: '更多往期'
        }
      ],
      active: 0,
      show: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      nowDay:''
    };
  },
  mounted() {
    this.nowDay = this.formatter(this.currentDate)
    // this.getData()
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClick(name, title) {
      Toast(title);
    },
    showPopup() {
      this.show = true;
    },
    confirmPicker(e) {
      console.log(this.formatter(e))
      console.log(this.currentDate);
      this.nowDay = this.formatter(e);
      this.show = false;
    },
    formatter(date) {
      var d = new Date(date);
      var val=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      return val;
    },
	// 获取列表
	getData() {
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
	  this.https.post('/profit/arrive', param, '').then(res => {
	    console.log(res);
	    Toast.clear();
	    if (res.code == 0) {
	      that.tabList = res.data;
        that.dataList=res.data[0].list;
	    } else {
	      Toast.fail(res.message);
	    }
	  });
	},
  }
};
</script>

<style lang="less">
.account {
  .van-tab--active {
    font-weight: bold;
  }
  .van-tabs__line {
    background-color: #ff9900;
  }
  .van-cell-group {
    padding: 0 30px;
  }
  .van-cell {
    padding: 30px 0;
  }
  .van-cell__value {
    color: #f34e81;
    font-weight: bold;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 30px;
    color: #999999;
    background-color: #ffffff;
  }
  .van-button--plain.van-button--primary {
    width: 120px;
    height: 40px;
    border: 2px solid rgba(243, 78, 129, 1);
    border-radius: 20px;
    color: #f34e81;
    font-weight: bold;
    outline: none;
    font-size: 22px;
    padding: 0;
  }
  .van-hairline--surround:after {
    border: none;
  }
  .down-icon{
     display: inline-block;
     vertical-align: middle;
     height: 15px;
     width: 26px;
  }
  .change-date{
    text-align: center;
    font-size: 28px;
    height: 60px;
    line-height: 60px;
    border-radius: 60px;
    margin:20px 30px;
    background-color: #F5F5F5;
  }
}
</style>
