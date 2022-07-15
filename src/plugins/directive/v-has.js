/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-04-06 10:13:19
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:31:59
 * @Description: V-Has 角色菜单权限配置
 */
import store from '@/store'

export default {
  mounted(el, binding, vnode) {
    const { value } = binding
    const all_permission = '*:*:*'
    const permissions = store.getters && store.getters.permissions

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value
      const hasPermissions = permissions.some(permission => {
        return (
          all_permission === permission || permissionFlag.includes(permission)
        )
      })

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
