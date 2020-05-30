<template>
  <div class="popularize">
    <div class="flex filter">
      <div>
        开始时间
        <span class="down-icon"><img src="../../../assets/down.png" alt="" /></span>
      </div>
      <p>至</p>
      <div>
        <div>
          结束时间
          <span class="down-icon"><img src="../../../assets/down.png" alt="" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Calendar } from 'vant';

Vue.use(Calendar);
export default {
  name: '',
  data() {
    return {

    };
  },
  formatDate(date) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(date) {
    this.show = false;
    this.value1 = this.formatDate(date);
  }
};
</script>

<style lang="less">
  .popularize{
    .filter{
      justify-content: space-around;
      height: 60px;
      line-height: 60px;
      border-radius: 60px;
      background-color: #F5F5F5;
      margin: 40px 30px   ;
      }
      .down-icon{
        height: 15px;
        width: 26px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 20px;
      }
  }
</style>
