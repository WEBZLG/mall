<template>
  <div id="tabbar">
    <van-tabbar v-model="active" class="active_tab" active-color="#333333">
      <van-tabbar-item v-for="(item, index) in tabbars" :key="index" @click="tab(index, item.name)" :info="item.name == 'cart' ? goodsNum : ''">
        <span :class="currIndex == index ? active : ''">{{ item.title }}</span>
        <template slot="icon" slot-scope="props">
          <img width="23px" height="19px"   :src="props.active ? item.active : item.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <!-- 是否缓存界面选择加载 -->
    <keep-alive><router-view v-if="$route.meta.keepAlive" /></keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue';
import { Tabbar, TabbarItem,Toast } from 'vant';
 Vue.use(Toast);
Vue.use(Tabbar);
Vue.use(TabbarItem);

export default {
  name: 'tabbar',
  created() {
    //通过路由跳转绑定Tabbar的选中
    switch (this.$route.name) {
      case 'home':
        this.active = 0;
        break;
      case 'category':
        this.active = 1;
        break;
      case 'member':
        this.active = 2;
        break;
      case 'cart':
        this.active = 3;
        break;
      case 'mine':
        this.active = 4;
        break;
      default:
        break;
    }
  },
  data() {
    return {
      userInfo:'',
      currIndex: 0,
      active: 0,
      tabbars: [
        {
          name: 'home',
          title: '首页',
          normal: require('../../assets/home_file.png'),
          active: require('../../assets/home.png'),
        },
        {
          name: 'category',
          title: '分类',
          normal: require('../../assets/sort_file.png'),
          active: require('../../assets/sort.png'),
        },
        {
          name: 'member',
          title: '会员',
          normal: require('../../assets/vip_file.png'),
          active: require('../../assets/vip.png'),
        },
        {
          name: 'cart',
          title: '购物车',
          normal: require('../../assets/cart_file.png'),
          active: require('../../assets/cart.png'),
        },
        {
          name: 'mine',
          title: '我的',
          normal: require('../../assets/my_file.png'),
          active: require('../../assets/my.png'),
        }
      ]
    };
  },

  mounted() {

  },
  computed: {
    goodsNum() {
      let num = 0;
    }
  },
  methods: {
    tab(index, val) {
      this.currIndex = index;
      console.log(index, val)
      if(index==2){
        if(that.$root.userInfo.is_distributor==0){
          this.$router.push({name:'vip'});
        }else{
          this.$router.push(val);
        }
      }else{
      this.$router.push(val);
      }
    },
  }
};
</script>
<style lang="less" scoped>
/*转场动画*/
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.3s;
}
.router-slider-enter,
.router-slider-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
  .van-tabbar {
    height: 100px;
  }

</style>
