/*
 * @Description: 用户模拟数据
 * @Autor: Gu
 * @Date: 2022-01-13 09:30:50
 */

const authMockList = [
  {
    url: '/api/auth/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: {
          access_token:
            'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6ImZhOWZjMDU1LTI0OWEtNDVjOS04ZmY3LWE5ZGFjNzgzMjk3NCIsInVzZXJuYW1lIjoiYWRtaW4ifQ.pIVjjr1-SzyOaQyoLUZBsRloXrEuV5c0rrVVk8JnyJ9IKg29Mzj7_9JHHv6niPpWZzioDCYU5qKjUhGxywZ0qg'
        }
      }
    }
  },
  {
    url: '/api/auth/logout',
    method: 'delete',
    response: () => {
      return {
        code: 200,
        message: 'success'
      }
    }
  }
]

export default authMockList
