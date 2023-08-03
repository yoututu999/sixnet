//设置token认证信息
export function setToken (auth) {
    uni.setStorageSync('token',auth)
}
/**
 * 获取Token
 */
export function getToken () {
    return uni.getStorageSync('token')
}