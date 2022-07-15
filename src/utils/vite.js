/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-13 12:34:38
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:26:03
 * @Description: Vite引入配置
 */

import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'
import viteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'

export function createVitePlugins(viteEnv) {
  const plugins = [
    vue(),
    autoImport({
      imports: ['vue', 'vue-router', 'vuex']
    }),
    viteSvgIcons({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ]
  viteEnv.VITE_USE_MOCK === 'true' &&
    plugins.push(
      viteMockServe({
        supportTs: false, //如果使用 js发开，则需要配置 supportTs 为 false
        watchFiles: true // 监视mock文件更改
      })
    )
  return plugins
}

export function createServer(viteEnv) {
  const server = {
    port: 8083,
    host: true,
    open: true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
  return server
}
