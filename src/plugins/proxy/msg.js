/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-04-20 21:13:40
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:30:39
 * @Description:弹出消息
 */

import { message } from 'ant-design-vue'

export default {
  info: content => {
    message.info(content)
  },
  error: content => {
    message.error(content)
  },
  success: content => {
    message.success(content)
  },
  warning: content => {
    message.warning(content)
  },
  asyncInfo(data) {
    message
      .loading(data.lTitle || '正在处理中', data.lTime || 2.5)
      .then(() => message.info(data.content, 2.5))
  },
  asyncError(data) {
    message
      .loading(data.lTitle || '正在处理中', data.lTime || 2.5)
      .then(() => message.info(data.content, 2.5))
  },
  asyncSuccess(data) {
    message
      .loading(data.lTitle || '正在处理中', data.lTime || 2.5)
      .then(() => message.info(data.content, 2.5))
  },
  asyncWarning(data) {
    message
      .loading(data.lTitle || '正在处理中', data.lTime || 2.5)
      .then(() => message.info(data.content, 2.5))
  }
}
