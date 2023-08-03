
import { request } from '@/utils/request'
// 获取验证码
export async function authInfo(param) {
    return request('api2/WuWeiBlueCompanyPlace/LogoAndTitle', 'GET', param)
}