<script setup lang="ts">
  defineProps({
    isCollapse: Boolean,
  })
  const menuSelect = (index: any) => {
    console.log(index)
  }
  </script>
  
  <template>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true"
      @select="menuSelect"
    >
      <el-menu-item index="/home">
        <el-icon><svg-icon name="home"></svg-icon></el-icon>
        <template #title>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/table">
        <el-icon><svg-icon name="home"></svg-icon></el-icon>
        <template #title>
          <span>Table表格</span>
        </template>
      </el-menu-item>
      <el-sub-menu index="/error">
        <template #title>
          <el-icon><svg-icon name="error"></svg-icon></el-icon>
          <span>错误页面</span>
        </template>
        <el-menu-item-group>
          <!-- <template #title><span>二级菜单</span></template> -->
          <el-menu-item index="/error/401">401</el-menu-item>
          <el-menu-item index="/error/404">404</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="/power">
        <template #title>
          <el-icon><svg-icon name="power"></svg-icon></el-icon>
          <span>权限页面</span>
        </template>
        <el-menu-item-group>
          <!-- <template #title><span>二级菜单</span></template> -->
          <el-menu-item index="/power/one">权限页面1</el-menu-item>
          <el-menu-item index="/power/two">权限页面2</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="/about">
        <el-icon><svg-icon name="about"></svg-icon></el-icon>
        <template #title>
          <span>关于我们</span>
        </template>
      </el-menu-item>
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