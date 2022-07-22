<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-11 15:54:18
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-12 15:07:17
 * @Description: 标题
-->

<template>
  <div
    class="layout-title cursor-pointer"
    :class="{ 'layout-title-collapse': collapse }"
  >
    <transition name="el-zoom-in-top">
      <template v-if="!collapse">
        <el-row align="middle" justify="center" style="height: 100%">
          <img class="logo" src="~@/assets/images/Vue.png" alt="" />
          <div class="content" v-if="!collapse">
            <span style="color: #57caeb">Vue</span>管理系统
          </div>
        </el-row>
      </template>
      <template v-else>
        <el-row align="middle" justify="center" style="height: 100%">
          <img class="logo" src="~@/assets/images/Vue.png" alt="" />
        </el-row>
      </template>
    </transition>
  </div>
</template>

<script>
export default {
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
}
</script>
<style lang="scss" scoped>
.layout-title {
  overflow: hidden;
  position: relative;
  .content {
    display: inline-block;
    font-weight: 600;
    color: #435ebe;
    font-size: 24px;
  }
}
</style>
