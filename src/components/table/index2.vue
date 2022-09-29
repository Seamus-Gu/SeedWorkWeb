<!--
 * @Description: 
 * @Autor: Gu
 * @Date: 2022-01-06 09:53:45
-->
<template>
  <a-table
    :tableLayout="tableLayout"
    class="ant-table-striped"
    :columns="columns.filter(t => t.visible != false)"
    :dataSource="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
    :rowKey="record => record[idName]"
    :scroll="scroll"
    :row-selection="rowSelection"
    :rowClassName="
      stripe == true
        ? (record, index) => (index % 2 === 1 ? 'table-striped' : null)
        : index => index
    "
    :size="tableSize"
    :bordered="bordered"
  >
    <template
      v-for="slot in columns.filter(t => t.slots).map(t => t.slots)"
      #[slot.customRender]="slotData"
    >
      <slot
        :name="slot.customRender"
        :record="slotData.record"
        :text="slotData.text"
      />
    </template>
  </a-table>
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
    selection: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
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
      type: Object,
      required: true
    },
    scroll: {
      type: Object
    },
    defaultValue: {
      type: Object
    },
    rowSelection: {
      type: Object
    },
    api: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    //数据源
    const dataSource = ref()

    const tableData = reactive({
      loading: false,
      pagination: {
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
})
</script>
<style scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
