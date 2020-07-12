<template>
  <div class="content">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in dataList.banner_list" :key="index"><img width="100%" height="100%" v-lazy="item.pic_url" /></van-swipe-item>
    </van-swipe>
    <!-- 按钮导航 -->
    <div class="nav-btn-list flex">
      <div class="nav-btn" v-for="item in navList" :key="item.id" @click="goNav(item)">
        <div class="nav-icon"><img width="100%" height="100%" :src="item.icon_pic" alt="暂无图标" /></div>
        <p>{{ item.name }}</p>
      </div>
      <div class="nav-btn" v-for="(item, index) in dataList.nav_list" :key="index" @click="goNav(item)">
        <div class="nav-icon"><img width="100%" height="100%" :src="item.icon_pic" alt="暂无图标" /></div>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <!-- 会员 -->
    <div class="vip" @click="goVip"><img width="100%" height="100%" src="../../../assets/ad1.png" alt="" /></div>
    <!-- 每日爆品 -->
    <div class="day-hot" v-for="(item, index) in dataList.tag_list" :key="index">
      <h3 class="caption flex"><span>{{ item.name }}</span> <span @click="moreGoods(item.id)" class="brokerage">更多商品</span></h3>
      <div class="vip"><img width="100%" height="100%" :src="item.show_pic" alt="暂无" /></div>
      <div class="goods-list">
        <div class="goods-item" v-for="(goods, idx) in item.goods_list" :key="idx">
          <div class="goods-pic" @click="getDetail(goods.id)"><img width="100%" height="100%" :src="goods.pic_url" alt="" /></div>
          <div class="goods-desc">
            <p class="goods-title" @click="getDetail(goods.id)">{{ goods.name }}</p>
            <div class="good-price flex">
              <p class="old-price">市场价￥{{ goods.original_price }}</p>
              <p class="brokerage">
                <span class="good-icon"><img  width="100%" height="100%" src="../../../assets/money.png" alt="" /></span>
                推广佣金￥{{ goods.share_price }}
              </p>
            </div>
            <div class="goods-share flex">
              <p class="new-price">
                <span class="size">嗨购价￥</span>
                {{ goods.price }}
              </p>
              <div class="btn-bot">
                <button type="button" class="sm-btn hotCopy" data-clipboard-action="copy" :data-clipboard-text="goods.name" @click="copyLink('.hotCopy')">复制</button>
                <button type="button" class="sm-btn" @click.stop="share(goods)">分享</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <vue-canvas-poster :painting="painting" @success="success"></vue-canvas-poster>
          <div class="shareCode" @touchstart="gotouchstart" @touchmove="gotouchmove" @touchend="gotouchend"><img  crossorigin="anonymous" width="100%" :src="shareCode" alt="" /></div>
          <p class="mark">长按图片分享和保存</p>
          <div class="closeShare" @click="show = false"><img width="100%" src="../../../assets/close1.png" alt=""></div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
var timeOutEvent = 0; //定时器
import Vue from 'vue';
import { Lazyload,Toast,Overlay } from 'vant';
Vue.use(Toast);
Vue.use(Lazyload);
Vue.use(Overlay);
export default {
  props: ['clientDetails', 'dataList'],
  data() {
    return {
      navList: [
        {
          id: 61,
          name: '拼团活动',
          icon_pic: require('../../../assets/button1.png')
        },
        {
          id: 62,
          name: '秒杀专区',
          icon_pic: require('../../../assets/button2.png')
        },
        {
          id: 63,
          name: '限时爆款',
          icon_pic: require('../../../assets/button3.png')
        },
        {
          id: 64,
          name: '优惠券',
          icon_pic: require('../../../assets/button4.png')
        },
        {
          id: 65,
          name: '新人专享',
          icon_pic: require('../../../assets/button5.png')
        }
      ],
      goodsInfo: '',
      show: false,
      shareCode: '',
      shareUrl: '',
      painting: {}
    };
  },
  mounted() {
    console.log(this.$root.userInfo)
  },
  methods: {
    success(src) {
      // console.log(src);
      this.shareCode = src;
    },
    fail(err) {
      console.log('fail', err);
    },
    goNav(e) {
      console.log(e);
      if (e.id == 61) {
        this.$router.push({ name: 'group', params: { title: e.name, gid: e.id } });
      } else if (e.id == 64) {
        this.$router.push({ name: 'couponList'});
      } else if(e.id == 62) {
        this.$router.push({ name: 'seckill', params: { title: e.name, gid: e.id } });
      }else if(e.id == 63) {
        this.$router.push({ name: 'limit', params: { title: e.name, gid: e.id } });
      }else if(e.id == 65) {
        this.$router.push({ name: 'newUser', params: { title: e.name, gid: e.id } });
      }else{
        this.$router.push({ name: 'hotList', params: { title: e.name, gid: e.id } });
      }
    },
    moreGoods(id){
      this.$router.push({ name: 'goodsList', params: { gid:id } })
    },
    // 分享
    share(goods) {
      console.log(goods);
      this.goodsInfo = goods;
      this.shareUrl = this.$root.posterUrl + goods.id;
      console.log(this.shareUrl)
      this.painting = {
        width: '630px',
        height: '896px',
        background: '#ffffff',
        views: [
          {
            type: 'image',
            url: goods.pic_url.toString(),
            css: {
              top: '0px',
              left: '0px',
              width: '630px',
              height: '630px'
            }
          },
          {
            type: 'text',
            text: '[臻悦尚品]'+goods.name,
            css: {
              bottom: '209px',
              left: '30px',
              right: '30px',
              width: '569px',
              maxLines: 2,
              fontSize: '28px'
            }
          },
          {
            type: 'text',
            text: goods.price,
            css: {
              bottom: '126px',
              left: '120px',
              width: '569px',
              maxLines: 1,
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#F34E81'
            }
          },
          {
            type: 'text',
            text: '嗨购价￥',
            css: {
              bottom: '126px',
              left: '30px',
              width: '569px',
              maxLines: 1,
              fontSize: '20px',
              color: '#F34E81'
            }
          },
          {
            type: 'text',
            text: '市场价￥' + goods.original_price,
            css: {
              bottom: '98px',
              left: '30px',
              width: '569px',
              maxLines: 1,
              textDecoration: 'line-through',
              fontSize: '20px',
              color: '#F34E81'
            }
          },
          {
            type: 'text',
            text: this.$root.userInfo.nickname+'  推荐您享受臻悦尚品嗨购优惠',
            css: {
              bottom: '39px',
              left: '100px',
              width: '569px',
              maxLines: 1,
              textAlign: 'left',
              fontSize: '22px',
              color: '#333333'
            }
          },
          {
            type: 'image',
            url: this.$root.posterUrl + goods.id,
            css: {
              bottom: '94px',
              right: '30px',
              width: '82px',
              height: '82px',
              borderWidth: '10px',
              borderColor: '#fff'
            }
          },
          {
            type: 'image',
            url: this.$root.userInfo.avatar_url,
            css: {
              bottom: '20px',
              left: '30px',
              width: '58px',
              height: '58px',
              borderRadius: '58px',
            }
          }
        ]
      };
      this.show = true;
    },

    // 长按事件
    gotouchstart() {
      let that = this;
      clearTimeout(timeOutEvent); //清除定时器
      timeOutEvent = 0;
      timeOutEvent = setTimeout(function() {
        //执行长按要执行的内容，
        that.shareData();
      }, 600); //这里设置定时
    },
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend() {
      clearTimeout(timeOutEvent);
      if (timeOutEvent != 0) {
        //这里写要执行的内容（尤如onclick事件）
      }
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove() {
      clearTimeout(timeOutEvent); //清除定时器
      timeOutEvent = 0;
    },
    goVip() {
      this.$router.push({ name: 'vip' });
    },
    copyLink(className) {
      let that = this;
      let clipboard = new this.clipboard(className);
      clipboard.on('success', function(e) {
        Toast.success('复制成功');
      });
      clipboard.on('error', function() {
        Toast.fail('复制失败');
      });
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
      this.https.post('/default/index', param, '').then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.dataList = res.data;
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    // 分享
    shareData() {
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
      this.https.get('/share/goods', param, '&goods_id='+this.goodsInfo.id+'&share_user='+this.$root.userInfo.id).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    getDetail(id) {
      console.log(id);
      this.$router.push({ name: 'detail', params: { gid: id } });
    }
  },
  watch: {
    clientDetails(newVal) {
      console.log(newVal);
    }
  }
};
</script>

<style lang="less">
.shareCode {
  width: 630px;
  height: 896px;
  margin: 20% auto 0;
}
.btn-bot{
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.van-swipe {
  height: 314px;
  border-radius: 10px;
  overflow: hidden;
}

.van-swipe__indicator {
  height: 10px;
  width: 10px;
  background-color: #ffffff;
}
.van-swipe__indicator--active {
  background-color: #eeaa07;
}
.nav-btn-list.flex {
  flex-wrap: wrap;
  margin-top: 28px;
}
.nav-btn {
  flex: 0 0 20%;
  text-align: center;
  margin-bottom: 40px;
}
.nav-icon {
  height: 96px;
  width: 96px;
  margin-bottom: 18px;
  margin: 0 auto;
}
.ly-tab-item {
  font-size: 32px;
}

.old-price {
  font-size: 20px;
  color: #444444;
  font-weight: bold;
  text-decoration: line-through;
}
.brokerage {
  color: #ff9900;
  font-weight: bold;
}
.new-price {
  font-size: 40px;
  color: #f34e81;
  font-weight: bold;
}
.size {
  font-size: 20px;
}
.good-icon {
  display: inline-block;
  vertical-align: text-top;
  height: 23px;
  width: 21px;
}
</style>
