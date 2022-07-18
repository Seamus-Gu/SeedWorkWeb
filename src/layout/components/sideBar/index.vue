<!--
 * @Description: 侧边栏
 * @Autor: Gu
 * @Date: 2021-12-22 13:35:10
-->

<template>
  <el-aside v-if="size != 'small'" class="layout-sider" :width="sideBarWidth">
    <SideBarLogo
      v-if="layout == 'LRLayout'"
      :collapse="isCollapse"
    ></SideBarLogo>
    <el-menu class="side-menu" :collapse="isCollapse">
      <SubMenu
        v-for="(route, index) in sideBarRouters"
        :key="route.path + index"
        :data="route"
      >
      </SubMenu>
    </el-menu>
  </el-aside>
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
    const router = useRouter()
    const store = useStore()

    const layout = computed(() => store.state.settings.layout)
    const sideBarRouters = computed(() => store.state.permission.sideBarRouters)
    const sideMenus = computed(() => store.getters.sideMenus)
    const theme = computed(() => store.state.settings.theme)

    const sideBarData = reactive({
      isCollapse: computed(() => !store.state.app.sidebarOpened),
      sideBarWidth: computed(() => store.state.app.sideBarWidth),
      size: computed(() => store.state.app.size),
      routePath: computed(() => store.state.app.routePath),
      openMenu: computed({
        get: () => store.state.app.openMenu,
        set: openKeys => {
          store.dispatch('app/setOpenMenu', openKeys)
        }
      })
    })

    const methods = reactive({
      initMenu: () => {
        store.dispatch(
          'app/setOpenMenu',
          route.matched.filter(t => t.path).map(t => t.path)
        )
      },
      initSideBar: () => {
        store.dispatch('setSiderBarRoutes', sideMenus.value)
      },
      closeSideBar: () => {
        store.dispatch('app/closeSideBar')
      },
      routerPush(e) {
        router.push({ path: e.key })
        store.dispatch('app/setOpenMenu', e.keyPath)
        store.dispatch('app/setRoutePath', e.key)
      }
    })

    !sideBarData.isCollapse && methods.initMenu()

    if (layout.value == 'TLayout') {
      methods.initSideBar()
    }

    return {
      layout,
      sideBarRouters,
      theme,
      ...toRefs(sideBarData),
      ...toRefs(methods)
    }
  }
})
</script>
