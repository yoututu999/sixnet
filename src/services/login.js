import request from '@/utils/request'
// 获取公司基础信息
export async function authInfo (param) {
  // return request('/api2/WuWeiBlueCompanyPlace/LogoAndTitle', 'GET', param)
  return request.get('/api2/WuWeiBlueCompanyPlace/LogoAndTitle', param)
}
// 登录
export async function authLogin (param) {
  // return request('/api/companyuser_login', 'POST', param)
  return request.post('/api/companyuser_login', param)
}
// 检验是否登录
export async function isLogin (param) {
  return request.get('/api/companyuser_islogin', param)
}
// 获取用户信息
export async function getUserInfo () {
  return request.get('/api/CompanyUser_MyInfo')
}