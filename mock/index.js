/*
 * @Description:
 * @Autor: Gu
 * @Date: 2022-01-12 15:31:41
 */

// system
import authModules from './modules/system/auth'
import menuModules from './modules/system/menu'
import userModules from './modules/system/user'
import deptModules from './modules/system/dept'

// example
import dataShowModules from './modules/example/data-show'

export default [
  ...userModules,
  ...menuModules,
  ...authModules,
  ...deptModules,
  ...dataShowModules
]
