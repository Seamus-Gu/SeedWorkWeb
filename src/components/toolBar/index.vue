<template>
  <div class="tool-bar-container">
    <el-row justify="space-between" align="middle">
      <div class="main-left">
        <el-space>
          <el-button v-has="addPer" v-if="hasAdd" type="primary" @click="add">
            <template #icon>
              <svg class="icon" ariel-hidden="true" font-size="15px">
                <use xlink:href="#icon-plus" />
              </svg>
            </template>
            新增
          </el-button>
          <el-button
            v-has="batchDeletePer"
            v-if="hasBatchDelete"
            danger="true"
            @click="batchDelete"
          >
            <template #icon>
              <svg
                class="icon"
                ariel-hidden="true"
                font-size="15px"
                style="margin-right: 8px"
              >
                <use xlink:href="#icon-trash-alt" />
              </svg>
            </template>
            批量删除
          </el-button>
          <el-button
            v-if="hasExport"
            v-has="exportPer"
            @click="exportExcel"
            style="
              background-color: #fff39f !important;
              border-color: #ffba00 !important;
              color: #e5a700 !important;
            "
          >
            <template #icon>
              <svg
                class="icon"
                ariel-hidden="true"
                font-size="15px"
                style="margin-right: 8px"
              >
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
              <svg
                class="icon"
                ariel-hidden="true"
                font-size="15px"
                style="margin-right: 8px; fill: var(--theme-text-1) !important"
              >
                <use xlink:href="#icon-folding" />
              </svg>
            </template>
            展开/折叠
          </el-button>
          <slot></slot>
        </el-space>
      </div>
      <div class="main-right">
        <el-space>
          <el-tooltip content="刷新" placement="top">
            <svg
              class="icon"
              ariel-hidden="true"
              font-size="18px"
              @click="refresh"
            >
              <use xlink:href="#icon-refresh" />
            </svg>
          </el-tooltip>
          <el-tooltip content="密度" placement="top">
            <el-dropdown :trigger="['click']" @command="changeSize">
              <svg class="icon" ariel-hidden="true" font-size="18px">
                <use xlink:href="#icon-column-height" />
              </svg>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="default">默认</el-dropdown-item>
                  <el-dropdown-item command="middle">中等</el-dropdown-item>
                  <el-dropdown-item command="small">紧凑</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-tooltip>
          <el-tooltip content="列设置" placement="top">
            <svg
              class="icon"
              ariel-hidden="true"
              font-size="20px"
              @click="showColumnsModal"
            >
              <use xlink:href="#icon-column-setting" />
            </svg>
          </el-tooltip>
        </el-space>
      </div>
    </el-row>
    <!-- <el-modal
      title="显示/隐藏"
      :width="498"
      :visible="columnsVisible"
      :centered="true"
      @ok="changeColumns"
      @cancel="closeColumnsModal"
    >
      <el-card :bordered="false">
        <el-transfer
          :dataSource="transferData"
          :titles="['显示', '隐藏']"
          :targetKeys="targetKeys"
          :selectedKeys="selectedKeys"
          :render="item => item.title"
          @change="handleColumnsChange"
          @selectChange="handleColumnsSelectChange"
        />
      </el-card>
    </el-modal> -->
  </div>
</template>
<script>
import { getToken } from '@/utils/session-storage'

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
    sqlId: {
      type: String
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

    const uploadData = reactive({
      uploadVisible: false,
      headers: props.headers || { Authorization: getToken() },
      url:
        props.url ||
        import.meta.env.VITE_APP_BASE_API + '/file/uploadLocalFile',
      fileList: undefined
    })

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
      showColumnsModal: () => {
        columnsData.columnsVisible = true
      },
      closeColumnsModal: () => {
        columnsData.columnsVisible = false
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
      ...toRefs(uploadData),
      ...toRefs(columnsData),
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-bar-container {
  margin-bottom: 8px;

  .main-right {
    .icon {
      fill: #707070;
    }
  }
}
</style>
