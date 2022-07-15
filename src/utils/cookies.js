/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-01-10 08:44:42
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:22:59
 * @Description: Cookies
 */
import Cookies from 'js-cookie'

export const getSidebarStatus = () => Cookies.get('sidebarStatus')
export const setSidebarStatus = status => Cookies.set('sidebarStatus', status)
