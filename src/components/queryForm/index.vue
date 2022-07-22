<template>
  <div>
    <el-form name="queryForm">
      <el-row :gutter="16">
        <template
          v-for="(item, index) in schema.filter(t => t.queryVisible != false)"
          :key="item.dataIndex"
        >
          <el-col v-if="item.component" :span="item.span || 8">
            <FormItem
              :show="(index > 2 && !isExpend) || index < 3"
              :formState="filters"
              :formItem="item"
              :componentProps="item.componentProps"
            >
            </FormItem>
          </el-col>
          <slot v-else :name="item.dataIndex"></slot>
        </template>
        <slot></slot>
      </el-row>

      <el-row justify="end">
        <el-button type="primary" @click="query" :loading="queryLoad"
          >查询</el-button
        >
        <el-button style="margin-left: 10px" @click="reset" :loading="resetLoad"
          >重置</el-button
        >
        <el-button
          v-if="schemaData.length > 3"
          style="margin-left: 10px; padding: 4px 6px 4px 14px"
          @click="expend"
        >
          {{ expendName }}
          <svg
            class="icon expend-icon"
            ariel-hidden="true"
            font-size="15px"
            style="margin-left: 2px"
            @click="toggleSideBar"
          >
            <use xlink:href="#icon-angle-down" />
          </svg>
        </el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import FormItem from './FormItem.vue'

export default {
  components: { FormItem },
  props: {
    queryLoad: {
      type: Boolean
    },
    resetLoad: {
      type: Boolean
    },
    filters: {
      type: Object,
      required: true
    },
    schema: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const schemaData = props.schema.filter(t => !t.queryVisible)

    const expendData = reactive({
      isExpend: false,
      expendName: computed(
        () => `${expendData.isExpend == true ? '展开' : '收缩'}`
      ),
      turn: computed(() => `${expendData.isExpend ? 0 : 0.5}turn`)
    })

    const methods = reactive({
      query: () => {
        context.emit('query')
      },
      reset: () => {
        context.emit('reset')
      },
      expend: () => {
        expendData.isExpend = !expendData.isExpend
      }
    })
    return {
      schemaData,
      ...toRefs(expendData),
      ...toRefs(methods)
    }
  }
}
</script>
<style lang="scss" scoped>
.submit-buttons {
  float: right;
}
.expend-icon {
  transform: rotate(v-bind(turn));
  transition: transform 0.3s;
}
</style>
