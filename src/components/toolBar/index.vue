<template>
  <div class="tool-bar-container">
    <el-row justify="space-between" align="middle">
      <div class="main-left">
        <el-space>
          <el-button v-if="hasAdd" v-has="addPer" type="primary" @click="add">
            <template #icon>
              <svg class="icon" ariel-hidden="true" font-size="15px">
                <use xlink:href="#icon-plus" />
              </svg>
            </template>
            新增
          </el-button>
          <el-button
            v-if="hasBatchDelete"
            v-has="batchDeletePer"
            danger="true"
            @click="batchDelete"
          >
            <template #icon>
              <svg class="icon" ariel-hidden="true" font-size="15px">
                <use xlink:href="#icon-trash-alt" />
              </svg>
            </template>
            批量删除
          </el-button>
          <el-button
            v-if="hasExport"
            v-has="exportPer"
            @click="exportExcel"
            type="info"
          >
            <template #icon>
              <svg class="icon" ariel-hidden="true" font-size="15px">
                <use xlink:href="#icon-download" />
              </svg>
            </template>
            导出
          </el-button>
          <el-button
            v-if="hasExpent"
            @click="expend"
            style="background-color: #dbdbe1; border-color: #d3d4d6"
          >
            <template #icon>
              <svg class="icon" ariel-hidden="true" font-size="15px">
                <use xlink:href="#icon-folding" />
              </svg>
            </template>
            展开/折叠
          </el-button>
          <slot name="mainLeft"></slot>
        </el-space>
      </div>
      <div class="main-right">
        <el-space>
          <el-tooltip content="刷新" placement="top">
            <div class="refresh-svg" @click="refresh">
              <svg class="icon" ariel-hidden="true" font-size="18px">
                <use xlink:href="#icon-refresh" />
              </svg>
            </div>
          </el-tooltip>
          <el-tooltip content="密度" placement="top">
            <el-dropdown :trigger="['click']" @command="changeSize">
              <svg class="icon" ariel-hidden="true" font-size="18px">
                <use xlink:href="#icon-column-height" />
              </svg>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="large">宽松</el-dropdown-item>
                  <el-dropdown-item command="default">默认</el-dropdown-item>
                  <el-dropdown-item command="small">紧凑</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-tooltip>
          <el-tooltip content="列设置" placement="top">
            <div class="columns-svg" @click="columnsVisible = true">
              <svg class="icon" ariel-hidden="true" font-size="20px">
                <use xlink:href="#icon-column-setting" />
              </svg>
            </div>
          </el-tooltip>
          <slot name="mainRight"></slot>
        </el-space>
      </div>
    </el-row>
    <el-dialog
      v-model="columnsVisible"
      :width="700"
      title="列设置"
      customClass="align-center-dialog"
    >
      <div style="text-align: center">
        <el-transfer
          v-model="targetKeys"
          :data="transferData"
          :filterable="true"
          :titles="['显示', '隐藏']"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="columnsVisible = false">取消</el-button>
          <el-button type="primary" @click="changeColumns"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
/**
 * hasAdd boolean 是否有增加按钮(默认true)
 * hasBatchDelete boolean 是否有批量删除(默认false)
 * hasExport boolean 是否有导出(默认false)
 * hasExpent boolean 是否有展开/折叠(默认false)
 * addPer array 新增按钮权限数组
 * batchDeletePer array 批量删除按钮权限数组
 * exportPer array 导出按钮权限数组
 * columns array table表格列设置数组
 */
export default {
  components: {},
  props: {
    hasAdd: {
      type: Boolean,
      default: true
    },
    hasBatchDelete: {
      type: Boolean,
      default: false
    },
    hasExport: {
      type: Boolean,
      default: false
    },
    hasExpent: {
      type: Boolean,
      default: false
    },
    addPer: {
      type: Array
    },
    batchDeletePer: {
      type: Array
    },
    exportPer: {
      type: Array
    },
    columns: {
      type: Array,
      default: []
    }
  },
  setup(props, context) {
    const store = useStore()

    const columnsData = reactive({
      transferData: props.columns.filter(t => {
        t.key = t.dataIndex
        return true
      }),
      columnsVisible: false,
      targetKeys: [],
      selectedKeys: []
    })

    const methods = reactive({
      add: () => {
        context.emit('add')
      },
      batchDelete: () => {
        context.emit('batchDelete')
      },
      exportExcel: () => {
        context.emit('exportExcel')
      },
      expend: () => {
        context.emit('expend')
      },
      refresh: () => {
        context.emit('refresh')
      },
      changeSize: key => {
        store.dispatch('settings/setTableSize', key)
      },
      handleColumnsChange: (nextTargetKeys, direction, moveKeys) => {
        columnsData.targetKeys = nextTargetKeys
      },
      handleColumnsSelectChange: (sourceSelectedKeys, targetSelectedKeys) => {
        columnsData.selectedKeys = [
          ...sourceSelectedKeys,
          ...targetSelectedKeys
        ]
      },
      changeColumns: () => {
        for (let item in props.columns) {
          const key = props.columns[item].dataIndex
          props.columns[item].visible = !columnsData.targetKeys.includes(key)
        }
        columnsData.columnsVisible = false
      }
    })

    return {
      ...toRefs(columnsData),
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-bar-container {
  margin-bottom: 8px;
}
// 垂直居中
</style>
