<!--
 * @Description: 
 * @Autor: Gu
 * @Date: 2022-01-06 09:53:45
-->
<template>
  <el-table
    class="tree-table"
    :dataSource="dataSource"
    :columns="columns.filter(t => t.visible != false)"
    :scroll="scroll"
    :loading="loading"
    :size="treeTableSize"
    :showHeader="showHeader"
    :expandedRowKeys="expandedRowKeys"
    :tableLayout="tableLayout"
    :bordered="bordered"
    :rowClassName="
      stripe == true
        ? (record, index) => (index % 2 === 1 ? 'table-striped' : null)
        : index => index
    "
    :indentSize="indentSize"
    :rowKey="record => record[idName]"
    :pagination="false"
    :locale="locale"
    :customRow="customRow"
    :customHeaderRow="customHeaderRow"
    :expandRowByClick="expandRowByClick"
    @change="handleTableChange"
    @expandedRowsChange="expandedRowsChange"
  >
    <template
      v-for="slot in columns.filter(t => t.slots).map(t => t.slots)"
      #[slot.customRender]="slotData"
    >
      <slot
        :name="slot.customRender"
        :record="slotData.record"
        :text="slotData.text"
        :index="slotData.index"
      />
    </template>
    <template v-if="$slots.expandIcon" #expandIcon="expanIcon">
      <slot name="expandIcon" :props="expanIcon"></slot>
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer"> </slot>
    </template>
    <slot> </slot>
  </el-table>
</template>
<script>
export default defineComponent({
  props: {
    bordered: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: false
    },
    defaultExtends: {
      type: Boolean,
      default: true
    },
    expandRowByClick: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    indentSize: {
      type: Number,
      default: 15
    },
    idName: {
      type: String,
      default: 'id'
    },
    tableLayout: {
      type: String,
      default: 'fixed'
    },
    columns: {
      type: Object
    },
    scroll: {
      type: Object
    },
    locale: {
      type: Object
    },
    api: {
      type: Function,
      required: true
    },
    customRow: {
      type: Function
    },
    customHeaderRow: {
      type: Function
    }
  },
  setup(props) {
    const store = useStore()

    //数据源
    const dataSource = ref()

    const treeTableData = reactive({
      loading: false,
      treeTableSize: computed(() => store.state.settings.tableSize),
      expandedRowKeys: undefined
    })

    const queryParams = reactive({
      sorter: {},
      filters: {},
      query: {},
      other: {}
    })

    const methods = reactive({
      getData: async () => {
        treeTableData.loading = true

        var queryData = {}

        Object.assign(
          queryData,
          queryParams.sorter,
          queryParams.query,
          queryParams.filters,
          queryParams.other
        )
        await props.api(queryData).then(res => {
          methods.deleteNullChildren(res.data)
          dataSource.value = res.data
          props.defaultExtends &&
            (treeTableData.expandedRowKeys = res.data.map(t => t[props.idName]))
          treeTableData.loading = false
        })

        return true
      },
      deleteNullChildren: data => {
        data.filter(t => {
          if (t.children.length == 0) {
            delete t.children
          } else {
            return methods.deleteNullChildren(t.children)
          }
        })
      },
      getList: res => {
        let expendList = []
        for (let item of res) {
          expendList.push(item[props.idName])
          if (item.children != null && item.children.length) {
            expendList = expendList.concat(methods.getList(item.children))
          }
        }
        return expendList
      },
      allExpend: isExpend => {
        let expendList = isExpend ? methods.getList(dataSource.value) : []
        treeTableData.expandedRowKeys = expendList
      },
      handleTableChange: (pagination, filters, sorter) => {
        queryParams.current = pagination.current

        delete sorter.column && delete sorter.columnKey
        !sorter.order && delete sorter.field
        queryParams.sorter = sorter

        for (let item in filters) {
          filters[item] = filters[item].toString()
        }
        queryParams.filters = filters

        methods.getData()
      },
      expandedRowsChange: expandedRows => {
        treeTableData.expandedRowKeys = expandedRows
      },
      refresh: async (query, other) => {
        queryParams.query = query
        queryParams.other = other
        await methods.getData()
        return true
      }
    })

    methods.getData()

    return {
      dataSource,
      ...toRefs(treeTableData),
      ...toRefs(methods)
    }
  }
})
</script>
<style scoped>
.tree-table :deep(.table-striped) td {
  background-color: #f3f1f1;
}
</style>
