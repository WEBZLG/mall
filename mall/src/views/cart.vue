<template>
  <div class="cart">
    <header class="flex">
      <div class="check" @click="toggleAll()">全选</div>
      <div class="edit">编辑</div>
    </header>
    <div class="mid-view">
      <div class="check-box">
        <van-checkbox-group v-model="result" ref="checkboxGroup" @change="change()">
          <div class="flex cart-item">
            <van-checkbox name="a" checked-color="#FF9900"></van-checkbox>
            <div class="cart-pic"><img src="../assets/item1.png" alt=""></div>
            <div class="descript">
              <p class="title">ARMANI EXCHANGE 男士AX字 母标识ICON系列圆领长袖卫衣...</p>
              <div class="flex price-num">
                <div class="price">
                  <p class="old-price">￥1,200</p>
                  <p class="new-price"><span class="size">￥</span>599</p>
                </div>
                <van-stepper v-model="number" />
              </div>
            </div>
          </div>
          <div class="flex cart-item">
            <van-checkbox name="b" checked-color="#FF9900"></van-checkbox>
            <div class="cart-pic"><img src="../assets/item1.png" alt=""></div>
            <div class="descript">
              <p class="title">ARMANI EXCHANGE 男士AX字 母标识ICON系列圆领长袖卫衣...</p>
              <div class="flex price-num">
                <div class="price">
                  <p class="old-price">￥1,200</p>
                  <p class="new-price"><span class="size">￥</span>599</p>
                </div>
                <van-stepper v-model="number" />
              </div>
            </div>
          </div>
          <div class="flex cart-item">
            <van-checkbox name="c" checked-color="#FF9900"></van-checkbox>
            <div class="cart-pic"><img src="../assets/item1.png" alt=""></div>
            <div class="descript">
              <p class="title">ARMANI EXCHANGE 男士AX字 母标识ICON系列圆领长袖卫衣...</p>
              <div class="flex price-num">
                <div class="price">
                  <p class="old-price">￥1,200</p>
                  <p class="new-price"><span class="size">￥</span>599</p>
                </div>
                <van-stepper v-model="number" />
              </div>
            </div>
          </div>
        </van-checkbox-group>
      </div>
      <div class="recommend">
        <van-divider :style="{ color: '#333333', borderColor: '#333333', padding: '0 16px' }">
          为你推荐
        </van-divider>
        <div class="flex content">
          <div class="recommend-item">
            <div class="recommend-pic">
              <img src="../assets/item_large1.png" alt="">
            </div>
            <p class="title">男款 2019年春秋款 N EO 休闲 运动服 飞行...</p>
            <div>
              <p class="old-price">￥699</p>
              <p class="new-price"><span class="size">￥</span>1,699</p>
            </div>
          </div>
          <div class="recommend-item">
            <div class="recommend-pic">
              <img src="../assets/item_large1.png" alt="">
            </div>
            <p class="title">男款 2019年春秋款 N EO 休闲 运动服 飞行...</p>
            <div>
              <p class="old-price">￥699</p>
              <p class="new-price"><span class="size">￥</span>1,699</p>
            </div>
          </div>
          <div class="recommend-item">
            <div class="recommend-pic">
              <img src="../assets/item_large1.png" alt="">
            </div>
            <p class="title">男款 2019年春秋款 N EO 休闲 运动服 飞行...</p>
            <div>
              <p class="old-price">￥699</p>
              <p class="new-price"><span class="size">￥</span>1,699</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Checkbox,
    CheckboxGroup
  } from 'vant';
  import {
    Stepper
  } from 'vant';
  import {
    Divider
  } from 'vant';
  Vue.use(Divider);
  Vue.use(Stepper);
  Vue.use(Checkbox);
  Vue.use(CheckboxGroup);
  export default {
    name: '',
    data() {
      return {
        result: [],
        number: '1'
      }
    },
    methods: {
      toggleAll() {
        if (this.result.length == 0) {
          this.$refs.checkboxGroup.toggleAll(true)
        } else {
          this.$refs.checkboxGroup.toggleAll(false)
        }
      },
      change() {
        console.log(this.result)
      }
    },
  }
</script>

<style lang="less">
  .cart {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 100px;
    background-color: #F8F8F8;
    overflow: hidden;

    header {
      font-size: 28px;
      padding: 35px 30px;
      background-color: #ffffff;
      font-weight: bold;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9;

      .edit {
        color: #F34E81;
      }
    }

    .mid-view {
      position: absolute;
      top: 128px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: auto;
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

    .old-price {
      font-size: 20px;
      font-weight: bold;
      text-decoration: line-through;
      color: #444444;
      margin-bottom: 14px;
    }

    .new-price {
      font-size: 32px;
      font-weight: bold;
      color: #F34E81;

      .size {
        font-size: 20px;
      }
    }

    .check-box {
      padding: 30px;
      background-color: #ffffff;

      .cart-item {
        margin-bottom: 30px;
      }

      .cart-pic {
        height: 180px;
        width: 180px;
        border-radius: 10px;
        overflow: hidden;
        margin: 0 30px;
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
        background-color: #FFFFFF;
      }
    }

    .recommend {
      .van-divider {
        font-size: 32px;
        font-weight: bold;
        color: #333333;
      }

      // .van-divider:after,.van-divider:before {
      //   width: 20px;
      //   flex: none;
      //   margin: 0 auto;
      //   content:'';
      // }
      .content{
        flex-wrap: wrap;
      }
      .recommend-item{
        flex: 0 0 50%;
        background-color: #ffffff;
        border-radius:10px 10px 0px 0px;
        overflow: hidden;
        margin-bottom: 30px;
      }
      .recommend-pic {
        height: 330px;
        width: 330px;
        margin: 0 auto 20px;
      }
    }
  }
</style>
