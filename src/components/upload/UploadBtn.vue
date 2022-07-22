<template>
  <div class="upload-btn-container">
    <el-button
      class="upload-btn"
      :style="{ width: width, height: height }"
      :block="block"
      :danger="danger"
      :disabled="disabled"
      :ghost="ghost"
      :htmlType="htmlType"
      :loading="loading"
      :shape="shape"
      :size="size"
      :type="type"
    >
      <input
        id="fileInput"
        :accept="accept"
        class="file-input"
        type="file"
        @change="upload"
      />
      <template #icon>
        <slot name="icon"></slot>
      </template>
      <slot></slot>
    </el-button>
  </div>
</template>
<script>
export default {
  props: {
    block: {
      type: Boolean
    },
    danger: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    ghost: {
      type: Boolean
    },
    width: {
      type: String
    },
    height: {
      type: String
    },
    accept: {
      type: String,
      default: '.xlsx,.xls'
    },
    htmlType: {
      type: String
    },
    loading: {
      type: Boolean
    },
    shape: {
      type: String
    },
    size: {
      type: String
    },
    type: {
      type: String
    }
  },
  setup(props, context) {
    const fileInputRef = ref()
    const methods = reactive({
      upload: async data => {
        let file = data.target.files[0]
        await context.emit('upload', file)
        document.getElementById('fileInput').value = ''
      }
    })
    return {
      fileInputRef,
      ...toRefs(methods)
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-btn-container {
  .upload-btn {
    .file-input {
      position: absolute;
      z-index: 9999;
      opacity: 0;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
