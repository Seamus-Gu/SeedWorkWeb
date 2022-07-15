/*
 * @Description: 用户模拟数据
 * @Autor: Gu
 * @Date: 2022-01-13 09:30:50
 */

const mockjs = require('mockjs')
const userList = mockjs.mock({
  'items|30': [
    {
      userName: '@first()',
      nickName: '@cname()',
      'sex|1': ['男', '女'],
      id: '@ID',
      tags: ['nice', 'developer'],
      'enable|1': [0, 1],
      phoneNumber: '@integer(10000000000,19999999999)'
    }
  ],
  total: 20
})

const userMockList = [
  {
    url: '/api/system/user/getInfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: {
          permission: ['*:*:*'],
          roles: ['admin'],
          user: {
            avatar: '',
            userName: 'admin',
            nickName: '管理员'
          }
        }
      }
    }
  },
  {
    url: '/api/system/user/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: userList
      }
    }
  }
]

export default userMockList
