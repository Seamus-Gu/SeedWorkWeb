/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-04 10:52:01
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:27:49
 * @Description: Vuex
 */

import { createStore } from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tabs-view'
import permission from './modules/permission'
import settings from './modules/settings'
import getters from './getters'

const store = createStore({
  modules: {
    app,
    user,
    tagsView,
    permission,
    settings
  },
  getters
})

export default store
