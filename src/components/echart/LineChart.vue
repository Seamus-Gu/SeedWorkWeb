<!--
 * @Description: 柱形图
 * @Author: Gu
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
      default: 'lineChart'
    },
    className: {
      type: String,
      default: 'lineChart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    api: {
      type: Function
    },
    title: {
      type: Object
    },
    grid: {
      type: Object
    },
    dataZoom: {
      type: Object
    },
    tooltip: {
      type: Object,
      default: {
        trigger: 'item'
      }
    },
    color: {
      type: Array,
      default: [
        '#4a657a',
        '#308e92',
        '#b1cfa5',
        '#f5d69f',
        '#f5898b',
        '#ef5055'
      ]
    },
    xShow: {
      type: Boolean,
      default: true
    },
    yShow: {
      type: Boolean,
      default: true
    },
    defaultValue: {
      type: Object
    }
  },
  setup(props) {
    const { chart, mounted, beforeDestroy, activated, deactivated } = resize()

    var lineChart = null

    const methods = reactive({
      getData: queryData => {
        props.api(queryData).then(res => {
          methods.initChart(res.data.xData, res.data.yData)
        })
      },
      initChart: (xData, yData) => {
        lineChart && lineChart.dispose()
        lineChart = echarts.init(document.getElementById(props.id))
        lineChart.setOption({
          title: props.title,
          tooltip: props.tooltip,
          grid: props.grid,
          legend: props.legend,
          dataZoom: props.dataZoom,
          visualMap: [
            {
              show: false,
              min: 0,
              max: yData.length,
              dimension: 0,
              inRange: {
                color: props.color
              }
            }
          ],
          xAxis: {
            show: props.xShow,
            type: 'category',
            data: xData,
            axisTick: {
              show: false
            },
            z: 10
          },
          yAxis: {
            show: props.yShow,
            type: 'value'
          },
          series: [
            {
              data: yData,
              type: 'line',
              itemStyle: {
                borderRadius: 5
              }
            }
          ]
        })
        chart.value = lineChart
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
