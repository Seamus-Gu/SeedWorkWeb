/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-04-28 20:43:53
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-20 08:59:22
 * @Description: LocalStorage
 */

export const getSettings = () => {
  return localStorage.getItem('setting')
}
export const setSettings = setting => {
  return localStorage.setItem('setting', setting)
}
export const removeSettings = () => {
  return localStorage.removeItem('setting')
}

export const getTableSize = () => {
  return localStorage.getItem('tableSize')
}
export const setTableSize = tableSize => {
  return localStorage.setItem('tableSize', tableSize)
}
export const removeTableSize = () => {
  return localStorage.removeItem('tableSize')
}
