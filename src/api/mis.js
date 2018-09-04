import request from '@/utils/request'
import requestLocal from '@/utils/requestLocal'
import MisMock from '@/mock/mis'
import _Vue from 'vue'

const misServer = 'http://api.mis.eben.cn';

/** 获取所有机型
 * POST
 * **params**
 * 无
 */
export function getDeviceType(data) {
  if (_Vue.API_REMOTE) {
    return request({
      url: misServer + '/upgrade/get_device_type',
      method: 'post',
      data
    })
  } else {
    return requestLocal(MisMock.getDeviceType({body: data}))
  }
}

/** 获取所有系统版本
 * POST
 * **params**
 * 无
 */
export function getSysVersion(data) {
  if (_Vue.API_REMOTE) {
    return request({
      url: misServer + '/upgrade/get_sys_version',
      method: 'post',
      data
    })
  } else {
    return requestLocal(MisMock.getSysVersion({body: data}))
  }
}

/** 获取升级统计信息
 * POST
 * **params**
 * device_id 机型id
 * version_id 版本号id
 */
export function statisticsUpgrade(data) {
  if (_Vue.API_REMOTE) {
    return request({
      url: misServer + '/upgrade/statistics_upgrade',
      method: 'post',
      data
    })
  } else {
    return requestLocal(MisMock.statisticsUpgrade({body: data}))
  }
}
