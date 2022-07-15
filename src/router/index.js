/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-04 09:08:13
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-09 14:31:33
 * @Description: VueRouter
 */

import { createWebHistory, createRouter } from 'vue-router'
import Layout from '@/layout'
// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/system/home'),
        name: 'Index',
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/user/profile',
        component: () => import('@/views/system/user/profile'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
