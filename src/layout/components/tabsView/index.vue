<template>
  <div class="tabs-container">
    <a-dropdown class="tabs-dropdown" :trigger="['contextmenu']">
      <el-tabs
        type="card"
        v-model="tabActive"
        @tabClick="handleTabClick"
        @tabRemove="handleTabRemove"
      >
        <el-tab-pane
          v-for="item in visitedViews"
          :key="item.path"
          :name="item.path"
          :label="item.meta.title"
          :closable="!item.meta.affix"
        >
        </el-tab-pane>
      </el-tabs>
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
    </a-dropdown>
  </div>
</template>

<script>
export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const routes = computed(() => store.state.permission.routes)
    const visitedViews = computed(() => store.state.tagsView.visitedViews)

    const tabActive = computed({
      get: () => store.state.app.routePath,
      set: tab => {
        store.dispatch('app/setRoutePath', tab)
      }
    })

    const methods = reactive({
      initTags: routes => {
        routes
          .filter(t => !t.hidden)
          .forEach(route => {
            if (route.meta && route.meta.affix) {
              store.dispatch('tagsView/addView', route)
            }
            if (route.children) {
              methods.initTags(route.children)
            }
          })
        store.dispatch('tagsView/addView', route)
      },
      addTabs: routePath => {
        const { path } = routePath
        store.dispatch('tagsView/addView', routePath)
        store.dispatch('app/setRoutePath', path)
        tabActive.value = path
      },
      handleTabClick: pane => {
        router.push({ path: pane.paneName })
      },
      toLastTab: () => {
        const latestView = visitedViews.value.slice(-1)[0]
        router.push({ path: latestView.path })
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
      closeOtherTab: () => {
        store.dispatch('tagsView/delOthersViews', route)
      },
      closeAllTab: () => {
        store.dispatch('tagsView/delAllViews', route)
        methods.toLastTab()
      }
    })

    methods.initTags(routes.value)

    watch(route, () => {
      methods.addTabs(route)
    })

    return {
      tabActive,
      visitedViews,
      ...toRefs(methods)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs-container {
  background: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-light);
  overflow: hidden;
  margin-bottom: 8px;
  .el-tabs {
    --el-tabs-header-height: 32px;
  }
  ::v-deep(.el-tabs__header) {
    border-bottom: 0;
    padding: 8px 8px 0 8px;
    margin: 0 0 8px 0;
    .el-tabs__item {
      border: 1px solid var(--el-border-color-light);
      margin-right: 8px;
      height: 32px;
      line-height: 32px;
    }
    .el-tabs__item:first-child {
      border-left: 1px solid var(--el-border-color-light);
    }
    .el-tabs__nav {
      border: 0;
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 32px;
    }
    .is-active {
      background: var(--el-color-primary-light-9);
      border: 1px solid var(--el-color-primary) !important;
    }
  }
}
</style>
