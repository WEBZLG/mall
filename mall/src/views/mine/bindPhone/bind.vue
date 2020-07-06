<template>
  <div class="level">
    <van-nav-bar title="绑定手机" left-arrow @click-left="onClickLeft" />
    <div class="mid-view">
      <van-cell-group>
        <van-field v-if="oldPhone != null" v-model="oldPhone" label="原手机号" placeholder="请输入手机号" disabled="disabled" />
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" :error-message="errMsg" />
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <template #button>
            <a href="javascript:void(0)" v-show="show" @click="getCode">获取验证码</a>
            <span v-show="!show" class="count">{{ count }} s</span>
          </template>
        </van-field>
      </van-cell-group>
      <div class="btn-box"><van-button type="default" round plain size="large" @click="bindPhone">保存</van-button></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar, Field, CellGroup, Button, Toast } from 'vant';
Vue.use(Toast);
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
    console.log(this.oldPhone);
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    // 获取验证码
    getCode() {
      var that = this;
      if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errMsg = '请输入正确的手机号码';
      } else {
        let param = {
          id: 1,
          platform: 'wx',
          token: this.$root.token
        };
        let params = {
          content: this.phone
        };
        let status = '';
        Toast.loading({
          duration: 0,
          message: '加载中...',
          forbidClick: true
        });
        this.https.post('/user/user-hand-binding', param, '', params).then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            Toast.success('发送成功');
            that.errMsg = '';
            const TIME_COUNT = 60;
            if (!that.timer) {
              that.count = TIME_COUNT;
              that.show = false;
              that.timer = setInterval(() => {
                if (that.count > 0 && that.count <= TIME_COUNT) {
                  that.count--;
                } else {
                  that.show = true;
                  clearInterval(that.timer);
                  that.timer = null;
                }
              }, 1000);
            }
          } else {
            Toast.fail(res.msg);
          }
        });
      }
    },
    // baocun
    bindPhone() {
      var that = this;
      if(this.phone==''){
        Toast.fail('请输入正确手机号');
        return false;
      }else if(this.sms==''){
        Toast.fail('请输入正确验证码');
        return false;
      }
      let param = {
        id: 1,
        platform: 'wx',
        token: this.$root.token
      };
      let params = {
        wechat_code: '',
        mobile: this.oldPhone,
        new_mobile: this.phone,
        phone_code: this.sms
      };
      Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      });
      this.https.post('/user/update', param, '', params).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code == 0) {
          Toast.success('保存成功');
          setTimeout(function(){
            that.$router.back();
          },1000)
        } else {
          Toast.fail(res.msg);
        }
      });
    },
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
