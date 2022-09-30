<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-25 15:32:41
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-27 09:17:31
 * @Description: file content
-->
<template>
  <div class="table-container">
    <el-row style="margin-bottom: 8px">
      <el-col :span="24">
        <el-button type="primary"> 修改 </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Panel>
          <Table :api="getList" :columns="columns">
            <template #column5="{ row }">
              <el-tag :type="row.column5 === 'nice' ? 'success' : 'danger'">
                {{ row.column5 === 'nice' ? '正常' : '停用' }}
              </el-tag>
            </template>
            <template #rate="{ row }">
              <el-rate v-model="row.rate" disabled />
            </template>
            <template #column9="{ row }">
              <el-image :src="row.column9"></el-image>
            </template>
            <template #column10="{ row }">
              <el-switch
                v-model="row.column10"
                activeValue="0"
                inactiveValue="1"
                disabled
              />
            </template>
            <template #action>
              <el-button link type="primary" size="small"> 修改 </el-button>
              <el-divider direction="vertical" />
              <el-button link type="primary" size="small"> 删除 </el-button>
            </template>
          </Table>
        </Panel>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getList } from '@/api/examples/data-show'
import { Panel, Table } from '@/components'

const columns = [
  {
    label: '序号',
    type: 'index',
    width: 80
  },
  {
    label: '列1',
    dataIndex: 'column1'
  },
  {
    label: '列2',
    dataIndex: 'column2'
  },
  {
    label: '列3',
    dataIndex: 'column3'
  },
  {
    label: '列5',
    dataIndex: 'column5'
  },
  {
    label: '评分',
    dataIndex: 'rate'
  },
  {
    label: '图片',
    dataIndex: 'column9'
  },
  {
    label: '电话',
    dataIndex: 'phoneNumber'
  },
  {
    label: '列6',
    dataIndex: 'column10'
  },
  {
    label: '操作',
    dataIndex: 'action'
  }
]

export default defineComponent({
  components: { Panel, Table },
  setup() {
    const tableData = reactive({
      getList,
      columns
    })

    const tableProps = reactive({})

    const methods = reactive({})

    return {
      ...toRefs(tableData),
      ...toRefs(methods)
    }
  }
})
</script>
<style lang="scss" scoped></style>
