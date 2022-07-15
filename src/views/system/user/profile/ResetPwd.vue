<template>
  <div>
    <!-- <el-form
      ref="passwordFormRef"
      :model="passwordFormState"
      :rules="passwordFormRules"
    >
      <el-row>
        <el-col span="24">
          <el-form-item
            name="oldPassword"
            label="旧密码"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
          >
            <el-input-password
              style="width: 100%"
              v-model:value="passwordFormState.oldPassword"
              placeholder="请输入旧密码"
            >
            </el-input-password>
          </el-form-item>
        </el-col>
        <el-col span="24">
          <el-form-item
            name="newPassword"
            label="新密码"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
          >
            <el-input-password
              v-model:value="passwordFormState.newPassword"
              placeholder="请输入新密码"
            >
            </el-input-password>
          </el-form-item>
        </el-col>
        <el-col span="24">
          <el-form-item
            name="confirmPassword"
            label="确认密码"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
          >
            <el-input-password
              v-model:value="passwordFormState.confirmPassword"
              placeholder="请确认密码"
            >
            </el-input-password>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row justify="center">
      <el-space>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="resetPassword">重置</el-button>
      </el-space>
    </el-row> -->
  </div>
</template>

<script>
export default defineComponent({
  setup() {
    return {}
  }
})
</script>
