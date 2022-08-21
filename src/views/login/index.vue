<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-07 21:59:30
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-10 13:01:26
 * @Description: 登录页面
-->
<template>
  <div class="login-container">
    <div id="jparticle"></div>
    <el-form
      class="login-form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="login-title">登录</div>
      <el-form-item ref="username" name="username" class="username">
        <el-input
          v-model="loginForm.username"
          :clearable="true"
          size="large"
          auto-complete="off"
          placeholder="请输入用户名"
          @pressEnter="pressEnter"
        >
          <template #prefix>
            <svg class="icon" ariel-hidden="true" font-size="16px">
              <use xlink:href="#icon-yonghu" />
            </svg>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item ref="password" name="password" class="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          :clearable="true"
          size="large"
          auto-complete="off"
          :show-password="true"
          placeholder="请输入密码"
          @keyup.enter="pressEnter"
        >
          <template #prefix>
            <svg class="icon" ariel-hidden="true" font-size="16px">
              <use xlink:href="#icon-mima" />
            </svg>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="large"
          class="login-button"
          type="primary"
          :loading="loading"
          @click="handleLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Particle } from 'jparticles'

export default {
  components: {},
  setup() {
    const loginFormRef = ref()
    const router = useRouter()
    const store = useStore()

    const state = reactive({
      loginForm: {
        username: 'admin',
        password: 'admin123'
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户名'
          }
        ],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      loading: false
    })

    const methods = reactive({
      handleLogin: () => {
        loginFormRef.value.validate().then(() => {
          state.loading = true
          store
            .dispatch('login', state.loginForm)
            .then(() => {
              router.push({ path: '/' })
            })
            .catch(() => {
              state.loading = false
            })
        })
      },
      pressEnter: () => {
        methods.handleLogin()
      }
    })

    onMounted(() => {
      new Particle('#jparticle', {
        // 粒子个数,根据容器生成
        num: 0.2,
        // 粒子最大半径
        maxR: 2.4,
        // 粒子颜色
        color: '#ffffff',
        // 连线形状,cube合拢立方体,spider散开蜘蛛
        lineShape: 'spider',
        // 两粒子之间直线距离
        proximity: 100,
        // 定位点半径 100 以内（包含）的所有粒子,[0,1]为根据宽度
        range: 100,
        // 开启视差效果
        parallax: true,
        // 视差强度，值越小视差效果越强烈 (0, +∞)。
        parallaxStrength: 10,
        // 最低运动速度
        minSpeed: 0.01,
        // 最快运动速度
        maxSpeed: 0.5
      })
    })

    return {
      loginFormRef,
      ...toRefs(state),
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss" scoped>
//登录
@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.login-container {
  width: 100%;
  height: 100vh;
  //背景渐变
  background: linear-gradient(
    -45deg,
    #bdc3c7,
    #9fa5d5,
    #2c3e50,
    #9fa5d5,
    #bdc3c7
  );
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;

  //粒子动画
  #jparticle {
    width: 99%;
    height: 99%;
    z-index: -999;
  }
  .login-form {
    align-items: center;
    width: 500px;
    height: 350px;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -250px;
    position: absolute;
    border-radius: 10%;
    background: rgba(255, 255, 255, 0.43);
    box-shadow: 0 0 25px 0 #7ad7ee;
    .login-title {
      margin-top: 25px;
      text-align: center;
      color: #ffffff;
      font-size: 50px;
      text-shadow: 0 0 0.3rem #9ef0f3;
    }
    .username {
      margin-left: 50px;
      margin-top: 20px;
      width: 80%;
      height: 35px;
      opacity: 0.75;
    }
    .password {
      margin-left: 50px;
      margin-top: 30px;
      margin-bottom: 35px;
      width: 80%;
      height: 35px;
      opacity: 0.75;
    }
    .login-button {
      width: 80%;
      height: 40px;
      margin-left: 50px;
      opacity: 0.75;
    }
  }
  .footer {
    .bottom-img {
      bottom: 0;
      width: 70%;
      height: 15%;
      left: 15%;
      position: absolute;
    }
  }
}
</style>
