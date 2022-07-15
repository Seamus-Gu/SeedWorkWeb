<template>
  <div class="form">
    <el-modal
      :centered="centered"
      :bodyStyle="{
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 180px)'
      }"
      :cancelText="cancelText"
      :closable="title == '' ? false : closable"
      :confirmLoading="confirmLoading"
      :maskClosable="maskClosable"
      :okText="okText"
      :okType="okType"
      :title="title"
      :visible="visible"
      :width="width"
      :wrapClassName="wrapClassName"
      @ok="ok"
      @cancel="cancel"
    >
      <el-form v-if="visible" ref="aFormRef" :rules="rules" :model="formState">
        <el-row :gutter="16" style="margin-top: 16px">
          <template
            v-for="item in schema.filter(t => t.visible != false)"
            :key="item.dataIndex"
          >
            <el-col v-if="item.component" :span="item.span || 12">
              <FormItem
                :formState="formState"
                :formItem="item"
                :allDisabled="allDisabled"
                :componentProps="item.componentProps"
              >
              </FormItem>
            </el-col>
            <slot v-else :name="item.dataIndex"></slot>
          </template>
          <slot></slot>
        </el-row>
      </el-form>
      <template #footer v-if="$slots.footer">
        <slot name="footer"></slot>
      </template>
    </el-modal>
  </div>
</template>
<script>
import FormItem from './FormItem.vue'
export default defineComponent({
  props: {
    visible: {
      type: Boolean
    },
    closable: {
      type: Boolean
    },
    confirmLoading: {
      type: Boolean
    },
    maskClosable: {
      type: Boolean
    },
    centered: {
      type: Boolean,
      default: true
    },
    allDisabled: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String
    },
    okText: {
      type: String
    },
    okType: {
      type: String
    },
    wrapClassName: {
      type: String
    },
    title: {
      type: String
    },
    width: {
      type: String || Number,
      default: '600px'
    },
    zIndex: {
      type: Number
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
      ok: () => {
        context.emit('ok')
      },
      cancel: () => {
        context.emit('cancel')
      },
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
