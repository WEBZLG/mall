<template>
  <div class="fans">
    <van-nav-bar title="我的粉丝" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <van-tabs v-model="active" swipe-threshold="5"  @click="onClick">
        <van-tab v-for="tab in tabList" :title="tab.name" :key="tab.id">
          <div class="name-list">
            <div class="flex item-fans" v-for="item in dataList" :key="item.id">
              <div class="head"><img :src="item.avatar_url" alt="图片丢失" /></div>
              <div class="info">
                <div class="flex name-type">
                  <p class="name">{{item.nickname}}</p>
                  <div class="flex">
                    <div class="vip-icon">
                      <!-- <img src="../../../assets/visitor.png" alt="" /> -->
                       <!-- <img src="../../../assets/little_chief.png" alt="" /> -->
                         <img src="../../../assets/large_chief.png" alt="">
                          <!-- <img src="../../../assets/member.png" alt=""> -->
                    </div>
                    <span class="type">{{tab.name}}</span>
                  </div>
                </div>
                <div class="flex">
                  <div class="wechat">微信号:{{item.wechat_code}}</div>
                  <div class="active-icon copy" :data-clipboard-text="item.wechat_code" @click="copyLink('.copy')"><img src="../../../assets/copy2.png" alt="" /></div>
                </div>
              </div>
            </div>
            <div class="no-data" v-if="dataList.length == 0">
              <div class="no-icon"><img src="../../../assets/nodata.png" alt="" /></div>
              <p class="no-text">暂无数据</p>
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
import { Toast } from 'vant';
import { Dialog } from 'vant';
Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NavBar);
export default {
  name: 'fans',
  data() {
    return {
      tabList: [],
      dataList:[],
      active: 0
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClick(name, title) {
      this.dataList= this.tabList[name].list;
    },
    copyLink(className) {
       let that = this;
       let clipboard = new this.clipboard(className);
       clipboard.on('success', function(e) {
          Toast.success('复制成功');
       });
       clipboard.on('error', function() {
          Toast.fail('复制失败');
       });
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
	  this.https.post('/profit/my_fans', param, '').then(res => {
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
