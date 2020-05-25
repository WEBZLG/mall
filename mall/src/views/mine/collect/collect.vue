<template>
  <div class="collect">
    <van-nav-bar title="我的收藏" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <van-swipe-cell>
        <div class="flex cart-item">
          <div class="cart-pic"><img src="../../../assets/item_large1.png" alt="" /></div>
          <div class="descript">
            <p class="title">ARMANI EXCHANGE 男士AX字 母标识ICON系列圆领长袖卫衣...</p>
            <div class="flex price-num">
              <div class="price">
                <p class="old-price">￥1,200</p>
                <p class="new-price">
                  <span class="size">￥</span>
                  599
                </p>
              </div>
            </div>
          </div>
        </div>
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
      <van-swipe-cell>
        <div class="flex cart-item">
          <div class="cart-pic"><img src="../../../assets/item_large1.png" alt="" /></div>
          <div class="descript">
            <p class="title">ARMANI EXCHANGE 男士AX字 母标识ICON系列圆领长袖卫衣...</p>
            <div class="flex price-num">
              <div class="price">
                <p class="old-price">￥1,200</p>
                <p class="new-price">
                  <span class="size">￥</span>
                  599
                </p>
              </div>
            </div>
          </div>
        </div>
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import { NavBar } from 'vant';
import { SwipeCell } from 'vant';

Vue.use(SwipeCell);
Vue.use(NavBar);
Vue.use(Toast);
export default {
  name: 'collect',
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    beforeClose({ position, instance }) {
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            instance.close();
          });
          break;
      }
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
    padding-bottom: 30px;
    .cart-item {
      padding: 30px 30px 0;
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
