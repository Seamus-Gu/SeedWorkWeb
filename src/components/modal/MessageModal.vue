<template>
  <div>
    <el-modal
      :visible="visible"
      :closable="closable"
      :okText="okText"
      :cancel-text="cancelText"
      @ok="ok"
      @cancel="cancel"
      :maskClosable="maskClosable"
      :width="width"
    >
      <template #title>
        <slot v-if="$slots.title" name="title"></slot>
        <span class="modal-title" v-else>{{ title }}</span>
      </template>
      <template #footer v-if="$slots.footer">
        <slot name="footer"></slot>
      </template>
      <slot v-if="$slots.content" name="content"></slot>
      <span v-else>{{ content }}</span>
    </el-modal>
  </div>
</template>
<script>
export default {
  props: {
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
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: Number
    },
    content: {
      type: String,
      default: '提交后无法更改,请确认后提交!'
    },
    okText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  setup(props, context) {
    const closable = ref()

    const methods = reactive({
      isClosable: () => {
        props.title == '' && (closable.value = false)
      },
      ok: () => {
        context.emit('ok')
      },
      cancel: () => {
        context.emit('cancel')
      }
    })

    onMounted(() => {
      methods.isClosable()
    })
    return {
      closable,
      ...toRefs(methods)
    }
  }
}
</script>
<style scoped>
.modal-title {
  font-size: 18px;
}
</style>
