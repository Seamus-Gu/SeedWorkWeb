<template>
  <div class="toggle">
    <el-row :gutter="8">
      <el-col :span="24">
        <el-card> </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="8" style="margin-top: 8px">
      <el-col :span="12">
        <el-card> 123123 </el-card>
      </el-col>
      <el-col :span="12">
        <el-card> 456456 </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Panel } from '@/components'
import { useDark, useToggle } from '@vueuse/core'

export default {
  name: 'Index',
  components: {
    Panel
  },
  setup() {
    const methods = reactive({})
    return {
      ...toRefs(methods)
    }
  }
}
</script>
