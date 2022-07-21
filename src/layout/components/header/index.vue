<!--
 * @Description: 导航栏
 * @Autor: Gu
 * @Date: 2021-12-29 10:27:18
-->
<template>
  <el-header class="layout-header">
    <el-row align="middle" justify="space-between" style="height: 100%">
      <div class="header-main-left">
        <el-space>
          <template v-if="layout == 'LRLayout' || size == 'small'">
            <Hamburger
              class="header-item"
              :isActive="isActive"
              @click="toggleSideBar"
            ></Hamburger>
          </template>
          <template v-if="layout != 'LRLayout' && size != 'small'">
            <HeaderTitle></HeaderTitle>
            <TopNav></TopNav>
          </template>
          <template v-if="layout == 'LRLayout' && size != 'small'">
            <Breadcrumb></Breadcrumb>
          </template>
        </el-space>
      </div>
      <div class="header-main-right">
        <el-space>
          <div v-if="searchSwitch" class="header-item cursor-pointer">
            <svg class="icon" ariel-hidden="true" font-size="16px">
              <use xlink:href="#icon-search-1" />
            </svg>
          </div>
          <div
            v-if="themeSwitch"
            class="header-item cursor-pointer"
            @click="showSetting"
          >
            <svg class="icon" ariel-hidden="true" font-size="16px">
              <use xlink:href="#icon-setting-config" />
            </svg>
          </div>
          <div v-if="messageSwitch" class="header-item cursor-pointer">
            <svg class="icon" ariel-hidden="true" font-size="16px">
              <use xlink:href="#icon-remind" />
            </svg>
          </div>
          <ScreenFull
            v-if="screenFullSwitch"
            class="header-item cursor-pointer"
          ></ScreenFull>
          <Avatar></Avatar>
        </el-space>
      </div>
    </el-row>
  </el-header>
</template>

<script>
import HeaderTitle from '../sideBar/SideBarLogo.vue'
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import TopNav from './TopNav.vue'
import Avatar from './Avatar.vue'

import { ScreenFull } from '@/components'

export default defineComponent({
  components: {
    HeaderTitle,
    ScreenFull,
    Avatar,
    Hamburger,
    Breadcrumb,
    TopNav
  },
  setup() {
    const store = useStore()

    const headerData = reactive({
      isActive: computed(() => store.state.app.sidebarOpened),
      size: computed(() => store.state.app.size),
      layout: computed(() => store.state.settings.layout)
    })

    const searchSwitch = computed(() => store.state.settings.searchSwitch)
    const themeSwitch = computed(() => store.state.settings.themeSwitch)
    const messageSwitch = computed(() => store.state.settings.messageSwitch)
    const screenFullSwitch = computed(
      () => store.state.settings.screenFullSwitch
    )

    const methods = reactive({
      toggleSideBar: () => {
        store.dispatch('app/toggleSideBar')
      },
      showSetting: () => {
        store.dispatch('settings/setVisible', true)
      }
    })
    return {
      searchSwitch,
      themeSwitch,
      messageSwitch,
      screenFullSwitch,
      ...toRefs(headerData),
      ...toRefs(methods)
    }
  }
})
</script>
<style lang="scss" scoped>
.layout-header {
  height: 50px;
  overflow: hidden;
  padding: 0 8px 0 16px;
  box-shadow: var(--el-box-shadow-light);
  .header-item {
    height: 8px;
  }
  .breadcrumb {
    padding-top: 8px;
  }
}
</style>
