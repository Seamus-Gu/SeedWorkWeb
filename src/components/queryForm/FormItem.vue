<template>
  <el-form-item v-show="show" :label="formItem.title" label-width="80px">
    <el-input
      v-if="formItem.component == 'input'"
      v-model="formState[formItem.dataIndex]"
      :maxlength="componentProps.maxlength"
      :minlength="componentProps.minlength"
      :showWordLimit="componentProps.showWordLimit"
      :placeholder="formItem.placeholder || '请输入' + formItem.title"
      :clearable="componentProps.clearable"
      :formatter="componentProps.formatter"
      :parser="componentProps.parser"
      :disabled="componentProps.disabled || allDisabled"
      :autocomplete="componentProps.autocomplete"
      :name="componentProps.name"
      :readonly="componentProps.readonly"
    />
    <!-- <el-input-number
      v-else-if="formItem.component == 'inputNumber'"
      v-model:value="formState[formItem.dataIndex]"
      :placeholder="formItem.placeholder || '请输入' + formItem.title"
      style="width: 100%"
      :max="componentProps.max || 9999999999"
      :min="componentProps.min || 0"
      :precision="componentProps.precision || 0"
      :disabled="componentProps.disabled || allDisabled"
    ></el-input-number> -->
    <el-select
      v-else-if="formItem.component == 'select'"
      v-model="formState[formItem.dataIndex]"
      style="width: 100%"
      :disabled="componentProps.disabled || allDisabled"
      :placeholder="formItem.placeholder || '请选择' + formItem.title"
    >
      <el-option
        v-for="item in componentProps.options || requestData"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-date-picker
      v-else-if="formItem.component == 'datePicker'"
      v-model="formState[formItem.dataIndex]"
      :disabled="componentProps.disabled || allDisabled"
      :placeholder="formItem.placeholder || '请选择日期'"
      :startPlaceholder="componentProps.startPlaceholder || '请选择起始日期'"
      :endPlaceholder="componentProps.endPlaceholder || '请选择终止日期'"
      :type="componentProps.type"
      :format="componentProps.format || 'YYYY-MM-DD'"
      :valueFormat="componentProps.valueFormat || 'YYYY-MM-DD'"
    ></el-date-picker>
    <!-- <el-select
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
    ></el-range-picker> -->
  </el-form-item>
</template>

<script>
/**
 * 1.input
 * maxlength 最大输入长度 string / number
 * minlength 最小输入长度  number
 * showWordLimit 是否显示输入字数统计 boolean
 * placeholder 输入框占位文本 string
 * clearable 是否可清空 boolean
 * formatter 指定输入值的格式 function(value: string / number): string
 * parser 指定从格式化器输入中提取的值 function(string): string
 * disabled 	是否禁用 boolean allDisabled为true时也会禁用
 * autocomplete 原生 autocomplete 属性 string
 * name 原生 input name 属性 string
 * readonly 原生 readonly 属性，是否只读 boolean
 */

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
