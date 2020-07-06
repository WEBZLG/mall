<template>
  <div class="book">
    <van-nav-bar title="通讯录" left-arrow @click-left="onClickLeft" />
    <div class="name-list">
      <van-panel title="我自己">
        <div class="flex">
          <div class="head"><img width="100%" height="100%" :src="userInfo.avatar_url" alt="" /></div>
          <div class="info">
            <div class="flex name-type">
              <p class="name">{{userInfo.nickname}}</p>
              <div class="flex">
                <div class="vip-icon">
                  <img width="100%" height="100%" v-if="userInfo.level==0" src="../../../assets/visitor.png" alt="" />
                  <!-- <img width="100%" height="100%"   src="../../../assets/little_chief.png" alt="" /> -->
                  <img width="100%" height="100%" v-if="userInfo.level==1" src="../../../assets/large_chief.png" alt="">
                  <img width="100%" height="100%" v-if="userInfo.level==2" src="../../../assets/member.png" alt="">
                </div>
                <span class="type">{{userInfo.level_name}}</span>
              </div>
            </div>
            <div class="flex">
              <div class="wechat">
                <van-field label="微信号:" v-model="wechat"  :value="wechat" @blur.native.capture="outBlur" placeholder="请输入微信号" :readonly="isRead" />
              </div>
              <div class="active-icon" ><img width="100%" height="100%" src="../../../assets/edit2.png" alt="" /></div>
            </div>
          </div>
        </div>
      </van-panel>
      <van-panel title="邀请人">
        <div class="flex">
          <div class="head"><img width="100%" height="100%" :src="parentInfo.avatar_url" alt="" /></div>
          <div class="info">
            <div class="flex name-type">
              <p class="name">{{parentInfo.nickname}}</p>
              <div class="flex">
                <div class="vip-icon">
                  <img width="100%" height="100%" v-if="parentInfo.level==0" src="../../../assets/visitor.png" alt="" />
                  <img width="100%" height="100%" v-if="parentInfo.level==1" src="../../../assets/little_chief.png" alt="" />
                  <!-- <img width="100%" height="100%"   src="../../../assets/large_chief.png" alt=""> -->
                  <img width="100%" height="100%" v-if="parentInfo.level==2" src="../../../assets/member.png" alt="">
                </div>
                <span class="type">{{parentInfo.level_name}}</span>
              </div>
            </div>
            <div class="flex">
              <div class="wechat">微信号:{{parentInfo.wechat_code||'暂无'}}</div>
              <div class="active-icon Copy" data-clipboard-action="copy" :data-clipboard-text="parentInfo.wechat_code"
                @click="copyLink('.Copy')"><img width="100%" height="100%" src="../../../assets/copy2.png" alt="" /></div>
            </div>
          </div>
        </div>
      </van-panel>
      <van-panel title="我的粉丝">
        <div class="item-fans" v-for="item in dataList" :key="item.id">
          <div class="flex">
            <div class="head"><img width="100%" height="100%" :src="item.avatar_url" alt="暂无图片" /></div>
            <div class="info">
              <div class="flex name-type">
                <p class="name">{{ item.nickname }}</p>
                <div class="flex">
                  <div class="vip-icon">
                    <img width="100%" height="100%" v-if="item.level==0" src="../../../assets/visitor.png" alt="" />
                    <img width="100%" height="100%" v-if="item.level==1" src="../../../assets/little_chief.png" alt="" />
                    <!-- <img width="100%" height="100%"   src="../../../assets/large_chief.png" alt=""> -->
                    <img width="100%" height="100%" v-if="item.level==2" src="../../../assets/member.png" alt="">
                  </div>
                  <span class="type">{{ item.level_name }}</span>
                </div>
              </div>
              <div class="flex">
                <div class="wechat">微信号:{{item.wechat_code}}</div>
                <div class="active-icon Copy" data-clipboard-action="copy" :data-clipboard-text="item.wechat_code "
                  @click="copyLink('.Copy')"><img width="100%" height="100%" src="../../../assets/copy2.png" alt="" /></div>
              </div>
            </div>
          </div>
          <van-cell class="down-num" :title="'下级人数(' + item.child.length + ')'" is-link :to="{name:'level',params:{child:item.child}}" />
        </div>
        <div class="no-data" v-if="dataList.length == 0">
          <div class="no-icon"><img width="100%" height="100%" src="../../../assets/nodata.png" alt="" /></div>
          <p class="no-text">暂无粉丝</p>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    NavBar,
    Panel,
    Cell,
    CellGroup,
    Toast,
    Field,
  } from 'vant';
  Vue.use(Field);
  Vue.use(Toast);
  Vue.use(Cell);
  Vue.use(CellGroup);
  Vue.use(Panel);
  Vue.use(NavBar);
  export default {
    name: 'book',
    data() {
      return {
        dataList: '',
        userInfo: '',
        parentInfo: '',
        isRead: false,
        wechat:''
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      outBlur(){
        this.bindWechat();
      },
      copyLink(className) {
        let that = this;
        let clipboard = new this.clipboard(className);
        clipboard.on('success', function(e) {
          Toast.success('复制成功');
        });
        clipboard.on('error', function() {
          Toast.fail('复制失败');
        });
      },
      onClickLeft() {
        this.$router.back();
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
        this.https.get('/share/get-team_1', param, '&status=' + status).then(res => {
          console.log(res);
          Toast.clear();
          if (res.code == 0) {
            that.dataList = res.data.list;
            that.userInfo = res.data.user_info;
            that.parentInfo = res.data.parent_info;
          } else {
            Toast.fail(res.msg);
          }
        });
      },
      bindWechat() {
        var that = this;
        if(this.wechat==''){
          Toast.fail('请输入微信号');
          return false;
        }
        let param = {
          id: 1,
          platform: 'wx',
          token: this.$root.token
        };
        let params = {
          wechat_code: this.wechat,
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
              that.getData();
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
  .book {
    .name-list {
      position: absolute;
      top: 92px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #f8f8f8;
      overflow: auto;
    }

    .head {
      height: 74px;
      width: 74px;
      border-radius: 50%;
      border: 3px solid #dcdcdc;
      overflow: hidden;
      margin-right: 20px;
    }

    .van-panel__content {
      padding: 0 30px 30px;
    }

    .item-fans {
      padding-top: 30px;
      border-bottom: 1px solid #dcdcdc;
    }

    .item-fans:last-child {
      border: none;
    }

    .info {
      flex: 1;
    }

    .vip-icon {
      height: 43px;
      width: 43px;
      position: relative;
      z-index: 1;
    }

    .active-icon {
      height: 26px;
      width: 26px;
    }

    .name-type {
      justify-content: inherit;
      font-size: 28px;

      .flex {
        margin-left: 20px;
      }

      .name {
        font-weight: bold;
      }
    }

    .wechat {
      color: #999999;

      .van-cell {
        padding: 0;
        font-size: 12px;
        color: #999999;
      }
      span{
        color: #ff0000;
      }
    }

    .type {
      height: 34px;
      padding: 0 20px;
      background: rgba(0, 0, 0, 1);
      opacity: 0.34;
      border-radius: 17px;
      color: #ffffff;
      text-align: center;
      margin-left: -20px;
      font-size: 24px;
      line-height: 34px;
    }

    [class*='van-hairline']:after {
      border: none;
    }

    .van-cell:not(:last-child):after {
      border: none;
    }

    .van-cell-group {
      margin: 20px 30px;
      border-radius: 10px;
      overflow: hidden;
    }

    .van-cell__title {
      font-weight: bold;
    }

    .down-num {
      padding: 20px 0;

      .van-cell__title {
        font-weight: 400;
      }
    }
  }
</style>
