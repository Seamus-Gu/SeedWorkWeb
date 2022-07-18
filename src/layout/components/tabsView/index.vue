<template>
  <div></div>
  <!-- <el-dropdown :trigger="['contextmenu']">
    <div class="tabs-view">
      <Panel>
        <el-tabs
          type="editable-card"
          :hideAdd="true"
          :tabBarGutter="5"
          v-model:activeKey="tabActive"
          @tabClick="handleTabClick"
          @edit="handleTabRemove"
        >
          <el-tab-pane
            v-for="item in visitedViews"
            :key="item.path"
            :tab="item.meta.title"
            :closable="!item.meta.affix"
          >
          </el-tab-pane>
        </el-tabs>
      </Panel>
    </div>
    <template #overlay>
      <el-menu>
        <el-menu-item key="1" @click="handleTabRemove(tabActive)">
          <svg class="icon" ariel-hidden="true" font-size="15px">
            <use xlink:href="#icon-close" />
          </svg>
          关闭当前
        </el-menu-item>
        <el-menu-item key="2" @click="closeOtherTab">
          <svg class="icon" ariel-hidden="true" font-size="15px">
            <use xlink:href="#icon-close-circle" />
          </svg>
          关闭其他
        </el-menu-item>
        <el-menu-item key="3" @click="closeAllTab">
          <svg class="icon" ariel-hidden="true" font-size="15px">
            <use xlink:href="#icon-close-circle" />
          </svg>
          全部关闭
        </el-menu-item>
      </el-menu>
    </template>
  </el-dropdown> -->
</template>
<script>
import { Panel } from '@/components'
export default defineComponent({
  components: { Panel },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const routes = computed(() => store.state.permission.routes)
    const visitedViews = computed(() => store.state.tagsView.visitedViews)

    const tabActive = ref()

    const methods = reactive({
      addTabs: route => {
        const { name, children, path } = route
        if (name && !children) {
          store.dispatch('tagsView/addView', route)
        }
        store.dispatch('app/setRoutePath', path)
        tabActive.value = path
      },
      initTags: routes => {
        routes.forEach(route => {
          if (route.meta && route.meta.affix) {
            methods.addTabs(route)
          }
          if (route.children) {
            methods.initTags(route.children)
          }
        })
      },
      handleTabClick: path => {
        router.push({ path: path })
      },
      handleTabRemove: path => {
        const view = visitedViews.value.find(
          item => item.path === path && item.meta.affix != true
        )
        store.dispatch('tagsView/delView', view)
        if (tabActive.value === path) {
          methods.toLastTab()
        }
      },
      toLastTab: () => {
        const latestView = visitedViews.value.slice(-1)[0]
        router.push({ path: latestView.path })
      },
      closeOtherTab: () => {
        store.dispatch('tagsView/delOthersViews', route)
      },
      closeAllTab: () => {
        store.dispatch('tagsView/delAllViews', route)
        methods.toLastTab()
      }
    })

    onMounted(() => {
      methods.initTags(routes.value)
      methods.addTabs(route)
    })

    watch(route, () => {
      methods.addTabs(route)
    })

    return {
      tabActive,
      visitedViews,
      ...toRefs(methods)
    }
  }
})
</script>
