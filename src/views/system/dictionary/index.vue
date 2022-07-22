<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-14 15:42:40
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-06-15 11:19:28
 * @Description: 字典页面
-->
<template>
  <div class="dictionary-container">
    <Row>
      <Col :span="6" class="type-tree">
        <Panel class="tree-panel" height="calc(100% - 8px)">
          <EditTree
            :api="getTypeTree"
            @select="selectTree"
            @rightClick="treeMenuClick"
          >
          </EditTree>
        </Panel>
      </Col>
      <Col :span="18" class="user-table">
        <Row>
          <Col :span="24">
            <Panel>
              <QueryForm
                :filters="filters"
                :schema="columns"
                :queryLoad="queryLoad"
                :resetLoad="resetLoad"
                @query="query"
                @reset="reset"
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
                :addPer="['system:dict:add']"
                :exportPer="['system:dict:export']"
                @add="showItemForm"
                @refresh="refresh"
                @exportExcel="exportExcel"
              >
              </ToolBar>
              <Table
                idName="itemId"
                :columns="columns"
                :api="getItemList"
                ref="tableRef"
              >
                <template #itemStatus="{ text }">
                  <el-tag :color="text === '0' ? 'green' : 'red'">{{
                    text === '0' ? '正常' : '停用'
                  }}</el-tag>
                </template>
                <template #action="{ record }">
                  <a
                    v-has="['system:dict:edit']"
                    @click="editItem(record.itemId)"
                  >
                    修改
                  </a>
                  <el-divider type="vertical" />
                  <a
                    v-has="['system:dict:remove']"
                    @click="delItem(record.itemId)"
                  >
                    删除
                  </a>
                </template>
              </Table>
            </Panel>
          </Col>
        </Row>
      </Col>
    </Row>
    <Form
      ref="typeFormRef"
      :visible="typeFormVisible"
      :schema="typeFormSchema"
      :formState="typeFormState"
      :rules="typeFormRules"
      :title="typeFormTitle"
      :confirmLoading="typeFormLoading"
      @ok="typeSubmit"
      @cancel="typeCancel"
    >
    </Form>
    <Form
      ref="itemFormRef"
      :visible="itemFormVisible"
      :schema="itemFormSchema"
      :formState="itemFormState"
      :rules="itemFormRules"
      :title="itemFormTitle"
      :confirmLoading="itemFormLoading"
      @ok="itemSubmit"
      @cancel="itemCancel"
    >
    </Form>
  </div>
</template>
<script>
import {
  getTypeTree,
  getType,
  addType,
  editType,
  delType,
  getItemList,
  getItemById,
  addItem,
  editItem,
  delItem
} from '@/api/system/dictionary'

import {
  Panel,
  EditTree,
  Table,
  QueryForm,
  ToolBar,
  Form,
  Row,
  Col
} from '@/components'

const typeFormSchema = [
  {
    title: '类别名称',
    dataIndex: 'title',
    component: 'input'
  },
  {
    title: '编码',
    dataIndex: 'typeCode',
    component: 'input'
  },
  {
    title: '排序数',
    dataIndex: 'orderNum',
    component: 'input'
  },
  {
    title: '状态',
    dataIndex: 'typeStatus',
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
    title: '父节点',
    dataIndex: 'parentId',
    span: 24,
    component: 'treeSelect',
    componentProps: {
      request: async () => {
        const res = await getTypeTree()
        return res.data
      }
    }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    component: 'textarea',
    span: 24
  }
]

const typeFormRules = {
  title: [
    {
      required: true,
      message: '类别名称必须填写',
      trigger: 'blur'
    }
  ],
  typeCode: [
    {
      required: true,
      message: '编码必须填写',
      trigger: 'blur'
    }
  ]
}

const columns = [
  {
    title: '字典编号',
    dataIndex: 'itemCode',
    sorter: true,
    component: 'input'
  },
  {
    title: '字典项标签',
    dataIndex: 'itemLabel',
    sorter: true,
    component: 'input'
  },
  {
    title: '字典项键值',
    dataIndex: 'itemValue',
    sorter: true,
    hideInSearch: true
  },
  {
    title: '字典项状态',
    dataIndex: 'itemStatus',
    sorter: true,
    slots: {
      customRender: 'itemStatus'
    },
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
    slots: {
      customRender: 'action'
    },
    hideInSearch: true
  }
]

const itemFormSchema = [
  {
    title: '字典编码',
    dataIndex: 'itemCode',
    component: 'input'
  },
  {
    title: '字典标签',
    dataIndex: 'itemLabel',
    component: 'input'
  },
  {
    title: '字典键值',
    dataIndex: 'itemValue',
    component: 'input'
  },
  {
    title: '状态',
    dataIndex: 'itemStatus',
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
    title: '所属类别',
    dataIndex: 'typeId',
    span: 24,
    component: 'treeSelect',
    componentProps: {
      request: async () => {
        const res = await getTypeTree()
        return res.data
      }
    }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    component: 'textarea',
    span: 24
  }
]

const itemFormRules = {
  itemLabel: [
    {
      required: true,
      message: '字典项标签必须填写',
      trigger: 'blur'
    }
  ],
  itemValue: [
    {
      required: true,
      message: '字典项键值必须填写',
      trigger: 'blur'
    }
  ],
  typeId: [
    {
      required: true,
      message: '所属类别必须填写',
      trigger: 'blur'
    }
  ],
  itemCode: [
    {
      required: true,
      message: '字典项编码必须填写',
      trigger: 'blur'
    }
  ]
}

export default {
  components: { Panel, EditTree, Table, QueryForm, ToolBar, Form, Row, Col },
  setup() {
    const { proxy } = getCurrentInstance()

    const treeData = reactive({
      getTypeTree,
      selectedId: undefined
    })

    const typeFormData = reactive({
      typeFormRef: undefined,
      typeFormVisible: false,
      typeFormTitle: '新增字典类',
      typeFormSchema: typeFormSchema,
      typeFormRules: typeFormRules,
      typeFormLoading: false
    })

    const typeFormState = reactive({
      typeCode: undefined,
      typeStatus: '0',
      title: undefined,
      parentId: undefined,
      orderNum: undefined,
      remark: undefined
    })

    const tableData = reactive({
      getItemList,
      filters: {},
      queryLoad: false,
      resetLoad: false,
      columns,
      tableRef: undefined
    })

    const itemFormData = reactive({
      itemFormRef: undefined,
      itemFormVisible: false,
      itemFormTitle: '新增字典项',
      itemFormSchema: itemFormSchema,
      itemFormRules: itemFormRules,
      itemFormLoading: false
    })

    const itemFormState = reactive({
      itemCode: undefined,
      itemLabel: undefined,
      itemValue: undefined,
      itemStatus: '0',
      typeId: undefined,
      remark: undefined
    })

    const methods = reactive({
      treeMenuClick: (treeKey, menuKey) => {
        switch (menuKey) {
          case 'add':
            typeFormState.parentId = treeKey
            typeFormData.typeFormVisible = true
            break
          case 'edit':
            getType(treeKey).then(res => {
              Object.assign(typeFormState, res.data)
            })
            typeFormData.typeFormVisible = true
            break
          case 'del':
            proxy.$modal.del({
              onOk: resolve => {
                delType(treeKey)
                  .then(() => {
                    resolve()
                    treeData.treeRef.refresh()
                  })
                  .catch(() => {
                    resolve()
                  })
              }
            })
            break
        }
      },
      resetTypeForm: () => {
        Object.assign(typeFormState, {
          typeId: undefined,
          typeCode: undefined,
          typeStatus: '0',
          title: undefined,
          parentId: undefined,
          orderNum: undefined,
          remark: undefined
        })
      },
      typeCancel: () => {
        typeFormData.typeFormRef.resetFields()
        methods.resetTypeForm()
        typeFormData.typeFormVisible = false
      },
      typeSubmit: () => {
        typeFormData.typeFormRef.validate().then(() => {
          typeFormData.typeFormLoading = true
          if (typeFormState.typeId) {
            editType(typeFormState).then(() => {
              typeFormData.typeFormLoading = false
              treeData.treeSearchValue = undefined
              treeData.treeRef.refresh()
              methods.typeCancel()
            })
          } else {
            addType(typeFormState).then(() => {
              typeFormData.typeFormLoading = false
              treeData.treeSearchValue = undefined
              treeData.treeRef.refresh()
              methods.typeCancel()
            })
          }
        })
      },
      selectTree: key => {
        treeData.selectedId = key[0]
        tableData.tableRef.reset(tableData.filters, {
          typeId: treeData.selectedId
        })
      },
      query: () => {
        tableData.queryLoad = true
        tableData.tableRef
          .reset(tableData.filters, {
            typeId: treeData.selectedId
          })
          .then(() => {
            tableData.queryLoad = false
          })
      },
      reset: () => {
        tableData.filters = {}
        tableData.resetLoad = true
        tableData.tableRef
          .reset(tableData.filters, {
            typeId: treeData.selectedId
          })
          .then(() => {
            tableData.resetLoad = false
          })
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
          typeId: treeData.selectedId
        })
      },
      showItemForm: () => {
        itemFormData.itemFormTitle = '新增字典项'
        itemFormData.itemFormVisible = true
      },
      resetItemForm: () => {
        Object.assign(itemFormState, {
          itemId: undefined,
          itemCode: undefined,
          itemLabel: undefined,
          itemValue: undefined,
          itemStatus: '0',
          typeId: undefined,
          remark: undefined
        })
      },
      itemCancel: () => {
        itemFormData.itemFormRef.resetFields()
        methods.resetItemForm()
        itemFormData.itemFormVisible = false
      },
      editItem: itemId => {
        itemFormData.itemFormTitle = '修改字典项'
        getItemById(itemId).then(res => {
          Object.assign(itemFormState, res.data)
          itemFormData.itemFormVisible = true
        })
      },
      delItem: itemId => {
        proxy.$modal.del({
          onOk: resolve => {
            delItem(itemId)
              .then(() => {
                resolve()
                tableData.tableRef.refresh(tableData.filters, {
                  typeId: treeData.selectedId
                })
              })
              .catch(() => {
                resolve()
              })
          }
        })
      },
      itemSubmit: () => {
        itemFormData.itemFormRef.validate().then(() => {
          itemFormData.itemFormLoading = true
          if (itemFormState.itemId) {
            editItem(itemFormState).then(() => {
              itemFormData.itemFormLoading = false
              tableData.tableRef.reset()
              methods.itemCancel()
            })
          } else {
            addItem(itemFormState).then(() => {
              itemFormData.itemFormLoading = false
              tableData.tableRef.reset()
              methods.itemCancel()
            })
          }
        })
      }
    })

    return {
      typeFormState,
      itemFormState,
      ...toRefs(treeData),
      ...toRefs(tableData),
      ...toRefs(typeFormData),
      ...toRefs(itemFormData),
      ...toRefs(methods)
    }
  }
}
</script>
<style lang="scss" scoped></style>
