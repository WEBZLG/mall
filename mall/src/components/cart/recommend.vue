<template>
  <div class="recommend">
    <van-divider :style="{ color: '#333333', borderColor: '#333333', padding: '0 16px' }">为你推荐</van-divider>
    <div class="flex content">
      <div class="recommend-item">
        <div class="recommend-pic"><img src="../../assets/item_large1.png" alt="" /></div>
        <div class="recommend-text">
          <p class="title">男款 2019年春秋款 N EO 休闲 运动服 飞行...</p>
          <div>
            <p class="old-price">￥699</p>
            <p class="new-price">
              <span class="size">￥</span>
              1,699
            </p>
          </div>
        </div>
      </div>
      <div class="recommend-item">
        <div class="recommend-pic"><img src="../../assets/item_large1.png" alt="" /></div>
        <div class="recommend-text">
          <p class="title">男款 2019年春秋款 N EO 休闲 运动服 飞行...</p>
          <div>
            <p class="old-price">￥699</p>
            <p class="new-price">
              <span class="size">￥</span>
              1,699
            </p>
          </div>
        </div>
      </div>
      <div class="recommend-item">
        <div class="recommend-pic"><img src="../../assets/item_large1.png" alt="" /></div>
        <div class="recommend-text">
          <p class="title">男款 2019年春秋款 N EO 休闲 运动服 飞行...</p>
          <div>
            <p class="old-price">￥699</p>
            <p class="new-price">
              <span class="size">￥</span>
              1,699
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Checkbox, CheckboxGroup } from 'vant';
import { Stepper } from 'vant';
import { Divider } from 'vant';
Vue.use(Divider);
Vue.use(Stepper);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
export default {
  name: '',
  data() {
    return {};
  }
};
</script>

<style lang="less">
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
  .content {
    flex-wrap: wrap;
  }
  .recommend-text {
    padding: 20px;
  }
  .recommend-item {
    flex: 0 0 48%;
    background-color: #ffffff;
    border-radius: 10px 10px 0px 0px;
    overflow: hidden;
    margin-bottom: 30px;
  }
  .recommend-pic {
    height: 330px;
    width: 330px;
  }
}
</style>
