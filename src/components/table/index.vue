<!--
 * @Description: 
 * @Autor: Gu
 * @Date: 2022-01-06 09:53:45
-->
<template>
  <el-table
    v-loading="loading"
    :data="dataSource"
    :height="height"
    :maxHeight="maxHeight"
    :border="border"
    :size="tableSize"
    :fit="fit"
    :showHeader="showHeader"
    :highlightCurrentRow="highlightCurrentRow"
    @sortChange="sortChange"
  >
    <template
      v-for="item in columns.filter(t => t.visible != false)"
      :key="item.index"
    >
      <el-table-column
        :type="item.type"
        :label="item.label"
        :prop="item.dataIndex"
        :width="item.width"
        :minWidth="item.minWidth"
        :fixed="item.fixed"
        :sortable="item.sortable ? 'custom' : false"
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
  <div class="table-pagination">
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :pageSize="pageSize"
      :background="true"
      @currentChange="currentChange"
    />
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: Number || String
    },
    maxHeight: {
      type: Number || String
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    fit: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    api: {
      type: Function,
      required: true
    },
    columns: {
      type: Object,
      required: true
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  setup(props) {
    const store = useStore()

    const dataSource = ref()

    const tableData = reactive({
      loading: false
    })

    const paginationData = reactive({
      current: undefined,
      total: undefined
    })

    const queryParams = reactive({
      pageSize: props.pageSize,
      current: 1,
      sorter: {},
      query: {},
      other: {}
    })

    const methods = reactive({
      getData: async () => {
        tableData.loading = true

        const queryData = {}
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
          paginationData.total = res.data.total
          dataSource.value = res.data.items
          tableData.loading = false
        })

        return true
      },
      currentChange: current => {
        queryParams.current = current

        methods.getData()
      },
      sortChange: sortData => {
        queryParams.sorter = sorter

        methods.getData()
        debugger
      }
    })

    methods.getData()

    return {
      dataSource,
      ...toRefs(tableData),
      ...toRefs(paginationData),
      ...toRefs(methods)
    }
  }
}
</script>
<style scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
.table-pagination .el-pagination {
  margin: 8px 0 8px 0;
  float: right;
}
</style>
