<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getRoleList, editRole, addRole, deleteRole } from '@/api/role'
import type { roleType } from '@/api/role/type'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import AuthTreeVue from '@/components/AuthTree.vue'
import { getMenuList } from '@/api/menu'
import type { menuType } from '@/api/menu/type'
// 搜索关键字
const keyword = ref<string>('')
function searchClick() {
  getRoleLists()
}
// 分页参数
const pagingInfo = reactive({
  page: 1,
  size: 20,
})
function pagingClick() {
  getRoleLists()
}
// 获取角色列表数据
const roleList = ref<roleType[]>([])
const total = ref<number>(0)
function getRoleLists() {
  getRoleList({
    page: pagingInfo.page,
    size: pagingInfo.size,
    keyword: keyword.value,
  }).then((res) => {
    roleList.value = res.list
    total.value = res.count
  })
}
// 编辑
const isShowDialog = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const roleInfo = ref<roleType>({
  name: '',
  menuList: [],
  create_time: '',
  status: 1,
})
function editRoleClick(role: roleType) {
  roleInfo.value = Object.assign({}, role)
  isEdit.value = true
  isShowDialog.value = true
}
function addRoleClick() {
  isEdit.value = false
  isShowDialog.value = true
}
// 删除
function deleteRoleClick(role: roleType) {
  if (!role.id) {
    return
  }
  deleteRole({ id: role.id }).then((res) => {
    getRoleLists()
    ElMessage({
      message: res.message,
      type: 'success',
    })
  })
}
function handleClose() {
  isEdit.value = false
  isShowDialog.value = false
  roleInfo.value = {
    name: '',
    menuList: [],
    create_time: '',
    status: 1,
  }
}
function confirmClick() {
  if (isEdit.value) {
    editRole(roleInfo.value).then((res) => {
      getRoleLists()
      ElMessage({
        message: res.message,
        type: 'success',
      })
    })
  } else {
    addRole(roleInfo.value).then((res) => {
      getRoleLists()
      ElMessage({
        message: res.message,
        type: 'success',
      })
    })
  }
  isShowDialog.value = false
}
// 编辑授权
const menuList = ref<number[]>([])
const menuAllList = ref<menuType[]>([])
const isAuth = ref<boolean>(false)
function rloeAuthClick(role: roleType){
  isAuth.value = true
  roleInfo.value = role
  menuList.value = role.menuList
}
// 确认授权
function confirmAuth(ids: number[]){
  roleInfo.value.menuList = ids
  editRole(roleInfo.value).then((res) => {
    getRoleLists()
    ElMessage({
      message: res.message,
      type: 'success',
    })
    isAuth.value = false
  })
}
onMounted(async () => {
  const res = await getMenuList()
  menuAllList.value = res.list
  getRoleLists()
})
</script>

<template>
  <div class="main">
    <div class="head">
      <div class="search">
        <div class="cnt">
          <div class="input">
            <el-input
              v-model="keyword"
              placeholder="请输入角色名"
              clearable
            />
          </div>
          <div class="btn">
            <el-button type="primary" @click="searchClick">搜索</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <el-button :icon="Plus" type="primary" @click="addRoleClick"
          >新增角色</el-button
        >
      </div>
    </div>
    <div class="table">
      <el-table :data="roleList" :border="true" max-height="700px">
        <el-table-column
          fixed
          prop="name"
          label="角色名称"
          width="150"
          align="center"
        />
        <el-table-column prop="create_time" label="创建时间" align="center" />
        <el-table-column prop="status" label="状态" width="80" align="center">
          <template #default="scope">
            {{ scope.row.status == 1 ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="rloeAuthClick(scope.row)"
            >
              授权
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="editRoleClick(scope.row)"
              plain
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteRoleClick(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :page-sizes="[10, 15, 20, 30]"
        :total="total"
        v-model:page-size="pagingInfo.size"
        v-model:currentPage="pagingInfo.page"
        @size-change="pagingClick"
        @current-change="pagingClick"
      />
    </div>
  </div>
  <el-dialog
    v-model="isShowDialog"
    :title="isEdit ? '编辑角色' : '新增角色'"
    width="30%"
    @close="handleClose"
  >
    <div class="form">
      <el-form :model="roleInfo" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="roleInfo.name" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="roleInfo.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
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
  <AuthTreeVue v-if="isAuth" @confirmAuth="confirmAuth" @closeTree="isAuth = false" :menuList="menuList" :menuAllList="menuAllList"></AuthTreeVue>
</template>

<style lang="less" scoped>
.main {
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
  .paging {
    margin-top: 30px;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
