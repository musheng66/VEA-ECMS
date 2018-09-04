import request from '@/utils/request'
import requestLocal from '@/utils/requestLocal'
import LoginMock from '@/mock/login'
import _Vue from 'vue'

export function loginByUsername(username, password) {
  const data = {
    username: username,
    password: password
  }
  if (_Vue.API_REMOTE) {
    return request({
      url: '/login/login',
      method: 'post',
      data
    })
  } else {
    return requestLocal(LoginMock.loginByUsername({body: data}))
  }
}

export function logout() {
  if (_Vue.API_REMOTE) {
    return request({
      url: '/login/logout',
      method: 'post'
    })
  } else {
    return requestLocal(LoginMock.logout())
  }
}

export function getUserInfo(token) {
  if (_Vue.API_REMOTE) {
    return request({
      url: '/user/info',
      method: 'get',
      params: {token}
    })
  } else {
    return requestLocal(LoginMock.getUserInfo({url: '/user/info?token=' + token}))
  }
}

