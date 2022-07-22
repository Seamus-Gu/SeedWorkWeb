<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-07 08:33:40
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-09 10:12:51
 * @FilePath: \Web\src\components\file\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-upload-dragger class="upload-container" :action="url" :headers="headers">
    <svg class="icon" ariel-hidden="true" font-size="50px">
      <use xlink:href="#icon-inbox-out" />
    </svg>
    <p class="ant-upload-text">
      <slot v-if="$slots.content" name="content"></slot>
      <div v-else> 
        将文件拖入此处或<a>点击上传</a>
      </div>
    </p>
    <p class="ant-upload-hint">
       <slot v-if="$slots.content" name="limit"></slot>
       <div v-else>
        仅允许导入xls、xlsx格式文件。
       </div>
    </p>
  </el-upload-dragger>
</template>
<script>
import { getToken } from '@/utils/session-storage'

export default ({
  props: {
    action: {
      type: String
    },
    data: {
      type: Object
    }
  },
  setup(props, context) {
    const uploadData = reactive({
      url: props.action || import.meta.env.VITE_APP_BASE_API + '/file/upload',
      headers: props.headers || { Authorization: getToken() }
    })

    return {
      ...toRefs(uploadData)
    }
  }
})
</script>
