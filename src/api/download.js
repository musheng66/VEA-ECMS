import request from '@/utils/request'

/** 直接下载
 * POST
 * **params**
 * 无
 */
export function download(params) {
  return request({
    url: params.url,
    method: 'get'
  })
}
