import request from '@/utils/request'
import requestLocal from '@/utils/requestLocal'
import PassportMock from '@/mock/passport'
import _Vue from 'vue'

const serverUrl = 'http://passport.eben.cn';

/** 获取激活设备信息
 * POST
 * **params**
 * authKey 认证码
 * starttime 起始时间
 * endtime 结束时间
 */
export function exportActivateDevice(data) {
  if (_Vue.API_REMOTE) {
    return request({
      url: serverUrl + '/export/api_exportActivateDevice',
      method: 'post',
      data
    })
  } else {
    return requestLocal(PassportMock.exportActivateDevice({body: data}))
  }
}
