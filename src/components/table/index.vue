<!--
 * @Description: 
 * @Autor: Gu
 * @Date: 2022-01-06 09:53:45
-->
<template>
  <el-table
    v-loading="loading"
    :data="dataSource"
    :border="border"
    :size="tableSize"
  >
    <template v-for="item in columns" :key="item.index">
      <el-table-column
        :prop="item.dataIndex"
        :label="item.label"
        :formatter="item.formatter"
      >
        <template v-if="$slots[item.dataIndex]" #default="slotData">
          <slot
            :name="item.dataIndex"
            :row="slotData.row"
            :column="slotData.column"
            :$index="slotData.$index"
          ></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
export default {
  props: {
    border: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Object,
      required: true
    },
    customHeaderRow: {
      type: Function
    },
    customRow: {
      type: Function
    },
    locale: {
      type: Object,
      default: {
        filterConfirm: `确定`,
        filterReset: `重置`,
        emptyText: `暂无数据`
      }
    },
    rowSelection: {
      type: Object
    },
    scroll: {
      type: Object
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showSorterTooltip: {
      type: Boolean,
      default: true
    },
    sticky: {
      type: Boolean,
      default: true
    },
    tableLayout: {
      type: String,
      default: 'fixed'
    },
    api: {
      type: Function,
      required: true
    },
    defaultValue: {
      type: Object
    },
    idName: {
      type: String,
      default: 'id'
    },
    pageSize: {
      type: Number,
      default: 10
    },
    stripe: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const store = useStore()

    //数据源
    const dataSource = ref()

    const tableData = reactive({
      loading: false,
      pagination: props.pagination
        ? props.pagination
        : {
            pageSize: props.pageSize,
            showTotal: function (total) {
              return `共 ${total} 条`
            }
          },
      tableSize: computed(() => store.state.settings.tableSize),
      selectedRowKeys: []
    })

    const queryParams = reactive({
      pageSize: props.pageSize,
      current: 1,
      sorter: {},
      filters: {},
      query: {},
      other: {}
    })

    const methods = reactive({
      getData: async () => {
        tableData.loading = true

        var queryData = {}
        queryData.current = queryParams.current
        queryData.pageSize = queryParams.pageSize

        Object.assign(
          queryData,
          queryParams.sorter,
          queryParams.query,
          queryParams.filters,
          queryParams.other
        )

        await props.api(queryData, props.defaultValue).then(res => {
          tableData.pagination.total = res.data.total
          dataSource.value = res.data.items
          tableData.loading = false
        })

        return true
      },
      handleTableChange: (pagination, filters, sorter) => {
        tableData.pagination.current = queryParams.current = pagination.current

        delete sorter.column && delete sorter.columnKey
        !sorter.order && delete sorter.field
        queryParams.sorter = sorter

        for (let item in filters) {
          filters[item] = filters[item].toString()
        }
        queryParams.filters = filters

        methods.getData()
      },
      onSelectChange: selectedRowKeys => {
        tableData.selectedRowKeys = selectedRowKeys
      },
      refresh: async (query, other) => {
        queryParams.query = query
        queryParams.other = other
        await methods.getData()
        return true
      },
      reset: async (query, other) => {
        tableData.pagination.current = queryParams.current = 1
        queryParams.query = query
        queryParams.other = other
        await methods.getData()
        return true
      }
    })

    methods.getData()

    return {
      dataSource,
      ...toRefs(tableData),
      ...toRefs(methods)
    }
  }
}
</script>
<style scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
