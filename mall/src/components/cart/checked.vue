<template>
  <div class="check-box">
    <van-checkbox-group v-model="result" ref="checkboxGroup" @change="change()">
      <div class="flex cart-item">
        <van-checkbox name="a" checked-color="#FF9900"></van-checkbox>
        <div class="cart-pic"><img src="../../assets/item1.png" alt=""></div>
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
        <div class="cart-pic"><img src="../../assets/item1.png" alt=""></div>
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
        <div class="cart-pic"><img src="../../assets/item1.png" alt=""></div>
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
    name: 'checked',
    props: {
    　onUpdate: Function
    },
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
        this.onUpdate(this.result)
      }
    },
  }
</script>

<style lang="less">
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
</style>
