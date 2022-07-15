/*
 * @Description:
 * @Autor: Gu
 * @Date: 2022-01-10 13:19:05
 */
import request from '@/utils/request'
const baseUrl = '/system/menu/'

// 获取路由
export const getRouters = () => {
  return request({
    url: baseUrl + 'getRouters',
    method: 'get'
  })
}

// 获取菜单树形列表
export function getMenuList(query) {
  return request({
    url: baseUrl + 'getTree',
    method: 'get',
    params: query
  })
}

// 根据id获取菜单信息
export function getMenuById(menuId) {
  return request({
    url: baseUrl + '/' + menuId,
    method: 'get'
  })
}

// 获取菜单树形列表
export function getMenuTreeSelect(query) {
  return request({
    url: baseUrl + 'treeselect',
    method: 'get',
    params: query
  })
}

// 添加组织
export function addMenu(data) {
  return request({
    url: baseUrl,
    method: 'post',
    data: data
  })
}
// 修改组织
export function editMenu(data) {
  return request({
    url: baseUrl,
    method: 'put',
    data: data
  })
}

// 删除组织
export function delMenu(id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
}

// 根据角色Id获取菜单列表
export function getRoleMenuList(roleId, menuCheck) {
  let data = { roleId: roleId }
  let params = {}
  params['checkStrictly'] = menuCheck
  data.params = params
  return request({
    url: baseUrl + 'roleMenuList',
    method: 'get',
    params: data
  })
}
