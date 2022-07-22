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
        :defaultActive="activePath"
        :uniqueOpened="true"
      >
        <SubMenu
          v-for="(route, index) in siderRoutes"
          :key="route.path + index"
          :data="route"
        >
        </SubMenu>
      </el-menu>
    </el-scrollbar>
  </div>
  <el-drawer
    v-else
    :modelValue="!isCollapse"
    modalClass="layout-sider-small"
    direction="ltr"
    :showClose="false"
    :size="210"
    @close="closeSideBar"
  >
    <template #header>
      <SideBarLogo :collapse="isCollapse"></SideBarLogo>
    </template>
    <el-scrollbar>
      <el-menu
        class="side-small-menu"
        :collapse="isCollapse"
        :defaultActive="activePath"
        :uniqueOpened="true"
      >
        <SubMenu
          v-for="(route, index) in siderRoutes"
          :key="route.path + index"
          :data="route"
        >
        </SubMenu>
      </el-menu>
    </el-scrollbar>
  </el-drawer>
</template>
<script>
import SideBarLogo from './SideBarLogo.vue'
import SubMenu from './SubMenu.vue'

export default {
  components: {
    SideBarLogo,
    SubMenu
  },
  setup() {
    const store = useStore()

    const layout = computed(() => store.state.settings.layout)
    const siderRoutes = computed(() => store.getters.siderRoutes)
    const sideBarData = reactive({
      size: computed(() => store.state.app.size),
      isCollapse: computed(() => !store.state.app.sidebarOpened),
      activePath: computed(() => store.state.app.routePath)
    })

    const methods = reactive({
      closeSideBar: () => {
        store.dispatch('app/closeSideBar')
      }
    })

    return {
      layout,
      siderRoutes,
      ...toRefs(sideBarData),
      ...toRefs(methods)
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-sider {
  box-shadow: var(--el-box-shadow);
  height: 100%;
  .layout-title {
    height: 80px;
    box-shadow: $shadow_1;
    transition: width 0.4s;
    width: 210px;
    &-collapse {
      width: 64px;
    }
    margin-bottom: 8px;
  }

  .el-menu:not(.el-menu--collapse) {
    width: 210px;
  }
}
</style>
