/*
 * @Description: echarts 自适应问题
 * @Author: ZY
 * @Date: 2021-01-14 15:11:11
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-14 16:34:24
 */

import { ref } from 'vue'
export default function () {
  const chart = ref()

  const chartResizeHandler = () => {
    if (chart.value) {
      chart.value.resize()
    }
  }

  const initResizeEvent = () => {
    window.addEventListener('resize', chartResizeHandler)
  }

  const destroyResizeEvent = () => {
    window.removeEventListener('resize', chartResizeHandler)
  }

  const mounted = () => {
    initResizeEvent()
  }

  const beforeDestroy = () => {
    destroyResizeEvent()
  }

  const activated = () => {
    initResizeEvent()
  }

  const deactivated = () => {
    destroyResizeEvent()
  }

  return {
    chart,
    mounted,
    beforeDestroy,
    activated,
    deactivated
  }
}
