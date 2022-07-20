<template>
  <div class="tabs-container">
    <a-dropdown
      ref="tabDropdownRef"
      class="tabs-dropdown"
      :trigger="['contextmenu']"
    >
      <el-tabs
        type="card"
        :closable="true"
        v-model="tabActive"
        @tabClick="handleTabClick"
        @edit="handleTabRemove"
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
export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const tabDropdownRef = ref()

    const routes = computed(() => store.state.permission.routes)
    // const visitedViews = computed(() => store.state.tagsView.visitedViews)
    const visitedViews = [
      { path: '/index', meta: { title: '首页' } },
      { path: '2', meta: { title: 'asd' } },
      { path: '3', meta: { title: 'asd' } },
      { path: '4', meta: { title: 'asd' } },
      { path: '5', meta: { title: 'asd' } },

      { path: '6', meta: { title: 'asd' } },
      { path: '7', meta: { title: 'asd' } },

      { path: '8', meta: { title: 'asd' } },
      { path: '9', meta: { title: 'asd' } },
      { path: '10', meta: { title: 'asd' } },
      { path: '11', meta: { title: 'asd' } },
      { path: '12', meta: { title: 'asd' } },
      { path: '13', meta: { title: 'asd' } },
      { path: '8', meta: { title: 'asd' } },
      { path: '9', meta: { title: 'asd' } },
      { path: '10', meta: { title: 'asd' } },
      { path: '11', meta: { title: 'asd' } },
      { path: '12', meta: { title: 'asd' } },
      { path: '13', meta: { title: 'asd' } },
      { path: '8', meta: { title: 'asd' } },
      { path: '9', meta: { title: 'asd' } },
      { path: '10', meta: { title: 'asd' } },
      { path: '11', meta: { title: 'asd' } },
      { path: '12', meta: { title: 'asd' } },
      { path: '13', meta: { title: 'asd' } },
      { path: '8', meta: { title: 'asd' } },
      { path: '9', meta: { title: 'asd' } },
      { path: '10', meta: { title: 'asd' } },
      { path: '11', meta: { title: 'asd' } },
      { path: '12', meta: { title: 'asd' } },
      { path: '13', meta: { title: 'asd' } }
    ]
    const tabActive = ref()

    const methods = reactive({
      addTabs: () => {
        debugger
        tabActive.value = computed(() => store.state.app.routePath)
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
      },
      rightClick: () => {
        tabDropdownRef.value.handleOpen()
      }
    })

    onMounted(() => {
      methods.initTags(routes.value)
      methods.addTabs()
    })

    watch(route, () => {
      methods.addTabs(route)
    })

    return {
      tabDropdownRef,
      tabActive,
      visitedViews,
      ...toRefs(methods)
    }
  }
})
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
