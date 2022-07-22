<!--
 * @Description: 面包屑
 * @Autor: Gu
 * @Date: 2022-01-04 14:16:02
-->
<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="(item, index) in breadcrumbList" :key="index">
        <el-breadcrumb-item>
          <router-link v-if="index == 0" :to="item.path">
            {{ item.meta.title }}
          </router-link>
          <span v-else>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  setup() {
    const route = useRoute()
    const breadcrumbList = ref()

    const methods = reactive({
      getBreadcrumb: () => {
        let matched = route.matched.filter(item => item.meta && item.meta.title)
        const first = matched[0]
        if (!methods.isDashboard(first)) {
          matched = [{ path: '/index', meta: { title: '首页' } }].concat(
            matched
          )
        }
        breadcrumbList.value = matched.filter(
          item => item.meta && item.meta.title && item.meta.breadcrumb !== false
        )
      },
      isDashboard: route => {
        const name = route && route.name
        if (!name) {
          return false
        }
        return name.trim() === 'Index'
      }
    })

    watchEffect(() => {
      methods.getBreadcrumb()
    })

    return {
      breadcrumbList,
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss" scoped></style>
