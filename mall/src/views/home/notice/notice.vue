<template>
  <div class="notice">
    <van-nav-bar title="通知" left-arrow @click-left="onClickLeft" />
    <div class="list-box">
      <div class="not-item" v-for="(item,index) in dataList" :key="index" @click="detail(item.content)">
        <p class="title">
          <!-- <em>[公告]</em> -->
          {{item.title}}
        </p>
        <!-- <p class="descript" v-html="item.content"></p> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import axios from 'axios';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(NavBar);
export default {
  name: 'notice',
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
    detail(data){
      this.$router.push({name:'noticeDetail',params:{data:data}})
    },
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
      this.https.get('/default/article-list', param, '&cat_id=2').then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.dataList = res.data.list;
        } else {
          Toast.fail(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.notice {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f8f8f8;
  .list-box {
    position: absolute;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
  .not-item {
    padding: 30px;
    border-radius: 10px;
    background-color: #ffffff;
    margin: 30px;
    line-height: 50px;
    font-size: 28px;
    .title {
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .descript {
      color: #999999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
