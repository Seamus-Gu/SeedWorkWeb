<!--
 * @Description: 全屏组件
 * @Autor: Gu
 * @Date: 2021-12-29 12:34:00
-->

<template>
  <div class="screen-full">
    <svg class="icon" ariel-hidden="true" font-size="16px" @click="toggle">
      <use xlink:href="#icon-full-screen" />
    </svg>
  </div>
</template>

<script>
import { useFullscreen } from '@vueuse/core'

export default {
  setup() {
    const { toggle } = useFullscreen()

    return {
      toggle
    }
  }
}
</script>
