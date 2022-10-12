<template>
  <el-form-item :label="formItem.title" label-width="80px">
    <el-input
      v-if="formItem.component == 'input'"
      v-model="model[formItem.dataIndex]"
      style="width: 100%"
      :maxlength="componentProps.maxlength"
      :minlength="componentProps.minlength"
      :showWordLimit="componentProps.showWordLimit"
      :placeholder="formItem.placeholder || '请输入' + formItem.title"
      :clearable="componentProps.clearable"
      :formatter="componentProps.formatter"
      :parser="componentProps.parser"
      :showPassword="componentProps.showPassword"
      :disabled="componentProps.disabled || allDisabled"
      :autocomplete="componentProps.autocomplete"
      :name="componentProps.name"
      :readonly="componentProps.readonly"
    />
    <el-select
      v-else-if="formItem.component == 'select'"
      v-model="model[formItem.dataIndex]"
      style="width: 100%"
      :disabled="componentProps.disabled || allDisabled"
      :clearable="componentProps.clearable"
      :name="componentProps.name"
      :autocomplete="componentProps.autocomplete"
      :placeholder="formItem.placeholder || '请选择' + formItem.title"
      :filterable="componentProps.filterable"
      :remote="componentProps.remote"
      :remoteMethod="componentProps.remoteMethod"
      :loading="componentProps.loading"
      :loadingText="componentProps.loadingText"
      :noMatchText="componentProps.noMatchText"
      :noDataText="componentProps.noDataText"
    >
      <el-option
        v-for="item in componentProps.options || requestData"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select
      v-else-if="formItem.component == 'multiple'"
      v-model="model[formItem.dataIndex]"
      style="width: 100%"
      :multiple="true"
      :disabled="componentProps.disabled || allDisabled"
      :clearable="componentProps.clearable"
      :collapseTags="componentProps.collapseTags"
      :collapseTagsTooltip="componentProps.collapseTagsTooltip"
      :multipleLimit="componentProps.multipleLimit"
      :placeholder="formItem.placeholder || '请选择' + formItem.title"
      :options="componentProps.options || requestData"
    >
    </el-select>
    <el-tree-select
      v-else-if="formItem.component == 'treeSelect'"
      v-model="model[formItem.dataIndex]"
      style="width: 100%"
      :data="requestData"
      :remote="componentProps.requestData"
      :disabled="componentProps.disabled || allDisabled"
      :placeholder="formItem.placeholder || '请选择' + formItem.title"
      :checkStrictly="componentProps.checkStrictly"
    ></el-tree-select>
    <!-- <el-input-number
      v-else-if="formItem.component == 'inputNumber'"
      style="width: 100%"
      v-model:value="model[formItem.dataIndex]"
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
      v-model:value="model[formItem.dataIndex]"
      :disabled="componentProps.disabled || allDisabled"
      :autosize="componentProps.autosize"
      :allowClear="componentProps.allowClear"
      :showCount="componentProps.showCount"
    />
 
  
    <el-checkbox
      v-else-if="formItem.component == 'checkbox'"
      v-model:checked="model[formItem.dataIndex]"
      :disabled="componentProps.disabled || allDisabled"
    ></el-checkbox>
    <el-radio-group
      v-else-if="formItem.component == 'radio'"
      v-model:value="model[formItem.dataIndex]"
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
      v-model:value="model[formItem.dataIndex]"
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
      v-model:value="model[formItem.dataIndex]"
      :placeholder="formItem.placeholder || '请选择日期'"
      :disabled="componentProps.disabled || allDisabled"
      valueFormat="YYYY-MM-DD"
    ></el-month-picker>
    <el-range-picker
      v-else-if="formItem.component == 'rangePicker'"
      v-model:value="model[formItem.dataIndex]"
      :defaultPickerValue="componentProps.defaultPickerValue"
      :disabledTime="componentProps.disabledTime"
      :disabled="componentProps.disabled || allDisabled"
      :valueFormat="componentProps.valueFormat || 'YYYY-MM-DD'"
      :ranges="componentProps.ranges"
      :separator="componentProps.separator"
    ></el-range-picker>
    <el-week-picker
      v-else-if="formItem.component == 'weekPicker'"
      v-model:value="model[formItem.dataIndex]"
      :placeholder="formItem.placeholder || '请选择日期'"
      :disabled="componentProps.disabled || allDisabled"
      valueFormat="YYYY-MM-DD"
    ></el-week-picker> -->
  </el-form-item>
</template>

<script>
/**
 * 全局
 * model 绑定值 object
 * formItem 生成表单项对象 object
 * componentProps 表单项设置参数 object
 * allDisabled 是否全体禁用 boolean
 *
 * formItem对象
 * component 组价种类
 * dataIndex 绑定属性名
 * placeholder 占位文字
 *
 * 1.input 输入框
 * maxlength 最大输入长度 string / number
 * minlength 最小输入长度  number
 * showWordLimit 是否显示输入字数统计 boolean
 * placeholder 输入框占位文本 string
 * clearable 是否可清空 boolean
 * formatter 指定输入值的格式 function(value: string / number): string
 * parser 指定从格式化器输入中提取的值 function(string): string
 * showPassword 是否显示切换密码图标 boolean
 * disabled 	是否禁用 boolean allDisabled为true时也会禁用
 * autocomplete 原生 autocomplete 属性 string
 * name 原生 input name 属性 string
 * readonly 原生 readonly 属性，是否只读 boolean
 *
 * 2. select 单选框
 * disabled 是否禁用 boolean
 * clearable 	是否可以清空选项 boolean
 * name 原生name属性 string
 * autocomplete 原生 autocomplete属性 string
 * filterable 是否可筛选 boolean
 * remote 是否从服务器远程加载 boolean
 * remoteMethod 自定义远程搜索方法 function
 * loading 是否正在从远程获取数据 boolean
 * loadingText 从服务器加载内容时显示的文本 string
 * noMatchText 搜索条件无匹配时显示的文字 string
 * noDataText 无选项时显示的文字 string
 * validateEvent 是否触发表单验证 boolean
 * placement 下拉框出现的位置 top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
 *
 */

export default {
  props: {
    model: {
      type: Object
    },
    formItem: {
      type: Object
    },
    componentProps: {
      type: Object,
      default: {}
    },
    allDisabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const requestData = ref([])

    onBeforeMount(async () => {
      if (props.componentProps.request) {
        await props.componentProps.request().then(result => {
          requestData.value = result
        })
      }
    })

    return {
      requestData
    }
  }
}
</script>

<style></style>
