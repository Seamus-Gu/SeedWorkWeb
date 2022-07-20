<!--
 * @Description: 
 * @Autor: Gu
 * @Date: 2022-01-04 14:32:03
-->
<template>
  <el-main class="layout-content">
    <TabsView v-if="showTabView"></TabsView>
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script>
import TabsView from '../tabsView'
export default defineComponent({
  components: {
    TabsView
  },
  setup() {
    const store = useStore()
    const cachedViews = computed(() => store.state.tagsView.cachedViews)
    const affixHeader = computed(() => store.state.settings.affixHeader)
    const showTabView = computed(() => store.state.settings.showTabView)

    return {
      cachedViews,
      affixHeader,
      showTabView
    }
  }
})
</script>
<style lang="scss" scoped>
.layout-content {
  background-color: var(--el-fill-color);
}
</style>
