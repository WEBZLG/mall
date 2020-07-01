<template>
  <div class="typeContent" ref="r_list">
    <!-- 商品内容列表 -->
    <section class="r_list">
      <div ref="good">
        <ul class="type-list">
          <li v-for="(item, index) in categoriesDetailData" :key="index" class="list " @click="getDetail(item.id)">
            <div class="type-pic" >
              <!-- <img width="100%" height="100%"   v-lazy="item.url" alt="" /> -->
              <img width="100%" height="100%"   :src="item.pic_url" alt="暂无图片" />
            </div>
            <p>{{ item.name }}</p>
          </li>
          <div class="no-data" v-if="categoriesDetailData.length == 0">
            <div class="no-icon"><img width="100%" height="100%"   src="../../../assets/nodata.png" alt="" /></div>
            <p class="no-text">暂无数据</p>
          </div>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: '',
  props: ['categoriesDetailData'],
  data() {
    return {
      scrollY: 0,
      currentSubTitle: 0,
      arrli: 0,
      flag: true,
      value: 0
    };
  },
  mounted() {
    // 初始化更新滑动组件
    this.$nextTick(() => {
      this._initProductScroll();
    });
  },
  watch: {
    categoriesDetailData(newVal) {
      console.log(newVal);
      this.currentSubTitle = 0;
      // 初始化更新滑动组件
      this.$nextTick(() => {
        this._initProductScroll();
      });
    }
  },
  methods: {
    // 产品列表滚动初始化
    _initProductScroll() {
      if (!this.productScroll) {
        this.productScroll = new BScroll(this.$refs.r_list, {
          click: true,
          probeType: 3
        });
      } else {
        this.productScroll.refresh();
        // 2.1 进入默认商品列表滚到顶部
        this.productScroll.scrollToElement(this.$refs.good[0], 10, 0, 0);
      }
    },
    getDetail(e) {
      console.log(e)
      this.$router.push({ name: 'goodsList',params: {gid: e}});
    }
  }
};
</script>

<style lang="less">
.typeContent {
  position: absolute;
  left: 210px;
  right: 0;
  top: 20px;
  bottom: 0;
  overflow: hidden;
  // 防止抖动
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  .type-pic {
    height: 150px;
    width: 150px;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 auto 18px;
  }
  .type-list {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 0 0 33.33%;
      text-align: center;
      padding-bottom: 30px;
    }
  }
}
</style>
