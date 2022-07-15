/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-06 20:38:21
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 21:47:52
 * @Description:
 */

import request from '@/utils/request'
const baseUrl = '/system/dictionary'

/**
 * @description:获取字典树
 * @param {*} query
 * @return {*}
 */
export function getTypeTree(query) {
  return request({
    url: baseUrl + '/getTypeTree',
    method: 'get',
    params: query
  })
}

/**
 * @description: 获取字典类
 * @param {*} typeId
 * @return {*}
 */
export function getType(typeId) {
  return request({
    url: baseUrl + '/getType/' + typeId,
    method: 'get'
  })
}

// 新增字典类
export function addType(data) {
  return request({
    url: baseUrl + '/addType',
    method: 'post',
    data: data
  })
}

// 修改字典类
export function editType(data) {
  return request({
    url: baseUrl + '/editType',
    method: 'put',
    data: data
  })
}

// 删除字典类
export function delType(typeId) {
  return request({
    url: baseUrl + '/delType/' + typeId,
    method: 'delete'
  })
}

// 获取字典项列表
export function getItemList(query) {
  return request({
    url: baseUrl + '/getItemList',
    method: 'get',
    params: query
  })
}

// 获取字典项
export function getItemById(itemId) {
  return request({
    url: baseUrl + '/getItemById/' + itemId,
    method: 'get'
  })
}

// 新增字典类
export function addItem(data) {
  return request({
    url: baseUrl + '/addItem',
    method: 'post',
    data: data
  })
}

// 修改字典类
export function editItem(data) {
  return request({
    url: baseUrl + '/editItem',
    method: 'put',
    data: data
  })
}

// 删除字典类
export function delItem(itemId) {
  return request({
    url: baseUrl + '/delItem/' + itemId,
    method: 'delete'
  })
}
