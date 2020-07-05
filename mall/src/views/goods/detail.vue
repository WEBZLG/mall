<template>
  <div class="detail">
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <!--      <div class="go-vip" @click="goVip">
        成为会员再省20%
        <span class="right-icon"><img width="100%" height="100%" src="../../assets/next_w.png" alt="" /></span>
      </div> -->
      <!-- 轮播图 -->
      <van-swipe :autoplay="0">
        <van-swipe-item v-for="(image, index) in detailData.pic_list" :key="index"><img width="100%" height="100%" :src="image.pic_url" /></van-swipe-item>
      </van-swipe>
      <div class="handle flex">
        <div class="price">
          <p class="new-price">
            <span class="size">嗨购价￥</span>
            {{ detailData.price }}
          </p>
          <p class="old-price">市场价￥{{ detailData.original_price }}</p>
        </div>
        <div class="btn-box">
          <div>
            <p class="brokerage">
              <span class="good-icon"><img width="100%" height="100%" src="../../assets/money.png" alt="" /></span>
              推广佣金￥{{ detailData.share_price }}
            </p>
          </div>
          <div class="btn-bot">
            <button type="button" class="sm-btn" data-clipboard-action="copy" :data-clipboard-text="detailData.name"
              @click="copyLink('.sm-btn')">复制文字</button>
            <button type="button" class="sm-btn" @click="share(detailData)">分享图片</button>
          </div>
        </div>
      </div>
      <div class="descript">
        <p class="title">{{ detailData.name }}</p>
        <div class="flex ">
          <p>推广次数：{{ detailData.share_num }}</p>
          <p>销量：{{ detailData.sales_volume }}</p>
        </div>
      </div>
      <div class="parameter">
        <van-cell-group>
          <van-cell :title="chooseText" is-link @click="showSku" />
          <van-cell :title="chooseAddr" is-link @click="showAddress" />
        </van-cell-group>
        <van-action-sheet v-model="showGoods">
          <div class="content">
            <div class="chooseItem" v-for="(item, index) in detailData.attr_group_list" :key="item.attr_group_id">
              <h3>{{ item.attr_group_name }}</h3>
              <div>
                <div class="row" v-for="(attr, idx) in item.attr_list" :key="attr.attr_id">
                  <input type="radio" :name="index" :id="attr.attr_id" value="" :checked="attr.attr_name == '默认' ? true : false" />
                  <label :for="attr.attr_id" @click="choose(attr, index, item)">{{ attr.attr_name }}</label>
                </div>
              </div>
            </div>
          </div>
        </van-action-sheet>
        <van-action-sheet v-model="showAddr">
          <div class="content">
            <div v-for="item in addrDataList" :key="item.id" @click="chooseAddres(item)" class="addrItem">
              <div class="flex item-fans">
                <div class="info">
                  <div class="flex name-type">
                    <div>
                      <p class="name">
                        <span>{{ item.name }}</span>
                        <span>{{ item.mobile }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="wechat">{{ item.address }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-action-sheet>
      </div>
      <div class="detail-pic"><img width="100%" height="100%" src="../../assets/spxq.png" alt="" /></div>
      <div class="detail-pics">
        <div v-html="detailData.detail"></div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="star" text="收藏" v-if="detailData.is_favorite == 0" @click="addLike(detailData.id)" />
      <van-goods-action-icon icon="star" text="收藏" v-if="detailData.is_favorite == 1" color="#ff5000" @click="disLike(detailData.id)" />
      <van-goods-action-icon icon="share" text="分享" color="#07c160" @click="share(detailData)" />
      <van-goods-action-icon icon="cart" text="购物车" @click="goCart" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart(detailData.id)" />
      <van-goods-action-button type="danger" text="立即购买" @click="submitView(detailData.id)" />
    </van-goods-action>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <vue-canvas-poster :painting="painting" @success="success"></vue-canvas-poster>
          <div class="shareCode" @touchstart="gotouchstart" @touchmove="gotouchmove" @touchend="gotouchend"><img width="100%"
              :src="shareCode" alt="" /></div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
  var timeOutEvent = 0; //定时器
  import Vue from 'vue';
  import {
    NavBar,
    Overlay,
    Swipe,
    SwipeItem,
    ActionSheet,
    Cell,
    CellGroup,
    Sku,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Toast,
    Dialog,
  } from 'vant';
  Vue.use(Dialog);
  Vue.use(Toast);
  Vue.use(GoodsAction);
  Vue.use(GoodsActionButton);
  Vue.use(GoodsActionIcon);
  Vue.use(Sku);
  Vue.use(Cell);
  Vue.use(CellGroup);
  Vue.use(ActionSheet);
  Vue.use(Swipe);
  Vue.use(SwipeItem);
  Vue.use(NavBar);
  Vue.use(Overlay);
  export default {
    name: 'detail',
    data() {
      return {
        detailData: '',
        showGoods: false,
        showAddr: false,
        addrDataList: [],
        images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
        goodsId: '',
        tid: '',
        attr: [],
        chooseText: '请选择规格',
        chooseAddr: '请选择收货地址',
        addressId: '',
        show: false,
        painting: {},
        shareCode: ''
      };
    },
    mounted() {
      let id = this.$route.params.gid;
      let tid = this.$route.params.tid;
      localStorage.setItem('listTypeId', tid);
      if (id == undefined) {
        let id = localStorage.getItem('goodsId');
        this.goodsId = id;
        this.getData(id);
        this.getAddressData();
      } else {
        this.goodsId = id;
        this.getData(id);
        this.getAddressData();
      }
    },
    methods: {
      success(src) {
        // console.log(src);
        this.shareCode = src;
      },
      fail(err) {
        console.log('fail', err);
      },
      // 分项
      share(detailData) {
        var that = this;
        this.show = true;
      },
      goVip() {
        this.$router.push({
          name: 'vip'
        });
      },
      goCart() {
        this.$router.replace('/tabbar/cart');
      },
      onClickLeft() {
        this.$router.back();
      },

      showSku() {
        this.showGoods = true;
      },
      showAddress() {
        var that = this;
        this.getAddressData();
        if (this.addrDataList.length == 0) {
          Dialog.confirm({
              message: '您还没有收货地址，是否去添加？'
            })
            .then(res => {
              that.$router.push({
                name: 'address'
              });
            })
            .catch(() => {});
        } else {
          this.showAddr = true;
        }
      },
      chooseAddres(item) {
        this.chooseAddr = '地址：' + item.address;
        this.addressId = item.id;
        this.showAddr = false;
      },
      choose(index, ind, item) {
        this.attr[ind].attr_group_id = item.attr_group_id;
        this.attr[ind].attr_group_name = item.attr_group_name;
        this.attr[ind].attr_id = index.attr_id;
        this.attr[ind].attr_name = index.attr_name;
        this.chooseText = '规格：' + this.attr[0].attr_name + this.attr[1].attr_name;
      },
      // 复制
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
      // 获取详情
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
        this.https.get('/default/goods', param, '&id=' + this.goodsId).then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            that.detailData = res.data;
            for (var i = 0; i < this.detailData.attr_group_list.length; i++) {
              let obj = {
                attr_group_id: '',
                attr_group_name: '',
                attr_id: '',
                attr_name: ''
              };
              this.attr.push(obj);
            }
            if (res.data.attr_group_list[0].attr_list[0].attr_name == "默认") {
              this.attr[0].attr_group_id = res.data.attr_group_list[0].attr_group_id;
              this.attr[0].attr_group_name = res.data.attr_group_list[0].attr_group_name;
              this.attr[0].attr_id = res.data.attr_group_list[0].attr_list[0].attr_id;
              this.attr[0].attr_name = res.data.attr_group_list[0].attr_list[0].attr_name;
              this.chooseText = '规格：' + res.data.attr_group_list[0].attr_list[0].attr_name;
            }
            const regex = new RegExp('<img', 'gi');
            that.detailData.detail = that.detailData.detail.replace(regex, `<img width='100%'`);
            this.painting = {
              width: '630px',
              height: '806px',
              background: '#ffffff',
              views: [{
                  type: 'image',
                  url: res.data.pic_list[0].pic_url,
                  css: {
                    top: '0px',
                    left: '0px',
                    width: '630px',
                    height: '504px'
                  }
                },
                {
                  type: 'text',
                  text: res.data.name,
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
                  text: '嗨购价￥' + res.data.price.toString(),
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
                  text: '市场价￥' + res.data.original_price.toString(),
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
                  type: 'image',
                  url: this.$root.posterUrl + goods.id,
                  css: {
                    bottom: '104px',
                    right: '30px',
                    width: '82px',
                    height: '82px',
                    borderWidth: '10px',
                    borderColor: '#fff'
                  }
                }
              ]
            };
          } else {
            Toast.fail(res.msg);
          }
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
        this.https.get('/share/goods', param, '&goods_id=' + this.detailData.id + '&share_user=' + this.$root.userInfo.id)
          .then(res => {
            console.log(res);
            Toast.clear();
            if (res.code == 0) {} else {
              Toast.fail(res.message);
            }
          });
      },
      //添加喜欢
      addLike(id) {
        var that = this;
        let param = {
          id: 1,
          platform: 'wx',
          token: this.$root.token
        };
        let params = {
          goods_id: this.goodsId
        };
        this.https.post('/user/favorite-add', param, '', params).then(res => {
          if (res.code == 0) {
            that.detailData.is_favorite = 1;
          } else {
            Toast.fail(res.msg);
          }
        });
      },
      //取消喜欢
      disLike(id) {
        var that = this;
        let param = {
          id: 1,
          platform: 'wx',
          token: this.$root.token
        };
        let params = {
          goods_id: this.goodsId
        };
        this.https.post('/user/favorite-remove', param, '', params).then(res => {
          if (res.code == 0) {
            that.detailData.is_favorite = 0;
          } else {
            Toast.fail(res.msg);
          }
        });
      },
      //添加购物车
      addCart(id) {
        var that = this;
        if (this.attr.length == 0) {
          Toast('请选择规格');
          return false;
        }
        let param = {
          id: 1,
          platform: 'wx',
          token: this.$root.token
        };
        let params = {
          goods_id: that.goodsId,
          attr: JSON.stringify(that.attr),
          num: 1
        };
        this.https.post('/cart/add-cart', param, '', params).then(res => {
          if (res.code == 0) {
            Toast.success('添加成功！');
            this.showGoods = false;
          } else {
            Toast.fail(res.msg);
          }
        });
      },
      //立即购买
      submitView(id) {
        var that = this;
        if (that.addressId == '') {
          Toast('请选择收货地址');
          return false;
        }
        if (this.chooseText == '请选择规格') {
          Toast('请选择规格');
          return false;
        }
        let param = {
          id: 1,
          platform: 'wx',
          token: this.$root.token
        };
        var attr = JSON.stringify({
          goods_id: that.goodsId,
          attr: that.attr
        });
        this.https.post('/order/submit-preview', param, '&goods_info=' + attr + '&address_id=' + that.addressId +
          '&type=s').then(res => {
          if (res.code == 0) {
            console.log(res);
            this.showGoods = false;
            that.$router.push({
              name: 'orderDetail',
              params: {
                data: res.data
              }
            });
          } else {
            Toast.fail(res.msg);
          }
        });
      },
      // 获取地址列表
      getAddressData() {
        var that = this;
        let param = {
          id: 1,
          platform: 'wx',
          token: this.$root.token
        };

        this.https.get('/user/address-list', param, '').then(res => {
          if (res.code == 0) {
            that.addrDataList = res.data.list;
            if (res.data.list.length > 0) {
              this.chooseAddr = '地址：' + res.data.list[0].address;
              this.addressId = res.data.list[0].id;
            }
          } else {
            Toast.fail(res.message);
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .shareCode {
    width: 630px;
    height: 806px;
    margin: 20% auto 0;
  }

  .van-sku-actions .van-button--danger {
    background: #f34e81 !important;
  }

  .van-goods-action-button--danger {
    background: #f34e81;
  }

  .van-sku-actions .van-button--warning {
    background: #ff9900 !important;
  }

  .van-goods-action-button--warning {
    background: #ff9900;
  }

  .detail {
    background-color: #f8f8f8;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .mid-view {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      bottom: 100px;
      overflow: auto;

      .van-popup--bottom {
        bottom: 100px;
      }

      .go-vip {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 999;
        width: 276px;
        height: 60px;
        line-height: 60px;
        color: #ffffff;
        text-align: center;
        background: rgba(238, 79, 120, 1);
        opacity: 0.8;
        border-radius: 30px 0px 0px 30px;

        .right-icon {
          display: inline-block;
          width: 15px;
          vertical-align: middle;
        }
      }

      .detail-pic {
        height: 120px;
      }

      .detail-pics img {
        height: inherit;
      }
    }

    .parameter {
      margin: 20px 0;

      .van-cell {
        padding: 20px 32px;
      }
    }
  }

  .good-icon {
    display: inline-block;
    vertical-align: text-top;
    height: 23px;
    width: 21px;
  }

  .van-swipe {
    height: 600px;
  }

  .handle {
    height: 110px;
    padding: 0 30px;
    border-bottom: 1px solid #f8f8f8;
    background: url(../../assets/xq_bg.png) no-repeat;
    background-size: cover;

    .new-price {
      font-size: 48px;
      color: #ffffff;
    }

    .old-price {
      color: #ffffff;
    }

    .brokerage {
      text-align: right;
      padding-bottom: 8px;
    }
  }

  .descript {
    padding: 20px 30px;
    background-color: #ffffff;
    font-weight: bold;

    .title {
      font-size: 32px;
      padding-bottom: 20px;
    }
  }

  .row {
    display: inline-block;
    margin-bottom: 10px;

    input {
      display: none;
    }

    input[type='radio']+label {
      /* 默认label的样式 */
      /* content: "\a0"; */
      display: inline-block;
      padding: 10px 20px;
      background-color: #666;
      margin-left: 20px;
      color: #fff;
      border-radius: 10px;
    }

    input[type='radio']:checked+label {
      /* 当点击label的时候背景颜色发生改变 */
      background-color: #ff9900;
    }
  }

  .van-action-sheet__content {
    padding-bottom: 60px;
    max-height: 500px;
    overflow: auto;
  }

  .addrItem {
    padding: 15px 0;
  }
</style>
