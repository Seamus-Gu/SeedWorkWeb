/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-04 09:51:01
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:31:12
 * @Description: Ant-Design-Vue
 */

import Dropdown from 'ant-design-vue/lib/dropdown'
import 'ant-design-vue/lib/dropdown/style/index.css'

export default function setupAntd(app) {
  app.use(Dropdown)
}
