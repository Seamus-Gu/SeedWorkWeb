/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-04-06 10:11:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-29 10:43:23
 * @Description: 主题配置
 */
import { presetPrimaryColors, presetPalettes } from '@ant-design/colors'
import { useCssVar } from '@vueuse/core'

const themeStyle = {
  light: '#ffffff',
  dark: '#001529',
  deepBlack: '#242525'
}

const themeSideBar = {
  LRLayout: {
    light: '#ffffff',
    dark: '#001529',
    deepBlack: '#242525'
  },
  TLayout: {
    light: '#ffffff',
    dark: '#ffffff',
    deepBlack: '#242525'
  },
  UDLayout: {
    light: '#ffffff',
    dark: '#001529',
    deepBlack: '#242525'
  }
}

const themeHeader = {
  LRLayout: {
    light: '#ffffff',
    dark: '#ffffff',
    deepBlack: '#242525'
  },
  TLayout: {
    light: '#ffffff',
    dark: '#001529',
    deepBlack: '#242525'
  },
  UDLayout: {
    light: '#ffffff',
    dark: '#001529',
    deepBlack: '#242525'
  }
}

const themeSiderText = {
  LRLayout: {
    light: 'rgba(0, 0, 0, 0.85)',
    dark: 'hsla(0,0%,100%,.65)',
    deepBlack: 'rgba(229, 224, 216, 0.85)'
  },
  TLayout: {
    light: 'rgba(0, 0, 0, 0.85)',
    dark: 'rgba(0, 0, 0, 0.85)',
    deepBlack: 'rgba(229, 224, 216, 0.85)'
  },
  UDLayout: {
    light: 'rgba(0, 0, 0, 0.85)',
    dark: 'hsla(0,0%,100%,.65)',
    deepBlack: 'rgba(229, 224, 216, 0.85)'
  }
}

const themeHeaderText = {
  LRLayout: {
    light: 'rgba(0, 0, 0, 0.85)',
    dark: 'rgba(0, 0, 0, 0.85)',
    deepBlack: 'rgba(229, 224, 216, 0.85)'
  },
  TLayout: {
    light: 'rgba(0, 0, 0, 0.85)',
    dark: 'hsla(0,0%,100%,.65)',
    deepBlack: 'rgba(229, 224, 216, 0.85)'
  },
  UDLayout: {
    light: 'rgba(0, 0, 0, 0.85)',
    dark: 'hsla(0,0%,100%,.65)',
    deepBlack: 'rgba(229, 224, 216, 0.85)'
  }
}

const themeBackgroundBorder = {
  light: '#f0f2f5',
  dark: '#f0f2f5',
  deepBlack: '#2a2c2c'
}

const themeBackground = {
  light: '#ffffff',
  dark: '#fbfbfb',
  deepBlack: '#242525'
}

const themeBackground2 = {
  light: '#f5f5f5',
  dark: '#f5f5f5',
  deepBlack: '#242525'
}

const themeText = {
  light: 'rgba(0,0,0,0.85)',
  dark: 'rgba(0,0,0,0.85)',
  deepBlack: 'rgba(229, 224, 216, 0.85)'
}

const themeText2 = {
  light: '#ffffff',
  dark: '#ffffff',
  deepBlack: 'rgba(229, 224, 216, 0.85)'
}

const themeBorder1 = {
  light: '#d9d9d9',
  dark: '#d9d9d9',
  deepBlack: 'rgb(72,72,73)'
}

const themeBorder2 = {
  light: '#f0f0f0',
  dark: '#f0f0f0',
  deepBlack: 'rgb(72,72,73)'
}

const themeMenuSelect = {
  '#FAAD14': {
    light: '#fffbe6',
    dark: '#fffbe6',
    deepBlack: '#493f11'
  },
  '#FA541C': {
    light: '#fff2e8',
    dark: '#fff2e8',
    deepBlack: '#462710'
  },
  '#F5222D': {
    light: '#fff1f0',
    dark: '#fff1f0',
    deepBlack: '#40120e'
  },
  '#F1627E': {
    light: '#ffe5e3',
    dark: '#ffe5e3',
    deepBlack: '#5e242f'
  },
  '#722ED1': {
    light: '#f9f0ff',
    dark: '#f9f0ff',
    deepBlack: '#27103a'
  },
  '#1890FF': {
    light: '#e6f7ff',
    dark: '#e6f7ff',
    deepBlack: '#113545'
  },
  '#13C2C2': {
    light: '#e6fffb',
    dark: '#e6fffb',
    deepBlack: '#133631'
  },
  '#52C41A': {
    light: '#f6ffed',
    dark: '#f6ffed',
    deepBlack: '#28360f'
  }
}

const themePrimaryHover = {
  '#FAAD14': '#ffc53d',
  '#FA541C': '#ff7a45',
  '#F5222D': '#ff4d4f',
  '#F1627E': '#f19dad',
  '#722ED1': '#9254de',
  '#1890FF': '#40a9ff',
  '#13C2C2': '#36cfc9',
  '#52C41A': '#73d13d'
}

const themePrimaryActive = {
  '#FAAD14': '#ad6800',
  '#FA541C': '#ad2102',
  '#F5222D': '#a8071a',
  '#F1627E': '#873746',
  '#722ED1': '#391085',
  '#1890FF': '#0050b3',
  '#13C2C2': '#006d75',
  '#52C41A': '#237804'
}

export function setTheme(theme, layout) {
  // let root = document.querySelector(':root')
  // root.style.setProperty('--theme', themeStyle[theme])
  // root.style.setProperty('--theme-sider', themeSideBar[layout][theme])
  // root.style.setProperty('--theme-header', themeHeader[layout][theme])
  // root.style.setProperty('--theme-sider-text', themeSiderText[layout][theme])
  // root.style.setProperty('--theme-header-text', themeHeaderText[layout][theme])
  // root.style.setProperty(
  //   '--theme-background-border',
  //   themeBackgroundBorder[theme]
  // )
  // root.style.setProperty('--theme-background-1', themeBackground[theme])
  // root.style.setProperty('--theme-background-2', themeBackground2[theme])
  // root.style.setProperty('--theme-text-1', themeText[theme])
  // root.style.setProperty('--theme-text-2', themeText2[theme])
  // root.style.setProperty('--theme-border-1', themeBorder1[theme])
  // root.style.setProperty('--theme-border-2', themeBorder2[theme])
}

export function setThemeColor(color) {
  let root = document.querySelector(':root')
  root.style.setProperty('--el-color-primary', color)
  // root.style.setProperty('--theme-color-primary', color)
  // root.style.setProperty('--theme-menu-selsct', themeMenuSelect[color][theme])
  // root.style.setProperty('--theme-primary-hover', themePrimaryHover[color])
  // root.style.setProperty('--theme-primary-active', themePrimaryActive[color])
}

export function initSetting(setting) {
  let root = document.querySelector(':root')

  if (setting.theme === 'deepBlack') {
    document.querySelector('html').classList.add('dark')
  } else {
    document.querySelector('html').classList.remove('dark')
  }
  root.style.setProperty('--el-color-primary', setting.themeColor)

  let themeColor = Object.keys(presetPrimaryColors).find(
    t => presetPrimaryColors[t] == setting.themeColor
  )

  root.style.setProperty(
    '--el-color-primary-light-9',
    presetPalettes[themeColor][0]
  )
  // root.style.setProperty('--theme-color-primary', color)
  // root.style.setProperty('--theme-menu-selsct', themeMenuSelect[color][theme])
  // root.style.setProperty('--theme-primary-hover', themePrimaryHover[color])
  // root.style.setProperty('--theme-primary-active', themePrimaryActive[color])
}
