/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-04 10:52:00
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:29:24
 * @Description: AppStore
 */

const state = {
  sidebarOpened: true,
  size: 'large',
  routePath: '/index'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebarOpened = !state.sidebarOpened
  },
  OPEN_SIDEBAR: state => {
    state.sidebarOpened = true
  },
  CLOSE_SIDEBAR: state => {
    state.sidebarOpened = false
  },
  SET_SIZE: (state, size) => {
    state.size = size
  },
  SET_ROUTE_PATH: (state, routePath) => {
    state.routePath = routePath
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  openSideBar({ commit }) {
    commit('OPEN_SIDEBAR')
  },
  closeSideBar({ commit }) {
    commit('CLOSE_SIDEBAR')
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setRoutePath({ commit }, routePath) {
    commit('SET_ROUTE_PATH', routePath)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
