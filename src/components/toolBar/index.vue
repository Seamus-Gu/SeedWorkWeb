<template>
  <div class="tool-bar-container">
    <a-row justify="space-between" align="bottom">
      <a-col>
        <div class="main-left">
          <a-space>
            <a-button v-has="addPer" v-if="hasAdd" type="primary" @click="add">
              <template #icon>
                <svg
                  class="icon"
                  aria-hidden="true"
                  font-size="15px"
                  style="margin-right: 8px; fill: #fff"
                >
                  <use xlink:href="#icon-plus" />
                </svg>
              </template>
              新增
            </a-button>
            <a-button
              v-has="batchDeletePer"
              v-if="hasBatchDelete"
              danger="true"
              @click="batchDelete"
            >
              <template #icon>
                <svg
                  class="icon"
                  aria-hidden="true"
                  font-size="15px"
                  style="margin-right: 8px"
                >
                  <use xlink:href="#icon-trash-alt" />
                </svg>
              </template>
              批量删除
            </a-button>
            <a-button
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
                  aria-hidden="true"
                  font-size="15px"
                  style="margin-right: 8px"
                >
                  <use xlink:href="#icon-download" />
                </svg>
              </template>
              导出
            </a-button>
            <a-button
              v-if="hasExpent"
              @click="expend"
              style="background-color: #dbdbe1; border-color: #d3d4d6"
            >
              <template #icon>
                <svg
                  class="icon"
                  aria-hidden="true"
                  font-size="15px"
                  style="
                    margin-right: 8px;
                    fill: var(--theme-text-1) !important;
                  "
                >
                  <use xlink:href="#icon-folding" />
                </svg>
              </template>
              展开/折叠
            </a-button>
            <slot></slot>
          </a-space>
        </div>
      </a-col>
      <a-col>
        <div class="main-right">
          <a-space>
            <a-tooltip title="刷新">
              <Icon @click="refresh">
                <template #component>
                  <svg class="icon" aria-hidden="true" font-size="18px">
                    <use xlink:href="#icon-refresh" />
                  </svg>
                </template>
              </Icon>
            </a-tooltip>
            <a-tooltip title="密度">
              <a-dropdown :trigger="['click']">
                <Icon>
                  <template #component>
                    <svg class="icon" aria-hidden="true" font-size="18px">
                      <use xlink:href="#icon-column-height" />
                    </svg>
                  </template>
                </Icon>
                <template #overlay>
                  <a-menu @click="changeSize">
                    <a-menu-item key="default">
                      <span>默认</span>
                    </a-menu-item>
                    <a-menu-item key="middle">
                      <span>中等</span>
                    </a-menu-item>
                    <a-menu-item key="small">
                      <span>紧凑</span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-tooltip>
            <a-tooltip title="列设置">
              <Icon @click="showColumnsModal">
                <template #component>
                  <svg class="icon" aria-hidden="true" font-size="20px">
                    <use xlink:href="#icon-column-setting" />
                  </svg>
                </template>
              </Icon>
            </a-tooltip>
          </a-space>
        </div>
      </a-col>
    </a-row>
    <a-modal
      title="显示/隐藏"
      :width="498"
      :visible="columnsVisible"
      :centered="true"
      @ok="changeColumns"
      @cancel="closeColumnsModal"
    >
      <a-card :bordered="false">
        <a-transfer
          :dataSource="transferData"
          :titles="['显示', '隐藏']"
          :targetKeys="targetKeys"
          :selectedKeys="selectedKeys"
          :render="item => item.title"
          @change="handleColumnsChange"
          @selectChange="handleColumnsSelectChange"
        />
      </a-card>
    </a-modal>
  </div>
</template>
<script>
import Icon from '@ant-design/icons-vue'
import { getToken } from '@/utils/session-storage'

export default defineComponent({
  components: {
    Icon
  },
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
      changeSize: keys => {
        store.dispatch('settings/setTableSize', keys.key)
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
})
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
