<!--
 * @Description: 变形汉堡按钮
 * @Autor: Gu
 * @Date: 2021-12-31 11:01:00
-->
<template>
  <div class="humburger">
    <svg
      v-if="isActive"
      class="icon"
      ariel-hidden="true"
      font-size="20px"
      @click="toggleSideBar"
    >
      <use xlink:href="#icon-shrink" />
    </svg>
    <svg
      v-else
      class="icon"
      ariel-hidden="true"
      font-size="20px"
      @click="toggleSideBar"
    >
      <use xlink:href="#icon-expend" />
    </svg>
  </div>
</template>
<script>
export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  setup() {
    return {}
  }
})
</script>
