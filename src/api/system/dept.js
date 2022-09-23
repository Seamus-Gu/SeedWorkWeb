/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-25 14:41:42
 * @LastEditors: Gu a18602467506@163.com
 * @LastEditTime: 2022-06-27 15:37:50
 * @Description: file content
 */
import request from '@/utils/request'
const baseUrl = '/system/dept'

// 获取组织树
export function getdeptTree(query) {
  return request({
    url: baseUrl + '/tree',
    method: 'get',
    params: query
  })
}

// 获取组织下拉
export function getdeptTreeSelect(query) {
  return request({
    url: baseUrl + '/treeSelect',
    method: 'get',
    params: query
  })
}

// 获取组织信息
export function getdept(deptId) {
  return request({
    url: baseUrl + '/' + deptId,
    method: 'get'
  })
}

// 获取组织信息
export function getNextOrderNum() {
  return request({
    url: baseUrl + '/getNextOrderNum',
    method: 'get'
  })
}

// 添加组织
export function adddept(data) {
  return request({
    url: baseUrl,
    method: 'post',
    data: data
  })
}
// 修改组织
export function editdept(data) {
  return request({
    url: baseUrl,
    method: 'put',
    data: data
  })
}

// 删除组织
export function deldept(id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
}
