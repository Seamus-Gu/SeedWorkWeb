<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-07 08:33:40
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-24 14:33:14
 * @Description: Panel板块 已完成
-->

<template>
  <el-card
    :bodyStyle="bodyStyle"
    :shadow="shadow"
    :style="{
      width: width,
      height: height,
      minWidth: minWidth,
      minHeight: minHeight,
      marginBottom: marginBottom,
      overflowY: scrollY ? 'auto' : 'none',
      overflowX: scrollX ? 'auto' : 'none'
    }"
  >
    <template v-if="$slots.header" #header>
      <slot name="header"></slot>
    </template>
    <slot></slot>
  </el-card>
</template>

<script>
/**
 * bodyStyle  //自定义body部分的样式 Object
 * shadow //设置卡片阴影出现的时机 always||hover||never always
 * width  //宽度 String
 * height //高度 String
 * minWidth //最小宽度 String
 * minHeight  //最小高度 String
 * marginBottom //下边距 String 8px
 * scrollX  //横向滑动 Boolean false
 * scrollY //纵向滑动 Boolean false
 */
export default {
  props: {
    bodyStyle: {
      type: Object
    },
    shadow: {
      type: String
    },
    width: {
      type: String
    },
    height: {
      type: String
    },
    minWidth: {
      type: String
    },
    minHeight: {
      type: String
    },
    marginBottom: {
      type: String,
      default: '8px'
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
