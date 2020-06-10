// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import LyTab from 'ly-tab'
import axios from "axios";
import https from './request/http.js'
 import infiniteScroll from "vue-infinite-scroll";
 Vue.use(infiniteScroll);

Vue.use(LyTab)
Vue.prototype.https=https
require('es6-promise').polyfill();
require('es6-promise/auto');
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
