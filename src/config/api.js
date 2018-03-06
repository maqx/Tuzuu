/**
 * Created by mqx on 2018/1/8.
 */
// 引用axios文件
import axios from 'axios'
import qs from 'qs'
//配置接口地址
axios.defaults.baseURL = '/home'
//响应时间
axios.defaults.timeout = 3000
//配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//`withCredentials`表明是否跨网站访问协议，应该使用证书
axios.defaults.withCredentials = true
//返回数据类型
axios.defaults.responseType = 'json'
//添加一个请求拦截器
axios.interceptors.request.use(function(config){
  //在请求发出之前进行一些操作
  return config;
},function(err){
  //Do something with request error
  return Promise.reject(err);
});

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if(config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
//返回一个Promise(发送post请求)
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    //console.log("1：开始")
    axios.post(url, params)
      .then(response => {
        //console.log("3:返出数据")
        if(response) {
          resolve(response.data)
        }
        if (response.data.errno === 're_login_error') {
          window.location.hash = '#/login'
          window.location.reload()
          // this.$confirm('登录过期，请重新登录', {
          //   confirmButtonText: '确定',
          //   center: true,
          //   showCancelButton:false
          // }).then(() => {
          //  // window.location.hash = '#/login'
          //     window.location.reload()
          // }).catch(() => {
          //
          // });
        }
      }, err => {
        //console.log("4:"+err)
        reject(err)
      })
      .catch((error) => {
        console.log("catch err:" + error)
        reject(error)
      })
  })
}
export default {
  // 登录
  Login(params) {
    return fetch('/api/doLogin', params)
  },
  // 渠道下拉框数据
  getQdList(params){
    return fetch('/api/getQdList', params)
  },
  // 订单列表
  getOrderList(params){
    return fetch('/api/getOrderList', params)
  },
  // 渠道信息
  getQdInfoList(params){
    return fetch('/api/getQdInfoList',params)
  },
  // 渠道详情
  getQdDetail(params){
    return fetch('/api/getQdDetail',params)
  },
  // 账户信息
  getAccountInfoApi(params){
    return fetch('/finance/getAccountInfoApi',params)
  },
  //订单详情
  getOrderDetail(params){
    return fetch('/api/getOrderDetail',params)
  },
  // 获取服务者
  searchTzuList(params){
    return fetch('/api/searchTzuList',params)
  },
  // 评价管理
  getGroupList(params){
    return fetch('/api/getGroupList',params)
  },
  ///api/getServiceGroupList
  getServiceGroupList(params){
    return fetch('/api/getServiceGroupList',params)
  },
  // 评论合集
  getCommentList(params){
    return fetch('/api/getCommentList',params)
  },
  // 客诉详情
  getCommentDetail(params){
    return fetch('/api/getCommentDetail',params)
  },
  // 冻结金额流水
  getFreezeFlowListApi(params){
    return fetch('/api/getFreezeFlowListApi',params)
  },
  // 可提现金额流水
  getAvailableBalanceApi(params){
    return fetch('/api/getAvailableBalanceApi',params)
  },
  //提现记录
  getWithdrawRecordApi(params){
    return fetch('/finance/getWithdrawRecordApi',params)
  },
  //结算明细
  getfcList(params){
    return fetch('/api/fcList',params)
  },
  // 下载中心
  getSettlementExportList(params){
    return fetch('/api/getSettlementExportList',params)
  },
  // 客诉
  getFwsInfo(params){
    return fetch('/api/getFwsInfo',params)
  },
  // 修改客诉电话
  editComplaintCall(params){
    return fetch('/api/editComplaintCall',params)
  },
}
