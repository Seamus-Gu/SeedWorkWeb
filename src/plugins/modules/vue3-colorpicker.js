/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-04-06 10:11:02
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:31:41
 * @Description: ColorPicker
 */

import Vue3ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

export default function setupColorPicker(app) {
  app.use(Vue3ColorPicker)
}
