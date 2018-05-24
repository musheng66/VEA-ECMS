import request from '@/utils/request'
import download from '@/utils/download'

const serverUrl = 'http://lines1000apinew.eben.cn';

/** 代码库列表
 * POST
 * **params**
 * pro_id 项目id
 * page 页码
 * page_num 每页项目数
 */
export function repositoryQuery(data) {
  return request({
    url: serverUrl + '/manage/getProList',
    method: 'post',
    data
  })
}

/** 删除代码库
 * POST
 * **params**
 * id 项目id
 */
export function repositoryDelete(data) {
  return request({
    url: serverUrl + '/manage/delPro',
    method: 'post',
    data
  })
}

/** 新增代码库
 * POST
 * **params**
 * url svn或git地址
 * urltype 1代表svn，2代表git
 */
export function repositoryAdd(data) {
  return request({
    url: serverUrl + '/manage/addPro',
    method: 'post',
    data
  })
}

/** 编辑代码库
 * POST
 * **params**
 * url svn或git地址
 * urltype 1代表svn，2代表git
 * name	项目名称
 * id 项目id
 */
export function repositoryEdit(data) {
  return request({
    url: serverUrl + '/manage/updPro',
    method: 'post',
    data
  })
}

/** 作者列表
 * POST
 * **params**
 * id 作者id
 * page 页码
 * page_num 每页项目数
 * oper_uname 作者id名字
 */
export function getProOperallUserList(data) {
  return request({
    url: serverUrl + '/manage/getProOperallUserList',
    method: 'post',
    data
  })
}

/** 伪删除作者
 * POST
 * **params**
 * id 作者id
 */
export function delProOperallUser(data) {
  return request({
    url: serverUrl + '/manage/delProOperallUser',
    method: 'post',
    data
  })
}

/** 增加作者
 * POST
 * **params**
 * aliasname 作者别名
 * cnname 作者中文名
 * oper_uname 作者名称
 */
export function addProOperallUser(data) {
  return request({
    url: serverUrl + '/manage/addProOperallUser',
    method: 'post',
    data
  })
}

/** 更改作者
 * POST
 * **params**
 * id 作者id
 * aliasname 作者别名
 * cnname 作者中文名
 * oper_uname 作者名称
 */
export function updProOperallUser(data) {
  return request({
    url: serverUrl + '/manage/updProOperallUser',
    method: 'post',
    data
  })
}

/** 判断开发用名重复接口
 * POST
 * **params**
 * name 开发用名
 * type 可选 add：增加人员 upd：更新人员
 * uid 人员id
 */
export function ccPouName(data) {
  return request({
    url: serverUrl + '/manage/cc_api_pou_name',
    method: 'post',
    data
  })
}

/** 判断开发用别名重复接口
 * POST
 * **params**
 * aliasname 开发用别名
 * type 可选 add：增加人员 upd：更新人员
 * uid 人员id
 */
export function ccPouAliasname(data) {
  return request({
    url: serverUrl + '/manage/cc_api_pou_aliasname',
    method: 'post',
    data
  })
}

/** 判断人员名重复接口
 * POST
 * **params**
 * cnname 人员名（中文名）
 * type 可选 add：增加时判重 upd：更新时判重
 * uid 人员id
 */
export function ccPouCnname(data) {
  return request({
    url: serverUrl + '/manage/cc_api_pou_cnname',
    method: 'post',
    data
  })
}

/** 获取统计路径列表
 * POST
 * **params**
 * prourl_id 搜索的urlid
 * page 页码
 * page_num 每页项目数
 */
export function getProUrlList(data) {
  return request({
    url: serverUrl + '/manage/getProUrlList',
    method: 'post',
    data
  })
}

/** 编辑统计路径
 * POST
 * **params**
 * prourl_id 要编辑的urlid
 * dealtype 状态 1：不统计2：不统计第一版本3：直接统计
 */
export function updProUrl(data) {
  return request({
    url: serverUrl + '/manage/updProUrl',
    method: 'post',
    data
  })
}

/** 获取每次按人员统计的数据列表接口
 * POST
 * **params**
 * pro_id 项目id
 * page 分页中页号
 * page_num 分页中每页页数
 * addsort 可选 desc asc
 * start_time 开始时间
 * end_time 结束时间
 */
export function getProOperallCbuList(data) {
  return request({
    url: serverUrl + '/manage/getProOperallCbuList',
    method: 'post',
    data
  })
}

/** 更新人员bug数量
 * POST
 * **params**
 * bug_num bug数量
 * id 人员id
 */
export function forv4UpdProOperallCbu(data) {
  return request({
    url: serverUrl + '/manage/forv4_updProOperallCbu',
    method: 'post',
    data
  })
}

/** 获取要导出的人员信息
 * POST
 * **params**
 * addtime 时间
 */
export function getProOperallCbuListForexcel(data) {
  return request({
    url: serverUrl + '/manage/getProOperallCbuListForexcel',
    method: 'post',
    data
  })
}

/** 获取所有下载文件的路径
 * POST
 * **params**
 * stataddtime 时间戳
 */
export function forv4DownSummarizelog(data) {
  return request({
    url: serverUrl + '/manage/forv4_down_summarizelog',
    method: 'post',
    data
  })
}

/** 下载统计日志
 * GET/POST
 * **params**
 * url 下载路径
 */
export function downloadSummarizelog(data) {
  return download({
    url: data.url,
    method: 'post',
    data
  })
}

/** 统计比对接口
 * POST
 * **params**
 * oper_uname		  ■■■ 人员id和bug数字符串形如： 1&&22,2&&15  (uid&&bugnum)
 * uid		■■■ 人员id
 * starttime       ■■■ 获取svn log 开始时间
 * endtime		■■■ 获取svn log 结束时间
 * compare_type	■■■ 统计类型 current:本月 prev:上月 period:时间段。当传为period时也要传starttime，endtime;不为period时 starttime，endtime不传
 */
export function forv4Stat(data) {
  return request({
    url: serverUrl + '/manage/forv4_stat',
    method: 'post',
    data
  })
}
