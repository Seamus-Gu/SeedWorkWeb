<!--
 * @Description: 导航栏
 * @Autor: Gu
 * @Date: 2021-12-29 10:27:18
-->
<template>
  <a-layout-header class="layout-header">
    <a-row align="middle" justify="space-between">
      <div class="header-main-left">
        <a-row>
          <a-space>
            <template v-if="layout == 'LRLayout' || size == 'small'">
              <Hamburger
                class="header-item"
                :is-active="isActive"
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
          </a-space>
        </a-row>
      </div>
      <div class="header-main-right">
        <a-row>
          <a-space>
            <div class="header-item" v-if="searchSwitch">
              <svg class="icon" aria-hidden="true" font-size="20px">
                <use xlink:href="#icon-search-1" />
              </svg>
            </div>
            <div class="header-item" v-if="themeSwitch" @click="showSetting">
              <svg class="icon" aria-hidden="true" font-size="20px">
                <use xlink:href="#icon-setting-config" />
              </svg>
            </div>
            <div class="header-item" v-if="messageSwitch">
              <svg class="icon" aria-hidden="true" font-size="20px">
                <use xlink:href="#icon-remind" />
              </svg>
            </div>
            <ScreenFull
              v-if="screenFullSwitch"
              class="header-item"
            ></ScreenFull>
            <Avatar></Avatar>
          </a-space>
        </a-row>
      </div>
    </a-row>
  </a-layout-header>
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

<style lang="scss" scoped></style>
