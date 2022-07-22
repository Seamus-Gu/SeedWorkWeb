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
export default {
  props: {
    id: {
      type: String,
      default: 'barChart'
    },
    className: {
      type: String,
      default: 'barChart'
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
    grid: {
      type: Object
    },
    legend: {
      type: Object,
      default: {
        itemGap: 5
      }
    },
    dataZoom: {
      type: Object
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
    axisLabel: {
      type: Object,
      default: {
        show: true,
        axisName: {
          color: '#595C61'
        },
        rotate: 30
      }
    },
    api: {
      type: Function
    }
  },
  setup(props) {
    const { chart, mounted, beforeDestroy, activated, deactivated } = resize()

    var barChart = null

    const methods = reactive({
      getData: queryData => {
        props.api(queryData).then(res => {
          methods.initChart(res.data.xData, res.data.yData)
        })
      },
      initChart: (xData, yData) => {
        barChart && barChart.dispose()
        barChart = echarts.init(document.getElementById(props.id))
        barChart.setOption({
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
            axisLabel: props.axisLabel,
            z: 10
          },
          yAxis: {
            show: props.yShow,
            type: 'value'
          },
          series: [
            {
              data: yData,
              type: 'bar',
              itemStyle: {
                borderRadius: 5
              }
            }
          ]
        })
        chart.value = barChart
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
}
</script>

<style scoped></style>
