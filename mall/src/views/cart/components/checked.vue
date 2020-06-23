<template>
  <div class="check-box">
    <van-checkbox-group v-model="result" ref="checkboxGroup" @change="change()">
      <div class="flex cart-item" v-for="(item,idx) in goodsList" :key="idx">
        <van-checkbox :name="item" checked-color="#FF9900"></van-checkbox>
        <div class="cart-pic" @click="getDetail(item.goods_id)"><img width="100%" height="100%"   :src="item.goods_pic" alt="" /></div>
        <div class="descript">
          <p class="title" @click="getDetail(item.goods_id)">{{ item.goods_name }}</p>
          <div class="flex price-num">
            <div class="price">
              <!-- <p class="old-price">￥{{item.price}}</p> -->
              <p class="new-price">
                <span class="size">￥</span>
                {{ item.price }}
              </p>
            </div>
            <van-stepper v-model="item.num" :max="item.max_num" @change="onChange(item)"/>
          </div>
        </div>
      </div>
    </van-checkbox-group>
  </div>
</template>

<script>
import Vue from 'vue';
import { Checkbox, CheckboxGroup } from 'vant';
import { Stepper } from 'vant';
import { Divider } from 'vant';
  import { Toast } from 'vant';

  Vue.use(Toast);
Vue.use(Divider);
Vue.use(Stepper);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
export default {
  name: 'checked',
  props: {
    onUpdate: Function,
    goodsList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      result: [],
    };
  },
  mounted() {
    console.log(this.goodsList);
  },
  methods: {
    toggleAll() {
      if (this.result.length == 0) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    change() {
      this.onUpdate(this.result);
    },
    // 详情
    getDetail(id) {
      this.$router.push({ name: 'detail',params:{gid:id}});
    },
    onChange(item){
      for (var i=0;i<this.result.length;i++) {
        if(this.result[i].goods_id==item.goods_id){
          this.result[i].num = item.number
        }
      }
      this.onUpdate(this.result);
      this. changeNum(item.goods_id,item.number)
    },
    changeNum(id,num){
        var that = this;
        let param = {
          id: 1,
          platform: 'wx',
          token: this.$root.token
        };
        let params = {
          id:id,
          num:num
        }
        this.https.post('/cart/cart-edit', param, '',params).then(res => {
          if(res.code==0){

          }else{
            Toast.fail(res.msg);
          }
        });
    }
  }
};
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
    background-color: #ffffff;
  }
}
</style>
