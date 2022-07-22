<!--
 * @Description: 头像及设置
 * @Autor: Gu
 * @Date: 2021-12-30 13:30:13
-->
<template>
  <div class="avatar cursor-pointer">
    <el-dropdown trigger="click">
      <el-avatar :src="avatar"> {{ nickNameAvatar }} </el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item key="0" @click="linkProfie">
            个人中心
          </el-dropdown-item>
          <el-dropdown-item key="1" @click="showSetting">
            主题配置
          </el-dropdown-item>
          <el-dropdown-item key="2" @click="logout" divided>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <Setting> </Setting>
  </div>
</template>
<script>
import { Modal } from '@/components'
import Setting from '@/layout/components/setting'

export default {
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
      showSetting: () => {
        store.dispatch('settings/setVisible', true)
      },
      logout: () => {
        proxy.$msgbox.confirm({
          content: '确定注销并退出系统吗？',
          onOk: resolve => {
            setTimeout(() => {
              resolve()
            }, 3000)
          }
        })
      }
    })
    return {
      ...toRefs(avatarData),
      ...toRefs(methods)
    }
  }
}
</script>
