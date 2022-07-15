<!--
 * @Description: 头像及设置
 * @Autor: Gu
 * @Date: 2021-12-30 13:30:13
-->
<template>
  <div class="avatar">
    <el-dropdown :trigger="['click']">
      <el-avatar :size="35" :src="avatar"> {{ nickNameAvatar }} </el-avatar>
      <template #overlay>
        <el-menu>
          <el-menu-item key="0" @click="linkProfie">
            <span>个人中心</span>
          </el-menu-item>
          <el-menu-item key="1" @click="showSetting">主题配置</el-menu-item>
          <el-menu-divider />
          <el-menu-item key="2" @click="logout">退出登录</el-menu-item>
        </el-menu>
      </template>
    </el-dropdown>
    <Setting> </Setting>
  </div>
</template>
<script>
import { Modal } from '@/components'
import Setting from '@/layout/components/setting'

export default defineComponent({
  components: { Modal, Setting },
  setup() {
    const store = useStore()
    const router = useRouter()
    const { proxy } = getCurrentInstance()

    const avatarData = reactive({
      avatar: computed(() => store.state.user.avatar),
      nickNameAvatar: computed(() => store.state.user.nickName).value.substring(
        0,
        1
      ),
      settingVisible: false
    })

    const methods = reactive({
      linkProfie: () => {
        router.push({ path: '/user/profile' })
      },
      logout: () => {
        proxy.$modal.confirm({
          content: '确定注销并退出系统吗？',
          onOk: resolve => {
            store.dispatch('LogOut').then(() => {
              resolve()
              proxy.$msg.success('成功注销')
              router.push({ path: '/login' })
            })
          }
        })
      },
      showSetting: () => {
        store.dispatch('settings/setVisible', true)
      }
    })
    return {
      ...toRefs(avatarData),
      ...toRefs(methods)
    }
  }
})
</script>
