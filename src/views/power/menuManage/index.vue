<script setup lang="ts">
import { getMenuList, editMenu, addMenu, deleteMenu } from '@/api/menu'
import { Plus } from '@element-plus/icons-vue'
import type { menuType } from '@/api/menu/type'
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed } from '@vue/reactivity'
import { flatArray } from '@/utils'
const menuList = ref<menuType[]>([])
// 获取菜单列表
function getMenuLists() {
  getMenuList().then((res) => {
    menuList.value = res.list
  })
}
const parentList = computed(() => {
  const newMenuList: any = [
    {
      id: 0,
      title: '暂无',
    },
  ]
  flatArray(newMenuList, menuList.value)
  return newMenuList
})
onMounted(() => {
  getMenuLists()
})
const isShowDialog = ref(false)
const isEdit = ref(false)
const menuInfo = ref<menuType>({
  title: '',
  path: '',
  icon: '',
  isHidden: false,
  children: [],
  parentId: 0,
})
function handleClose() {
  menuInfo.value = {
    title: '',
    path: '',
    icon: '',
    isHidden: false,
    children: [],
    parentId: 0,
  }
}
// 确认操作
function confirmClick() {
  if (isEdit.value) {
    editMenu(menuInfo.value).then((res) => {
      ElMessage({
        message: res.message,
        type: 'success',
      })
      isShowDialog.value = false
      getMenuLists()
    })
  } else {
    delete menuInfo.value.id
    addMenu(menuInfo.value).then((res) => {
      ElMessage({
        message: res.message,
        type: 'success',
      })
      isShowDialog.value = false
      getMenuLists()
    })
  }
}
// 编辑菜单
function editMenuClick(menu: menuType) {
  console.log(menu)

  isEdit.value = true
  isShowDialog.value = true
  menuInfo.value = menu
}
// 新增菜单
function addMenuClick() {
  isEdit.value = false
  isShowDialog.value = true
}
// 删除菜单
function deleteMenuClick(menu: menuType) {
  ElMessageBox.confirm('确定删除该菜单吗', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then( () => {
    deleteMenu({id: menu.id as number}).then((res) => {
      ElMessage({
        message: res.message,
        type: 'success',
      })
      isShowDialog.value = false
      getMenuLists()
    })
  })
}
</script>

<template>
  <div class="main">
    <div class="head">
      <div class="btn">
        <el-button :icon="Plus" type="primary" @click="addMenuClick"
          >新增菜单</el-button
        >
      </div>
    </div>
    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="路由名称" />
      <el-table-column prop="path" label="前端路径" />
      <el-table-column prop="icon" label="图标" />
      <el-table-column prop="isHidden" label="状态" width="80" align="center">
        <template #default="scope">
          {{ scope.row.isHidden ? '隐藏' : '显示' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="editMenuClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            :disabled="scope.row.children && scope.row.children.length > 0"
            @click="deleteMenuClick(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="isShowDialog"
    :title="isEdit ? '编辑菜单' : '新增菜单'"
    width="30%"
    @close="handleClose"
  >
    <div class="form">
      <el-form :model="menuInfo" label-width="100px">
        <el-form-item label="上级菜单">
          <el-select v-model="menuInfo.parentId" placeholder="请选择">
            <el-option
              v-for="item in parentList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="menuInfo.title" />
        </el-form-item>
        <el-form-item label="访问地址">
          <el-input v-model="menuInfo.path" />
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="menuInfo.icon" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="menuInfo.isHidden">
            <el-radio :label="false">显示</el-radio>
            <el-radio :label="true">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShowDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .head {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search {
      display: flex;
      align-items: center;
      .title {
        padding-right: 30px;
      }
      .cnt {
        display: flex;
        align-items: center;
        .input {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
