<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2021-12-22 12:45:05
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-25 14:45:17
 * @Description: Layout布局
-->

<template>
  <el-container v-if="layout == 'LRLayout'" class="layout-wrapper">
    <SideBar></SideBar>
    <el-container direction="vertical" class="layout-container">
      <Header></Header>
      <AppMain></AppMain>
    </el-container>
  </el-container>

  <el-container
    v-else-if="layout == 'TLayout'"
    direction="vertical"
    class="layout-wrapper"
  >
    <template v-if="layout == 'TLayout'">
      <Header></Header>
      <el-container class="layout-container">
        <SideBar></SideBar>
        <AppMain></AppMain>
      </el-container>
    </template>
  </el-container>

  <el-container v-else class="layout-wrapper">
    <el-container direction="vertical" class="layout-container">
      <Header></Header>
      <AppMain></AppMain>
    </el-container>
  </el-container>

  <Setting></Setting>
</template>
<script>
import { SideBar, Header, AppMain, Setting } from './components'
import { getSettings } from '@/utils/local-storage'
import { initSetting, setThemeColor } from '@/utils/setting'

export default {
  components: {
    SideBar,
    Header,
    AppMain,
    Setting
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const layout = computed(() => store.state.settings.layout)
    const methods = reactive({
      init: async () => {
        let setting = JSON.parse(getSettings())
        setting = Object.assign({ layout: 'LRLayout', theme: 'light' }, setting)

        store.dispatch('app/setRoutePath', route.path)

        await store.dispatch('settings/initSetting', setting ? setting : {})
        initSetting(setting)
        // setThemeColor(theme.value, themeColor.value)
      }
    })

    methods.init()

    return {
      layout,
      ...toRefs(methods)
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-wrapper {
  height: 100vh;
  overflow: hidden;
}
</style>
