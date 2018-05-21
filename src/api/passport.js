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
