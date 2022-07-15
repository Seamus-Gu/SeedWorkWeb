<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-01 19:58:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-29 16:52:54
 * @Description: 个人中心页面
-->
<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="8">
        <Panel title="个人信息">
          <a-row justify="center" style="margin-bottom: 18px">
            <UserAvatar></UserAvatar>
          </a-row>
          <a-row justify="center" style="font-weight: 500; font-size: 20px">
            {{ userInfoData.nickName }}
          </a-row>
          <a-divider />
          <a-row class="user-info" justify="space-between">
            <a-col span="8">
              <svg class="icon" aria-hidden="true" font-size="16px">
                <use xlink:href="#icon-yonghu" />
              </svg>
              用户名</a-col
            >
            <a-col span="8" style="text-align: end">
              {{ userInfoData.username }}
            </a-col>
          </a-row>
          <a-divider />

          <a-row class="user-info" justify="space-between">
            <a-col span="8">
              <svg class="icon" aria-hidden="true" font-size="16px">
                <use xlink:href="#icon-shouji" />
              </svg>
              手机号码
            </a-col>
            <a-col span="8" style="text-align: end">{{
              userInfoData.phoneNumber
            }}</a-col>
          </a-row>
          <a-divider />
          <a-row class="user-info" justify="space-between">
            <a-col span="8">
              <svg class="icon" aria-hidden="true" font-size="16px">
                <use xlink:href="#icon-24gl-mailboxFull" />
              </svg>
              用户邮箱
            </a-col>
            <a-col span="12" style="text-align: end">
              {{ userInfoData.email }}
            </a-col>
          </a-row>
          <a-divider />
          <a-row class="user-info" justify="space-between">
            <a-col span="8">
              <svg class="icon" aria-hidden="true" font-size="16px">
                <use xlink:href="#icon-gongsi" />
              </svg>
              所属组织
            </a-col>
            <a-col span="12" style="text-align: end">
              {{ userInfoData.organization }}
            </a-col>
          </a-row>
          <a-divider />
          <a-row class="user-info" justify="space-between">
            <a-col span="8">
              <svg class="icon" aria-hidden="true" font-size="16px">
                <use xlink:href="#icon-jiaoseguanli" />
              </svg>
              所属角色
            </a-col>
            <template v-for="(item, index) in 8" :key="index">
              <a-space>
                <a-col span="4" style="text-align: end">
                  <a-tag color="pink"> 2323 </a-tag>
                </a-col>
              </a-space>
            </template>

            <!-- <a-col span="12" style="text-align: end">
              <template
                v-for="(item, index) in userInfoData.roles"
                :key="index"
              >
                <a-tag v-if="index < 4" color="pink">
                  {{ item.roleName }}
                </a-tag>
              </template>
            </a-col> -->
          </a-row>
          <a-divider />
          <a-row class="user-info" justify="space-between">
            <a-col span="8">用户昵称</a-col>
            <a-col span="8" style="text-align: end"></a-col>
          </a-row>
        </Panel>
      </a-col>
      <a-col :span="16">
        <Panel>
          <a-tabs>
            <a-tab-pane key="1" tab="基本资料">
              <UserInfo></UserInfo>
            </a-tab-pane>
            <a-tab-pane key="2" tab="修改密码" force-render>
              <ResetPwd></ResetPwd>
            </a-tab-pane>
          </a-tabs>
        </Panel>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getProfile } from '@/api/system/user'
import { Panel } from '@/components'
import UserAvatar from './UserAvatar'
import UserInfo from './UserInfo'
import ResetPwd from './ResetPwd'

export default defineComponent({
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
          if (res.data.organization) {
            userInfoData.organization = res.data.organization.title
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
})
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
