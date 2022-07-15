/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-01 19:58:12
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:31:28
 * @Description: VueCropper
 */

import VueCropper from 'vue-cropper'
import 'vue-cropper/dist/index.css'

export default function setupAntd(app) {
  app.use(VueCropper)
}
