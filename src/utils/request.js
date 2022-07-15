/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-04 12:58:46
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:23:50
 * @Description: axios对象 相应拦截器 请求拦截器
 */
import axios from 'axios'
import { getToken } from '@/utils/session-storage'
import errorCode from '@/utils/error-code'
import { tansParams } from '@/utils/tools'
import { ElMessage } from 'element-plus'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000,
  //请求头
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// request拦截器
service.interceptors.request.use(
  config => {
    const { headers, method, params } = config
    headers['Authorization'] = getToken()

    if (method === 'get' && params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { data, config, request } = response
    const { code, msg } = data

    if (
      request.responseType === 'blob' ||
      request.responseType === 'arraybuffer'
    ) {
      return data
    }

    if (code == 200) {
      config.method != 'get' &&
        !config.headers.HideMsg &&
        ElMessage.success(msg)
      return data
    } else {
      ElMessage.error(msg || errorCode[code])
      return Promise.reject(response)
    }
  },
  error => {
    const { response } = error
    const { status } = response
    ElMessage.error(errorCode[status])
    return Promise.reject(error)
  }
)

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: 'get',
      params: params
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post(
  url,
  params = {},
  headers = { 'Content-Type': 'application/json' }
) {
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: 'post',
      data: params,
      headers: headers
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default service
