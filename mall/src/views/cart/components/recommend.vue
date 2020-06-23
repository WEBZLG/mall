<template>
  <div class="recommend">
    <van-divider :style="{ color: '#333333', borderColor: '#333333', padding: '0 16px' }">为你推荐</van-divider>
    <div class="flex content">
      <div class="recommend-item" v-for="item in dataList" :key="item.id">
        <div class="recommend-pic" @click="getDetail(item.goods_id)"><img width="100%" height="100%"   src="item.goods_pic" alt="" /></div>
        <div class="recommend-text">
          <p class="title" @click="getDetail(item.goods_id)">{{item.goods_name}}</p>
          <div>
            <!-- <p class="old-price">￥699</p> -->
            <p class="new-price">
              <span class="size">￥</span>
              {{item.price}}
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
  props:['dataList'],
  data() {
    return {};
  },
  // 详情
  getDetail(id) {
    this.$router.push({ name: 'detail',params:{gid:id}});
  },
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
