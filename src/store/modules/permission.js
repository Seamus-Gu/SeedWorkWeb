/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-04 10:52:00
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-17 15:52:52
 * @Description: PermissionStore
 */

import { constantRoutes } from '@/router'
import { getRouters } from '@/api/system/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/parentView'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const state = {
  routes: [],
  addRoutes: [],
  sideBarRouters: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_SIDE_BAR_ROUTERS: (state, routes) => {
    state.sideBarRouters = routes
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      // 向后端请求路由数据
      getRouters().then(res => {
        const dData = JSON.parse(JSON.stringify(res.data))
        const sData = JSON.parse(JSON.stringify(res.data))
        const routes = filterAsyncRouter(dData)
        const sidebarRoutes = filterAsyncRouter(sData)
        commit('SET_ROUTES', routes)
        commit('SET_SIDE_BAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
        resolve(routes)
      })
    })
  },
  setSiderBarRoutes({ commit }, routes) {
    commit('SET_SIDE_BAR_ROUTERS', routes)
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
const filterAsyncRouter = asyncRouterMap => {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      switch (route.component) {
        case 'Layout':
          route.component = Layout
          break
        case 'ParentView':
          route.component = ParentView
          break
        default:
          route.component = loadView(route.component)
      }
    }
    if (route.children) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

const loadView = view => {
  let result
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      result = () => modules[path]()
    }
  }
  return result
}

export default {
  state,
  mutations,
  actions
}
