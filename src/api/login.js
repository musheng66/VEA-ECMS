import request from '@/utils/request'

export function loginByUsername(username, password) {
  // const data = {
  //   username: username,
  //   password: password
  // }
  // return request({
  //   url: '/login/login',
  //   method: 'post',
  //   data
  // })
  let data = {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '超级管理员',
    monitor: true,
  }
  return Promise.resolve({data: data})
}

export function logout() {
  // return request({
  //   url: '/login/logout',
  //   method: 'post'
  // })
  return Promise.resolve()
}

export function getUserInfo(token) {
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
  let data = {
      roles: ['admin'],
      token: 'admin',
      introduction: '我是超级管理员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: '超级管理员',
      monitor: true,
    }
  return Promise.resolve({data: data})
}

