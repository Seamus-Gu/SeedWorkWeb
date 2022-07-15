/*
 * @Description: 用户及登录
 * @Autor: Gu
 * @Date: 2022-01-13 15:33:00
 */

import request from '@/utils/request'
const baseUrl = '/auth/'

// 登录
export function login(username, password) {
  return request({
    url: baseUrl + 'login',
    method: 'post',
    headers: { HideMsg: true },
    data: { username, password }
  })
}

// 注册
export function register(data) {
  return request({
    url: '/auth/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 刷新
export function refreshToken() {
  return request({
    url: '/auth/refresh',
    method: 'post'
  })
}

// 退出
export function logout() {
  return request({
    url: '/auth/logout',
    headers: { HideMsg: true },
    method: 'delete'
  })
}
