// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import LyTab from 'ly-tab'
import axios from "axios";
import https from './request/http.js'
import infiniteScroll from "vue-infinite-scroll";
import clipboard from 'clipboard';
import wx from 'weixin-js-sdk';
Vue.prototype.wx = wx
Vue.use(infiniteScroll);

Vue.use(LyTab)
Vue.prototype.clipboard = clipboard;
Vue.prototype.https = https
require('es6-promise').polyfill();
require('es6-promise/auto');
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  data: function() {
    return {
      token: 'gfl_TwNXred-zWaHivTExCestIMLCOu5',
    }
  },
  components: {
    App
  },
  template: '<App/>'
})
