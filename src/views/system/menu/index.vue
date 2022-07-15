<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-14 15:42:40
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-20 15:31:46
 * @Description: 菜单页面
-->
<template>
  <div class="orgainzation-container">
    <a-row>
      <a-col :span="24">
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
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <Panel>
          <ToolBar
            :hasExpent="true"
            :addPer="['system:menu:add']"
            @add="showForm"
            @expend="expendTable"
            @refresh="refresh"
          >
          </ToolBar>
          <TreeTable
            ref="tableRef"
            idName="menuId"
            :columns="columns"
            :api="getMenuList"
          >
            <template #menuStatus="{ text }">
              <a-tag :color="text === '0' ? 'green' : 'blue'">
                {{ text === '0' ? '正常' : '隐藏' }}
              </a-tag>
            </template>
            <template #action="{ record }">
              <a v-has="['system:menu:add']" @click="add(record)">新增</a>
              <a-divider type="vertical" />
              <a v-has="['system:menu:edit']" @click="edit(record.menuId)">
                修改
              </a>
              <a-divider type="vertical" />
              <a v-has="['system:menu:remove']" @click="del(record.menuId)">
                删除
              </a>
            </template>
          </TreeTable>
        </Panel>
      </a-col>
    </a-row>
    <Form
      ref="formRef"
      :visible="formVisible"
      :schema="schema"
      :formState="formState"
      :rules="formRules"
      :title="formTitle"
      @ok="submit"
      @cancel="cancel"
    >
      <template #icon>
        <a-col :span="12">
          <a-form-item
            label="菜单图标"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
            name="icon"
          >
            <IconSelect @changeIcon="changeIcon">
              <a-input
                v-model:value="formState.icon"
                placeholder="请选择图标"
              ></a-input>
            </IconSelect>
          </a-form-item>
        </a-col>
      </template>
    </Form>
  </div>
</template>
<script>
import TreeTable from '@/components/table/TreeTable.vue'
import { Panel, QueryForm, ToolBar, Form } from '@/components'
import IconSelect from '@/components/select/IconSelect'
import {
  getMenuList,
  getMenuById,
  getMenuTreeSelect,
  addMenu,
  editMenu,
  delMenu
} from '@/api/system/menu'

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    sorter: true,
    component: 'input'
  },
  {
    title: '图标',
    dataIndex: 'icon',
    component: 'input',
    hideInSearch: true
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    component: 'input',
    hideInSearch: true
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    component: 'input',
    hideInSearch: true
  },
  {
    title: '状态',
    dataIndex: 'menuStatus',
    slots: { customRender: 'menuStatus' },
    component: 'select',
    componentProps: {
      options: [
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '隐藏'
        },
        {
          value: '2',
          label: '停用'
        }
      ]
    }
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
    title: '菜单名称',
    dataIndex: 'title',
    component: 'input'
  },
  {
    title: '菜单状态',
    dataIndex: 'menuStatus',
    component: 'select',
    componentProps: {
      options: [
        {
          value: '1',
          label: '隐藏'
        },
        {
          value: '0',
          label: '启用'
        }
      ]
    }
  },
  {
    title: '路由地址',
    dataIndex: 'path',
    component: 'input'
  },
  {
    title: '菜单顺序',
    dataIndex: 'orderNum',
    component: 'inputNumber'
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    component: 'input'
  },
  {
    title: '菜单图标',
    dataIndex: 'icon'
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    component: 'radio',
    span: 24,
    componentProps: {
      radios: [
        {
          title: '目录',
          value: 'M'
        },
        {
          title: '菜单',
          value: 'C'
        },
        {
          title: '按钮',
          value: 'F'
        }
      ]
    }
  },
  {
    title: '上级菜单',
    dataIndex: 'parentId',
    component: 'treeSelect',
    span: 24,
    componentProps: {
      request: async () => {
        const res = await getMenuTreeSelect()
        return res.data
      }
    }
  },
  {
    title: '权限字符',
    dataIndex: 'permission',
    component: 'input'
  },
  {
    title: '是否缓存',
    dataIndex: 'isCache',
    component: 'select',
    componentProps: {
      options: [
        {
          value: '0',
          label: '是'
        },
        {
          value: '1',
          label: '否'
        }
      ]
    }
  }
]

const formRules = {
  title: [
    {
      required: true,
      message: '菜单名称必须填写',
      trigger: 'blur'
    }
  ],
  menuStatus: [
    {
      required: true,
      message: '菜单状态必须填写',
      trigger: 'blur'
    }
  ],
  orderNum: [
    {
      required: true,
      message: '菜单顺序必须填写',
      trigger: 'blur',
      type: 'number'
    }
  ],
  path: [
    {
      required: true,
      message: '路由地址必须填写',
      trigger: 'blur'
    }
  ]
}

export default defineComponent({
  components: { Panel, TreeTable, QueryForm, Form, ToolBar, IconSelect },
  setup() {
    const { proxy } = getCurrentInstance()

    const treeTableData = reactive({
      getMenuList,
      filters: {},
      queryLoad: false,
      resetLoad: false,
      isExpend: false,
      columns,
      tableRef: undefined
    })

    const formData = reactive({
      formVisible: false,
      formTitle: undefined,
      schema: schema,
      formRules: formRules,
      formRef: undefined
    })

    const formState = reactive({
      title: undefined,
      menuStatus: '0',
      path: undefined,
      orderNum: undefined,
      component: undefined,
      icon: undefined,
      parentId: undefined,
      menuType: 'M',
      permission: undefined,
      isCache: undefined
    })

    const methods = reactive({
      query: () => {
        treeTableData.queryLoad = true
        treeTableData.tableRef.refresh(treeTableData.filters).then(() => {
          treeTableData.queryLoad = false
        })
      },
      reset: () => {
        treeTableData.filters = {}
        treeTableData.resetLoad = true
        treeTableData.tableRef.refresh(treeTableData.filters).then(() => {
          treeTableData.resetLoad = false
        })
      },
      expendTable: () => {
        treeTableData.isExpend = !treeTableData.isExpend
        treeTableData.tableRef.allExpend(treeTableData.isExpend)
      },
      refresh: () => {
        treeTableData.tableRef.refresh()
      },
      resetForm: () => {
        Object.assign(formState, {
          menuId: undefined,
          title: undefined,
          menuStatus: '0',
          path: undefined,
          orderNum: undefined,
          component: undefined,
          icon: undefined,
          parentId: undefined,
          menuType: 'M',
          permission: undefined,
          isCache: undefined
        })
      },
      showForm: () => {
        formData.formTitle = '新增菜单'
        formData.formVisible = true
      },
      cancel: () => {
        formData.formRef.resetFields()
        methods.resetForm()
        formData.formVisible = false
      },
      changeIcon: val => {
        formState.icon = val
      },
      add: entity => {
        formData.formTitle = '新增菜单'
        formState.permission = entity.permission + ':'
        formState.parentId = entity.menuId
        formData.formVisible = true
      },
      edit: menuId => {
        formData.formTitle = '修改菜单'
        getMenuById(menuId).then(res => {
          formData.showPassword = false
          Object.assign(formState, res.data)
          formData.formVisible = true
        })
      },
      del: menuId => {
        proxy.$modal.del({
          onOk: resolve => {
            delMenu(menuId)
              .then(() => {
                resolve()
                treeTableData.tableRef.refresh()
              })
              .catch(() => {
                resolve()
              })
          }
        })
      },
      submit: () => {
        formData.formRef.validate().then(() => {
          if (formState.menuId) {
            editMenu(formState).then(() => {
              treeTableData.tableRef.refresh()
              methods.cancel()
            })
          } else {
            addMenu(formState).then(() => {
              treeTableData.tableRef.refresh()
              methods.cancel()
            })
          }
        })
      }
    })

    return {
      formState,
      ...toRefs(treeTableData),
      ...toRefs(formData),
      ...toRefs(methods)
    }
  }
})
</script>
<style lang="scss" scoped></style>
