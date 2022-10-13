<script setup lang="ts">
import { mainStore } from '@/store'
import { computed } from '@vue/reactivity'
import SidebarItem from './SidebarItem.vue'
const store = mainStore()
defineProps({
  isCollapse: Boolean,
})
const menuSelect = (index: any) => {
  console.log(index)
}
const routeList = computed(() => store.routerList)
console.log(routeList.value)
</script>

<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :router="true"
    @select="menuSelect"
  >
    <template v-for="item in routeList" :key="item.path">
      <SidebarItem :route="item"></SidebarItem>
    </template>
  </el-menu>
</template>
<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  height: 100vh;
  border-right: none;
  .menu {
    margin-left: 10px;
  }
}
.el-menu {
  border-right: none;
}
</style>
