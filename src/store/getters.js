/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-04-24 22:13:17
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-23 14:53:47
 * @Description: Vuex Getter
 */

import lodash from 'lodash'
const getters = {
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  routes: state => state.permission.routes,
  headerRoutes: state => {
    let data = lodash.cloneDeep(state.permission.routes)
    let layout = state.settings.layout
    if (layout == 'TLayout') {
      data = data.filter(t => {
        if (!t.hidden && !t.meta) {
          t.meta = t.children[0].meta
        }
        delete t.children
        return !t.hidden
      })
    } else {
      data = data.filter(t => {
        if (!t.hidden && !t.meta) {
          t.path = t.children[0].path
          t.meta = t.children[0].meta
          delete t.children
        }
        return !t.hidden
      })
    }
    return data
  },
  sideMenus: state => {
    const route = useRoute()
    let data = state.permission.routes
    let routesData = lodash.cloneDeep(data)
    const targetData = {}

    function loops(data = [], parent) {
      return data.map(({ children, path: value }) => {
        const node = {
          value,
          parent
        }
        targetData[value] = node
        node.children = loops(children, node)
        return
      })
    }

    function getMenuPath(value) {
      let path = null
      let currentNode = targetData[value]
      if (currentNode.parent) {
        path = getMenuPath(currentNode.parent.value)
      } else {
        path = currentNode.value
      }
      return path
    }

    loops(routesData)

    let headerRouters = routesData.filter(
      t => t.path == getMenuPath(route.path)
    )
    return headerRouters[0].children
  }
}
export default getters
