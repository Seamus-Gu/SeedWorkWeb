/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-04-06 10:13:19
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:32:24
 * @Description: 角色权限配置
 */

import store from '@/store'

export default {
  mounted(el, binding, vnode) {
    const { value } = binding
    const super_admin = 'admin'
    const roles = store.getters && store.getters.roles

    if (value && value instanceof Array && value.length > 0) {
      const roleFlag = value

      const hasRole = roles.some(role => {
        return super_admin === role || roleFlag.includes(role)
      })

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置角色权限标签值"`)
    }
  }
}
