<template>
  <el-form-item
    v-show="show"
    :label="formItem.title"
    :labelCol="{ style: { width: '80px' } }"
    :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
    :name="formItem.dataIndex"
  >
    <el-input
      v-if="formItem.component == 'input'"
      :placeholder="formItem.placeholder || '请输入' + formItem.title"
      v-model:value="formState[formItem.dataIndex]"
      :defaultValue="componentProps.defaultValue"
      :allowClear="componentProps.allowClear"
      :addonBefore="componentProps.addonBefore"
      :addonAfter="componentProps.addonAfter"
      :disabled="componentProps.disabled || allDisabled"
    />
    <el-input-number
      v-else-if="formItem.component == 'inputNumber'"
      v-model:value="formState[formItem.dataIndex]"
      :placeholder="formItem.placeholder || '请输入' + formItem.title"
      style="width: 100%"
      :max="componentProps.max || 9999999999"
      :min="componentProps.min || 0"
      :precision="componentProps.precision || 0"
      :disabled="componentProps.disabled || allDisabled"
    ></el-input-number>
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
      :picker="componentProps.picker || 'date'"
      :format="componentProps.format || 'YYYY-MM-DD'"
      :valueFormat="componentProps.valueFormat || 'YYYY-MM-DD'"
      :disabled="componentProps.disabled || allDisabled"
      :showTime="componentProps.showTime"
      :showToday="componentProps.showToday"
      :disabledTime="componentProps.disabledTime"
    ></el-date-picker>
    <el-range-picker
      v-else-if="formItem.component == 'rangePicker'"
      v-model:value="formState[formItem.dataIndex]"
      :picker="componentProps.picker || 'date'"
      :format="componentProps.format || 'YYYY-MM-DD'"
      :valueFormat="componentProps.valueFormat || 'YYYY-MM-DD'"
      :disabled="componentProps.disabled || allDisabled"
      :showTime="componentProps.showTime"
      :showToday="componentProps.showToday"
      :disabledTime="componentProps.disabledTime"
    ></el-range-picker>
  </el-form-item>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    },
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

    const getRequestData = async componentProps => {
      const data = await componentProps.request()
      requestData.value = data
    }

    onBeforeMount(async () => {
      props.componentProps.request &&
        (await getRequestData(props.componentProps))
    })

    return {
      requestData
    }
  }
}
</script>

<style></style>
