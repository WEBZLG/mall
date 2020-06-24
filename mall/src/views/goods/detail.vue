<template>
  <div class="detail">
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <div class="go-vip" @click="goVip">
        成为会员再省20%
        <span class="right-icon"><img width="100%" height="100%"   src="../../assets/next_w.png" alt="" /></span>
      </div>
      <!-- 轮播图 -->
      <van-swipe :autoplay="0">
        <van-swipe-item v-for="(image, index) in detailData.pic_list" :key="index"><img width="100%" height="100%"   v-lazy="image.pic_url" /></van-swipe-item>
      </van-swipe>
      <div class="handle flex">
        <div class="price">
          <p class="new-price">
            <span class="size">￥</span>
            {{ detailData.price }}
          </p>
          <p class="old-price">￥{{ detailData.original_price }}</p>
        </div>
        <div class="btn-box">
          <div>
            <p class="brokerage">
              <span class="good-icon"><img width="100%" height="100%"   src="../../assets/money.png" alt="" /></span>
              推广佣金￥{{detailData.share_price}}
            </p>
          </div>
          <div class="btn-bot">
            <button type="button" class="sm-btn">复制文字</button>
            <!-- <button type="button" class="sm-btn">分享图片</button> -->
          </div>
        </div>
      </div>
      <div class="descript">
        <p class="title">{{ detailData.name }}</p>
        <div class="flex ">
          <p>推广次数：{{detailData.share_num}}</p>
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
            <div class="chooseItem" v-for="(item,index) in detailData.attr_group_list" :key="item.attr_group_id">
              <h3>{{item.attr_group_name}}</h3>
              <div>
                <div class="row" v-for="(attr,idx) in item.attr_list" :key="attr.attr_id">
                  <input type="radio" :name="index" :id="attr.attr_id" value="">
                  <label :for="attr.attr_id" @click="choose(attr, index,item)">{{attr.attr_name}}</label>
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
      <div class="detail-pic"><img width="100%" height="100%"   src="../../assets/spxq.png" alt="" /></div>
      <div class="detail-pics">
        <div v-html="detailData.detail"></div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="star" text="收藏" v-if="detailData.is_favorite == 0" @click="addLike(detailData.id)" />
      <van-goods-action-icon icon="star" text="收藏" v-if="detailData.is_favorite == 1" color="#ff5000" @click="disLike(detailData.id)" />
      <van-goods-action-icon icon="share" text="分享" color="#07c160" />
      <van-goods-action-icon icon="cart" text="购物车" @click="goCart" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart(detailData.id)" />
      <van-goods-action-button type="danger" text="立即购买" @click="submitView(detailData.id)" />
    </van-goods-action>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    NavBar
  } from 'vant';
  import {
    Swipe,
    SwipeItem
  } from 'vant';
  import {
    ActionSheet
  } from 'vant';
  import {
    Cell,
    CellGroup
  } from 'vant';
  import {
    Sku
  } from 'vant';
  import {
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton
  } from 'vant';
  import {
    Toast
  } from 'vant';
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
        addressId: ''
      };
    },
    mounted() {
      let id = this.$route.params.gid;
      let tid = this.$route.params.tid;
      localStorage.setItem('listTypeId', tid);
      if(id==undefined){
          let id = localStorage.getItem('goodsId');
          this.goodsId = id;
          this.getData(id);
          this.getAddressData();
      }else{
        this.goodsId = id;
        this.getData(id);
        this.getAddressData();
      }
    },
    methods: {
      goVip(){
        this.$router.push({name:"vip"})
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
        this.showAddr = true;
        this.getAddressData();
      },
      chooseAddres(item) {
        this.chooseAddr = '地址：' + item.address;
        this.addressId = item.id;
        this.showAddr = false;
      },
      choose(index, ind, item) {
        if (this.attr.length == 0) {
          this.attr = [{
            "attr_group_id": '',
            "attr_group_name": '',
            "attr_id": '',
            "attr_name": ''
          }, {
            "attr_group_id": '',
            "attr_group_name": '',
            "attr_id": '',
            "attr_name": ''
          }]
        }

        this.attr[ind].attr_group_id = item.attr_group_id
        this.attr[ind].attr_group_name = item.attr_group_name
        this.attr[ind].attr_id = index.attr_id
        this.attr[ind].attr_name = index.attr_name
        this.chooseText = '规格：' + this.attr[0].attr_name
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
            const regex = new RegExp('<img', 'gi')
            that.detailData.detail = that.detailData.detail.replace(regex, `<img width='100%'`)
          } else {
            Toast.fail(res.msg);
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
          Toast('请选择规格')
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
          } else {
            Toast.fail(res.msg);
          }
        });
      },
      //立即购买
      submitView(id) {
        var that = this;
        if (this.attr.length == 0) {
          Toast('请选择规格')
          return false;
        }
        let param = {
          id: 1,
          platform: 'wx',
          token: this.$root.token
        };
        var attr =JSON.stringify( {
          goods_id:that.goodsId,
          attr:that.attr
        });
        this.https.post('/order/submit-preview', param, '&goods_info=' + attr + '&address_id=' + that.addressId +
          '&type=s').then(res => {
          if (res.code == 0) {
            console.log(res)
            that.$router.push({name:'orderDetail',params:{data:res.data}})
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
            this.chooseAddr = '地址：' + res.data.list[0].address;
            this.addressId = res.data.list[0].id;
          } else {
            Toast.fail(res.message);
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
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

    input {
      display: none;
    }

    input[type="radio"]+label {
      /* 默认label的样式 */
      /* content: "\a0"; */
      display: inline-block;
      padding: 10px 20px;
      background-color: #666;
      margin-left: 20px;
      color: #fff;
      border-radius: 10px;
    }

    input[type="radio"]:checked+label {
      /* 当点击label的时候背景颜色发生改变 */
      background-color: #FF9900;
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
