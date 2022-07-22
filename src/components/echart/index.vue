<template>
  <div :id="id" :class="className" :style="{ height, width }" />
</template>

<script>
import resize from './resize'
import * as echarts from 'echarts'

export default {
  props: {
    id: {
      type: String,
      default: 'eChart'
    },
    className: {
      type: String,
      default: 'eChart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    option: {
      type: Object
    }
  },
  setup(props) {
    const { chart, mounted, beforeDestroy, activated, deactivated } = resize()

    var eChart = null
    const methods = reactive({
      initChart: () => {
        eChart && eChart.dispose()
        eChart = echarts.init(document.getElementById(props.id))
        eChart.setOption(props.option)
        chart.value = eChart
      }
    })

    watch(props, () => {
      methods.initChart()
    })

    onMounted(() => {
      mounted()
      nextTick(() => {
        methods.initChart()
      })
    })

    onBeforeUnmount(() => {
      beforeDestroy()
    })

    onActivated(() => {
      activated()
    })

    onDeactivated(() => {
      deactivated()
    })

    return {
      ...toRefs(methods)
    }
  }
}
</script>
