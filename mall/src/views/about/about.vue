<template>
  <div class="notice">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
    <div class="list-box">
      <div class="concact"  v-if="type==1">
        <van-cell-group>
          <van-cell title="公司" :value="dataList.call_conpany" />
          <van-cell title="电话" :value="dataList.call_mobile" />
          <van-cell title="邮箱" :value="dataList.call_mail" />
          <van-cell title="地址" :value="dataList.call_address" />
        </van-cell-group>
      </div>
      <div class="about" v-if="type==0">
        <h3 class="name">{{dataList.store_name}}</h3>
        <div class="content" v-html="dataList.about_us">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios';
  import {
    Cell,
    CellGroup,
    Toast,
    NavBar
  } from 'vant';

  Vue.use(Cell);
  Vue.use(CellGroup);
  Vue.use(Toast);
  Vue.use(NavBar);
  export default {
    name: 'about',
    data() {
      return {
        dataList: '',
        title: "臻悦尚品",
        type: ''
      };
    },
    mounted() {
      let type = this.$route.params.typeId;
      this.type = type;
      if (type == 0) {
        this.title = '关于我们'
      } else if (type == 1) {
        this.title = '联系我们'
      }
      console.log(type)
      this.getData();
    },
    methods: {
      onClickLeft() {
        this.$router.back();
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
        this.https.post('/default/store', param, '&cat_id=2').then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            that.dataList = res.data;
          } else {
            Toast.fail(res.message);
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
    .name{
      text-align: center;
      padding:15px ;
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
