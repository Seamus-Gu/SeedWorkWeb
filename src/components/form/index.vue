<template>
  <div class="form">
    <el-dialog
      v-model="visible"
      :title="title"
      :width="width"
      :top="top"
      :modal="modal"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      :showClose="showClose"
      :draggable="draggable"
      :center="center"
      :alignCenter="alignCenter"
      :destroyOnClose="destroyOnClose"
      @open="open"
      @opened="opened"
      @close="close"
      @closed="closed"
    >
      <el-form ref="aFormRef" :rules="rules" :model="formState">
        <el-row :gutter="16" style="margin-top: 16px">
          <template
            v-for="item in schema.filter(t => t.visible != false)"
            :key="item.dataIndex"
          >
            <el-col v-if="item.component" :span="item.span || 12">
              {{ formState }}
              <!-- <FormItem
                :formState="formState"
                :formItem="item"
                :allDisabled="allDisabled"
                :componentProps="item.componentProps"
              >
              </FormItem> -->
            </el-col>
            <slot v-else :name="item.dataIndex"></slot>
          </template>
          <slot></slot>
        </el-row>
      </el-form>
      <!-- 对话框标题插槽 -->
      <template #header v-if="$slots.header">
        <slot name="header"></slot>
      </template>
      <!-- 对话框操作区域插槽 -->
      <template #footer v-if="$slots.footer">
        <slot name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import FormItem from './FormItem.vue'

/** Form 弹出表单
 * schema object 生成表单属性
 *
 * el-dialog
 * visible boolean 是否显示表单
 * title string 对话框标题
 * width string / number 宽度
 * top string margin-top上边距值
 * modal boolean 是否需要遮罩层
 * closeOnClickModal boolean 是否可以通过点击 modal 关闭 Form
 * closeOnPressEscape boolean 是否可以通过按下 ESC 关闭 Form
 * showClose boolean 是否显示关闭按钮
 * draggable boolean 是否启用可拖拽功能
 * center 	是否让header 和 footer 部分居中排列
 * alignCenter 	是否水平垂直对齐对话框
 * destroyOnClose 当关闭时，销毁Form中的元素
 * el-form
 * model 表单数据对象
 *
 *
 *
 *
 *
 */
export default {
  props: {
    schema: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean
    },
    title: {
      type: String
    },
    width: {
      type: String || Number
    },
    top: {
      type: String
    },
    modal: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    alignCenter: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: true
    }
  },
  components: { FormItem },
  setup(props, context) {
    const methods = reactive({
      open: () => {
        context.emit('open')
      },
      opend: () => {
        context.emit('opend')
      },
      close: () => {
        context.emit('close')
      },
      closed: () => {
        context.emit('closed')
      }
      // validate: () => {
      //   return aFormRef.value.validate()
      // },
      // resetFields: () => {
      //   return aFormRef.value.resetFields()
      // }
    })

    return {
      ...toRefs(methods)
    }
  }
}
</script>
<style lang="scss" scoped></style>
