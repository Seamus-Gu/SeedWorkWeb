<!--
 * @Description: 侧边栏
 * @Autor: Gu
 * @Date: 2021-12-22 13:35:10
-->

<template>
  <div v-if="size != 'small'" class="layout-sider">
    <SideBarLogo
      v-if="layout == 'LRLayout'"
      :collapse="isCollapse"
    ></SideBarLogo>
    <el-scrollbar>
      <el-menu
        class="side-menu"
        :collapse="isCollapse"
        :default-active="routePath"
      >
        <SubMenu
          v-for="(route, index) in sideBarRouters"
          :key="route.path + index"
          :data="route"
        >
        </SubMenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import SideBarLogo from './SideBarLogo.vue'
import SubMenu from './SubMenu.vue'

export default defineComponent({
  components: {
    SideBarLogo,
    SubMenu
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const layout = computed(() => store.state.settings.layout)
    const sideBarRouters = computed(() => store.state.permission.sideBarRouters)

    const sideBarData = reactive({
      size: computed(() => store.state.app.size),
      isCollapse: computed(() => !store.state.app.sidebarOpened),
      sideBarWidth: computed(() => store.state.app.sideBarWidth),
      routePath: computed(() => store.state.app.routePath)
    })

    const methods = reactive({
      initMenu: () => {
        store.dispatch(
          'app/setOpenMenu',
          route.matched.filter(t => t.path).map(t => t.path)
        )
      }
    })

    !sideBarData.isCollapse && methods.initMenu()

    return {
      layout,
      sideBarRouters,
      ...toRefs(sideBarData),
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="scss" scoped></style>
