<script setup lang="ts">
import { ref } from 'vue'
const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="layout">
    <div class="nav">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <svg
              class="icon"
              aria-hidden="true"
              font-size="17px"
            >
            <use xlink:href="#xueshengxinxi" />
          </svg>
            <span>一级菜单</span>
          </template>
          <el-menu-item-group>
            <template #title><span>二级菜单</span></template>
            <el-menu-item index="1-1">菜单一</el-menu-item>
            <el-menu-item index="1-2">菜单二</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>一级菜单2</template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <RouterView></RouterView>
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
  // .nav {
  //   // width: 260px;
  // }
  .content {
    flex: 1;
    background-color: pink;
  }
}
</style>
