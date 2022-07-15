<template>
  <el-form-item
    :label="formItem.title"
    :labelCol="{ style: { width: '80px' } }"
    :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
    :name="formItem.dataIndex"
  >
    <el-input
      v-if="formItem.component == 'input'"
      :placeholder="formItem.placeholder || '请输入' + formItem.title"
      v-model:value="formState[formItem.dataIndex]"
      :allowClear="componentProps.allowClear"
      :addonBefore="componentProps.addonBefore"
      :addonAfter="componentProps.addonAfter"
      :bordered="componentProps.bordered"
      :disabled="componentProps.disabled || allDisabled"
    />
    <el-input-number
      v-else-if="formItem.component == 'inputNumber'"
      style="width: 100%"
      v-model:value="formState[formItem.dataIndex]"
      :placeholder="formItem.placeholder || '请输入' + formItem.title"
      :formatter="componentProps.formatter"
      :max="componentProps.max || 9999999999"
      :min="componentProps.min || 0"
      :precision="componentProps.precision || 0"
      :step="componentProps.step || 1"
      :disabled="componentProps.disabled || allDisabled"
    ></el-input-number>
    <el-textarea
      v-if="formItem.component == 'textarea'"
      :placeholder="formItem.placeholder || '请输入' + formItem.title"
      v-model:value="formState[formItem.dataIndex]"
      :disabled="componentProps.disabled || allDisabled"
      :autosize="componentProps.autosize"
      :allowClear="componentProps.allowClear"
      :showCount="componentProps.showCount"
    />
    <el-select
      v-else-if="formItem.component == 'select'"
      v-model:value="formState[formItem.dataIndex]"
      :placeholder="formItem.placeholder || '请选择' + formItem.title"
      :options="componentProps.options || requestData"
      :disabled="componentProps.disabled || allDisabled"
    >
    </el-select>
    <el-select
      v-else-if="formItem.component == 'multiple'"
      v-model:value="formState[formItem.dataIndex]"
      mode="multiple"
      :placeholder="formItem.placeholder || '请选择' + formItem.title"
      :options="componentProps.options || requestData"
      :disabled="componentProps.disabled || allDisabled"
    >
    </el-select>
    <el-tree-select
      v-else-if="formItem.component == 'treeSelect'"
      v-model:value="formState[formItem.dataIndex]"
      :placeholder="formItem.placeholder || '请选择' + formItem.title"
      :treeData="requestData"
      :disabled="componentProps.disabled || allDisabled"
    ></el-tree-select>
    <el-checkbox
      v-else-if="formItem.component == 'checkbox'"
      v-model:checked="formState[formItem.dataIndex]"
      :disabled="componentProps.disabled || allDisabled"
    ></el-checkbox>
    <el-radio-group
      v-else-if="formItem.component == 'radio'"
      v-model:value="formState[formItem.dataIndex]"
      :disabled="componentProps.disabled || allDisabled"
    >
      <el-radio
        v-for="radio in componentProps.radios"
        :key="radio.value"
        :value="radio.value"
      >
        {{ radio.title }}
      </el-radio>
    </el-radio-group>
    <el-date-picker
      v-else-if="formItem.component == 'datePicker'"
      v-model:value="formState[formItem.dataIndex]"
      :placeholder="formItem.placeholder || '请选择日期'"
      :valueFormat="
        componentProps.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
      "
      :disabled="componentProps.disabled || allDisabled"
      :showTime="componentProps.showTime"
      :showToday="componentProps.showToday"
      :disabledTime="componentProps.disabledTime"
    ></el-date-picker>
    <el-month-picker
      v-else-if="formItem.component == 'monthPicker'"
      v-model:value="formState[formItem.dataIndex]"
      :placeholder="formItem.placeholder || '请选择日期'"
      :disabled="componentProps.disabled || allDisabled"
      valueFormat="YYYY-MM-DD"
    ></el-month-picker>
    <el-range-picker
      v-else-if="formItem.component == 'rangePicker'"
      v-model:value="formState[formItem.dataIndex]"
      :defaultPickerValue="componentProps.defaultPickerValue"
      :disabledTime="componentProps.disabledTime"
      :disabled="componentProps.disabled || allDisabled"
      :valueFormat="componentProps.valueFormat || 'YYYY-MM-DD'"
      :ranges="componentProps.ranges"
      :separator="componentProps.separator"
    ></el-range-picker>
    <el-week-picker
      v-else-if="formItem.component == 'weekPicker'"
      v-model:value="formState[formItem.dataIndex]"
      :placeholder="formItem.placeholder || '请选择日期'"
      :disabled="componentProps.disabled || allDisabled"
      valueFormat="YYYY-MM-DD"
    ></el-week-picker>
  </el-form-item>
</template>

<script>
export default defineComponent({
  props: {
    allDisabled: {
      type: Boolean
    },
    formState: {
      type: Object
    },
    formItem: {
      type: Object
    },
    componentProps: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const requestData = ref([])

    onBeforeMount(async () => {
      if (props.componentProps.request) {
        let value = props.formState[props.formItem.dataIndex]
        props.formState[props.formItem.dataIndex] = null

        await props.componentProps.request().then(res => {
          requestData.value = res
          props.formState[props.formItem.dataIndex] = value
        })
      }
    })

    return {
      requestData
    }
  }
})
</script>

<style></style>
