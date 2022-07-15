/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-10 13:08:37
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:28:18
 * @Description: UserStore
 */

import { login, logout } from '@/api/system/auth'
import { getInfo } from '@/api/system/user'
import { getToken, setToken, removeToken } from '@/utils/session-storage'

const state = {
  token: getToken(),
  roles: [],
  permissions: [],
  avatar: '',
  userName: '',
  nickName: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_NAME: (state, name) => {
    state.userName = name
  },
  SET_NICK_NAME: (state, name) => {
    state.nickName = name
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const username = userInfo.username.trim()
    const password = userInfo.password
    return new Promise((resolve, reject) => {
      login(username, password)
        .then(res => {
          let data = res.data
          setToken(data.access_token)
          commit('SET_TOKEN', data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(res => {
          const data = res.data
          const user = data.user
          const avatar = user.avatar

          if (data.roles && data.roles.length > 0) {
            // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
            commit('SET_PERMISSIONS', data.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_USER_NAME', user.username)
          commit('SET_NICK_NAME', user.nickName)
          commit('SET_AVATAR', avatar)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 退出系统
  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateAvatar({ commit }, avatar) {
    commit('SET_AVATAR', avatar)
  }
}
export default {
  state,
  mutations,
  actions
}
