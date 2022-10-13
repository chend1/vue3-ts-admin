<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Sidebar, Navbar } from './components'
import { mainStore } from '@/store'
// 控制菜单栏收起和展开
const isCollapse = ref(false)
function menuClick() {
  isCollapse.value = !isCollapse.value
}
const store = mainStore()
onMounted(() => {
  store.setUserInfo()
})
</script>

<template>
  <div class="layout">
    <div class="nav">
      <Sidebar :isCollapse="isCollapse"></Sidebar>
    </div>
    <div class="content">
      <Navbar @menuClick="menuClick" :isCollapse="isCollapse"></Navbar>
      <div class="main-cnt">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.layout {
  display: flex;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  .nav {
    border-right: 1px solid #dcdfe6;
  }
  .content {
    flex: 1;
    overflow: hidden;
    .main-cnt {
      width: 100%;
      height: calc(100% - 40px);
      box-sizing: border-box;
      padding: 10px;
      // background-color: pink;
    }
  }
}
</style>
