<!--
 * @Description: 
 * @Autor: Gu
 * @Date: 2022-01-10 16:28:14
-->
<template>
  <template v-if="!data.hidden">
    <el-sub-menu
      v-if="data.meta && data.children && data.children.length > 0"
      :index="data.path"
    >
      <template #title>
        <el-icon>
          <svg class="icon menu-icon" ariel-hidden="true">
            <use :xlink:href="'#icon-' + data.meta.icon" />
          </svg>
        </el-icon>
        <span>{{ data.meta.title }}</span>
      </template>
      <sub-menu v-for="item in data.children" :key="item.id" :data="item" />
    </el-sub-menu>
    <el-menu-item v-else-if="data.meta" :index="data.path" @click="goTarget">
      <el-icon>
        <svg class="icon menu-icon" ariel-hidden="true">
          <use :xlink:href="'#icon-' + data.meta.icon" />
        </svg>
      </el-icon>
      <template #title>
        <span>{{ data.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item v-else :index="data.children[0].path" @click="goTarget">
      <el-icon>
        <svg class="icon menu-icon" ariel-hidden="true">
          <use :xlink:href="'#icon-' + data.children[0].meta.icon" />
        </svg>
      </el-icon>
      <template #title>
        <span>{{ data.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script>
export default {
  name: 'SubMenu',
  props: {
    isHeader: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: {},
  setup(props) {
    const store = useStore()
    const router = useRouter()

    const layout = computed(() => store.state.settings.layout)
    const routes = store.getters.routes

    const methods = reactive({
      goTarget(e) {
        if (layout.value === 'TLayout' && props.isHeader) {
          let sideBarRoutes = routes.filter(t => t.path == e.index)[0].children
          store.dispatch('setSiderBarRoutes', sideBarRoutes)
        } else {
          router.push({ path: e.index })
        }
      }
    })

    return {
      ...toRefs(methods)
    }
  }
}
</script>
<style scoped></style>
