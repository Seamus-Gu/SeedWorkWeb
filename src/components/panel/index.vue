<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-07 08:33:40
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-24 14:33:14
 * @Description: file content
-->
<template>
  <el-card
    :activeTabKey="activeTabKey"
    :bodyStyle="bodyStyle"
    :bordered="bordered"
    :defaultActiveTabKey="defaultActiveTabKey"
    :headStyle="headStyle"
    :hoverable="hoverable"
    :loading="loading"
    :tabList="tabList"
    :title="title"
    :style="{
      width: width,
      height: height,
      minWidth: minWidth,
      minHeight: minHeight,
      marginBottom: marginBottom,
      overflowY: scrollY ? 'auto' : 'none',
      overflowX: scrollX ? 'auto' : 'none',
      boxShadow: boxShadow ? '4px 4px 16px 0px rgb(0 0 0 / 10%)' : 'none'
    }"
  >
    <template v-if="$slots.extra" #extra>
      <slot name="extra"></slot>
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title"></slot>
    </template>
    <template v-if="$slots.actions" #actions>
      <slot name="actions"></slot>
    </template>
    <template v-if="$slots.cover" #cover>
      <slot name="cover"></slot>
    </template>
    <template v-if="$slots.customTab" #customTab="customTabData">
      <slot
        name="customTab"
        :key="customTabData.key"
        :tab="customTabData.tab"
      ></slot>
    </template>
    <template v-if="$slots.tabBarExtraContent" #tabBarExtraContent>
      <slot name="tabBarExtraContent"></slot>
    </template>
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  props: {
    activeTabKey: {
      type: String
    },
    bodyStyle: {
      type: Object
    },
    bordered: {
      type: Boolean,
      default: true
    },
    defaultActiveTabKey: {
      type: String
    },
    headStyle: {
      type: Object
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean
    },
    tabList: {
      type: Array
    },
    title: {
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
    },
    boxShadow: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
