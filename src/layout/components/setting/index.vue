<template>
  <a-drawer
    class="theme-drawer-container"
    title="主题配置"
    :visible="visible"
    placement="right"
    :closable="true"
    @close="onClose"
    :contentWrapperStyle="{ width: '256px' }"
  >
    <a-form>
      <a-row style="margin: 0">
        <h3>主题风格设置</h3>
      </a-row>
      <a-row>
        <span>布局选择</span>
      </a-row>
      <a-row :gutter="25">
        <a-col :span="8">
          <a-tooltip title="侧边">
            <img
              class="layout-select-content"
              src="@/assets/icons/side.svg"
              alt="side"
              @click="setLRLayout"
              :style="{
                boxShadow: layout == 'LRLayout' ? '0px 0 6px 1px #2db7f5' : ''
              }"
            />
          </a-tooltip>
        </a-col>
        <a-col :span="8">
          <a-tooltip title="综合">
            <img
              class="layout-select-content"
              src="@/assets/icons/default.svg"
              alt="synthesize"
              @click="setTLayout"
              :style="{
                boxShadow: layout == 'TLayout' ? '0px 0 6px 1px #2db7f5' : ''
              }"
          /></a-tooltip>
        </a-col>
        <a-col :span="8">
          <a-tooltip title="顶栏">
            <img
              class="layout-select-content"
              src="@/assets/icons/header.svg"
              alt="header"
              @click="setUDLayout"
              :style="{
                boxShadow: layout == 'UDLayout' ? '0px 0 6px 1px #2db7f5' : ''
              }"
          /></a-tooltip>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="theme-color">
          <span>主题配置</span>
        </a-col>
        <a-col :offset="6" :span="2">
          <a-dropdown>
            <ThemeColorSelect :type="theme"> </ThemeColorSelect>
            <template #overlay>
              <a-card>
                <a-row :gutter="8" style="padding: 0 4px 0 4px">
                  <a-tooltip title="日间">
                    <a-col :span="8">
                      <ThemeColorSelect
                        type="light"
                        @click="changeTheme('light')"
                      >
                      </ThemeColorSelect>
                    </a-col>
                  </a-tooltip>
                  <a-tooltip title="夜间">
                    <a-col :span="8">
                      <ThemeColorSelect
                        type="dark"
                        @click="changeTheme('dark')"
                      ></ThemeColorSelect>
                    </a-col>
                  </a-tooltip>
                  <a-tooltip title="暗黑">
                    <a-col :span="8">
                      <ThemeColorSelect
                        type="deepBlack"
                        @click="changeTheme('deepBlack')"
                      ></ThemeColorSelect>
                    </a-col>
                  </a-tooltip>
                </a-row>
              </a-card>
            </template>
          </a-dropdown>
        </a-col>
        <a-col :offset="4" :span="2" id="theme-color-picker">
          <div class="theme-color-selsct" @click="showColorPicker">
            <div
              class="theme-color-content"
              :style="{ background: themeColor }"
            ></div>
            <div class="theme-color-picker">
              <ColorSelect
                v-if="colorPicker"
                :colorList="colorList"
                :color="themeColor"
                @changeColor="changeThemeColor"
                style="background-color: rgb(255 255 255 / 66%)"
              >
              </ColorSelect>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-divider class="drawer-divider" />
      <a-row>
        <h3>系统布局设置</h3>
      </a-row>
      <a-row>
        <a-col :span="8">
          <span>标签</span>
        </a-col>
        <a-col :offset="10" :span="4">
          <a-switch v-model:checked="showTabView" />
        </a-col>
      </a-row>
      <a-row v-if="layout != 'UDLayout'">
        <a-col :span="8">
          <span>菜单</span>
        </a-col>
        <a-col :offset="10" :span="4">
          <a-switch v-model:checked="showSideBar" />
        </a-col>
      </a-row>
      <a-row v-if="layout != 'UDLayout'">
        <a-col :span="8">
          <span>头部固定</span>
        </a-col>
        <a-col :offset="10" :span="4">
          <a-switch v-model:checked="affixHeader" />
        </a-col>
      </a-row>
      <a-divider class="drawer-divider" />
      <a-row>
        <h3>顶部按钮</h3>
      </a-row>
      <a-row>
        <a-col :span="8">
          <span>搜索</span>
        </a-col>
        <a-col :offset="10" :span="4">
          <a-switch v-model:checked="searchSwitch" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <span>主题</span>
        </a-col>
        <a-col :offset="10" :span="4">
          <a-switch v-model:checked="themeSwitch" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <span>通知</span>
        </a-col>
        <a-col :offset="10" :span="4">
          <a-switch v-model:checked="messageSwitch" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <span>全屏</span>
        </a-col>
        <a-col :offset="10" :span="4">
          <a-switch v-model:checked="screenFullSwitch" />
        </a-col>
      </a-row>
      <a-divider />
      <a-row>
        <a-col :span="8">
          <a-button type="primary" @click="savaSettings">保存配置</a-button>
        </a-col>
        <a-col :offset="6" :span="4">
          <a-button type="primary" @click="resetSettings">重置配置</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-drawer>
</template>
<script>
import { ColorSelect } from '@/components'
import ThemeColorSelect from './ThemeColorSelect.vue'

import { setSettings } from '@/utils/local-storage'
import { setTheme, setThemeColor } from '@/utils/theme'
import { onClickOutside } from '@vueuse/core'

export default defineComponent({
  components: {
    ColorSelect,
    ThemeColorSelect
  },
  props: {
    onClose: {
      type: Function
    }
  },
  setup() {
    const store = useStore()

    const routes = store.getters.routes
    const sideMenus = store.getters.sideMenus

    const settingData = reactive({
      visible: computed(() => store.state.settings.visible),
      layout: computed(() => store.state.settings.layout),
      theme: computed(() => store.state.settings.theme),
      themeColor: computed(() => store.state.settings.themeColor)
    })

    const colorPicker = ref(false)
    const colorList = ref([
      '#FAAD14',
      '#FA541C',
      '#F5222D',
      '#F1627E',
      '#722ED1',
      '#1890FF',
      '#13C2C2',
      '#52C41A'
    ])

    const switchData = reactive({
      showTabView: computed({
        get: () => store.state.settings.showTabView,
        set: () => {
          store.dispatch('settings/toggleTabView')
        }
      }),
      showSideBar: computed({
        get: () => store.state.settings.showSideBar,
        set: () => {
          store.dispatch('settings/toggleSideBar')
        }
      }),
      affixHeader: computed({
        get: () => store.state.settings.affixHeader,
        set: () => {
          store.dispatch('settings/toggleAffixHeader')
        }
      }),
      searchSwitch: computed({
        get: () => store.state.settings.searchSwitch,
        set: () => {
          store.dispatch('settings/toggleSearchSwitch')
        }
      }),
      themeSwitch: computed({
        get: () => store.state.settings.themeSwitch,
        set: () => {
          store.dispatch('settings/toggleThemeSwitch')
        }
      }),
      messageSwitch: computed({
        get: () => store.state.settings.messageSwitch,
        set: () => {
          store.dispatch('settings/toggleMessageSwitch')
        }
      }),
      screenFullSwitch: computed({
        get: () => store.state.settings.screenFullSwitch,
        set: () => {
          store.dispatch('settings/toggleScreenFullSwitch')
        }
      })
    })

    const methods = reactive({
      onClose: () => {
        store.dispatch('settings/setVisible', false)
      },
      setLRLayout: () => {
        store.dispatch('settings/setLayout', 'LRLayout')
        setTheme(settingData.theme, settingData.layout)
        store.dispatch('settings/showSideBar')
        store.dispatch('setSiderBarRoutes', routes)
      },
      setTLayout: () => {
        store.dispatch('settings/setLayout', 'TLayout')
        setTheme(settingData.theme, settingData.layout)
        store.dispatch('settings/showSideBar')
        store.dispatch('setSiderBarRoutes', sideMenus)
      },
      setUDLayout: () => {
        store.dispatch('settings/setLayout', 'UDLayout')
        setTheme(settingData.theme, settingData.layout)
        store.dispatch('settings/closeSideBar')
      },
      changeTheme: val => {
        switch (val) {
          case 'light':
            store.dispatch('settings/setTheme', val)
            break
          case 'dark':
            store.dispatch('settings/setTheme', val)
            break
          case 'deepBlack':
            store.dispatch('settings/setTheme', val)
            break
        }
        setTheme(val, settingData.layout)
        setThemeColor(val, settingData.themeColor)
      },
      showColorPicker: () => {
        colorPicker.value = true
      },
      closeColorPicker: () => {
        colorPicker.value = false
      },
      changeThemeColor: val => {
        store.dispatch('settings/setThemeColor', val)
        setThemeColor(settingData.theme, val)
      },
      savaSettings: async () => {
        let setting = {
          layout: settingData.layout,
          theme: settingData.theme,
          themeColor: settingData.themeColor,
          showTabView: switchData.showTabView,
          showSideBar: switchData.showSideBar,
          affixHeader: switchData.affixHeader,
          searchSwitch: switchData.searchSwitch,
          themeSwitch: switchData.themeSwitch,
          messageSwitch: switchData.messageSwitch,
          screenFullSwitch: switchData.screenFullSwitch
        }
        let str = JSON.stringify(setting)
        await setSettings(str)
        store.dispatch('settings/setVisible', false)
      },
      resetSettings: () => {
        let setting = {
          layout: 'LRLayout',
          theme: 'light',
          themeColor: '#1890FF',
          showTabView: true,
          showSideBar: true,
          affixHeader: true,
          searchSwitch: true,
          themeSwitch: true,
          messageSwitch: true,
          screenFullSwitch: true
        }
        methods.setLRLayout()
        setTheme('light', 'LRLayout')
        setThemeColor('light', '#1890FF')
        store.dispatch('settings/initSetting', setting)
      }
    })

    onClickOutside(colorPicker, event => {
      colorPicker.value = false
    })

    return {
      colorPicker,
      colorList,
      ...toRefs(switchData),
      ...toRefs(settingData),
      ...toRefs(methods)
    }
  }
})
</script>
<style lang="scss" scoped>
.theme-drawer-container {
  .ant-row {
    margin-top: 12px;
  }
  .layout-select-title {
    margin-top: 4px;
    text-align: center;
  }
  .layout-select-content {
    border: 2px solid #d7d8d9;
    border-radius: 8px;
    cursor: pointer;
  }
  .theme-color {
    padding-top: 5px;
  }
  .theme-color-selsct {
    height: 32px;
    width: 32px;
    padding: 4px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    cursor: pointer;
  }
  .theme-color-content {
    display: block;
    border: 1px solid #909399;
    border-radius: 2px;
    width: 100%;
    height: 100%;
  }
  .theme-color-picker {
    z-index: 9999;
    position: fixed;
    right: 45px;
    top: 250px;
    justify-content: space-around;
  }
  .drawer-divider {
    margin: 12px 0 12px 0;
  }
}
</style>

<style lang="scss">
.theme-color-select .ant-dropdown-menu-item,
.ant-dropdown-menu-submenu-title {
  padding: 0;
}
</style>
