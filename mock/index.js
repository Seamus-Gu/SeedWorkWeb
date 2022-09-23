/*
 * @Description:
 * @Autor: Gu
 * @Date: 2022-01-12 15:31:41
 */
import authModules from './modules/auth'
import menuModules from './modules/menu'
import userModules from './modules/user'
import deptModules from './modules/dept'

export default [...userModules, ...menuModules, ...authModules, ...deptModules]
