/**
 * Created by mqx on 2017/10/20.
 */
import Vue from 'vue'
/**
 * 货币格式化
 * currencyType 货币符号
 */

Vue.filter('formatPrice', function (value, currencyType = '￥') {
  let res
  if (value.toString().indexOf('.') === -1) {
    res = (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.00'
  } else {
    res = value.toFixed(2)
  }
  return currencyType + res
})
Vue.filter('formatDate', function (time, type = 'yyyy-MM-dd') {
  let _date = new Date(time * 1)
  return formatDate(_date, type)
})

Vue.filter('Date', function (time, type = 'MM-dd') {
  let _date = new Date(time * 1)
  return formatDate(_date, type)
})
Vue.filter('DateTime', function (time, type = 'yyyy-MM-dd hh:mm') {
  let _date = new Date(time * 1)
  return formatDate(_date, type)
})
export function formatDate (date, fmt) {
  if(/^1\d{10}$/.test(date)){

  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
