<template>
  <div>
    <div style="position: absolute; top: 0"></div>
    <div id="luckysheet"></div>
  </div>
</template>

<script>
import LuckyExcel from 'luckyexcel'
import { message } from 'ant-design-vue'
import { exportExcel } from './export'

export default defineComponent({
  props: {
    initObject: {
      type: Object,
      default: {
        container: 'luckysheet',
        showinfobar: false,
        lang: 'zh',
        data: [
          {
            name: 'Sheet1', //工作表名称
            color: '', //工作表颜色
            index: 0, //工作表索引
            status: 1, //激活状态
            order: 0, //工作表的下标
            hide: 0, //是否隐藏
            row: 36, //行数
            column: 15, //列数
            defaultRowHeight: 19, //自定义行高
            defaultColWidth: 150, //自定义列宽
            celldata: [], //初始化使用的单元格数据
            config: {
              merge: {}, //合并单元格
              rowlen: {}, //表格行高
              columnlen: {}, //表格列宽
              rowhidden: {}, //隐藏行
              colhidden: {}, //隐藏列
              borderInfo: {}, //边框
              authority: {} //工作表保护
            },
            scrollLeft: 0, //左右滚动条位置
            scrollTop: 315, //上下滚动条位置
            luckysheet_select_save: [], //选中的区域
            calcChain: [], //公式链
            isPivotTable: false, //是否数据透视表
            pivotTable: {}, //数据透视表设置
            filter_select: {}, //筛选范围
            filter: null, //筛选配置
            luckysheet_alternateformat_save: [], //交替颜色
            luckysheet_alternateformat_save_modelCustom: [], //自定义交替颜色
            luckysheet_conditionformat_save: {}, //条件格式
            frozen: {}, //冻结行列配置
            chart: [], //图表配置
            zoomRatio: 1, // 缩放比例
            image: [], //图片
            showGridLines: 1, //是否显示网格线
            dataVerification: {} //数据验证配置
          }
        ]
      }
    }
  },
  setup(props) {
    const jsonData = ref({})

    const methods = reactive({
      initExcel: () => {
        luckysheet.create(props.initObject)
      },
      loadExcel: evt => {
        const files = evt.target.files
        if (files == null || files.length == 0) {
          message.warning('没有文件导入')
          return
        }

        let name = files[0].name
        let suffixArr = name.split('.'),
          suffix = suffixArr[suffixArr.length - 1]
        if (suffix != 'xlsx') {
          message.warning('目前只支持导入xlsx文件!')
          return
        }
        LuckyExcel.transformExcelToLucky(
          files[0],
          function (exportJson, luckysheetfile) {
            if (exportJson.sheets == null || exportJson.sheets.length == 0) {
              message.warning('读取excel文件内容失败，目前不支持xls文件!')
              return
            }
            jsonData.value = exportJson
            window.luckysheet.destroy()

            window.luckysheet.create({
              container: 'luckysheet',
              showinfobar: false,
              lang: 'zh',
              data: [exportJson.sheets[0]],
              title: exportJson.info.name,
              userInfo: exportJson.info.name.creator
            })
          }
        )
      },
      download: name => {
        exportExcel(luckysheet.getAllSheets(), name || 'Sheet1')
      }
    })

    onMounted(() => {
      methods.initExcel()
    })
    return {
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="scss" scoped>
#luckysheet {
  margin: 0px;
  padding: 0px;
  position: absolute;
  width: 96%;
  left: 2%;
  top: 18px;
  bottom: 20px;
}
</style>
<style>
.luckysheet-stat-area {
  background-color: #ffffff !important;
}
</style>
