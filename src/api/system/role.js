import request from '@/utils/request'
const baseUrl = '/system/role'

// 获取角色列表
export function getRoleList(query) {
  return request({
    url: baseUrl + '/list',
    method: 'get',
    params: query
  })
}

// 根据id获取用户信息
export function getRoleById(id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'get'
  })
}

// 添加角色列表
export function addRole(data) {
  return request({
    url: baseUrl,
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: baseUrl,
    method: 'put',
    data: data
  })
}

// 删除角色列表
export function delRole(data) {
  return request({
    url: baseUrl + '/' + data,
    method: 'delete'
  })
}

// 下载导入用户模板
export function importTemplate() {
  return request({
    url: baseUrl + '/importTemplate',
    method: 'post',
    responseType: 'arraybuffer'
  })
}

// 导出用户列表
export function exportRoleList() {
  return request({
    url: baseUrl + '/export',
    method: 'post',
    responseType: 'arraybuffer'
  })
}
