<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-02 22:08:18
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-18 15:39:13
 * @Description: App.vue
-->
<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { useWindowSize } from '@vueuse/core'

export default {
  setup() {
    const store = useStore()
    const { width } = useWindowSize()

    watchEffect(() => {
      if (width.value > 992) {
        store.dispatch('app/setSize', 'large')
        store.dispatch('app/openSideBar')
      } else if (width.value < 592) {
        store.dispatch('app/setSize', 'small')
        store.dispatch('app/closeSideBar')
      } else {
        store.dispatch('app/setSize', 'middle')
        store.dispatch('app/closeSideBar')
      }
    })

    return {
      locale: zhCn
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>
