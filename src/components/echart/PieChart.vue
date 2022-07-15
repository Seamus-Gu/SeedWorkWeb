<!--
 * @Description: 柱形图
 * @Author: ZY
 * @Date: 2021-01-14 15:10:30
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-26 10:02:33
-->
<template>
  <div :id="id" :class="className" :style="{ height, width }" />
</template>

<script>
import resize from './resize'
import * as echarts from 'echarts'
export default defineComponent({
  props: {
    id: {
      type: String,
      default: 'pieChart'
    },
    className: {
      type: String,
      default: 'pieChart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    defaultValue: {
      type: Object
    },
    title: {
      type: Object
    },
    tooltip: {
      type: Object,
      default: {
        trigger: 'item'
      }
    },
    legend: {
      type: Object,
      default: {
        orient: 'vertical',
        left: 'left'
      }
    },
    name: {
      type: String
    },
    radius: {
      type: String || Array,
      default: '80%'
    },
    label: {
      type: Object,
      default: {
        show: true,
        position: 'outside'
      }
    },
    emphasis: {
      type: Object
    },
    api: {
      type: Function
    }
  },
  setup(props) {
    const { chart, mounted, beforeDestroy, activated, deactivated } = resize()

    var pieChart = null

    const methods = reactive({
      getData: queryData => {
        props.api(queryData).then(res => {
          methods.initChart(res.data)
        })
      },
      initChart: data => {
        pieChart = echarts.init(document.getElementById(props.id))
        pieChart.setOption({
          title: props.title,
          tooltip: props.tooltip,
          legend: props.legend,
          series: [
            {
              type: 'pie',
              name: props.name,
              radius: props.radius,
              label: props.label,
              emphasis: props.emphasis,
              data: data
            }
          ]
        })
        chart.value = pieChart
      },
      refresh: queryData => {
        methods.getData(queryData)
      }
    })

    methods.getData(props.defaultValue)

    onMounted(() => {
      mounted()
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
})
</script>

<style scoped></style>
