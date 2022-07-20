<template>
  <div class="toggle">
    <span @click.stop="toggleDark()">暗黑模式</span>
    <el-switch v-model="isDark" />
  </div>
</template>

<script>
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)

export default defineComponent({
  setup() {
    const isDark = useDark()

    const methods = reactive({})
    return {
      isDark,
      ...toRefs(methods)
    }
  }
})
</script>
