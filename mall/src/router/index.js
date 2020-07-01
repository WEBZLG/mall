import Vue from 'vue'
import Router from 'vue-router'
// 引入一级组件
import Tabbar from '@/views/tabbar/tabbar.vue'

// 懒加载二级组件 Tarbar
const Home = () => import('@/views/home/home.vue');
const Category = () => import('@/views/category/category.vue');
const Member = () => import('@/views/member/member.vue');
const Cart = () => import('@/views/cart/cart.vue');
const CartOrder = () => import('@/views/cart/orderDetail.vue');
const Mine = () => import('@/views/mine/mine.vue');
const Detail = () => import('@/views/goods/detail.vue');
const GoodsList = () => import('@/views/goods/goodsList.vue');
const Book = () => import('@/views/mine/book/book.vue');
const Level = () => import('@/views/mine/book/level.vue');
const Address = () => import('@/views/mine/address/address.vue');
const Add = () => import('@/views/mine/address/add.vue');
const Edit = () => import('@/views/mine/address/edit.vue');
const Collect = () => import('@/views/mine/collect/collect.vue');
const Notice = () => import('@/views/home/notice/notice.vue');
const HotList = () => import('@/views/home/hotGoods/hotList.vue');
const Group = () => import('@/views/home/group/group.vue');
const Fans = () => import('@/views/member/fans/fans.vue');
const Estimate = () => import('@/views/member/estimate/estimate.vue');
const Account = () => import('@/views/member/account/account.vue');
const Order = () => import('@/views/member/order/order.vue');
const Deposit = () => import('@/views/member/deposit/deposit.vue');
const DepositList = () => import('@/views/member/deposit/depositList.vue');
const OrderDetail = () => import('@/views/member/order/orderDetail.vue');
const PayOrderDetail = () => import('@/views/member/order/payOrderDetail.vue');
const MyOrderDetail = () => import('@/views/member/order/myOrderDetail.vue');
const Vip = () => import('@/views/member/vip/vip.vue');
// 解决多次点击重复路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/level',
      name: 'level',
      component: Level,
    },
    {
      path: '/address',
      name: 'address',
      component: Address,
    },
    {
      path: '/cartOrder',
      name: 'cartOrder',
      component: CartOrder,
    },
    {
      path: '/add',
      name: 'add',
      component: Add,
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
    },
    {
      path: '/collect',
      name: 'collect',
      component: Collect,
    },
    {
      path: '/fans',
      name: 'fans',
      component: Fans,
    },
    {
      path: '/estimate',
      name: 'estimate',
      component: Estimate,
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice,
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: Deposit,
    },
    {
      path: '/depositList',
      name: 'depositList',
      component: DepositList,
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail,
    },
    {
      path: '/payOrderDetail',
      name: 'payOrderDetail',
      component: PayOrderDetail,
    },
    {
      path: '/myOrderDetail',
      name: 'myOrderDetail',
      component: MyOrderDetail,
    },
    {
      path: '/vip',
      name: 'vip',
      component: Vip,
    },
    {
      path: '/hotList',
      name: 'hotList',
      component: HotList,
    },
    {
      path: '/group',
      name: 'group',
      component: Group,
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: GoodsList,
      meta: {
        keepAlive: true
      },
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
