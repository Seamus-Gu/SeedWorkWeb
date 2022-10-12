<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-14 15:42:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-27 16:02:17
 * @Description: 用户页面
-->
<template>
  <div class="user-container">
    <el-row :gutter="8">
      <el-col :span="6" class="dept-tree">
        <Panel :scrollX="true" class="tree-panel" height="calc(100% - 8px)">
          <!-- <Tree :api="getDeptTreeSelect" @select="selectTree"> </Tree> -->
        </Panel>
      </el-col>
      <el-col :span="18" class="user-table">
        <el-row>
          <el-col :span="24">
            <Panel>
              <QueryForm
                :filters="filters"
                :schema="querySchema"
                :queryLoad="queryLoad"
                :resetLoad="resetLoad"
                @query="handleQuery"
                @reset="handleReset"
              >
              </QueryForm>
            </Panel>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <Panel>
              <ToolBar
                :hasExport="true"
                :addPer="['system:user:add']"
                :exportPer="['system:user:export']"
                :columns="columns"
                @add="handleAdd"
                @refresh="handleRefresh"
                @exportExcel="handleExport"
              >
              </ToolBar>
              <Table ref="tableRef" :columns="columns" :api="getUserList">
                <template #userStatus="{ row }">
                  <el-tag :type="row.userStatus === '0' ? 'success' : 'danger'">
                    {{ row.userStatus === '0' ? '正常' : '停用' }}
                  </el-tag>
                </template>
                <template #action>
                  <el-button
                    v-has="['system:user:edit']"
                    link
                    type="primary"
                    size="small"
                    @click="handleEdit(record.userId)"
                  >
                    修改
                  </el-button>
                  <el-divider direction="vertical" />
                  <el-button
                    v-has="['system:user:remove']"
                    link
                    type="primary"
                    size="small"
                    @click="handleDelete(record.userId)"
                  >
                    删除
                  </el-button>
                  <el-divider direction="vertical" />
                  <el-button
                    v-has="['system:user:resetPwd']"
                    link
                    type="primary"
                    size="small"
                    @click="resetPwd(record)"
                  >
                    重置密码
                  </el-button>
                </template>
              </Table>
            </Panel>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <Form
      ref="formRef"
      :schema="formSchema"
      :visible="formVisible"
      :title="formTitle"
      :model="formState"
      :rules="formRules"
      @close="close"
    >
    </Form>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import {
  getUserList,
  getUser,
  addUser,
  editUser,
  delUser,
  resetPwd,
  exportUserList
} from '@/api/system/user'
import { getDeptTree } from '@/api/system/dept'
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
    dataIndex: 'userName',
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
    component: 'datePicker',
    componentProps: {
      type: 'daterange'
    }
  }
]

const columns = [
  {
    label: '用户名',
    dataIndex: 'userName',
    sortable: true
  },
  {
    label: '用户昵称',
    dataIndex: 'nickName',
    sortable: true
  },
  {
    label: '电话号码',
    dataIndex: 'phoneNumber',
    sortable: true
  },
  {
    label: '状态',
    dataIndex: 'userStatus',
    sortable: true
  },
  {
    label: '创建时间',
    dataIndex: 'createTime',
    sortable: true,
    formatter: row => {
      return dayjs(row.createTime).format('YYYY-MM-DD')
    }
  },
  {
    label: '操作',
    dataIndex: 'action',
    width: 200
  }
]

const formSchema = [
  {
    title: '用户账号',
    dataIndex: 'userName',
    component: 'input'
  },
  {
    title: '用户密码',
    dataIndex: 'password',
    component: 'input',
    componentProps: {
      showPassword: true
    }
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
    dataIndex: 'deptId',
    span: 24,
    component: 'treeSelect',
    componentProps: {
      checkStrictly: true,
      request: async () => {
        const res = await getDeptTree()
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
        // const res = await getRoleList()
        // res.data.items.filter(t => {
        //   t.value = t.roleId
        //   t.label = t.roleName
        //   return true
        // })
        // return res.data.items
      }
    }
  }
]

const formRules = {
  userName: [
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

export default {
  components: { Panel, Tree, Table, QueryForm, ToolBar, Form, Row, Col },
  setup() {
    const { proxy } = getCurrentInstance()

    const treeData = reactive({
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
      formSchema: formSchema,
      formRules: formRules,
      showPassword: true,
      confirmLoading: false
    })

    const formState = reactive({
      userName: undefined,
      password: '000000',
      nickName: undefined,
      code: undefined,
      phoneNumber: undefined,
      email: undefined,
      sex: undefined,
      userStatus: '0',
      deptId: undefined,
      roleIds: undefined
    })

    const methods = reactive({
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
            deptId: treeData.selectedId
          })
          .then(() => {
            tableData.queryLoad = false
          })
      },
      handleReset: () => {
        tableData.filters = {}
        tableData.resetLoad = true
        tableData.tableRef
          .reset(tableData.filters, {
            deptId: treeData.selectedId
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
      handleExport: () => {
        exportUserList().then(res => {
          let blob = new Blob([res], {
            type: 'application/vnd.ms-excel,charset=utf-8'
          })
          saveAs(blob, '用户列表.xlsx')
        })
      },
      handleRefresh: () => {
        tableData.tableRef.refresh(tableData.filters, {
          deptId: treeData.selectedId
        })
      },
      resetForm: () => {
        Object.assign(formState, {
          userId: undefined,
          userName: undefined,
          password: undefined,
          nickName: undefined,
          deptId: undefined,
          phoneNumber: undefined,
          email: undefined,
          sex: undefined,
          userStatus: '0',
          roleIds: undefined
        })
      },
      close: () => {
        formData.formRef.resetFields()
        methods.resetForm()
        formData.formVisible = false
      }

      // selectTree: key => {
      //   treeData.selectedId = key[0]
      //   tableData.tableRef.reset(tableData.filters, {
      //     deptId: treeData.selectedId
      //   })
      // },

      // handleEdit: userId => {
      //   formData.formTitle = '修改用户'
      //   getUser(userId).then(res => {
      //     formData.showPassword = false
      //     Object.assign(formState, res.data.user)
      //     formState.roleIds = res.data.roleIds
      //     formData.formVisible = true
      //   })
      // },
      // handleDelete: userId => {
      //   proxy.$modal.del({
      //     onOk: resolve => {
      //       delUser(userId)
      //         .then(() => {
      //           resolve()
      //           tableData.tableRef.reset(tableData.filters, {
      //             deptId: treeData.selectedId
      //           })
      //         })
      //         .catch(() => {
      //           resolve()
      //         })
      //     }
      //   })
      // },
      // resetPwd: entity => {
      //   Object.assign(formState, entity)
      //   proxy.$modal.confirm({
      //     content: '确认要重置密码吗？',
      //     onOk: resolve => {
      //       resetPwd(formState)
      //         .then(() => {
      //           resolve()
      //         })
      //         .catch(() => {
      //           resolve()
      //         })
      //     }
      //   })
      // },
      // submitForm: () => {
      //   formData.formRef.validate().then(() => {
      //     formData.confirmLoading = true
      //     if (formState.userId) {
      //       editUser(formState).then(() => {
      //         formData.confirmLoading = false
      //         tableData.tableRef.reset()
      //         methods.cancel()
      //       })
      //     } else {
      //       addUser(formState).then(() => {
      //         formData.confirmLoading = false
      //         tableData.tableRef.reset()
      //         methods.cancel()
      //       })
      //     }
      //   })
      // }
    })

    return {
      formState,
      ...toRefs(treeData),
      ...toRefs(tableData),
      ...toRefs(formData),
      ...toRefs(methods)
    }
  }
}
</script>
<style lang="scss" scoped></style>
