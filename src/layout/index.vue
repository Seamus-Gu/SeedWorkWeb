<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2021-12-22 12:45:05
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-25 14:45:17
 * @Description: Layout布局
-->

<template>
  <a-layout class="layout-wrapper">
    <template v-if="layout == 'TLayout'">
      <Header style="z-index: 999"></Header>
      <a-layout class="layout-container">
        <Sidebar></Sidebar>
        <AppMain></AppMain>
      </a-layout>
    </template>
    <template v-else>
      <Sidebar v-if="layout == 'LRLayout'" style="z-index: 999"></Sidebar>
      <a-layout class="layout-container">
        <Header></Header>
        <AppMain></AppMain>
      </a-layout>
    </template>
  </a-layout>
</template>
<script>
import { Sidebar, Header, AppMain } from './components'
import { getSettings } from '@/utils/local-storage'
import { setTheme, setThemeColor } from '@/utils/theme'

export default defineComponent({
  components: {
    Sidebar,
    Header,
    AppMain
  },
  setup() {
    const store = useStore()
    const layout = computed(() => store.state.settings.layout)
    const theme = computed(() => store.state.settings.theme)
    const themeColor = computed(() => store.state.settings.themeColor)
    const setting = JSON.parse(getSettings())

    const methods = reactive({
      initSetting: async () => {
        await store.dispatch('settings/initSetting', setting ? setting : {})
        setTheme(theme.value, layout.value)
        setThemeColor(theme.value, themeColor.value)
      }
    })

    if (setting) {
      methods.initSetting()
    }

    return {
      layout
    }
  }
})
</script>
<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  height: 100vh;
  overflow: hidden;
  .layout-container {
    overflow: auto;
    overflow-y: auto;
  }
}
</style>
