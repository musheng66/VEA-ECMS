/*
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
*/
/**
 * 改用session存放登录信息，关闭浏览器则退出系统
 */
const TokenKey = 'Token';
const RoleKey = 'Roles';
const LoginTimeKey = 'Login-Time';
const NameKey = 'Name';

// token
export function getToken() {
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}

// roles
export function getRoles() {
  return sessionStorage.getItem(RoleKey);
}

export function setRoles(roles) {
  return sessionStorage.setItem(RoleKey, roles);
}

export function removeRoles() {
  return sessionStorage.removeItem(RoleKey);
}

// login time
export function getLoginTime() {
  return sessionStorage.getItem(LoginTimeKey);
}

export function setLoginTime(time) {
  return sessionStorage.setItem(LoginTimeKey, time);
}

export function removeLoginTime() {
  return sessionStorage.removeItem(LoginTimeKey);
}

// name
export function getName() {
  return sessionStorage.getItem(NameKey);
}

export function setName(name) {
  return sessionStorage.setItem(NameKey, name);
}

export function removeName() {
  return sessionStorage.removeItem(NameKey);
}
