<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { mainStore } from '@/store'
const router = useRouter()
const store = mainStore()
const userInfo = reactive({
  account: '',
  password: '',
})
function loginClick() {
  console.log(userInfo)
  if (!userInfo.account || !userInfo.password) {
    ElMessage({
      message: '账号密码随便填',
      type: 'warning',
    })
    return
  }
  store.setToken(userInfo.account + '-' + userInfo.password)
  router.push('/home')
}
</script>

<template>
  <div class="login">
    <div class="container">
      <h2>用户登陆</h2>
      <div class="form">
        <div class="account">
          <input type="text" placeholder="账号：" v-model="userInfo.account" />
        </div>
        <div class="password">
          <input
            type="password"
            placeholder="密码："
            v-model="userInfo.password"
          />
        </div>
        <div class="btn" @click="loginClick">登陆</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-position: 100% 100%;
  position: relative;
  background-image: url(../../assets/images/login-bg.jpg);
  .container {
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 420px;
    background: rgba(41, 39, 39, 0.5);
    box-shadow: 0px 35px 44px -22px #273847;
    h2 {
      width: 100%;
      font-size: 26px;
      line-height: 100px;
      text-align: center;
      color: #fff;
      font-weight: normal;
      letter-spacing: 2px;
    }
    .form {
      width: 100%;
      height: 360px;
      box-sizing: border-box;
      padding: 10px 30px;
      color: #eee;
      font-size: 16px;
      .account,
      .password {
        width: 100%;
        line-height: 40px;
        border-bottom: 1px solid #979595;
        margin-bottom: 30px;
        input {
          width: 100%;
          height: 40px;
          border: none;
          outline: none;
          background-color: transparent;
          padding-left: 10px;
          margin: 0;
          color: #eee;
        }
      }
      .btn {
        width: 100%;
        height: 42px;
        text-align: center;
        line-height: 42px;
        background-color: #d1d1d1;
        color: #000;
        margin-top: 60px;
        cursor: pointer;
        &:hover {
          background-color: #518edd;
          color: #fff;
        }
      }
    }
  }
}
</style>
