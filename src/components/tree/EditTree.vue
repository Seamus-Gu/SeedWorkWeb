<template>
  <div class="edit-tree">
    <el-input-search
      v-if="showSearch"
      :placeholder="searchPlaceholder"
      v-model:value="searchValue"
      :allowClear="true"
      @search="refresh()"
    />
    <el-tree
      v-if="dataSource"
      :treeData="dataSource"
      :replaceFields="replaceFields"
      :defaultExpandAll="true"
      :checkable="checkable"
      :checkStrictly="checkStrictly"
      :disabled="disabled"
      :draggable="draggable"
      :selectable="selectable"
      :showLine="showLine"
      v-model:expandedKeys="expandedKeys"
    >
      <template #title="{ key: treeKey, title }">
        <el-dropdown :trigger="['contextmenu']">
          <span>{{ title }}</span>
          <template #overlay>
            <el-menu
              @click="({ key: menuKey }) => rightClick(treeKey, menuKey)"
            >
              <el-menu-item v-if="showAdd" key="add">
                <svg
                  class="icon"
                  ariel-hidden="true"
                  font-size="15px"
                  style="margin-right: 8px"
                >
                  <use xlink:href="#icon-plus" />
                </svg>
                新增
              </el-menu-item>
              <el-menu-item v-if="showEdit" key="edit">
                <svg
                  class="icon"
                  ariel-hidden="true"
                  font-size="15px"
                  style="margin-right: 8px"
                >
                  <use xlink:href="#icon-edit" />
                </svg>
                修改
              </el-menu-item>
              <el-menu-item v-if="showDel" key="del">
                <svg
                  class="icon"
                  ariel-hidden="true"
                  font-size="15px"
                  style="margin-right: 8px"
                >
                  <use xlink:href="#icon-trash-alt" />
                </svg>
                删除
              </el-menu-item>
              <slot name="menuItem"></slot>
            </el-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-if="$slots.switcherIcon" #switcherIcon>
        <slot name="switcherIcon"></slot>
      </template>
    </el-tree>
  </div>
</template>

<script>
export default {
  props: {
    searchName: {
      type: String,
      default: 'search'
    },
    searchPlaceholder: {
      type: String,
      default: '请输入搜索内容'
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    defaultExpand: {
      type: Boolean,
      default: true
    },
    showLine: {
      type: Boolean
    },
    checkable: {
      type: Boolean
    },
    checkStrictly: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    draggable: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: Boolean,
      default: true
    },
    showAdd: {
      type: Boolean,
      default: true
    },
    showEdit: {
      type: Boolean,
      default: true
    },
    showDel: {
      type: Boolean,
      default: true
    },
    replaceFields: {
      type: Object
    },
    api: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const treeData = reactive({
      searchValue: undefined,
      dataSource: undefined,
      expandedKeys: undefined
    })

    const methods = reactive({
      getData: async query => {
        let queryData = {}
        if (treeData.searchValue) {
          queryData[props.searchName] = treeData.searchValue
        }
        Object.assign(queryData, query)
        await props.api(queryData).then(res => {
          treeData.dataSource = res.data
          props.defaultExtends && (treeData.expandedKeys = [res.data[0].value])
        })
      },
      refresh: query => {
        methods.getData(query)
      },
      rightClick: (treeKey, menuKey) => {
        context.emit('rightClick', treeKey, menuKey)
      }
    })

    methods.getData()

    return {
      ...toRefs(treeData),
      ...toRefs(methods)
    }
  }
}
</script>

<style></style>
