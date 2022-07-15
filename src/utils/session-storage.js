/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-04 12:38:40
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:24:19
 * @Description: SessionStorage
 */

export function getToken() {
  return sessionStorage.getItem('Token')
}

export function setToken(token) {
  return sessionStorage.setItem('Token', token)
}

export function removeToken() {
  return sessionStorage.removeItem('Token')
}
