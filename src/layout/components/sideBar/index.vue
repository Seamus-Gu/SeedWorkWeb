<!--
 * @Description: 侧边栏
 * @Autor: Gu
 * @Date: 2021-12-22 13:35:10
-->

<template>
  <a-layout-sider
    v-if="size != 'small' && showSiderBar"
    class="layout-sider"
    width="210"
    :collapsed="isCollapse"
    :trigger="null"
    collapsedWidth="60"
  >
    <SideBarLogo
      v-if="layout == 'LRLayout'"
      :collapse="isCollapse"
    ></SideBarLogo>
    <a-menu
      :theme="theme != 'deepBlack' ? theme : 'light'"
      class="side-menu"
      mode="inline"
      :forceSubMenuRender="true"
      :selectedKeys="[routePath]"
      v-model:openKeys="openMenu"
      @click="routerPush"
    >
      <MenuItem
        v-for="(route, index) in sideBarRouters"
        :key="route.path + index"
        :item="route"
      >
      </MenuItem>
    </a-menu>
  </a-layout-sider>
  <a-drawer
    v-else-if="showSiderBar"
    class="layout-sider-small"
    :visible="!isCollapse"
    placement="left"
    :closable="true"
    :contentWrapperStyle="{ width: '256px' }"
    @close="closeSideBar"
  >
    <template #title>
      <SideBarLogo :collapse="isCollapse"></SideBarLogo>
    </template>
    <a-menu
      class="side-menu"
      mode="inline"
      forceSubMenuRender="true"
      :selectedKeys="[routePath]"
      v-model:openKeys="openMenu"
      @click="routerPush"
    >
      <MenuItem
        v-for="(route, index) in sideBarRouters"
        :key="route.path + index"
        :item="route"
      >
      </MenuItem>
    </a-menu>
  </a-drawer>
</template>
<script>
import SideBarLogo from './SideBarLogo.vue'
import MenuItem from './MenuItem.vue'

export default defineComponent({
  components: {
    SideBarLogo,
    MenuItem
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const layout = computed(() => store.state.settings.layout)
    const sideBarRouters = computed(() => store.state.permission.sideBarRouters)
    const sideMenus = computed(() => store.getters.sideMenus)
    const showSiderBar = computed(() => store.state.settings.showSideBar)
    const theme = computed(() => store.state.settings.theme)

    const sideBarData = reactive({
      isCollapse: computed(() => !store.state.app.sidebarOpened),
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
      showSiderBar,
      theme,
      ...toRefs(sideBarData),
      ...toRefs(methods)
    }
  }
})
</script>
