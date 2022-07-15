<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-19 14:35:46
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-19 14:56:08
 * @Description: file content
-->
<template>
  <div class="box-container">
    <template v-if="type == 'dark'">
      <div style="border: 1px solid #909399; width: 22px; height: 22px">
        <div
          style="
            height: 0;
            width: 0;
            border-width: 10px;
            border-style: solid;
            margin-top: -0.5px;
            border-color: #001529 #001529 #fff #fff;
          "
        ></div>
      </div>
    </template>
    <template v-else>
      <div
        class="box-content"
        :style="{ background: type == 'light' ? '#FFF' : '#242525' }"
      ></div>
    </template>
  </div>
</template>
<script>
export default defineComponent({
  props: {
    type: {
      type: String
    }
  },
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.box-container {
  height: 32px;
  width: 32px;
  padding: 4px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  cursor: pointer;
  .box-content {
    display: block;
    border: 1px solid #909399;
    border-radius: 2px;
    width: 100%;
    height: 100%;
  }
}
</style>
