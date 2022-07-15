/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-04 09:26:26
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:30:03
 * @Description: 引入插件
 */

export function loadAllPlugins(app) {
  const files = import.meta.globEager('./modules/*.js')

  Object.keys(files).forEach(item => {
    files[item].default(app)
  })
}

import modal from './proxy/modal'
import msg from './proxy/msg'
import notify from './proxy/notify'

export function loadAllProxy(app) {
  app.config.globalProperties.$modal = modal
  app.config.globalProperties.$msg = msg
  app.config.globalProperties.$notify = notify
}

import has from './directive/v-has'

export function loadAllDirective(app) {
  app.directive('has', has)
}
