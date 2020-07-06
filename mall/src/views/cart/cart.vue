<template>
  <div class="cart">
    <header class="flex">
      <div class="check" @click="toggleAll()">全选</div>
      <div class="edit" @click="handle()" ref="edit">{{ editeText }}</div>
    </header>
    <div class="mid-view">
      <Checked v-if="goodsList.length > 0" ref="checked" :on-update="checkedData" :goodsList="goodsList" @getPrice="getPrice"></Checked>
     <div class="no-data" v-if="goodsList.length == 0">
        <div class="no-icon"><img width="100%" height="100%"   src="../../assets/nodata.png" alt="" /></div>
        <p class="no-text">暂无数据</p>
      </div>
      <Recommend :dataList="dataList"></Recommend>
    </div>
    <div class="total-box flex" v-if="editeText == '编辑'">
      <div class="price">
        <p class="new-price">
          <span class="size">￥</span>
          {{ totalPrice }}
        </p>
        <!-- <p class="old-price">已优惠:￥2,601</p> -->
      </div>
      <button class="orange-btn" @click="submitView">去结算</button>
    </div>
    <div class="total-box flex" v-else>
      <button class="orange-btn" @click="collectData">移入收藏夹</button>
      <button class="red-btn" @click="deleteData">删除</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Checked from '@/views/cart/components/checked.vue';
import Recommend from '@/views/cart/components/recommend.vue';
import { Toast } from 'vant';
import { Dialog } from 'vant';
Vue.use(Toast);
export default {
  name: '',
  data() {
    return {
      editeText: '编辑',
      dataList: [],
      goodsList: [],
      totalPrice: 0,
      checkData: [],
      addressId:''
    };
  },
  mounted() {
    this.getData();
    this.getAddressData();
  },
  methods: {
    //获取数量
    getPrice(val) {
      console.log(val);
    },
    // 全选反选
    toggleAll() {
      this.$refs.checked.toggleAll();
    },
    // 获取全选数据
    checkedData(data) {
      var that = this;
      console.log(data);
      if (data.length == 0) {
        this.totalPrice = 0;
      } else {
        that.totalPrice = 0;
        that.checkData = [];
        for (var i = 0; i < data.length; i++) {
          that.totalPrice = that.totalPrice * 1 + data[i].price * 1 * data[i].num * 1;
          that.checkData = that.checkData.concat(data[i].cart_id);
        }
      }
    },
    // 编辑完成
    handle() {
      const edit = this.$refs.edit.innerText;
      if (edit == '编辑') {
        this.editeText = '完成';
      } else {
        this.editeText = '编辑';
      }
    },
    // 获取列表
    getData() {
      var that = this;
      let param = {
        id: 1,
        platform: 'wx',
        token: this.$root.token
      };
      let status = '';
      Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      });
      this.https.post('/cart/list', param, '').then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          that.dataList = res.data.recommend_list;
          that.goodsList = res.data.list;
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    // 收藏
    collectData() {
      var that = this;
      Toast.fail('暂无接口');
      return false;
      let param = {
        id: 1,
        platform: 'wx',
        token: this.$root.token
      };
      let status = '';
      Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      });
      this.https.get('/cart/list', param, '').then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    // 删除
    deleteData() {
      var that = this;
      let param = {
        id: 1,
        platform: 'wx',
        token: this.$root.token
      };
      let cart_id_list = this.checkData;
      if (cart_id_list.length == 0) {
        Toast.fail('请选择商品');
      } else {
        Dialog.confirm({
          message: '确定删除吗？'
        })
          .then(res => {
            Toast.loading({
              duration: 0,
              message: '加载中...',
              forbidClick: true
            });
            that.https.get('/cart/delete', param, '&cart_id_list=[' + cart_id_list + ']').then(res => {
              console.log(res);
              Toast.clear();
              if (res.code == 0) {
                Toast.success('删除成功！');
                that.totalPrice = 0;
                that.getData();
              } else {
                Toast.fail(res.msg);
              }
            });
          })
          .catch(() => {});
      }
    },
    //立即购买
    submitView() {
      var that = this;
      if (this.checkData.length == 0) {
        Toast('请勾选商品')
        return false;
      }
      let param = {
        id: 1,
        platform: 'wx',
        token: this.$root.token
      };
      var cart_list =JSON.stringify(that.checkData);
      this.https.post('/order/submit-preview', param, '&cart_id_list=' + cart_list + '&address_id=' + that.addressId + '&type=s').then(res => {
        if (res.code == 0) {
          console.log(res)
          that.$router.push({name:'cartOrder',params:{data:res.data}})
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
          that.addressId = res.data.list[0].id;
        } else {
          Toast.fail(res.msg);
        }
      });
    }
  },
  components: {
    Checked,
    Recommend
  }
};
</script>

<style lang="less">
.cart {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 100px;
  background-color: #f8f8f8;
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
      color: #f34e81;
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
  .total-box {
    position: fixed;
    bottom: 100px;
    left: 0;
    right: 0;
    padding: 15px 30px;
    background-color: #ffffff;
    .new-price {
      font-size: 40px;
      .size {
        font-size: 28px;
      }
    }
    .old-price {
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
    color: #f34e81;

    .size {
      font-size: 20px;
    }
  }
}
</style>
