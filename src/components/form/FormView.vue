<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-24 17:00:21
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-06-08 13:06:58
 * @Description: file content
-->
<template>
  <div class="form">
    <a-form ref="aFormRef" :rules="rules" :model="formState">
      <a-row :gutter="16" style="margin-top: 16px">
        <template
          v-for="item in schema.filter(t => t.visible != false)"
          :key="item.dataIndex"
        >
          <a-col v-if="item.component" :span="item.span || 12">
            <FormItem
              :formState="formState"
              :formItem="item"
              :allDisabled="allDisabled"
              :componentProps="item.componentProps"
            >
            </FormItem>
          </a-col>
          <slot v-else :name="item.dataIndex"></slot>
        </template>
        <slot></slot>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import FormItem from './FormItem.vue'
export default defineComponent({
  props: {
    allDisabled: {
      type: Boolean,
      default: false
    },
    schema: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    },
    formState: {
      type: Object,
      required: true
    }
  },
  components: { FormItem },
  setup(props, context) {
    const aFormRef = ref()

    const methods = reactive({
      validate: () => {
        return aFormRef.value.validate()
      },
      resetFields: () => {
        return aFormRef.value.resetFields()
      }
    })

    return {
      aFormRef,
      ...toRefs(methods)
    }
  }
})
</script>
<style lang="scss" scoped></style>
