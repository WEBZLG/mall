<template>
  <div class="book">
    <van-nav-bar title="通讯录" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar } from 'vant';
  Vue.use(NavBar);
  export default {
    name: 'book',
    data() {
      return {

      }
    },
    methods:{
      onClickLeft() {
        this.$router.back();
      },
    }
  }
</script>

<style>
</style>
