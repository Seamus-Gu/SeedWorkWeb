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
        <svg class="icon menu-icon" ariel-hidden="true">
          <use :xlink:href="'#icon-' + data.meta.icon" />
        </svg>
        <span>{{ data.meta.title }}</span>
      </template>
      <sub-menu v-for="item in data.children" :key="item.id" :data="item" />
    </el-sub-menu>
    <el-menu-item v-else-if="data.meta" :index="data.path" @click="routerPush">
      <svg class="icon menu-icon" ariel-hidden="true">
        <use :xlink:href="'#icon-' + data.meta.icon" />
      </svg>
      <template #title>
        <span>{{ data.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item v-else :index="data.children[0].path" @click="routerPush">
      <svg class="icon menu-icon" ariel-hidden="true">
        <use :xlink:href="'#icon-' + data.children[0].meta.icon" />
      </svg>
      <template #title>
        <span>{{ data.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script>
export default defineComponent({
  name: 'SubMenu',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {},
  setup() {
    const router = useRouter()

    const methods = reactive({
      routerPush(e) {
        router.push({ path: e.index })
      }
    })

    return {
      ...toRefs(methods)
    }
  }
})
</script>
<style scoped>
.menu-icon {
  margin-right: 8px;
}
</style>
