<template>
  <div>
    <!-- <a-form
      ref="passwordFormRef"
      :model="passwordFormState"
      :rules="passwordFormRules"
    >
      <a-row>
        <a-col span="24">
          <a-form-item
            name="oldPassword"
            label="旧密码"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
          >
            <a-input-password
              style="width: 100%"
              v-model:value="passwordFormState.oldPassword"
              placeholder="请输入旧密码"
            >
            </a-input-password>
          </a-form-item>
        </a-col>
        <a-col span="24">
          <a-form-item
            name="newPassword"
            label="新密码"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
          >
            <a-input-password
              v-model:value="passwordFormState.newPassword"
              placeholder="请输入新密码"
            >
            </a-input-password>
          </a-form-item>
        </a-col>
        <a-col span="24">
          <a-form-item
            name="confirmPassword"
            label="确认密码"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
          >
            <a-input-password
              v-model:value="passwordFormState.confirmPassword"
              placeholder="请确认密码"
            >
            </a-input-password>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-row justify="center">
      <a-space>
        <a-button type="primary" @click="save">保存</a-button>
        <a-button @click="resetPassword">重置</a-button>
      </a-space>
    </a-row> -->
  </div>
</template>

<script>
export default defineComponent({
  setup() {
    return {}
  }
})
</script>
