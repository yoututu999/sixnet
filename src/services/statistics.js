import request from '@/utils/request'

// 首页统计产水量
export async function getTagsHistorical (param) {
  return request.post('/api/TagsHistoricalDataV2', param)
}
// 查询
export async function getTagsRealTimeData (param) {
  return request.post('/api/tagdata', param)
}
