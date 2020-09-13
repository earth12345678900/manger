// 发送请求的配置
import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router/index'

// 挂载到原型
Vue.prototype.$axios = axios
// 已经配置了反向代理
axios.defaults.baseURL = '/api'

// 配置请求拦截器
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 配置响应拦截器
// 如果状态码401或者token失效 跳转到登录页
axios.interceptors.response.use(response => {
  if (response.data.statusCode === 401 && response.data.message === '用户信息验证失败') {
    // 删除旧信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    Message.error('token失效')
    router.push('/login')
  }
  return response.data
})

Vue.prototype.$url = function (url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}
