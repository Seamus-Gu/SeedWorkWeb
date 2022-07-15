<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-11 15:54:18
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-12 15:07:17
 * @Description: 标题
-->

<template>
  <div class="layout-title" @click="returnHome">
    <el-row align="middle" justify="center" style="height: 100%">
      <img class="logo" src="~@/assets/images/Vue.png" alt="" />
      <div class="content" v-show="!collapse">
        <span style="color: #57caeb">Vue</span>管理系统
      </div>
    </el-row>
  </div>
</template>

<script>
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      required: false
    }
  },
  setup() {
    const router = useRouter()

    const methods = reactive({
      returnHome: () => {
        router.push({ path: '/' })
      }
    })
    return {
      ...toRefs(methods)
    }
  }
})
</script>
<style lang="scss" scoped></style>
