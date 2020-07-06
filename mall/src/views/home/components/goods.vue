<template>
  <div class="content">
    <!-- <div class="vip"><img width="100%" height="100%"   src="../../../assets/daily_banner1.png" alt="" /></div> -->
    <div class="goods-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="goods-item" v-for="(item,index) in dataList" :key="index">
        <div class="goods-pic" @click="getDetail(item.id)"><img width="100%" height="100%"  :src="item.pic_url" alt="暂无" /></div>
        <div class="goods-desc">
          <p class="goods-title"  @click="getDetail(item.id)">{{item.name}}</p>
          <!-- <p class="good-type">海外|自营</p> -->
          <div class="good-price flex">
            <p class="old-price">￥{{item.original_price}}</p>
            <p class="brokerage">
              <span class="good-icon"><img width="100%" height="100%"   src="../../../assets/money.png" alt="" /></span>
              推广佣金￥{{item.virtual_sales}}
            </p>
          </div>
          <div class="goods-share flex">
            <p class="new-price">
              <span class="size">￥</span>
              {{item.price}}
            </p>
            <div class="btn-bot">
              <button type="button" class="sm-btn hotCopy" data-clipboard-action="copy" :data-clipboard-text="item.name" @click="copyLink('.hotCopy')">复制</button>
              <button type="button" class="sm-btn" @click.stop="share(item)">分享</button>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="dataList.length == 0">
        <div class="no-icon"><img width="100%" height="100%"   src="../../../assets/nodata.png" alt="" /></div>
        <p class="no-text">暂无数据</p>
      </div>
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
          <div class="block">
            <vue-canvas-poster :painting="painting" @success="success"></vue-canvas-poster>
            <div class="shareCode" @touchstart="gotouchstart" @touchmove="gotouchmove" @touchend="gotouchend"><img  crossorigin="anonymous" width="100%" :src="shareCode" alt="" /></div>
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Toast } from 'vant';
  import { Overlay } from 'vant';
  Vue.use(Overlay);
  Vue.use(Toast);
export default {
  props: ['clientDetails'],
  data() {
    return {
      dataList:'',
      show: false,
      shareCode: '',
      shareUrl: '',
      painting: {}
    };
  },
  mounted() {
    this.getData(this.clientDetails)
  },
  methods: {
    success(src) {
      // console.log(src);
      this.shareCode = src;
    },
    fail(err) {
      console.log('fail', err);
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
    // 分项
    share(goods) {
      console.log(goods);
      this.goodsInfo = goods;
      this.shareUrl = this.$root.posterUrl + goods.id;
      this.painting = {
        width: '630px',
        height: '806px',
        background: '#ffffff',
        views: [
          {
            type: 'image',
            url: goods.pic_url.toString(),
            css: {
              top: '0px',
              left: '0px',
              width: '630px',
              height: '504px'
            }
          },
          {
            type: 'text',
            text: goods.name,
            css: {
              bottom: '245px',
              left: '30px',
              right: '30px',
              width: '569px',
              maxLines: 2,
              fontSize: '26px'
            }
          },
          {
            type: 'text',
            text: '嗨购价￥' + goods.price,
            css: {
              bottom: '142px',
              left: '30px',
              width: '569px',
              maxLines: 1,
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#F34E81'
            }
          },
          {
            type: 'text',
            text: '市场价￥' + goods.original_price,
            css: {
              bottom: '103px',
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
            text: '请长按图片进行保存分享',
            css: {
              bottom: '30px',
              left: '30px',
              width: '569px',
              maxLines: 1,
              textAlign: 'center',
              fontSize: '24px',
              color: '#F34E81'
            }
          },
          {
            type: 'qrcode',
            content: this.$root.posterUrl + goods.id,
            css: {
              bottom: '104px',
              right: '30px',
              color: '#000',
              background: '#fff',
              width: '82px',
              height: '82px',
              borderWidth: '10px',
              borderColor: '#fff'
            }
          }
        ]
      };
      this.show = true;
    },
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        // let last = this.list[this.list.length - 1];
        // for (let i = 1; i <= 10; i++) {
        //   this.list.push(last + i);
        // }
        this.loading = false;
      }, 2500);
    },
    // 详情
    getDetail(id) {
      this.$router.push({ name: 'detail',params:{gid:id}});
    },
    // 获取列表
    getData(id) {
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
      this.https.post('/default/goods-list', param, '&cat_id='+id).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          console.log(that.dataList)
          that.dataList = res.data.list;
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
  watch: {
    clientDetails(newVal) {
      this.getData(newVal)
    }
  }
};
</script>

<style>
.goods-list {
  margin-top: 0;
}
</style>
