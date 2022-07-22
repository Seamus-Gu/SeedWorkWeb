<!--
 * @Description:nav导航栏
 * @Autor: Gu
 * @Date: 2021-12-29 10:42:30
-->
<template>
  <div class="top-nav">
    <el-menu
      :theme="theme != 'deepBlack' ? theme : 'light'"
      mode="horizontal"
      @click="routerPush"
    >
      <SubMenu
        v-for="(route, index) in headerRouters"
        :item="route"
        :key="index"
      >
      </SubMenu>
    </el-menu>
  </div>
</template>
<script>
import SubMenu from '@/layout/components/sideBar/SubMenu.vue'
import lodash from 'lodash'

export default {
  components: { SubMenu },
  setup() {
    const store = useStore()
    const router = useRouter()

    const routes = store.getters.routes
    const headerRouters = computed(() => store.getters.headerRoutes)
    const layout = computed(() => store.state.settings.layout)
    const theme = computed(() => store.state.settings.theme)

    const methods = reactive({
      routerPush(e) {
        if (layout.value == 'UDLayout') {
          router.push({ path: e.key })
        } else {
          var routesData = lodash.cloneDeep(routes)
          var headerRouters = routesData.filter(t => t.path == e.key)
          store.dispatch('setSiderBarRoutes', headerRouters[0].children)
        }
      }
    })

    return {
      theme,
      headerRouters,
      ...toRefs(methods)
    }
  }
}
</script>
