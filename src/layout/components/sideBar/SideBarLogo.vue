<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-11 15:54:18
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-12 15:07:17
 * @Description: 标题
-->

<template>
  <div class="layout-title" :class="{ 'layout-title-collapse': collapse }">
    <transition name="slide">
      <el-row align="middle" justify="center" style="height: 100%">
        <div v-if="!collapse">
          <el-row align="middle" justify="center" style="height: 100%">
            <img class="logo" src="~@/assets/images/Vue.png" alt="" />
            <div class="content">
              <span style="color: #57caeb">Vue</span>管理系统
            </div>
          </el-row>
        </div>
        <div v-else>
          <el-row align="middle" justify="center" style="height: 100%">
            <img class="logo" src="~@/assets/images/Vue.png" alt="" />
          </el-row>
        </div>
      </el-row>
    </transition>
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
<style lang="scss" scoped>
.layout-title {
  width: 210px;
  transform: all 3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s, color 0.1s,
    font-size 2s;
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  &-collapse {
    width: 64px;
  }
}
</style>
