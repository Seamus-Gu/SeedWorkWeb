<!--
 * @Description: 
 * @Author: Gu
 * @Date: 2022-06-28 16:05:59
 * @LastEditTime: 2022-06-29 15:57:47
-->
<template>
  <div>
    <el-form ref="baseFormRef" :model="userInfoData">
      <el-row>
        <el-col span="24">
          <el-form-item
            name="nickName"
            label="用户昵称"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
          >
            <el-input
              style="width: 100%"
              v-model:value="userInfoData.nickName"
              placeholder="请输入用户昵称"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col span="24">
          <el-form-item
            name="phoneNumber"
            label="手机号码"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
          >
            <el-input
              v-model:value="userInfoData.phoneNumber"
              placeholder="请输入手机号码"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col span="24">
          <el-form-item
            name="email"
            label="邮箱"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
          >
            <el-input
              v-model:value="userInfoData.email"
              placeholder="请输入邮箱"
            >
            </el-input>
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-form>
    <el-row justify="center">
      <el-space>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
      </el-space>
    </el-row>
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
