<template>
  <div class="tree">
    <a-input-search
      v-if="showSearch"
      :placeholder="searchPlaceholder"
      v-model:value="searchValue"
      :allowClear="true"
      @search="refresh()"
    />
    <a-tree
      :blockNode="blockNode"
      :checkable="checkable"
      v-model:checkedKeys="checkedData"
      :checkStrictly="checkStrictly"
      :defaultExpandAll="defaultExpandAll"
      :disabled="disabled"
      v-model:expandedKeys="expandedKeys"
      :fieldNames="fieldNames"
      :filterTreeNode="filterTreeNode"
      :multiple="multiple"
      :selectable="selectable"
      :showIcon="showIcon"
      :showLine="showLine"
      :treeData="dataSource"
      :virtual="virtual"
      v-if="dataSource"
      @check="check"
      @expand="expand"
      @load="load"
      @select="select"
    >
      <template v-if="$slots.title" #title="titleData">
        <slot
          :title="titleData.title"
          :dataRef="titleData.dataRef"
          name="title"
        ></slot>
      </template>
      <template
        v-if="$slots.switcherIcon"
        #switcherIcon="{
          active,
          checked,
          expanded,
          selected,
          halfChecked,
          title,
          key
        }"
      >
        <slot
          name="switcherIcon"
          :active="active"
          :checked="checked"
          :expanded="expanded"
          :selected="selected"
          :halfChecked="halfChecked"
          :title="title"
          :key="key"
        ></slot>
      </template>
    </a-tree>
  </div>
</template>

<script>
export default {
  props: {
    blockNode: {
      type: Boolean
    },
    checkable: {
      type: Boolean,
      default: false
    },
    checkedKeys: {
      type: Object
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fieldNames: {
      type: Object
    },
    filterTreeNode: {
      type: Function
    },
    multiple: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: true
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    showLine: {
      type: Boolean || Object,
      default: false
    },
    virtual: {
      type: Boolean,
      default: true
    },
    api: {
      type: Function,
      required: true
    },
    defaultExpand: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    searchText: {
      type: String,
      default: 'search'
    },
    searchPlaceholder: {
      type: String,
      default: '请输入搜索内容'
    }
  },
  setup(props, context) {
    const treeData = reactive({
      searchValue: undefined,
      dataSource: undefined,
      expandedKeys: undefined,
      checkedData: props.checkedKeys
    })

    const methods = reactive({
      getData: async query => {
        let queryData = {}
        if (treeData.searchValue) {
          queryData[props.searchText] = treeData.searchValue
        }
        Object.assign(queryData, query)
        await props.api(queryData).then(res => {
          treeData.dataSource = res.data
          props.defaultExpand && (treeData.expandedKeys = [res.data[0].key])
        })
      },
      check: (checkedKeys, e) => {
        let result = []
        if (!props.checkStrictly) {
          result = checkedKeys
        } else {
          result = checkedKeys.checked
        }
        context.emit('update:checkedKeys', result)
      },
      getList: res => {
        let expendList = []
        for (let item of res) {
          expendList.push(item.key)
          if (item.children != null && item.children.length) {
            expendList = expendList.concat(methods.getList(item.children))
          }
        }
        return expendList
      },
      allChecked: isAllCheck => {
        treeData.checkedData = isAllCheck
          ? methods.getList(treeData.dataSource)
          : []
        context.emit('update:checkedKeys', treeData.checkedData)
      },
      allExpend: isExpend => {
        let expendList = isExpend ? methods.getList(treeData.dataSource) : []
        treeData.expandedKeys = expendList
      },
      refresh: query => {
        methods.getData(query)
      },
      expand: (expandedKeys, e) => {
        context.emit('expand', expandedKeys, e)
      },
      load: (loadedKeys, e) => {
        context.emit('load', loadedKeys, e)
      },
      select: (selectedKeys, e) => {
        context.emit('select', selectedKeys, e)
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
