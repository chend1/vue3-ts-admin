<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  getDataList,
  editDataList,
  addDataList,
  deleteDataList,
} from '@/api/table'
import type { tableItemType } from '@/api/table/type'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
// 搜索关键字
const keyword = ref<string>('')
function searchClick() {
  getDataLists()
}

// 分页参数
const pagingInfo = reactive({
  page: 1,
  size: 20,
})
function pagingClick() {
  getDataLists()
}
// 获取列表数据
const tableData = ref<tableItemType[]>([])
const total = ref<number>(0)
function getDataLists() {
  getDataList({
    page: pagingInfo.page,
    size: pagingInfo.size,
    keyword: keyword.value,
  }).then((res) => {
    tableData.value = res.list
    total.value = res.count
  })
}
// 编辑
const isShowDialog = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const userInfo = ref<tableItemType>({
  name: '',
  sex: 1,
  account: 0,
  password: '',
  create_time: '',
  status: 1,
})
function editUserClick(user: tableItemType) {
  userInfo.value = Object.assign({},user)
  isEdit.value = true
  isShowDialog.value = true
}
function addUserClick() {
  isEdit.value = false
  isShowDialog.value = true
}
// 删除
function deleteUserClick(user: tableItemType) {
  if (!user.id) {
    return
  }
  deleteDataList({ id: user.id }).then((res) => {
    getDataLists()
    ElMessage({
      message: res.message,
      type: 'success',
    })
  })
}
function handleClose() {
  isEdit.value = false
  isShowDialog.value = false
  userInfo.value = {
    name: '',
    sex: 1,
    account: 0,
    password: '',
    create_time: '',
    status: 1,
  }
}
function confirmClick() {
  if (isEdit.value) {
    editDataList(userInfo.value).then((res) => {
      ElMessage({
        message: res.message,
        type: 'success',
      })
    })
  } else {
    addDataList(userInfo.value).then((res) => {
      ElMessage({
        message: res.message,
        type: 'success',
      })
    })
  }
  getDataLists()
  isShowDialog.value = false
}
onMounted(() => {
  getDataLists()
})
</script>

<template>
  <div class="main">
    <div class="head">
      <div class="search">
        <div class="title">table表格</div>
        <div class="cnt">
          <div class="input">
            <el-input v-model="keyword" placeholder="请输入用户名/账号" />
          </div>
          <div class="btn">
            <el-button type="primary" @click="searchClick">搜索</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <el-button :icon="Plus" type="primary" @click="addUserClick"
          >新增用户</el-button
        >
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" :border="true" max-height="700px">
        <el-table-column
          fixed
          prop="name"
          label="用户名"
          width="150"
          align="center"
        />
        <el-table-column prop="account" label="账号" align="center" />
        <el-table-column prop="password" label="密码" align="center" />
        <el-table-column prop="sex" label="性别" width="60" align="center">
          <template #default="scope">
            {{ scope.row.status == 1 ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            {{ scope.row.status == 1 ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="editUserClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteUserClick(scope.row)"
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
    :title="isEdit ? '编辑用户' : '新增用户'"
    width="30%"
    @close="handleClose"
  >
    <div class="form">
      <el-form :model="userInfo" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.name" />
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="userInfo.account" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userInfo.password" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userInfo.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="userInfo.status">
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
