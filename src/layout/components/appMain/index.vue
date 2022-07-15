<!--
 * @Description: 
 * @Autor: Gu
 * @Date: 2022-01-04 14:32:03
-->
<template>
  <a-layout-content
    class="layout-content"
    :style="{
      overflow: affixHeader ? 'auto' : '',
      marginTop: showTabView ? '8px' : '16px'
    }"
  >
    <router-view v-slot="{ Component }">
      <TabsView v-if="showTabView"></TabsView>
      <transition mode="out-in" name="fade-transform">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </a-layout-content>
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
