<script setup lang="ts">
interface routeType {
  path: string
  name: string
  component: any
  meta: {
    isNav: boolean
    icon: string
    title: string
  }
  children?: routeType[]
}
defineProps<{route: routeType}>()
</script>

<template>
  <el-menu-item :index="route.path" v-if="!route.children || !route.children.length">
    <el-icon><svg-icon :name="route.meta.icon"></svg-icon></el-icon>
    <template #title>
      <span>{{ route.meta.title }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu :index="route.path" v-else>
    <template #title>
      <el-icon><svg-icon :name="route.meta.icon"></svg-icon></el-icon>
      <span>{{ route.meta.title }}</span>
    </template>
    <el-menu-item-group>
      <template  v-for="item in route.children" :key="item.path">
        <SidebarItem :route="item"></SidebarItem>
      </template>
    </el-menu-item-group>
  </el-sub-menu>
</template>
<style scoped lang="less"></style>
