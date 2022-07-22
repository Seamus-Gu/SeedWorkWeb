/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-04-28 20:43:53
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-25 14:46:03
 * @Description: SettingStore
 */

import { getTableSize, setTableSize } from '@/utils/local-storage'

const state = {
  visible: false,
  layout: 'LRLayout'
  // theme: 'light',
  // themeColor: '#1890FF',
  // showTabView: true,
  // showSideBar: true,
  // affixHeader: true,
  // searchSwitch: true,
  // themeSwitch: true,
  // messageSwitch: true,
  // screenFullSwitch: true,
  // tableSize: getTableSize() ? getTableSize() : 'default'
}

const mutations = {
  SET_VISIBLE: (state, visible) => {
    state.visible = visible
  },
  INIT_SETTING: (state, settings) => {
    state.layout = settings.layout ? settings.layout : 'LRLayout'
    state.theme = settings.theme ? settings.theme : 'light'
    state.themeColor = settings.themeColor ? settings.themeColor : '#1890FF'
    state.showTabView = settings.showTabView
      ? settings.showTabView
      : state.showTabView
    state.showSideBar = settings.showSideBar
      ? settings.showSideBar
      : state.showSideBar
    state.affixHeader = settings.affixHeader
      ? settings.affixHeader
      : state.affixHeader
    state.searchSwitch = settings.searchSwitch
      ? settings.searchSwitch
      : state.searchSwitch
    state.themeSwitch = settings.themeSwitch
      ? settings.themeSwitch
      : state.themeSwitch
    state.messageSwitch = settings.messageSwitch
      ? settings.messageSwitch
      : state.messageSwitch
    state.screenFullSwitch = settings.screenFullSwitch
      ? settings.screenFullSwitch
      : state.screenFullSwitch
  },
  SET_LAYOUT: (state, layout) => {
    state.layout = layout
  },
  SET_THEME: (state, theme) => {
    state.theme = theme
  },
  SET_THEME_COLOR: (state, themeColor) => {
    state.themeColor = themeColor
  },
  TOGGLE_TAB_VIEW: state => {
    state.showTabView = !state.showTabView
  },
  TOGGLE_SIDE_BAR: state => {
    state.showSideBar = !state.showSideBar
  },
  SHOW_SIDE_BAR: state => {
    state.showSideBar = true
  },
  CLOSE_SIDE_BAR: state => {
    state.showSideBar = false
  },
  TOGGLE_AFFIX_HEADER: state => {
    state.affixHeader = !state.affixHeader
  },
  TOGGLE_SEARCH_SWITCH: state => {
    state.searchSwitch = !state.searchSwitch
  },
  TOGGLE_THEME_SWITCH: state => {
    state.themeSwitch = !state.themeSwitch
  },
  TOGGLE_MESSAGE_SWITCH: state => {
    state.messageSwitch = !state.messageSwitch
  },
  TOGGLE_SCREEN_FULL_SWITCH: state => {
    state.screenFullSwitch = !state.screenFullSwitch
  },
  SET_TABLE_SIZE: (state, tableSize) => {
    state.tableSize = tableSize
    setTableSize(tableSize)
  }
}

const actions = {
  setVisible({ commit }, visible) {
    commit('SET_VISIBLE', visible)
  },
  initSetting({ commit }, settings) {
    commit('INIT_SETTING', settings)
  },
  setLayout({ commit }, layout) {
    commit('SET_LAYOUT', layout)
  },
  setTheme({ commit }, theme) {
    commit('SET_THEME', theme)
  },
  setThemeColor({ commit }, themeColor) {
    commit('SET_THEME_COLOR', themeColor)
  },
  setTableSize({ commit }, tableSize) {
    commit('SET_TABLE_SIZE', tableSize)
  },
  toggleTabView({ commit }) {
    commit('TOGGLE_TAB_VIEW')
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDE_BAR')
  },
  showSideBar({ commit }) {
    commit('SHOW_SIDE_BAR')
  },
  closeSideBar({ commit }) {
    commit('CLOSE_SIDE_BAR')
  },
  toggleAffixHeader({ commit }) {
    commit('TOGGLE_AFFIX_HEADER')
  },
  toggleSearchSwitch({ commit }) {
    commit('TOGGLE_SEARCH_SWITCH')
  },
  toggleThemeSwitch({ commit }) {
    commit('TOGGLE_THEME_SWITCH')
  },
  toggleMessageSwitch({ commit }) {
    commit('TOGGLE_MESSAGE_SWITCH')
  },
  toggleScreenFullSwitch({ commit }) {
    commit('TOGGLE_SCREEN_FULL_SWITCH')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
