<script setup lang="ts">
import { mainStore } from '@/store'
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
const store = mainStore()
defineProps({
  isCollapse: Boolean,
})
const emit = defineEmits(['menuClick'])
function menuClick() {
  emit('menuClick')
}
// 获取用户信息
const userInfo = computed(() => store.userInfo)
// 退出事件
function logOutClick() {
  store.logOut()
}
const router = useRouter()
function routerClick(url: string) {
  router.push(url)
}
</script>

<template>
  <div class="nav">
    <div class="left-menu">
      <div class="menu" @click="menuClick">
        <svg-icon name="openMenu" v-if="isCollapse"></svg-icon>
        <svg-icon name="closeMenu" v-else></svg-icon>
      </div>
      <span class="title">{{ $route.meta.title }}</span>
    </div>
    <div class="right-menu">
      <el-dropdown>
        <div class="user-info">
          <div class="img">
            <img :src="userInfo.avatar" alt="" />
          </div>
          <div class="name">{{ userInfo.name }}</div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              ><a
                class="text"
                href="https://github.com/chend1/vue3-ts-admin"
                target="_blank"
                >Github</a
              ></el-dropdown-item
            >
            <el-dropdown-item
              ><a
                class="text"
                href="https://github.com/chend1/vue3-ts-admin"
                target="_blank"
                >Gitee</a
              ></el-dropdown-item
            >
            <el-dropdown-item @click="routerClick('/about')"
              >关于我们</el-dropdown-item
            >
            <el-dropdown-item @click="logOutClick">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<style scoped lang="less">
.nav {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 10px;
  border-bottom: 1px solid #eeeff1;
  .left-menu {
    font-size: 24px;
    display: flex;
    align-items: center;
    .menu {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .title {
      margin-left: 15px;
      font-size: 18px;
      font-weight: normal;
    }
  }
  .right-menu {
    margin-top: 2.5px;
    min-width: 35px;
    height: 35px;
    margin-right: 15px;

    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;
      .img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 5px;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
    }
  }
}
.text {
  color: #606266;
  text-decoration: none;
}
</style>
