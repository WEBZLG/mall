<template>
  <div class="content">
    <div class="vip"><img src="../../../assets/daily_banner1.png" alt="" /></div>
    <div class="goods-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="goods-item">
        <div class="goods-pic"><img src="../../../assets/item_large1.png" alt="" /></div>
        <div class="goods-desc">
          <p class="goods-title">袖卫衣 8NN({{clientDetails}})</p>
          <!-- <p class="good-type">海外|自营</p> -->
          <div class="good-price flex">
            <p class="old-price">￥1200</p>
            <p class="brokerage">
              <span class="good-icon"></span>
              佣金￥9.99
            </p>
          </div>
          <div class="goods-share flex">
            <p class="new-price">
              <span class="size">￥</span>
              1699
            </p>
            <div class="btn-bot">
              <button type="button" class="sm-btn">复制文字</button>
              <button type="button" class="sm-btn">分享图片</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['clientDetails'],
  data() {
    return {};
  },
  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    }
  },
  watch: {
    clientDetails(newVal) {
      console.log(newVal);
    }
  }
};
</script>

<style>
.goods-list {
  margin-top: 0;
}
</style>
