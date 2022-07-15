<template>
  <div>
    <a-form name="queryForm">
      <a-row :gutter="16">
        <template
          v-for="(item, index) in schema.filter(t => t.queryVisible != false)"
          :key="item.dataIndex"
        >
          <a-col v-if="item.component" :span="item.span || 8">
            <FormItem
              :show="(index > 2 && !isExpend) || index < 3"
              :formState="filters"
              :formItem="item"
              :componentProps="item.componentProps"
            >
            </FormItem>
          </a-col>
          <slot v-else :name="item.dataIndex"></slot>
        </template>
        <slot></slot>
      </a-row>

      <a-row justify="end">
        <a-button type="primary" @click="query" :loading="queryLoad"
          >查询</a-button
        >
        <a-button style="margin-left: 10px" @click="reset" :loading="resetLoad"
          >重置</a-button
        >
        <a-button
          v-if="schemaData.length > 3"
          style="margin-left: 10px; padding: 4px 6px 4px 14px"
          @click="expend"
        >
          {{ expendName }}
          <svg
            class="icon expend-icon"
            aria-hidden="true"
            font-size="15px"
            style="margin-left: 2px"
            @click="toggleSideBar"
          >
            <use xlink:href="#icon-angle-down" />
          </svg>
        </a-button>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import FormItem from './FormItem.vue'

export default defineComponent({
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
})
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
