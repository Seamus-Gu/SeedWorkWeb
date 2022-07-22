<template>
  <div class="toggle">
    <el-row :gutter="8">
      <el-col :span="24">
        <el-card>
          <el-switch v-model="isDark" />
        </el-card>
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
const isDark = useDark()
const toggleDark = useToggle(isDark)

export default {
  name: 'Index',
  components: {
    Panel
  },
  setup() {
    const isDark = useDark()
    const methods = reactive({})
    return {
      isDark,
      ...toRefs(methods)
    }
  }
}
</script>
