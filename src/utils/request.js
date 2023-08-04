// axios二次封装
// yarn add axios-adapter-uniapp import axiosAdapterUniapp from 'axios-adapter-uniapp'
import { getToken } from '@/utils/auth'
import axios from 'axios'
// 小程序axios适配器
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter

//根据环境变量获取api地址
let baseURL = process.env.config[process.env.UNI_SCRIPT].VITE_BASE_API
// let evnName = process.env.config[process.env.UNI_SCRIPT] 获取当前处于哪个开发环境
console.log('baseURL:', baseURL, '++++++++++++++++++++++++')

class HttpRequest {
  constructor () {
    this.baseURL = baseURL // 从环境变量中获取api地址
    this.timeout = 300000
  }
  mergeOptions (options) {
    return {
      baseURL,
      timeout: 300000,
      ...options
    }
  }
  request (options) {
    const instance = axios.create()
    this.setInterceptors(instance)
    const opts = this.mergeOptions(options)
    return instance(opts)
  }
  get (url, data = {}, outHeaders = {}) {
    // console.log(data, "data+++++++++++++");

    return this.request({
      dataType: 'json',
      method: 'get',
      url,
      params: { ...data }, // get参数可以直接展开
      headers: {}
    })
  }
  post (url, data = {}, outHeaders = {}) {
    // 请求体中 {}
    return this.request({
      method: 'post',
      url,
      data, // post要求必须传入data属性
      headers: {}
    })
  }

  // 设置拦截器
  setInterceptors (instance) {
    // 请求拦截器
    instance.interceptors.request.use(config => {
      const noLoading = config.headers['NO-LOADING']
      // 是否需要设置 token
      const isToken = config.headers['ISTOKEN'] || false
      if (getToken() && isToken) {
        config.header['Cookie'] = `${getToken()}`
      }
      if (!noLoading) {
        uni.showLoading({
          title: '加载中...'
        })
      }
      config.headers = {
        ...config.headers
      }
      //console.log('config',config)
      return config
    })
    // 响应拦截器
    instance.interceptors.response.use(
      res => {
        const noLoading = res.config.headers['NO-LOADING']
        if (!noLoading) {
          uni.hideLoading()
        }
        let { data } = res
        // console.log("请求获取data", data)
        if (data) {
          if (data.code === 200) {
            //console.log('data=============', data)
            return Promise.resolve(data)
          } else {
            uni.showToast({
              title: '111'
            })
            // showConfirm({
            //   content: data.msg,
            //   showCancel: false
            // }).then(res => {
            //   /*               if (res.confirm) {
            //     store.dispatch("LogOut").then((res) => {
            //       uni.reLaunch({ url: "/pages/login" });
            //     });
            //   } */
            // })
            return Promise.resolve(data)
          }
        }
      },
      err => {
        console.log('axios报错', err)
        uni.hideLoading()
        return Promise.reject(err)
      }
    )
  }
}

export default new HttpRequest()
