/*
 * @Description:
 * @Autor: Gu
 * @Date: 2022-01-04 10:54:17
 */
import request from '@/utils/request'
const baseUrl = '/auth/'

// 登录方法
export function login(username, password) {
  return request({
    url: baseUrl + 'login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: { username, password }
  })
}

// 注册方法
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

// 刷新方法
export function refreshToken() {
  return request({
    url: '/auth/refresh',
    method: 'post'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete'
  })
}
