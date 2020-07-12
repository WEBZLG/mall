<template>
  <div>
    首页
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Toast,
    NavBar
  } from 'vant';
  Vue.use(NavBar);
  Vue.use(Toast);
  export default {
    name: '',
    data() {
      return {
        dataList: ''
      }
    },
    mounted() {
      let cid = this.$route.params.cid;
      let ucid = this.$route.params.ucid;
      this.getData(cid, ucid)
    },
    methods: {
      // 获取列表
      getData(cid, ucid) {
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
        this.https.get('/coupon/detail', param, '&coupon_id=' + cid + '&user_conpon_id' + ucid).then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            that.dataList = res.data.list;
          } else {
            Toast.fail(res.msg);
          }
        });
      },
    }

  }
</script>

<style>
</style>
