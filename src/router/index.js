import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/index/index'
import order from '@/components/index/order/index'
import orderDetail from '@/components/index/order/detail'
import qd from '@/components/index/qd/index'
import evaluation from '@/components/index/qd/evaluation'
import serviceGroupLlist from '@/components/index/qd/serviceGroupList'
import groupCommentsList from '@/components/index/qd/groupCommentsList'
import CommentInfo from '@/components/index/qd/commentsInfo'
import qdDetail from '@/components/index/qd/detail'
import qdOrderList from '@/components/index/qd/orderList'
import account from '@/components/index/account/index'
import amountFrozen from '@/components/index/account/amountFrozen'
import availableBalance from  '@/components/index/account/availableBalance'
import withdraw from  '@/components/index/account/withdraw'
import withdrawalRecord from '@/components/index/account/withdrawalRecord'
import downloadCenter from '@/components/index/account/downloadCenter'
import billingDetails from '@/components/index/account/billingDetails'
import billingOrderList from '@/components/index/account/billingOrderList'
import customerComplaintTel from '@/components/index/account/customerComplaintTel'
import login from '@/components/login/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      children:[
        {
          path: '/',
          component: order
        },
        {
          path: '/order',
          name: 'order',
          component: order
        },
        {
          path: 'order/detail/:id',
          name: 'orderDetail',
          component: orderDetail
        },
        {
          path: '/qd',
          name: 'qd',
          component: qd
        },
        {
          path: '/qd/evaluation',
          name: 'evaluation',
          component: evaluation
        },
        {
          path: '/qd/groupCommentsList/:tourist_group_id/:qd_name/:tzu_name/:title/:date/:qd_id/:tzu_id',
          name: 'groupCommentsList',
          component: groupCommentsList
        },
        {
          path: '/qd/serviceGroupLlist/:tzu_id/:qd_id/:qd_name/:tzu_name',
          name: 'serviceGroupLlist',
          component: serviceGroupLlist
        },
        {
          path: '/qd/CommentInfo/:id/:qd_id/:tzu_id/:qd_name/:tzu_name/:tourist_group_id/:title/:date/:name',
          name: 'CommentInfo',
          component: CommentInfo
        },
        {
          path: '/qd/detail/:id',
          name: 'qdDetail',
          component: qdDetail
        },
        {
          path: '/qd/order/list/:qd_id/:tzu_id',
          name: 'qdOrderList',
          component: qdOrderList
        },
        {
          path: '/account',
          name: 'account',
          component: account
        },
        {
          path: '/account/amountFrozen',
          name: 'amountFrozen',
          component: amountFrozen
        },
        {
          path: '/account/availableBalance',
          name: 'availableBalance',
          component: availableBalance
        },
        // 提现
        {
          path: '/account/withdraw',
          name: 'withdraw',
          component: withdraw
        },
        // 提现记录
        {
          path: '/account/withdrawalRecord',
          name: 'withdrawalRecord',
          component: withdrawalRecord
        },
        //下载中心
        {
          path: '/account/downloadCenter',
          name: 'downloadCenter',
          component: downloadCenter
        },
        //结算明细
        {
          path: '/account/billingDetails',
          name: 'billingDetails',
          component: billingDetails
        },
        // 订单列表 date=2017-08-10&page=1&start_time=2016-1-01&end_time=2018-1-29&perPage=1&type=1
        {
          path: '/account/billingOrderList/:date/:page/:start_time/:end_tim/:perPage/:type',
          name: 'billingOrderList',
          component: billingOrderList
        },
        //客诉电话
        {
          path: '/account/customerComplaintTel',
          name: 'customerComplaintTel',
          component: customerComplaintTel
        },
      ]
    },
    {
      path:'/login',
      name: 'login',
      component: login
    }
  ]
})
