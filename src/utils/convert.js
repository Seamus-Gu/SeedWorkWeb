/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-04-06 10:11:02
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:22:39
 * @Description: 转换格式工具类
 */
export function getSortBy(sorter) {
  let sortBy = null
  if (sorter && sorter.order != null) {
    switch (sorter.order) {
      case 'ascend':
        sortBy = 'asc("' + sorter.field + '")'
        break
      case 'descend':
        sortBy = 'desc("' + sorter.field + '")'
        break
    }
  }
  return sortBy
}

export function getFilter(filterData, sqlWay) {
  var filter = null
  switch (sqlWay) {
    case 'like':
      filter = { like: filterData }
      break
    case 'eq':
      filter = { eq: filterData }
      break
    case 'in':
      filter = { in: filterData.toString() }
      break
  }

  return filter
}
