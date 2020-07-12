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
const ShareDetail = () => import('@/views/shareDetail/detail.vue');
const GoodsList = () => import('@/views/goods/goodsList.vue');
const Search = () => import('@/views/goods/searchList.vue');
const Book = () => import('@/views/mine/book/book.vue');
const Level = () => import('@/views/mine/book/level.vue');
const Address = () => import('@/views/mine/address/address.vue');
const Add = () => import('@/views/mine/address/add.vue');
const Edit = () => import('@/views/mine/address/edit.vue');
const Collect = () => import('@/views/mine/collect/collect.vue');
const BindPhone = () => import('@/views/mine/bindPhone/bind.vue');
const Notice = () => import('@/views/home/notice/notice.vue');
const NoticeDetail = () => import('@/views/home/notice/detail.vue');
const CouponList = () => import('@/views/home/coupon/list.vue');
const CouponDetail = () => import('@/views/home/coupon/detail.vue');
const HotList = () => import('@/views/home/hotGoods/hotList.vue');
const Group = () => import('@/views/home/group/group.vue');
const GroupDetail = () => import('@/views/home/group/detail.vue');
const GroupOrderDetail = () => import('@/views/home/group/orderDetail.vue');
const GroupMyOrderDetail = () => import('@/views/home/group/myOrderDetail.vue');
const GroupExpress = () => import('@/views/home/group/express.vue');
const Seckill = () => import('@/views/home/seckill/seckill.vue');
const SeckillDetail = () => import('@/views/home/seckill/detail.vue');
const SeckillOrderDetail = () => import('@/views/home/seckill/orderDetail.vue');
const SeckillMyOrderDetail = () => import('@/views/home/seckill/myOrderDetail.vue');
const SeckillExpress = () => import('@/views/home/seckill/express.vue');
const Limit = () => import('@/views/home/limit/limit.vue');
const LimitDetail = () => import('@/views/home/limit/detail.vue');
const LimitOrderDetail = () => import('@/views/home/limit/orderDetail.vue');
const LimitMyOrderDetail = () => import('@/views/home/limit/myOrderDetail.vue');
const LimitExpress = () => import('@/views/home/limit/express.vue');
const NewUser = () => import('@/views/home/newUser/newUser.vue');
const UserDetail = () => import('@/views/home/newUser/detail.vue');
const UserOrderDetail = () => import('@/views/home/newUser/orderDetail.vue');
const UserMyOrderDetail = () => import('@/views/home/newUser/myOrderDetail.vue');
const UserExpress = () => import('@/views/home/newUser/express.vue');
const Fans = () => import('@/views/member/fans/fans.vue');
const Estimate = () => import('@/views/member/estimate/estimate.vue');
const Account = () => import('@/views/member/account/account.vue');
const Order = () => import('@/views/member/order/order.vue');
const Deposit = () => import('@/views/member/deposit/deposit.vue');
const DepositList = () => import('@/views/member/deposit/depositList.vue');
const OrderDetail = () => import('@/views/member/order/orderDetail.vue');
const PayOrderDetail = () => import('@/views/member/order/payOrderDetail.vue');
const MyOrderDetail = () => import('@/views/member/order/myOrderDetail.vue');
const Express = () => import('@/views/member/order/express.vue');
const Vip = () => import('@/views/member/vip/vip.vue');
const About = () => import('@/views/about/about.vue');
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
    console.log(savedPosition)
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
      path: '/express',
      name: 'express',
      component: Express
    },
    {
      path: '/bindPhone',
      name: 'bindPhone',
      component: BindPhone
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/groupDetail',
      name: 'groupDetail',
      component: GroupDetail
    },
    {
      path: '/groupOrderDetail',
      name: 'groupOrderDetail',
      component: GroupOrderDetail,
    },
    {
      path: '/groupMyOrderDetail',
      name: 'groupMyOrderDetail',
      component:GroupMyOrderDetail,
    },
    {
      path: '/groupExpress',
      name: 'groupExpress',
      component: GroupExpress
    },

    {
      path: '/limit',
      name: 'limit',
      component: Limit
    },
    {
      path: '/limitDetail',
      name: 'limitDetail',
      component: LimitDetail
    },
    {
      path: '/limitOrderDetail',
      name: 'limitOrderDetail',
      component: LimitOrderDetail,
    },
    {
      path: '/limitMyOrderDetail',
      name: 'limitMyOrderDetail',
      component:LimitMyOrderDetail,
    },
    {
      path: '/limitExpress',
      name: 'limitExpress',
      component: LimitExpress
    },

    {
      path: '/newUser',
      name: 'newUser',
      component: NewUser
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      component: UserDetail
    },
    {
      path: '/userOrderDetail',
      name: 'userOrderDetail',
      component: UserOrderDetail,
    },
    {
      path: '/userMyOrderDetail',
      name: 'userMyOrderDetail',
      component:UserMyOrderDetail,
    },
    {
      path: '/userExpress',
      name: 'userExpress',
      component:UserExpress
    },

  {
        path: '/seckill',
        name: 'seckill',
        component: Seckill
      },
    {
      path: '/seckillDetail',
      name: 'seckillDetail',
      component: SeckillDetail
    },
    {
      path: '/seckillOrderDetail',
      name: 'seckillOrderDetail',
      component: SeckillOrderDetail,
    },
    {
      path: '/seckillMyOrderDetail',
      name: 'seckillMyOrderDetail',
      component:SeckillMyOrderDetail,
    },
    {
      path: '/seckillExpress',
      name: 'seckillExpress',
      component: SeckillExpress
    },

    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/shareDetail',
      name: 'shareDetail',
      component: ShareDetail
    },
    {
      path: '/book',
      name: 'book',
      component: Book,
    },
    {
      path: '/couponList',
      name: 'couponList',
      component: CouponList,
    },
    {
      path: '/couponDetail',
      name: 'couponDetail',
      component: CouponDetail,
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
      path: '/noticeDetail',
      name: 'noticeDetail',
      component: NoticeDetail,
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      // 是否数据缓存
      meta: {
        keepAlive: true
      },
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
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
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
        // 是否数据缓存
        meta: {
          keepAlive: true
        },
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
        component: Cart,
        // 是否数据缓存
        meta: {
          keepAlive: true
        },
      }, {
        // 我的
        path: 'mine',
        name: 'mine',
        component: Mine
      }]
    }
  ]
})
