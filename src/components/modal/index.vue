<template>
  <div class="modal">
    <a-modal
      :centered="centered"
      :bodyStyle="{
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 180px)'
      }"
      :cancelText="cancelText"
      :closable="title == '' ? false : closable"
      :confirmLoading="loading"
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
      <template #title v-if="$slots.title">
        <slot name="title"></slot>
      </template>
      <template #footer v-if="$slots.footer">
        <slot name="footer"></slot>
      </template>
      <slot></slot>
    </a-modal>
  </div>
</template>
<script>
export default defineComponent({
  props: {
    centered: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    width: {
      type: String || Number,
      default: '600px'
    },
    title: {
      type: String,
      default: '提示'
    },
    okText: {
      type: String
    },
    okType: {
      type: String
    },
    cancelText: {
      type: String
    },
    wrapClassName: {
      type: String
    }
  },
  setup(props, context) {
    const methods = reactive({
      ok: () => {
        context.emit('ok')
      },
      cancel: () => {
        context.emit('cancel')
      }
    })

    return {
      ...toRefs(methods)
    }
  }
})
</script>
<style scoped></style>
