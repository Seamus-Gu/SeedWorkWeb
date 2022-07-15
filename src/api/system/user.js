/*
 * @Description: 用户Api
 * @Author: Gu
 * @Date: 2022-01-13 15:33:00
 * @LastEditTime: 2022-06-27 16:06:30
 */

import request from '@/utils/request'
const baseUrl = '/system/user'

// 获取用户详细信息
export function getInfo() {
  return request({
    url: baseUrl + '/getInfo',
    method: 'get'
  })
}

// 获取用户列表
export function getUserList(query) {
  return request({
    url: baseUrl + '/list',
    method: 'get',
    params: query
  })
}

// 根据id获取用户信息
export function getUser(userId) {
  return request({
    url: baseUrl + '/' + userId,
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: baseUrl,
    method: 'post',
    data: data
  })
}

// 修改用户
export function editUser(data) {
  return request({
    url: baseUrl,
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
}

//重置密码
export function resetPwd(data) {
  return request({
    url: baseUrl + '/resetPwd',
    method: 'put',
    data: data
  })
}

// 导出用户列表
export function exportUserList() {
  return request({
    url: baseUrl + '/export',
    method: 'post',
    responseType: 'arraybuffer'
  })
}

// 获取用户个人信息
export function getProfile() {
  return request({
    url: baseUrl + '/getProfile',
    method: 'get'
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: baseUrl + '/updateAvatar',
    method: 'post',
    data: data
  })
}
