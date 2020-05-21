import Vue from 'vue'
import Router from 'vue-router'
// 引入一级组件
import Tabbar from '@/views/tabbar/tabbar.vue'

// 懒加载二级组件 Tarbar
const Home = () => import('@/views/home/home.vue');
const Category = () => import('@/views/category/category.vue');
const Member = () => import('@/views/member/member.vue');
const Cart = () => import('@/views/cart/cart.vue');
const Mine = () => import('@/views/mine/mine.vue');
const Detail = () => import('@/views/goods/detail.vue');
const Book = () => import('@/views/mine/children/book.vue');
// 解决多次点击重复路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  // mode: 'history',
  // 解决路由跳转页面没有置顶
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [{
      path: '/',
      redirect: 'tabbar'
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/book',
      name: 'book',
      component: Book,
    },
    {
      // 根页面
      path: '/tabbar',
      name: 'tabbar',
      component: Tabbar,
      children: [{
        path: '/tabbar',
        redirect: '/tabbar/home'
      }, {
        // 主页
        path: 'home',
        name: 'home',
        component: Home,
        // 是否数据缓存
        meta: {
          keepAlive: true
        },
        children: [
          // {
          //   path:'detail',
          //   name:'detail',
          //   component:Detail
          // }
        ]
      }, {
        // 分类
        path: 'category',
        name: 'category',
        component: Category,
      }, {
        // 吃什么
        path: 'member',
        name: 'member',
        component: Member,
        // 是否数据缓存
        meta: {
          keepAlive: true
        }
      }, {
        // 购物车
        path: 'cart',
        name: 'cart',
        component: Cart
      }, {
        // 我的
        path: 'mine',
        name: 'mine',
        component: Mine
      }]
    }
  ]
})
