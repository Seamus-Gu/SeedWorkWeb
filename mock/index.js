/*
 * @Description:
 * @Autor: Gu
 * @Date: 2022-01-12 15:31:41
 */
import authModules from './modules/system/auth'
import menuModules from './modules/system/menu'
import userModules from './modules/system/user'
import deptModules from './modules/system/dept'

export default [...userModules, ...menuModules, ...authModules, ...deptModules]
