<!--
 * @Description: 
 * @Author: Gu
 * @Date: 2022-06-28 16:05:59
 * @LastEditTime: 2022-06-29 15:57:47
-->
<template>
  <div>
    <a-form ref="baseFormRef" :model="userInfoData">
      <a-row>
        <a-col span="24">
          <a-form-item
            name="nickName"
            label="用户昵称"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
          >
            <a-input
              style="width: 100%"
              v-model:value="userInfoData.nickName"
              placeholder="请输入用户昵称"
            >
            </a-input>
          </a-form-item>
        </a-col>
        <!-- <a-col span="24">
          <a-form-item
            name="phoneNumber"
            label="手机号码"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
          >
            <a-input
              v-model:value="userInfoData.phoneNumber"
              placeholder="请输入手机号码"
            >
            </a-input>
          </a-form-item>
        </a-col>
        <a-col span="24">
          <a-form-item
            name="email"
            label="邮箱"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
          >
            <a-input
              v-model:value="userInfoData.email"
              placeholder="请输入邮箱"
            >
            </a-input>
          </a-form-item>
        </a-col> -->
      </a-row>
    </a-form>
    <a-row justify="center">
      <a-space>
        <a-button type="primary" @click="save">保存</a-button>
        <a-button @click="reset">重置</a-button>
      </a-space>
    </a-row>
  </div>
</template>
<script>
export default defineComponent({
  setup() {
    const userInfoData = reactive({
      nickName: undefined,
      phoneNumber: undefined,
      email: undefined
    })

    const methods = reactive({
      save: () => {},
      reset: () => {}
    })

    return {
      userInfoData,
      ...toRefs(methods)
    }
  }
})
</script>
