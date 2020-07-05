<template>
  <div class="level">
    <van-nav-bar title="绑定手机" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <van-cell-group>
        <van-field v-if="oldPhone!=null" v-model="oldPhone" label="原手机号" placeholder="请输入手机号" disabled="disabled" />
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" :error-message="errMsg" />
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <template #button>
            <a href="javascript:void(0)" v-show="show" @click="getCode">获取验证码</a>
            <span v-show="!show" class="count">{{count}} s</span>
          </template>
        </van-field>
      </van-cell-group>
      <div class="btn-box"><van-button type="default" round plain size="large" @click="bindPhone">保存</van-button></div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    NavBar,
    Field,
    CellGroup,
    Button
  } from 'vant';
  Vue.use(Field);
  Vue.use(CellGroup);
  Vue.use(NavBar);
  Vue.use(Button);
  export default {
    name: 'level',
    data() {
      return {
        oldPhone: '',
        phone: '',
        sms: '',
        show: true,
        count: '',
        timer: null,
        errMsg: ''
      };
    },
    mounted() {
      this.oldPhone = this.$route.params.phone;

      console.log(this.oldPhone)
    },
    methods: {
      onClickLeft() {
        this.$router.back();
      },
      getCode() {
        if (!/^1[345678]\d{9}$/.test(this.phone)) {
          this.errMsg = '请输入正确的手机号码'
        } else {
          this.errMsg = '';
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
          }
        }
      },
      bindPhone() {
        var that = this;
        // axios
        setTimeout(function() {
          that.$router.back();
        }, 1000)
      }
    }
  };
</script>

<style lang="less" scoped>
  .btn-box {
    padding: 30px;
  }
  .van-button--default {
    height: 80px;
    color: #ffffff;
    font-size: 32px;
    font-weight: bold;
    background-color: #ff9900;
  }
</style>
