<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-01 19:58:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-29 16:52:54
 * @Description: 个人中心页面
-->
<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="8">
        <Panel title="个人信息">
          <el-row justify="center" style="margin-bottom: 18px">
            <UserAvatar></UserAvatar>
          </el-row>
          <el-row justify="center" style="font-weight: 500; font-size: 20px">
            {{ userInfoData.nickName }}
          </el-row>
          <el-divider />
          <el-row class="user-info" justify="space-between">
            <el-col span="8">
              <svg class="icon" ariel-hidden="true" font-size="16px">
                <use xlink:href="#icon-yonghu" />
              </svg>
              用户名</el-col
            >
            <el-col span="8" style="text-align: end">
              {{ userInfoData.username }}
            </el-col>
          </el-row>
          <el-divider />

          <el-row class="user-info" justify="space-between">
            <el-col span="8">
              <svg class="icon" ariel-hidden="true" font-size="16px">
                <use xlink:href="#icon-shouji" />
              </svg>
              手机号码
            </el-col>
            <el-col span="8" style="text-align: end">{{
              userInfoData.phoneNumber
            }}</el-col>
          </el-row>
          <el-divider />
          <el-row class="user-info" justify="space-between">
            <el-col span="8">
              <svg class="icon" ariel-hidden="true" font-size="16px">
                <use xlink:href="#icon-24gl-mailboxFull" />
              </svg>
              用户邮箱
            </el-col>
            <el-col span="12" style="text-align: end">
              {{ userInfoData.email }}
            </el-col>
          </el-row>
          <el-divider />
          <el-row class="user-info" justify="space-between">
            <el-col span="8">
              <svg class="icon" ariel-hidden="true" font-size="16px">
                <use xlink:href="#icon-gongsi" />
              </svg>
              所属组织
            </el-col>
            <el-col span="12" style="text-align: end">
              {{ userInfoData.dept }}
            </el-col>
          </el-row>
          <el-divider />
          <el-row class="user-info" justify="space-between">
            <el-col span="8">
              <svg class="icon" ariel-hidden="true" font-size="16px">
                <use xlink:href="#icon-jiaoseguanli" />
              </svg>
              所属角色
            </el-col>
            <template v-for="(item, index) in 8" :key="index">
              <el-space>
                <el-col span="4" style="text-align: end">
                  <el-tag color="pink"> 2323 </el-tag>
                </el-col>
              </el-space>
            </template>

            <!-- <el-col span="12" style="text-align: end">
              <template
                v-for="(item, index) in userInfoData.roles"
                :key="index"
              >
                <el-tag v-if="index < 4" color="pink">
                  {{ item.roleName }}
                </el-tag>
              </template>
            </el-col> -->
          </el-row>
          <el-divider />
          <el-row class="user-info" justify="space-between">
            <el-col span="8">用户昵称</el-col>
            <el-col span="8" style="text-align: end"></el-col>
          </el-row>
        </Panel>
      </el-col>
      <el-col :span="16">
        <Panel>
          <el-tabs>
            <el-tab-pane key="1" tab="基本资料">
              <UserInfo></UserInfo>
            </el-tab-pane>
            <el-tab-pane key="2" tab="修改密码" force-render>
              <ResetPwd></ResetPwd>
            </el-tab-pane>
          </el-tabs>
        </Panel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getProfile } from '@/api/system/user'
import { Panel } from '@/components'
import UserAvatar from './UserAvatar'
import UserInfo from './UserInfo'
import ResetPwd from './ResetPwd'

export default {
  components: { Panel, UserAvatar, UserInfo, ResetPwd },
  setup() {
    const userInfoData = reactive({
      username: undefined,
      nickName: undefined,
      phoneNumber: undefined,
      email: undefined,
      avatar: undefined
    })

    const methods = reactive({
      getProfile: () => {
        getProfile().then(res => {
          Object.assign(userInfoData, res.data)
          if (res.data.dept) {
            userInfoData.dept = res.data.dept.title
          }
        })
      }
    })

    methods.getProfile()

    return {
      userInfoData,
      ...toRefs(methods)
    }
  }
}
</script>
<style lang="scss" scoped>
.user-info {
  padding: 0 16px 0 16px;
}
</style>

<!--
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑     永不宕机     永无BUG
 -->
