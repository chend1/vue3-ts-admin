<script setup lang="ts">
import type { menuType } from '@/api/menu/type'
import { ref } from 'vue'
const emit = defineEmits(['closeTree'])
const props = defineProps<{
  menuList: number[]
  menuAllList: menuType[]
}>()
console.log(123456, props.menuAllList, props.menuList)
const treeProps = {
  label: 'title',
  children: 'children',
}
function closeTree() {
  emit('closeTree')
}
const treeRef = ref()
function handleCheckChange(val: any, type: any, checkList: any) {
  console.log(val,type,checkList)
  console.log(123,treeRef.value?.getCheckedNodes());
  
}
</script>

<template>
  <div class="tree">
    <div class="warp">
      <el-tree
        ref="treeRef"
        :props="treeProps"
        :data="menuAllList"
        :default-expand-all="true"
        :check-strictly="true"
        :default-checked-keys="menuList"
        node-key="id"
        show-checkbox
        @check-change="handleCheckChange"
      />
    </div>
    <div class="tool">
      <el-button type="primary" plain @click="closeTree"> 取消 </el-button>
      <el-button type="primary"> 确认 </el-button>
    </div>
  </div>
  <div class="mask" @click="closeTree"></div>
</template>

<style scoped lang="less">
.tree {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2001;
  background-color: #fff;
  width: 600px;
  height: 700px;
  border-radius: 5px;
  .warp{
    box-sizing: border-box;
    padding: 20px 30px;
    height: calc(100% - 60px);
    overflow-y: auto;
  }
  .tool{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 0 30px;
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
}
</style>
