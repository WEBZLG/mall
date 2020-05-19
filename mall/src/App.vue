<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body,
img,
p {
  margin: 0;
  padding: 0;
  font-size: 24px;
}
img {
  display: block;
  height: 100%;
  width: 100%;
}

.search-box {
  padding: 30px;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/* .search-ipt {
  text-indent: 54px;
  border: none;
  outline: none;
  height: 56px;
  width: 100%;
  border-radius: 56px;
  background-color: #f5f5f5;
} */
.ipt-box {
  flex: 1;
  position: relative;
}
.van-search{
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
  border: 2px solid #f34e81;
  color: #f34e81;
  outline: none;
  background-color: #ffffff;
}
.good-type {
  padding: 14px 0;
}
.ly-tab-item{
  font-size: 32px !important;
}
.ly-tab-item:not(:first-child){
  margin-left: 30px !important;
}
.vip {
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
}
</style>
