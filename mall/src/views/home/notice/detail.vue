<template>
  <div class="notice">
    <van-nav-bar title="通知详情" left-arrow @click-left="onClickLeft" />
    <div class="list-box">
        <p class="content" v-html="content"></p>
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
      content: ''
    };
  },
  mounted() {
     let data = this.$route.params.data;
     const regex = new RegExp('<img', 'gi');
     data = data.replace(regex, `<img width='100%'`);
     this.content = data;
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less" scoped>
.list-box {
  position: absolute;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
</style>
