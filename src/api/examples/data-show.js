/*
 * @Description: 用户Api
 * @Author: Gu
 * @Date: 2022-01-13 15:33:00
 * @LastEditTime: 2022-06-27 16:06:30
 */

import request from '@/utils/request'
const baseUrl = '/example/dataShow'

// 获取列表
export function getList(query) {
  return request({
    url: baseUrl + '/list',
    method: 'get',
    params: query
  })
}
