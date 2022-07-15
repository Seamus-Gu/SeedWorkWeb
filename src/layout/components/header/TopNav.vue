<!--
 * @Description:nav导航栏
 * @Autor: Gu
 * @Date: 2021-12-29 10:42:30
-->
<template>
  <div class="top-nav">
    <a-menu
      :theme="theme != 'deepBlack' ? theme : 'light'"
      style="margin-left: 12px"
      mode="horizontal"
      @click="routerPush"
    >
      <MenuItem
        v-for="(route, index) in headerRouters"
        :item="route"
        :key="index"
      >
      </MenuItem>
    </a-menu>
  </div>
</template>
<script>
import MenuItem from '@/layout/components/sideBar/MenuItem.vue'
import lodash from 'lodash'

export default defineComponent({
  components: { MenuItem, Icon },
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
})
</script>
