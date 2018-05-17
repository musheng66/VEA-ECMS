import request from '@/utils/request'

const serverUrl = 'http://passport.eben.cn';

/** 获取激活设备信息
 * POST
 * **params**
 * authKey 认证码
 * starttime 起始时间
 * endtime 结束时间
 */
export function exportActivateDevice(data) {
  return request({
    url: serverUrl + '/export/api_exportActivateDevice',
    method: 'post',
    data
  })
}


/** 获取所有机型
 * POST
 * **params**
 * 无
 */
export function getDeviceType(data) {
  return request({
    url: serverUrl + '/upgrade/get_device_type',
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
    url: serverUrl + '/upgrade/get_sys_version',
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
    url: serverUrl + '/upgrade/statistics_upgrade',
    method: 'post',
    data
  })
}
