<template>
  <div id="tabbar">
    <van-tabbar v-model="active" class="active_tab" active-color="#333333">
      <van-tabbar-item v-for="(item, index) in tabbars" :key="index" @click="tab(index, item.name)" :info="item.name == 'cart' ? goodsNum : ''">
        <span :class="currIndex == index ? active : ''">{{ item.title }}</span>
        <template slot="icon" slot-scope="props">
          <img width="23px" height="19px" :src="props.active ? item.active : item.normal" />
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
import { Tabbar, TabbarItem, Toast } from 'vant';
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
      invitationCode:'',
      userInfo: '',
      currIndex: 0,
      active: 0,
      tabbars: [
        {
          name: 'home',
          title: '首页',
          normal: require('../../assets/home_file.png'),
          active: require('../../assets/home.png')
        },
        {
          name: 'category',
          title: '分类',
          normal: require('../../assets/sort_file.png'),
          active: require('../../assets/sort.png')
        },
        {
          name: 'member',
          title: '会员',
          normal: require('../../assets/vip_file.png'),
          active: require('../../assets/vip.png')
        },
        {
          name: 'cart',
          title: '购物车',
          normal: require('../../assets/cart_file.png'),
          active: require('../../assets/cart.png')
        },
        {
          name: 'mine',
          title: '我的',
          normal: require('../../assets/my_file.png'),
          active: require('../../assets/my.png')
        }
      ]
    };
  },

  mounted() {

    if (this.$root.token) {
      this.getUserInfo();
      this.getUserInfoVip();
      this.invitationCode = this.getUrlCode().invitation_code; // 截取邀请码
          console.log(this.invitationCode);
    }else{
      this.getCode();
    }
  },
  computed: {
    goodsNum() {
      let num = 0;
    }
  },
  methods: {
    getCode() {
      // 非静默授权，第一次有弹框
      this.code = '';
      var local = window.location.href; // 获取页面url
      var appid = 'wx7ca5f43f16c9ece4';
      this.code = this.getUrlCode().code; // 截取code
      this.invitationCode = this.getUrlCode().invitation_code; // 截取邀请码
      if (this.code == null || this.code === '') {
        // 如果没有code，则去请求
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
          local
        )}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
      } else {
        // 你自己的业务逻辑
        this.login(this.code,this.invitationCode);
      }
    },
    getUrlCode() {
      // 截取url中的code方法
      var url = location.search;
      this.winUrl = url;
      var theRequest = new Object();
      if (url.indexOf('?') != -1) {
        var str = url.substr(1);
        var strs = str.split('&');
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
        }
      }
      return theRequest;
    },
    login(code,invitationCode) {
      var that = this;
      let param = {
        id: 1,
        platform: 'wx',
        token: ''
      };
      Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      });
      this.https.post('/passport/login', param, '&code=' + code+ '&invitation_code=' + invitationCode).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          console.log(res.data);
          this.$root.token = res.data.access_token;
          this.$root.posterUrl = 'https://www.shinecrystal.cn/api/share/goods-qrcode?store_id=1&_platform=wx&access_token=' + res.data.access_token + '&goods_id=';
          console.log(this.$root.token);
          this.getUserInfo();
          this.getUserInfoVip();
        } else {
          Toast.fail(res.message);
        }
      });
    },
    tab(index, val) {
      this.currIndex = index;
      console.log(index, val);
      if (index == 2) {
        if (this.userInfo.level == -1) {
          this.$router.push({ name: 'vip' });
        } else {
          this.$router.push(val);
        }
      } else {
        this.$router.push(val);
      }
    },
    getUserInfo() {
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
      this.https.get('/user/member', param, '').then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.userInfo = res.data.user_info;
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    getUserInfoVip() {
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
      this.https.get('/user/index', param, '').then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.userInfo = res.data.user_info;
          that.$root.userInfo = res.data.user_info;
        } else {
          Toast.fail(res.msg);
        }
      });
    }
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
