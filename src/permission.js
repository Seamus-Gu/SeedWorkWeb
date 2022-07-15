/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-06 14:45:02
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:16:54
 * @Description:权限分配
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/session-storage'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('getInfo')
          .then(() => {
            store.dispatch('generateRoutes').then(routes => {
              // 根据roles权限生成可访问的路由表
              routes.forEach(route => {
                router.addRoute(route) // 动态添加可访问路由表
              })
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
            })
          })
          .catch(err => {
            store.dispatch('LogOut').then(() => {
              next({ path: '/' })
            })
          })
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
