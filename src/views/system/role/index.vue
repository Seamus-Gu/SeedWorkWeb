<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-14 15:42:40
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-24 14:34:22
 * @Description: 角色页面
-->
<template>
  <div class="role-container">
    <el-row>
      <el-col :span="24">
        <Panel>
          <QueryForm
            :filters="filters"
            :schema="columns"
            :queryLoad="queryLoad"
            :resetLoad="resetLoad"
            @query="query"
            @reset="reset"
          ></QueryForm>
        </Panel>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Panel>
          <ToolBar
            :hasExport="true"
            :addPer="['system:role:add']"
            :exportPer="['system:role:export']"
            @add="showForm"
            @refresh="refresh"
            @exportExcel="exportExcel"
          >
          </ToolBar>
          <Table
            idName="roleId"
            :columns="columns"
            :api="getRoleList"
            ref="tableRef"
          >
            <template #roleStatus="{ text }">
              <el-tag :color="text === '0' ? 'green' : 'red'">{{
                text === '0' ? '正常' : '停用'
              }}</el-tag>
            </template>
            <template #action="{ record }">
              <a v-has="['system:role:edit']" @click="edit(record.roleId)"
                >修改</a
              >
              <el-divider type="vertical" />
              <a v-has="['system:role:remove']" @click="del(record.roleId)">
                删除
              </a>
            </template>
          </Table>
        </Panel>
      </el-col>
    </el-row>
    <Form
      ref="formRef"
      :visible="formVisible"
      :schema="schema"
      :formState="formState"
      :rules="formRules"
      :title="formTitle"
      :confirmLoading="confirmLoading"
      @ok="submit"
      @cancel="cancel"
    >
      <template #menuIds>
        <el-col :span="24">
          <el-form-item
            label="菜单权限"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
            name="menuIds"
          >
            <el-row style="margin-bottom: 8px; margin-top: 5px">
              <el-checkbox v-model:checked="menuExpend" @change="onMenuExpend">
                展开/折叠
              </el-checkbox>
              <el-checkbox v-model:checked="menuCheck" @change="onMenuCheck">
                全选/全不选
              </el-checkbox>
              <el-checkbox v-model:checked="menuLinkage">
                父子联动
              </el-checkbox>
            </el-row>
            <Panel height="300px" :scrollY="true">
              <Tree
                ref="menuSelectRef"
                :showSearch="false"
                :api="getMenuTreeSelect"
                :checkable="true"
                :checkStrictly="!menuLinkage"
                v-model:checkedKeys="formState.menuIds"
              >
              </Tree>
            </Panel>
          </el-form-item>
        </el-col>
      </template>
    </Form>
  </div>
</template>
<script>
import {
  getRoleList,
  getRoleById,
  addRole,
  updateRole,
  delRole,
  exportRoleList
} from '@/api/system/role'

import { getMenuTreeSelect, getRoleMenuList } from '@/api/system/menu'
import { Panel, Table, QueryForm, ToolBar, Form, Tree } from '@/components'

const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    sorter: true,
    component: 'input'
  },
  {
    title: '权限字符',
    dataIndex: 'roleKey',
    sorter: true,
    component: 'input'
  },
  {
    title: '状态',
    dataIndex: 'roleStatus',
    slots: { customRender: 'roleStatus' },
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
    title: '角色顺序',
    dataIndex: 'orderNum',
    sorter: true,
    hideInSearch: true
  },
  {
    title: '操作',
    slots: {
      customRender: 'action'
    },
    hideInSearch: true
  }
]

const schema = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    component: 'input'
  },
  {
    title: '权限标识',
    dataIndex: 'roleKey',
    component: 'input'
  },
  {
    title: '角色状态',
    dataIndex: 'roleStatus',
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
    title: '角色顺序',
    dataIndex: 'orderNum',
    component: 'input'
  },
  {
    title: '菜单权限',
    dataIndex: 'menuIds',
    span: 24
  }
]

const formRules = {
  roleName: [
    {
      required: true,
      message: '角色名必须填写',
      trigger: 'blur'
    }
  ],
  roleKey: [
    {
      required: true,
      message: '权限标识必须填写',
      trigger: 'blur'
    }
  ],
  roleSort: [
    {
      required: true,
      message: '显示顺序必须填写',
      trigger: 'blur'
    }
  ]
}

export default defineComponent({
  components: { Panel, Table, QueryForm, ToolBar, Form, Tree },
  setup() {
    const { proxy } = getCurrentInstance()

    const tableData = reactive({
      getRoleList,
      filters: {},
      queryLoad: false,
      resetLoad: false,
      columns,
      tableRef: undefined
    })

    const formData = reactive({
      getMenuTreeSelect,
      formRef: undefined,
      formVisible: false,
      formTitle: '新增角色',
      schema: schema,
      formRules: formRules,
      confirmLoading: false,
      menuSelectRef: undefined,
      menuExpend: false,
      menuCheck: false,
      menuLinkage: true
    })

    const formState = reactive({
      roleName: undefined,
      roleKey: undefined,
      roleStatus: '0',
      orderNum: undefined,
      menuIds: undefined
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
      exportExcel: () => {
        exportRoleList().then(res => {
          let blob = new Blob([res], {
            type: 'application/vnd.ms-excel,charset=utf-8'
          })
          saveAs(blob, '用户列表.xlsx')
        })
      },
      refresh: () => {
        tableData.tableRef.refresh(tableData.filters)
      },
      resetForm: () => {
        Object.assign(formState, {
          roleId: undefined,
          roleName: undefined,
          roleKey: undefined,
          roleStatus: '0',
          orderNum: undefined,
          menuIds: undefined
        })
      },
      showForm: () => {
        formData.formTitle = '新增角色'
        formData.formVisible = true
      },
      cancel: () => {
        formData.formRef.resetFields()
        methods.resetForm()
        formData.formVisible = false
        formData.menuExpend = false
        formData.menuLinkage = true
        formData.menuCheck = false
      },
      edit: roleId => {
        formData.formTitle = '修改角色'
        getRoleById(roleId).then(res => {
          Object.assign(formState, res.data)
          getRoleMenuList(roleId, formData.menuCheck).then(res => {
            formState.menuIds = res.data
            formData.formVisible = true
          })
        })
      },
      submit: () => {
        formData.formRef.validate().then(() => {
          formData.confirmLoading = true
          if (formState.roleId) {
            updateRole(formState).then(res => {
              formData.confirmLoading = false
              tableData.tableRef.reset()
              methods.cancel()
            })
          } else {
            addRole(formState).then(res => {
              formData.confirmLoading = false
              tableData.tableRef.reset()
              formData.formVisible = false
            })
          }
        })
      },
      del: roleId => {
        proxy.$modal.del({
          onOk: resolve => {
            delRole(roleId)
              .then(() => {
                resolve()
                tableData.tableRef.reset(tableData.filters)
              })
              .catch(() => {
                resolve()
              })
          }
        })
      },
      onMenuExpend: () => {
        formData.menuSelectRef.allExpend(formData.menuExpend)
      },
      onMenuCheck: () => {
        formData.menuSelectRef.allCheckKeys(formData.menuCheck)
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
