<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-14 15:42:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-27 16:01:13
 * @Description: 组织页面
-->
<template>
  <div class="orgainzation-container">
    <el-row>
      <el-col :span="24">
        <Panel>
          <QueryForm
            :filters="queryParams"
            :schema="querySchema"
            :queryLoad="queryLoad"
            :resetLoad="resetLoad"
            @query="handleQuery"
            @reset="resetQuery"
          />
        </Panel>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Panel>
          <ToolBar
            :hasExpent="true"
            :addPer="['system:dept:add']"
            :columns="columns"
            @add="handleAdd"
            @expend="toggleExpandAll"
            @refresh="refresh"
          />
          <TreeTable
            ref="tableRef"
            idName="deptId"
            :columns="columns"
            :api="getdeptTree"
          >
            <template #deptStatus="{ text }">
              <el-tag :color="text === '0' ? 'green' : 'red'">
                {{ text === '0' ? '正常' : '停用' }}
              </el-tag>
            </template>
            <template #action="{ record }">
              <span>
                <a
                  v-has="['system:dept:add']"
                  @click="handleAdd(record.deptId)"
                >
                  新增
                </a>
                <el-divider type="vertical" />
                <a
                  v-has="['system:dept:edit']"
                  @click="handleEdit(record.deptId)"
                  >修改</a
                >
                <el-divider type="vertical" />
                <a
                  v-has="['system:dept:remove']"
                  @click="handleDelete(record.deptId)"
                >
                  删除
                </a>
              </span>
            </template>
          </TreeTable>
        </Panel>
      </el-col>
    </el-row>
    <Form
      ref="formRef"
      :visible="formVisible"
      :schema="formSchema"
      :formState="formState"
      :rules="formRules"
      :title="formTitle"
      @ok="submitForm"
      @cancel="cancel"
    >
    </Form>
  </div>
</template>
<script>
import TreeTable from '@/components/table/TreeTable.vue'
import { Panel, QueryForm, ToolBar, Form } from '@/components'
import {
  getdeptTree,
  getdeptTreeSelect,
  getNextOrderNum,
  getdept,
  adddept,
  editdept,
  deldept
} from '@/api/system/dept'

const querySchema = [
  {
    title: '组织名称',
    dataIndex: 'title',
    component: 'input'
  },
  {
    title: '状态',
    dataIndex: 'deptStatus',
    component: 'select',
    componentProps: {
      options: [
        {
          value: '0',
          label: '正常'
        },
        {
          value: '1',
          label: '停用'
        }
      ]
    }
  }
]

const columns = [
  {
    title: '组织名称',
    dataIndex: 'title',
    component: 'input'
  },
  {
    title: '状态',
    dataIndex: 'deptStatus',
    slots: { customRender: 'deptStatus' },
    component: 'select',
    componentProps: {
      options: [
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '禁用'
        }
      ]
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    slots: {
      customRender: 'action'
    },
    hideInSearch: true
  }
]

const formSchema = [
  {
    title: '上级部门',
    dataIndex: 'parentId',
    component: 'treeSelect',
    span: 24,
    componentProps: {
      request: async () => {
        const res = await getdeptTreeSelect()
        return res.data
      }
    }
  },
  {
    title: '组织名称',
    dataIndex: 'title',
    component: 'input',
    span: 24
  },
  {
    title: '组织状态',
    dataIndex: 'deptStatus',
    component: 'select',
    span: 12,
    componentProps: {
      options: [
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '停用'
        }
      ]
    }
  },
  {
    title: '显示顺序',
    dataIndex: 'orderNum',
    component: 'inputNumber',
    span: 12
  }
]

const formRules = {
  parentId: [
    {
      required: true,
      message: '上级部门必须填写',
      trigger: 'change'
    }
  ],
  title: [
    {
      required: true,
      message: '组织名称必须填写',
      trigger: 'blur'
    }
  ],
  deptStatus: [
    {
      required: true,
      message: '组织状态必须填写',
      trigger: 'blur'
    }
  ]
}

export default {
  components: { Panel, TreeTable, QueryForm, Form, ToolBar },
  setup() {
    const { proxy } = getCurrentInstance()

    const tableData = reactive({
      getdeptTree,
      queryParams: {},
      querySchema: querySchema,
      queryLoad: false,
      resetLoad: false,
      isExpend: false,
      columns: columns,
      tableRef: undefined
    })

    const formData = reactive({
      formVisible: false,
      formTitle: '新增组织',
      formSchema: formSchema,
      formRules: formRules,
      formRef: undefined
    })

    const formState = reactive({
      title: undefined,
      parentId: undefined,
      deptStatus: '0'
    })

    const methods = reactive({
      handleQuery: () => {
        tableData.queryLoad = true
        tableData.tableRef.refresh(tableData.queryParams).then(() => {
          tableData.queryLoad = false
        })
      },
      resetQuery: () => {
        tableData.queryParams = {}
        tableData.resetLoad = true
        tableData.tableRef.refresh(tableData.queryParams).then(() => {
          tableData.resetLoad = false
        })
      },
      handleAdd: deptId => {
        getNextOrderNum().then(res => {
          formState.orderNum = res.data
          formData.formVisible = true
        })

        formData.formTitle = '新增组织'
        if (deptId) {
          formState.parentId = deptId
        }
      },
      toggleExpandAll: () => {
        tableData.isExpend = !tableData.isExpend
        tableData.tableRef.allExpend(tableData.isExpend)
      },
      refresh: () => {
        tableData.tableRef.refresh()
      },
      resetForm: () => {
        Object.assign(formState, {
          deptId: undefined,
          title: undefined,
          parentId: undefined,
          deptStatus: '0',
          orderNum: undefined
        })

        tableData.isExpend = false
        formData.formSchema[0].visible = true
      },
      cancel: () => {
        formData.formRef.resetFields()
        methods.resetForm()
        formData.formVisible = false
      },
      handleEdit: deptId => {
        formData.formTitle = '修改组织'
        getdept(deptId).then(res => {
          if (res.data.parentId == '0') {
            formData.formSchema[0].visible = false
          }
          Object.assign(formState, res.data, {
            createBy: undefined,
            createTime: undefined,
            updateBy: undefined,
            updateTime: undefined
          })
          formData.formVisible = true
        })
      },
      handleDelete: deptId => {
        proxy.$modal.del({
          onOk: resolve => {
            deldept(deptId)
              .then(() => {
                resolve()
                tableData.tableRef.refresh()
              })
              .catch(() => {
                resolve()
              })
          }
        })
      },
      submitForm: () => {
        formData.formRef.validate().then(() => {
          if (formState.deptId) {
            editdept(formState).then(() => {
              tableData.tableRef.refresh()
              methods.cancel()
            })
          } else {
            adddept(formState).then(() => {
              tableData.tableRef.refresh()
              methods.cancel()
            })
          }
        })
      }
    })

    return {
      formState,
      ...toRefs(tableData),
      ...toRefs(formData),
      ...toRefs(methods)
    }
  }
}
</script>
<style lang="scss" scoped></style>
