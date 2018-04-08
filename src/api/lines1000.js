import request from '@/utils/request'

let serverUrl = 'http://lines1000apinew.eben.cn';

// ### 代码库列表
// POST
// **params**
// pro_id		■■■ 项目id
// page		  ■■■ 页码
// page_num	■■■ 每页项目数
export function repositoryQuery(param) {
  return request({
    url: serverUrl + '/manage/getProList',
    method: 'post',
    param
  })
}

// ### 删除代码库
// POST
// **params**
// id		    ■■■ 项目id
export function repositoryDelete(param) {
  return request({
    url: serverUrl + '/manage/delPro',
    method: 'post',
    param
  })
}

// ### 新增代码库
// POST
// **params**
// url		    ■■■ svn或git地址
// urltype		■■■ 1代表svn，2代表git
export function repositoryAdd(param) {
  return request({
    url: serverUrl + '/manage/addPro',
    method: 'post',
    param
  })
}

// ### 编辑代码库
// POST
// **params**
// url		    ■■■ svn或git地址
// urltype		■■■ 1代表svn，2代表git
// name		    ■■■ 项目名称
// id		      ■■■ 项目id
export function repositoryEdit(param) {
  return request({
    url: serverUrl + '/manage/updPro',
    method: 'post',
    param
  })
}

// ### 作者列表
// POST
// **params**
// id		      ■■■ 作者id
// page		    ■■■ 页码
// page_num	  ■■■ 每页项目数
// oper_uname	■■■ 作者id名字
export function getProOperallUserList(param) {
  return request({
    url: serverUrl + '/manage/getProOperallUserList',
    method: 'post',
    param
  })
}

// ### 伪删除作者
// POST
// **params**
// id		■■■ 作者id
export function delProOperallUser(param) {
  return request({
    url: serverUrl + '/manage/delProOperallUser',
    method: 'post',
    param
  })
}

// ### 增加作者
// POST
// **params**
// aliasname	■■■ 作者别名
// cnname		  ■■■ 作者中文名
// oper_uname	■■■ 作者名称
export function addProOperallUser(param) {
  return request({
    url: serverUrl + '/manage/addProOperallUser',
    method: 'post',
    param
  })
}

// ### 更改作者
// POST
// **params**
// id		      ■■■ 作者id
// aliasname	■■■ 作者别名
// cnname		  ■■■ 作者中文名
// oper_uname	■■■ 作者名称
export function updProOperallUser(param) {
  return request({
    url: serverUrl + '/manage/updProOperallUser',
    method: 'post',
    param
  })
}

// ### 判断开发用名重复接口
// POST
// **params**
// name		■■■ 开发用名
// type		■■■ add： 增加人员 upd： 更新人员
// uid		■■■ 人员id
export function ccPouName(param) {
  return request({
    url: serverUrl + '/manage/cc_api_pou_name',
    method: 'post',
    param
  })
}

// ### 判断开发用别名重复接口
// POST
// **params**
// aliasname	■■■ 开发用别名
// type		    ■■■ add： 增加人员 upd： 更新人员
// uid		    ■■■ 人员id
export function ccPouAliasname(param) {
  return request({
    url: serverUrl + '/manage/cc_api_pou_aliasname',
    method: 'post',
    param
  })
}

// ### 判断人员名重复接口
// POST
// **params**
// cnname		■■■ 人员名（中文名）
// type		  ■■■ add： 增加时判重 upd： 更新时判重
// uid		  ■■■ 人员id
export function ccPouCnname(param) {
  return request({
    url: serverUrl + '/manage/cc_api_pou_cnname',
    method: 'post',
    param
  })
}
