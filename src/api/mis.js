import request from '@/utils/request'

const misServer = 'http://api.mis.eben.cn';

/** 获取所有机型
 * POST
 * **params**
 * 无
 */
export function getDeviceType(data) {
  return request({
    url: misServer + '/upgrade/get_device_type',
    method: 'post',
    data
  })
}

/** 获取所有系统版本
 * POST
 * **params**
 * 无
 */
export function getSysVersion(data) {
  return request({
    url: misServer + '/upgrade/get_sys_version',
    method: 'post',
    data
  })
}

/** 获取升级统计信息
 * POST
 * **params**
 * device_id 机型id
 * version_id 版本号id
 */
export function statisticsUpgrade(data) {
  return request({
    url: misServer + '/upgrade/statistics_upgrade',
    method: 'post',
    data
  })
}
