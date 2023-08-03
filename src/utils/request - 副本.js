import axios from 'axios'
import Cookie from 'js-cookie'
import qs from 'qs'
import { Toast } from "vant";
// 正在进行中的请求列表
let reqList = []

const service = axios.create()
// 跨域认证信息 header 名
const xsrfHeaderName = 'token'
const BASE_URL = process.uniEnv.BASE_URL;
const LOGIN_TYPE = process.uniEnv.LOGIN_TYPE;

service.timeout = 120000
service.withCredentials = true
service.xsrfHeaderName = xsrfHeaderName
service.xsrfCookieName = xsrfHeaderName

const CancelToken = axios.CancelToken;


/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request (url, method, params, contentType) {
  switch (method) {
    case 'GET':
      return service.get(BASE_URL + url, { params }, contentType)
    case 'POST':
      return service.post(BASE_URL + url, params, contentType)
    case 'FORM':
      console.log(url, params, contentType)
      return service.post(url, params, contentType)
    default:
      return service.get(BASE_URL + url, { params }, contentType)
  }
}
function whitePath (path) {
  let list = ['/ent/auth', '/login', '/info', '/ent/sign'] //不需要token的接口
  let bol = false;
  for (let i = 0; i < list.length; i++) {
    if (path.indexOf(list[i]) > -1) {
      bol = true;
      break
    }
  }
  return bol
}

service.interceptors.request.use(config => {
  if (config.method === 'get') {
    // 如果是get请求，处理数组传值
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }
  const source = CancelToken.source();
  // 全局添加cancelToken
  config.cancelToken = source.token;
  //保存可能阻止的请求
  stopRepeatRequest(reqList, config.url, source)

  //token没有值
  if (xsrfHeaderName && !Cookie.get(xsrfHeaderName)) {
    //无token认证信息，进行授权或者跳转登录
    if (!whitePath(config.url)) {
      //
    }
  } else {
    //设置token
    console.log(getAuthorization())
    if (getAuthorization() && !whitePath(config.url)) {
      config.headers = {
        'token': getAuthorization(),
      }
    } else {
      config.headers = {
        'token': '',
      }
    }
  }
  return config;
}, error => {  //请求错误处理
  Promise.reject(error)
});

service.interceptors.response.use((res) => {
  //console.log('响应信息=>', res)
  if (res.data.code === 401) {
    // 取消其他正在进行的请求
    for (let item of reqList) {
      item.source.cancel();
    }
    //删除
    removeAuthorization()
    //Toast('登录信息过期，请重新登录')
    uni.clearStorageSync();
    uni.clearStorage();
    //暂存当前地址用于跳转
    const path = location.hash.replace('#', '')
    if (path !== '/')
      uni.setStorageSync('defUrl', path);

    uni.reLaunch({
      url: '/pages/login/index',
    });
    //清空所有阻止的请求
    reqList = []

    return Promise.reject(res);
  } else if (res.data.code !== 200) {
    Toast({
      message: res.data.msg, duration: 2500,
    })
    return Promise.reject(res);
  }

  //删除阻止强求source
  allowRequest(reqList, res.config.url)

  //返回正常接口
  return res.data
}, (error) => {
  if (axios.isCancel(error)) {
    return new Promise(() => { });
  }
  else {
    // ...请求失败后的后续操作
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout')) {
      Toast('请求超时，请检查网网络连接')
    }
    else {
      Toast('服务错误，请联系管理员')
    }
  }

  return Promise.reject(error);
});
//设置token认证信息
function setAuthorization (auth) {
  Cookie.set(xsrfHeaderName, auth.token, { expires: auth.expireAt })
}
/**
 * 获取Token
 */
function getAuthorization () {
  return Cookie.get(xsrfHeaderName)
}
/**
 * 移出认证信息
 */
function removeAuthorization () {
  Cookie.remove(xsrfHeaderName)
}


/* 阻止重复请求
* @param {array} reqList - 请求缓存列表
* @param {string} url - 当前请求地址
* @param {function} cancel - 请求中断函数
*/
const stopRepeatRequest = function (reqList, url, cancel) {
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i].url === url) {
      return
    }
  }
  reqList.push({ url, source: cancel })
}

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {string} url 请求地址
 */
const allowRequest = function (reqList, url) {
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i].url === url) {
      reqList.splice(i, 1)
      break
    }
  }
}

export {
  request,
  setAuthorization,
  getAuthorization,
  removeAuthorization,
}