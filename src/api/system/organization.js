/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-25 14:41:42
 * @LastEditors: Gu a18602467506@163.com
 * @LastEditTime: 2022-06-27 15:37:50
 * @Description: file content
 */
import request from '@/utils/request'
const baseUrl = '/system/organization'

// 获取组织树
export function getOrganizationTree(query) {
  return request({
    url: baseUrl + '/tree',
    method: 'get',
    params: query
  })
}

// 获取组织下拉
export function getOrganizationTreeSelect(query) {
  return request({
    url: baseUrl + '/treeSelect',
    method: 'get',
    params: query
  })
}

// 获取组织信息
export function getOrganization(organizationId) {
  return request({
    url: baseUrl + '/' + organizationId,
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
export function addOrganization(data) {
  return request({
    url: baseUrl,
    method: 'post',
    data: data
  })
}
// 修改组织
export function editOrganization(data) {
  return request({
    url: baseUrl,
    method: 'put',
    data: data
  })
}

// 删除组织
export function delOrganization(id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
}
