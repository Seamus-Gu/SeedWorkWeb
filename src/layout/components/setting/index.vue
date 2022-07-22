<template>
  <div class="setting-container" v-if="visible">
    <el-drawer
      modalClass="setting-drawer"
      title="主题配置"
      :modelValue="visible"
      @close="onClose"
      :size="256"
    >
      <el-form>
        <el-row>
          <h3>主题风格设置</h3>
        </el-row>
        <el-row>
          <span class="setting-contont">布局选择</span>
        </el-row>
        <el-row justify="space-between" style="margin-top: 8px">
          <el-col :span="6">
            <el-tooltip content="侧边">
              <div
                class="layout-select-content"
                :style="{
                  boxShadow: layout == 'LRLayout' ? '0px 0 6px 1px #2db7f5' : ''
                }"
              >
                <svg class="icon" ariel-hidden="true" font-size="48px">
                  <use xlink:href="#icon-side" />
                </svg>
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="6">
            <el-tooltip content="综合">
              <div
                class="layout-select-content"
                :style="{
                  boxShadow: layout == 'TLayout' ? '0px 0 6px 1px #2db7f5' : ''
                }"
              >
                <svg class="icon" ariel-hidden="true" font-size="48px">
                  <use xlink:href="#icon-synthesize" />
                </svg>
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="6">
            <el-tooltip content="顶栏">
              <div
                class="layout-select-content"
                :style="{
                  boxShadow: layout == 'UDLayout' ? '0px 0 6px 1px #2db7f5' : ''
                }"
              >
                <svg class="icon" ariel-hidden="true" font-size="48px">
                  <use xlink:href="#icon-header" />
                </svg>
              </div>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row align="middle" style="margin-top: 8px">
          <el-col :span="8">
            <span>主题配置</span>
          </el-col>
          <el-col :offset="6" :span="2">
            <el-dropdown trigger="click">
              <ThemeSelect :type="theme"> </ThemeSelect>
              <template #dropdown>
                <el-card>
                  <el-row :gutter="8" justify="space-between">
                    <el-tooltip content="日间">
                      <el-col :span="8">
                        <ThemeSelect type="light" @click="changeTheme('light')">
                        </ThemeSelect>
                      </el-col>
                    </el-tooltip>
                    <el-tooltip content="夜间">
                      <el-col :span="8">
                        <ThemeSelect
                          type="dark"
                          @click="changeTheme('dark')"
                        ></ThemeSelect>
                      </el-col>
                    </el-tooltip>
                    <el-tooltip content="暗黑">
                      <el-col :span="8">
                        <ThemeSelect
                          type="deepBlack"
                          @click="changeTheme('deepBlack')"
                        ></ThemeSelect>
                      </el-col>
                    </el-tooltip>
                  </el-row>
                </el-card>
              </template>
            </el-dropdown>
          </el-col>
          <el-col :offset="4" :span="2" id="theme-color-picker">
            <el-dropdown trigger="click">
              <div class="theme-color-selsct" @click="showColorPicker">
                <div
                  class="theme-color-content"
                  :style="{ background: themeColor }"
                ></div>
              </div>
              <template #dropdown>
                <ColorSelect
                  @changeColor="changeThemeColor"
                >
                </ColorSelect>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
        <el-divider class="drawer-divider" />
        <el-row>
          <h3>系统布局设置</h3>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span>标签</span>
          </el-col>
          <el-col :offset="10" :span="4">
            <el-switch v-model="showTabView" />
          </el-col>
        </el-row>
        <el-row v-if="layout != 'UDLayout'">
          <el-col :span="8">
            <span>菜单</span>
          </el-col>
          <el-col :offset="10" :span="4">
            <el-switch v-model="showSideBar" />
          </el-col>
        </el-row>
        <el-row v-if="layout != 'UDLayout'">
          <el-col :span="8">
            <span>头部固定</span>
          </el-col>
          <el-col :offset="10" :span="4">
            <el-switch v-model="affixHeader" />
          </el-col>
        </el-row>
        <el-divider class="drawer-divider" />
        <el-row>
          <h3>顶部按钮</h3>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span>搜索</span>
          </el-col>
          <el-col :offset="10" :span="4">
            <el-switch v-model="searchSwitch" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span>主题</span>
          </el-col>
          <el-col :offset="10" :span="4">
            <el-switch v-model="themeSwitch" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span>通知</span>
          </el-col>
          <el-col :offset="10" :span="4">
            <el-switch v-model="messageSwitch" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span>全屏</span>
          </el-col>
          <el-col :offset="10" :span="4">
            <el-switch v-model="screenFullSwitch" />
          </el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8">
            <el-button type="primary" @click="savaSettings">保存配置</el-button>
          </el-col>
          <el-col :offset="6" :span="4">
            <el-button type="primary" @click="resetSettings"
              >重置配置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import ColorSelect from './ColorSelect.vue'
import ThemeSelect from './ThemeSelect.vue'

import { setSettings } from '@/utils/local-storage'
import { setTheme, setThemeColor } from '@/utils/theme'
import { onClickOutside, useDark } from '@vueuse/core'

export default defineComponent({
  components: {
    ColorSelect,
    ThemeSelect
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
            isDark.value = false
            store.dispatch('settings/setTheme', val)
            break
          case 'dark':
            store.dispatch('settings/setTheme', val)
            break
          case 'deepBlack':
            const isDark = useDark()
            isDark.value = true
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
      ...toRefs(switchData),
      ...toRefs(settingData),
      ...toRefs(methods)
    }
  }
})
</script>
