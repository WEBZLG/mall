<template>
  <div id="app">
    <keep-alive>
      <router-view  v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view  v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      key() {
        return this.$route.name ? this.$route.name + +new Date() : this.$route + +new Date();
      }
    }
  };
</script>

<style>
  html,
  body,
  p {
    margin: 0;
    padding: 0;
    font-size: 24px;
  }

  #app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: #f8f8f8;
  }

  .search-box {
    padding: 30px;
    padding-bottom: 0;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    justify-content: space-between;
  }

  .ipt-box {
    flex: 1;
    position: relative;
  }

  .van-search {
    padding: 0 !important;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    padding: 0 30px;
  }

  .caption {
    font-size: 32px;
    font-weight: bold;
  }

  .goods-pic {
    height: 222px;
    width: 222px;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 30px;
  }

  .goods-list {
    padding-top: 30px;
  }

  .goods-item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 30px;
  }

  .goods-desc {
    flex: 1;
  }

  .good-price {
    margin-bottom: 14px;
  }

  .goods-title {
    height: 76px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 28px;
    font-weight: bold;
  }

  .sm-btn {
    height: 40px;
    border-radius: 40px;
    font-size: 22px;
    border: 1px solid #f34e81;
    color: #f34e81;
    outline: none;
    padding: 0 16px;
    background-color: #ffffff;
  }

  .good-type {
    padding: 14px 0;
  }

  .ly-tab-item {
    font-size: 32px !important;
  }

  .ly-tab-item:not(:first-child) {
    margin-left: 30px !important;
  }

  .vip {
    height: 200px;
    border-radius: 10px;
    overflow: hidden;
  }

  .orange-btn {
    padding: 0 30px;
    height: 60px;
    border: none;
    outline: none;
    color: #ffffff;
    font-size: 28px;
    font-weight: bold;
    background: rgba(255, 153, 0, 1);
    border-radius: 30px;
  }

  .red-btn {
    padding: 0 30px;
    height: 60px;
    border: 1px solid #f34e81;
    outline: none;
    color: #f34e81;
    font-size: 28px;
    font-weight: bold;
    border-radius: 30px;
    background-color: #ffffff;
  }

  .none {
    display: none;
  }

  .van-nav-bar .van-icon {
    color: #000000 !important;
    font-weight: bold;
  }

  .no-data {
    margin: 20% auto;
    text-align: center;
    font-size: 28px;
  }

  .no-icon {
    height: 214px;
    width: 458px;
    margin: 0 auto 30px;
  }

  .mark {
    padding: 30px;
    color: #ffffff;
    text-align: center;
  }

  .closeShare {
    height: 80px;
    width: 80px;
    margin: 0 auto;
    border-radius: 50%;
  }
</style>
