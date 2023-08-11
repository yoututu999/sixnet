import request from '@/utils/request'

// 通知消息
export async function getNoticeList (param) {
  return request.post('/api/CompanyTongZhi_list', param, {
    'NO-LOADING': true
  })
}
// 报警消息
export async function getAlarmList (param) {
  return request.post('/api/CompanyBlueIndex_AlarmInfo_list', param, {
    'NO-LOADING': true
  })
}
