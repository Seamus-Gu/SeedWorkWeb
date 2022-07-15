/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-02 22:08:18
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:17:25
 * @Description: 主入口
 */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import { loadAllPlugins, loadAllDirective } from './plugins'

import 'virtual:svg-icons-register'
import './permission'

const app = createApp(App)

loadAllPlugins(app)

loadAllDirective(app)

app.use(store)
app.use(router)
app.mount('#app')
