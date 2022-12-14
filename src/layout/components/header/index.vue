<!--
 * @Description: 导航栏
 * @Autor: Gu
 * @Date: 2021-12-29 10:27:18
-->
<template>
  <el-header class="layout-header">
    <div class="header-container">
      <div class="header-main-left">
        <el-row>
          <HeaderTitle
            v-if="size != 'small' && layout != 'LRLayout'"
          ></HeaderTitle>
          <Hamburger
            v-if="layout != 'UDLayout' || size == 'small'"
            class="header-item cursor-pointer"
            :isActive="isActive"
            @click="toggleSideBar"
          ></Hamburger>
          <TopNav v-if="size != 'small' && layout != 'LRLayout'"></TopNav>
          <Breadcrumb
            v-if="size != 'small' && layout == 'LRLayout'"
          ></Breadcrumb>
        </el-row>
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
    </div>
  </el-header>
</template>

<script>
import HeaderTitle from '../sideBar/SideBarLogo.vue'
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import TopNav from './TopNav.vue'
import Avatar from './Avatar.vue'

import { ScreenFull } from '@/components'

export default {
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
}
</script>
<style lang="scss" scoped>
.layout-header {
  height: 50px;
  overflow: hidden;
  padding: 0;
  box-shadow: var(--el-box-shadow-light);
  border-bottom: 1px solid var(--el-border-color);

  .header-container {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    .header-main-left {
      width: calc(100% - 224px);
      padding-left: 8px;
    }
  }
  .header-item {
    display: flex;
    height: 50px;
    padding: 1px 10px 0;
    align-items: center;
  }
  .header-item:hover {
    background-color: var(--el-color-info-light-9);
  }
  .breadcrumb {
    padding-top: 8px;
  }
}
</style>
