<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2021-12-22 12:45:05
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-25 14:45:17
 * @Description: Layout布局
-->

<template>
  <el-container class="layout-wrapper">
    <template v-if="layout == 'TLayout'">
      <Header></Header>
      <el-container class="layout-container">
        <Sidebar></Sidebar>
        <AppMain></AppMain>
      </el-container>
    </template>
    <template v-else>
      <Sidebar v-if="layout == 'LRLayout'"></Sidebar>
      <el-container direction="vertical" class="layout-container">
        <Header></Header>
        <AppMain></AppMain>
      </el-container>
    </template>
  </el-container>
</template>
<script>
import { Sidebar, Header, AppMain } from './components'
// import { getSettings } from '@/utils/local-storage'
// import { setTheme, setThemeColor } from '@/utils/theme'

export default defineComponent({
  components: {
    Sidebar,
    Header,
    AppMain
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const layout = computed(() => store.state.settings.layout)

    // const theme = computed(() => store.state.settings.theme)
    // const themeColor = computed(() => store.state.settings.themeColor)
    // const setting = JSON.parse(getSettings())

    const methods = reactive({
      init: () => {
        const { name, children, path } = route

        store.dispatch('app/setRoutePath', path)

        //  if (name && !children) {
        //   store.dispatch('tagsView/addView', route)
        // }
      },
      initSetting: async () => {
        // await store.dispatch('settings/initSetting', setting ? setting : {})
        // setTheme(theme.value, layout.value)
        // setThemeColor(theme.value, themeColor.value)
      }
    })

    methods.init()

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
