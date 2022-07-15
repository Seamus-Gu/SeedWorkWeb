<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-14 15:42:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-27 16:02:17
 * @Description: 用户页面
-->
<template>
  <div class="user-container">
    <Row>
      <Col :span="6" class="dept-tree">
        <Panel :scrollX="true" class="tree-panel" height="calc(100% - 8px)">
          <Tree :api="getOrganizationTreeSelect" @select="selectTree"> </Tree>
        </Panel>
      </Col>
      <Col :span="18" class="user-table">
        <Row>
          <Col :span="24">
            <Panel>
              <QueryForm
                :filters="filters"
                :schema="querySchema"
                :queryLoad="queryLoad"
                :resetLoad="resetLoad"
                @query="handleQuery"
                @reset="resetQuery"
              >
              </QueryForm>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
            <Panel>
              <ToolBar
                :hasExport="true"
                :addPer="['system:user:add']"
                :exportPer="['system:user:export']"
                :columns="columns"
                @add="handleAdd"
                @refresh="refresh"
                @exportExcel="exportExcel"
              >
              </ToolBar>
              <Table
                idName="userId"
                :columns="columns"
                :api="getUserList"
                ref="tableRef"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.dataIndex === 'userStatus'">
                    <a-tag :color="record.userStatus === '0' ? 'green' : 'red'">
                      {{ record.userStatus === '0' ? '正常' : '停用' }}
                    </a-tag>
                  </template>
                  <template v-else-if="column.dataIndex === 'action'">
                    <a
                      v-has="['system:user:edit']"
                      @click="handleEdit(record.userId)"
                    >
                      修改
                    </a>
                    <a-divider type="vertical" />
                    <a
                      v-has="['system:user:remove']"
                      @click="handleDelete(record.userId)"
                    >
                      删除
                    </a>
                    <a-divider type="vertical" />
                    <a
                      v-has="['system:user:resetPwd']"
                      @click="resetPwd(record)"
                    >
                      重置密码
                    </a>
                  </template>
                </template>
              </Table>
            </Panel>
          </Col>
        </Row>
      </Col>
    </Row>
    <Form
      ref="formRef"
      :visible="formVisible"
      :schema="schema"
      :formState="formState"
      :rules="formRules"
      :title="formTitle"
      :confirmLoading="confirmLoading"
      @ok="submitForm"
      @cancel="cancel"
    >
      <template v-if="showPassword" #password>
        <a-col :span="12">
          <a-form-item
            label="用户密码"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
            name="password"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="请输入密码"
              autocomplete="off"
            ></a-input-password>
          </a-form-item>
        </a-col>
      </template>
    </Form>
  </div>
</template>
<script>
import {
  getUserList,
  getUser,
  addUser,
  editUser,
  delUser,
  resetPwd,
  exportUserList
} from '@/api/system/user'
import { getRoleList } from '@/api/system/role'
import { getOrganizationTreeSelect } from '@/api/system/organization'
import lodash from 'lodash'

import {
  Panel,
  Tree,
  Table,
  QueryForm,
  ToolBar,
  Form,
  Row,
  Col
} from '@/components'

const querySchema = [
  {
    title: '用户名',
    dataIndex: 'username',
    component: 'input'
  },
  {
    title: '用户昵称',
    dataIndex: 'nickName',
    component: 'input'
  },
  {
    title: '电话号码',
    dataIndex: 'phoneNumber',
    component: 'input'
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    component: 'select',
    componentProps: {
      options: [
        {
          value: '1',
          label: '禁用'
        },
        {
          value: '0',
          label: '启用'
        }
      ]
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    component: 'rangePicker'
  }
]

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    sorter: true
  },
  {
    title: '用户昵称',
    dataIndex: 'nickName',
    sorter: true
  },
  {
    title: '电话号码',
    width: 150,
    dataIndex: 'phoneNumber',
    sorter: true
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    sorter: true
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200
  }
]

const schema = [
  {
    title: '用户账号',
    dataIndex: 'username',
    component: 'input'
  },
  {
    title: '用户密码',
    dataIndex: 'password'
  },
  {
    title: '用户名称',
    dataIndex: 'nickName',
    component: 'input'
  },
  {
    title: '用户编号',
    dataIndex: 'code',
    component: 'input'
  },

  {
    title: '手机号码',
    dataIndex: 'phoneNumber',
    component: 'input'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    component: 'input'
  },
  {
    title: '用户性别',
    dataIndex: 'sex',
    component: 'select',
    componentProps: {
      options: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '0',
          label: '女'
        }
      ]
    }
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',
    component: 'select',
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
    title: '所属组织',
    dataIndex: 'organizationId',
    span: 24,
    component: 'treeSelect',
    componentProps: {
      request: async () => {
        const res = await getOrganizationTreeSelect()
        return res.data
      }
    }
  },
  {
    title: '角色',
    dataIndex: 'roleIds',
    span: 24,
    component: 'multiple',
    componentProps: {
      request: async () => {
        const res = await getRoleList()
        res.data.items.filter(t => {
          t.value = t.roleId
          t.label = t.roleName
          return true
        })
        return res.data.items
      }
    }
  }
]

const formRules = {
  username: [
    {
      required: true,
      message: '用户名必须填写',
      trigger: 'blur'
    },
    {
      min: 2,
      max: 20,
      message: '用户名称长度必须介于 2 和 20 之间',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码必须填写',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 20,
      message: '用户密码长度必须介于 5 和 20 之间',
      trigger: 'blur'
    }
  ],
  nickName: [
    {
      required: true,
      message: '用户昵称必须填写',
      trigger: 'blur'
    }
  ],
  phoneNumber: [
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  email: [
    {
      type: 'email',
      message: "'请输入正确的邮箱地址",
      trigger: ['blur', 'change']
    }
  ]
}

export default defineComponent({
  components: { Panel, Tree, Table, QueryForm, ToolBar, Form, Row, Col },
  setup() {
    const { proxy } = getCurrentInstance()

    const treeData = reactive({
      getOrganizationTreeSelect,
      selectedId: undefined
    })

    const tableData = reactive({
      getUserList,
      filters: {},
      queryLoad: false,
      resetLoad: false,
      columns,
      querySchema,
      tableRef: undefined
    })

    const formData = reactive({
      formRef: undefined,
      formVisible: false,
      formTitle: '新增用户',
      schema: schema,
      formRules: formRules,
      showPassword: true,
      confirmLoading: false
    })

    const formState = reactive({
      username: undefined,
      password: undefined,
      nickName: undefined,
      code: undefined,
      phoneNumber: undefined,
      email: undefined,
      sex: undefined,
      userStatus: '0',
      organizationId: undefined,
      roleIds: undefined
    })

    const methods = reactive({
      selectTree: key => {
        treeData.selectedId = key[0]
        tableData.tableRef.reset(tableData.filters, {
          organizationId: treeData.selectedId
        })
      },
      getFilterData: filters => {
        let data = {}
        if (!filters.createTime) {
          data = filters
        } else {
          data = lodash.cloneDeep(filters)
          let params = {}
          params['beginTime'] = data.createTime[0]
          params['endTime'] = data.createTime[1]
          delete data.createTime
          data.params = params
        }

        return data
      },
      handleQuery: () => {
        tableData.queryLoad = true
        tableData.tableRef
          .reset(methods.getFilterData(tableData.filters), {
            organizationId: treeData.selectedId
          })
          .then(() => {
            tableData.queryLoad = false
          })
      },
      resetQuery: () => {
        tableData.filters = {}
        tableData.resetLoad = true
        tableData.tableRef
          .reset(tableData.filters, {
            organizationId: treeData.selectedId
          })
          .then(() => {
            tableData.resetLoad = false
          })
      },
      handleAdd: () => {
        formData.formTitle = '新增用户'
        formData.showPassword = true
        formData.formVisible = true
      },
      exportExcel: () => {
        exportUserList().then(res => {
          let blob = new Blob([res], {
            type: 'application/vnd.ms-excel,charset=utf-8'
          })
          saveAs(blob, '用户列表.xlsx')
        })
      },
      refresh: () => {
        tableData.tableRef.refresh(tableData.filters, {
          organizationId: treeData.selectedId
        })
      },
      resetForm: () => {
        Object.assign(formState, {
          userId: undefined,
          username: undefined,
          password: undefined,
          nickName: undefined,
          organizationId: undefined,
          phoneNumber: undefined,
          email: undefined,
          sex: undefined,
          userStatus: '0',
          roleIds: undefined
        })
      },
      cancel: () => {
        formData.formRef.resetFields()
        methods.resetForm()
        formData.formVisible = false
      },
      handleEdit: userId => {
        formData.formTitle = '修改用户'
        getUser(userId).then(res => {
          formData.showPassword = false
          Object.assign(formState, res.data.user)
          formState.roleIds = res.data.roleIds
          formData.formVisible = true
        })
      },
      handleDelete: userId => {
        proxy.$modal.del({
          onOk: resolve => {
            delUser(userId)
              .then(() => {
                resolve()
                tableData.tableRef.reset(tableData.filters, {
                  organizationId: treeData.selectedId
                })
              })
              .catch(() => {
                resolve()
              })
          }
        })
      },
      resetPwd: entity => {
        Object.assign(formState, entity)
        proxy.$modal.confirm({
          content: '确认要重置密码吗？',
          onOk: resolve => {
            resetPwd(formState)
              .then(() => {
                resolve()
              })
              .catch(() => {
                resolve()
              })
          }
        })
      },
      submitForm: () => {
        formData.formRef.validate().then(() => {
          formData.confirmLoading = true
          if (formState.userId) {
            editUser(formState).then(() => {
              formData.confirmLoading = false
              tableData.tableRef.reset()
              methods.cancel()
            })
          } else {
            addUser(formState).then(() => {
              formData.confirmLoading = false
              tableData.tableRef.reset()
              methods.cancel()
            })
          }
        })
      }
    })

    return {
      formState,
      ...toRefs(treeData),
      ...toRefs(tableData),
      ...toRefs(formData),
      ...toRefs(methods)
    }
  }
})
</script>
<style lang="scss" scoped></style>
