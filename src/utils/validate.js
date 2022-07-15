/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-10 13:49:03
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:25:19
 * @Description:校验工具类
 */

/**
 * @description: 判断url是否是http或https
 * @param {*} url
 * @return {*}
 */
export function isHttp(url) {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
}
