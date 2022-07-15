/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-02 22:08:18
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-01-02 22:08:18
 * @Description: Vite 配置
 */
import { defineConfig, loadEnv } from 'vite'
import path from 'path'

import { createVitePlugins, createServer } from './src/utils/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: createVitePlugins(env),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`
        }
      }
    }, // vite 相关配置
    server: createServer(env)
  }
})
