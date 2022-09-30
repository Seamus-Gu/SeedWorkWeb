/*
 * @Description: 用户模拟数据
 * @Autor: Gu
 * @Date: 2022-01-13 09:30:50
 */

const mockjs = require('mockjs')
const tableList = mockjs.mock({
  'items|10': [
    {
      id: '@ID',
      column1: '@first()',
      column2: '@cname()',
      'column3|1': ['男', '女'],
      column4: '@ID',
      'column5|1': ['nice', 'developer'],
      'column6|1': [0, 1],
      'rate|0-5': 0,
      column9: mockjs.Random.image('60x60'),
      'column10|1': ['0', '1'],
      phoneNumber: '@integer(10000000000,19999999999)'
    }
  ],
  total: 20
})

const dataShowMockList = [
  {
    url: '/api/example/dataShow/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: tableList
      }
    }
  }
]

export default dataShowMockList
