<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-14 15:42:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-27 16:01:13
 * @Description: 组织页面
-->
<template>
  <div class="orgainzation-container">
    <a-row>
      <a-col :span="24">
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
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <Panel>
          <ToolBar
            :hasExpent="true"
            :addPer="['system:organization:add']"
            :columns="columns"
            @add="handleAdd"
            @expend="toggleExpandAll"
            @refresh="refresh"
          />
          <TreeTable
            ref="tableRef"
            idName="organizationId"
            :columns="columns"
            :api="getOrganizationTree"
          >
            <template #organizationStatus="{ text }">
              <a-tag :color="text === '0' ? 'green' : 'red'">
                {{ text === '0' ? '正常' : '停用' }}
              </a-tag>
            </template>
            <template #action="{ record }">
              <span>
                <a
                  v-has="['system:organization:add']"
                  @click="handleAdd(record.organizationId)"
                >
                  新增
                </a>
                <a-divider type="vertical" />
                <a
                  v-has="['system:organization:edit']"
                  @click="handleEdit(record.organizationId)"
                  >修改</a
                >
                <a-divider type="vertical" />
                <a
                  v-has="['system:organization:remove']"
                  @click="handleDelete(record.organizationId)"
                >
                  删除
                </a>
              </span>
            </template>
          </TreeTable>
        </Panel>
      </a-col>
    </a-row>
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
  getOrganizationTree,
  getOrganizationTreeSelect,
  getNextOrderNum,
  getOrganization,
  addOrganization,
  editOrganization,
  delOrganization
} from '@/api/system/organization'

const querySchema = [
  {
    title: '组织名称',
    dataIndex: 'title',
    component: 'input'
  },
  {
    title: '状态',
    dataIndex: 'organizationStatus',
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
    dataIndex: 'organizationStatus',
    slots: { customRender: 'organizationStatus' },
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
        const res = await getOrganizationTreeSelect()
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
    dataIndex: 'organizationStatus',
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
  organizationStatus: [
    {
      required: true,
      message: '组织状态必须填写',
      trigger: 'blur'
    }
  ]
}

export default defineComponent({
  components: { Panel, TreeTable, QueryForm, Form, ToolBar },
  setup() {
    const { proxy } = getCurrentInstance()

    const tableData = reactive({
      getOrganizationTree,
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
      organizationStatus: '0'
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
      handleAdd: organizationId => {
        getNextOrderNum().then(res => {
          formState.orderNum = res.data
          formData.formVisible = true
        })

        formData.formTitle = '新增组织'
        if (organizationId) {
          formState.parentId = organizationId
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
          organizationId: undefined,
          title: undefined,
          parentId: undefined,
          organizationStatus: '0',
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
      handleEdit: organizationId => {
        formData.formTitle = '修改组织'
        getOrganization(organizationId).then(res => {
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
      handleDelete: organizationId => {
        proxy.$modal.del({
          onOk: resolve => {
            delOrganization(organizationId)
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
          if (formState.organizationId) {
            editOrganization(formState).then(() => {
              tableData.tableRef.refresh()
              methods.cancel()
            })
          } else {
            addOrganization(formState).then(() => {
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
})
</script>
<style lang="scss" scoped></style>
