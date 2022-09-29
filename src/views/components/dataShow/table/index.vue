<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-25 15:32:41
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-27 09:17:31
 * @Description: file content
-->
<template>
  <div class="table-container">
    <el-row>
      <a-col :span="24">
        <Panel>
          <Table :columns="columns"> </Table>
        </Panel>
      </a-col>
    </el-row>
  </div>
</template>
<script>
import { Panel, Table } from '@/components'

const columns = [
  {
    title: '序号',
    fixed: 'left',
    dataIndex: 'orderNum',
    sorter: true,
    component: 'input'
  },
  {
    title: '标题',
    dataIndex: 'first',
    sorter: true,
    component: 'input'
  },
  {
    title: '名称',
    dataIndex: 'middle',
    sorter: true,
    component: 'input'
  },
  {
    title: '评分',
    dataIndex: 'rate',
    sorter: true,
    slots: {
      customRender: 'rate'
    },
    component: 'input'
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    align: 'center',
    slots: {
      customRender: 'avatar'
    },
    hideInSearch: true
  },
  {
    title: '开关',
    dataIndex: 'switch',
    align: 'center',
    slots: {
      customRender: 'switch'
    },
    component: 'input'
  },
  {
    title: '标签',
    dataIndex: 'tag',
    align: 'center',
    slots: {
      customRender: 'tag'
    },
    component: 'input'
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    align: 'center',
    slots: {
      customRender: 'action'
    },
    hideInSearch: true
  }
]

export default defineComponent({
  components: { Panel, Table },
  setup() {
    const tableData = reactive({
      filters: {},
      queryLoad: false,
      resetLoad: false,
      columns,
      tableRef: undefined,
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          checkedModal.selectedRowKeys = selectedRowKeys
        }
      }
    })

    const methods = reactive({
      query: () => {
        tableData.queryLoad = true
        tableData.tableRef.reset(tableData.filters).then(() => {
          tableData.queryLoad = false
        })
      },
      reset: () => {
        tableData.filters = {}
        tableData.resetLoad = true
        tableData.tableRef.reset(tableData.filters).then(() => {
          tableData.resetLoad = false
        })
      },
      refresh: () => {
        tableData.tableRef.refresh(tableData.filters)
      },
      showChecked: () => {
        checkedModal.checkedVisible = true
      },
      checkedCancel: () => {
        checkedModal.checkedVisible = false
      }
    })

    return {
      ...toRefs(tableData),
      ...toRefs(methods)
    }
  }
})
</script>
<style lang="scss" scoped></style>
