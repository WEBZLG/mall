<template>
  <div class="collect">
    <van-nav-bar title="我的收藏" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <van-swipe-cell v-for="item in dataList" :key="item.id">
        <div class="flex cart-item">
          <div class="cart-pic"><img :src="item.goods_pic" alt="" /></div>
          <div class="descript">
            <p class="title">{{ item.name }}</p>
            <div class="flex price-num">
              <div class="price">
                <!-- <p class="old-price">￥1,200</p> -->
                <p class="new-price">
                  <span class="size">￥</span>
                  {{ item.price }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <template #right>
          <van-button square type="danger" text="删除" @click="deleteData(item)" />
        </template>
      </van-swipe-cell>
    </div>
    <div class="no-data" v-if="dataList.length == 0">
      <div class="no-icon"><img src="../../../assets/nodata.png" alt="" /></div>
      <p class="no-text">暂无数据</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import { NavBar } from 'vant';
import { SwipeCell } from 'vant';
import { Dialog } from 'vant';

Vue.use(SwipeCell);
Vue.use(NavBar);
Vue.use(Toast);
export default {
  name: 'collect',
  data() {
    return {
      dataList: '',
      goodId: ''
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },

    // 获取列表
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
      this.https.get('/user/favorite-list', param, '').then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.dataList = res.data.list;
        } else {
          Toast.fail(res.message);
        }
      });
    },
    // 删除收藏
    deleteData(e) {
      var that = this;
      this.goodId = e.goods_id;
      let param = {
        id: 1,
        platform: 'wx',
        token: this.$root.token
      };
      let obj = {
        goods_id: e.goods_id
      };
      Dialog.confirm({
        message: '确定删除吗？'
      })
        .then(res => {
          Toast.loading({
            duration: 0,
            message: '加载中...',
            forbidClick: true
          });
          this.https.post('/user/favorite-remove', param, '', obj).then(res => {
            console.log(res);
            Toast.clear();
            if (res.code == 0) {
              Toast.success('删除成功');
              that.getData();
            } else {
              Toast.fail(res.msg);
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.collect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f8f8f8;
  .mid-view {
    margin: 30px 0;
    background-color: #ffffff;
    padding: 30px 0;
    .cart-item {
      padding: 0 30px;
      background-color: #ffffff;
    }
    .cart-pic {
      height: 180px;
      width: 180px;
      border-radius: 10px;
      overflow: hidden;
      margin: 0 30px 0 0;
    }

    .descript {
      flex: 1;

      .price-num {
        align-items: flex-end;
      }
    }

    .van-stepper__input {
      width: 50px;
      height: 40px;
      border-radius: 5px;
    }

    .van-stepper__minus,
    .van-stepper__plus {
      height: 40px;
      width: 40px;
      background-color: #ffffff;
    }
    .new-price {
      color: #f34e81;
      font-size: 40px;
      .size {
        font-size: 28px;
      }
    }
    .old-price {
      margin-bottom: 10px;
    }
    .title {
      height: 80px;
      font-size: 28px;
      font-weight: bold;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .van-button--danger {
      height: 100%;
    }
  }
}
</style>
