<template>
  <div class="cart">
    <header class="flex">
      <div class="check" @click="toggleAll()">全选</div>
      <div class="edit" @click="handle()" ref ='edit'>{{editeText}}</div>
    </header>
    <div class="mid-view">
      <Checked ref='checked' :on-update="checkedData"></Checked>
      <Recommend></Recommend>
    </div>
   <div class="total-box flex" v-if="editeText=='编辑' ">
      <div class="price">
        <p class="new-price"><span class="size">￥</span>1699</p>
        <p class="old-price">已优惠:￥2,601</p>
      </div>
      <button class="orange-btn">去结算</button>
    </div>
    <div class="total-box flex" v-else>
      <button class="orange-btn">移入收藏夹</button>
      <button class="red-btn">删除</button>
    </div>
  </div>
</template>

<script>
  import Checked from '../components/cart/checked.vue'
  import Recommend from '../components/cart/recommend.vue'
  export default {
    name: '',
    data() {
      return {
        editeText:'编辑'
      }
    },
    methods: {
      // 全选反选
      toggleAll(){
        this.$refs.checked.toggleAll()
      },
      // 获取全选数据
      checkedData(data){
        console.log(data)
      },
      // 编辑完成
      handle(){
        const edit = this.$refs.edit.innerText;
        if(edit=='编辑'){
          this.editeText = '完成'
        }else{
          this.editeText = '编辑'
        }
      }
    },
    components:{
      Checked,
      Recommend
    }
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
      bottom: 108px;
      overflow: auto;
    }
    .total-box{
      position: fixed;
      bottom: 100px;
      left: 0;
      right: 0;
      padding:15px 30px;
      background-color: #ffffff;
      .new-price{
        font-size: 40px;
        .size{
          font-size: 28px;
        }
      }
      .old-price{
        margin-bottom: 0;
      }

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
  }
</style>
