
<script setup lang="ts">
  import { mainStore } from '@/store'
  const store = mainStore()
  defineProps({
    isCollapse: Boolean,
  })
  const emit = defineEmits(['menuClick'])
  function menuClick(){
    emit('menuClick')
  }
  function logOutClick(){
    store.logOut()
  }
  </script>
  
  <template>
    <div class="nav">
      <div class="menu" @click="menuClick">
        <svg-icon name="openMenu" v-if="isCollapse"></svg-icon>
        <svg-icon name="closeMenu" v-else></svg-icon>
      </div>
      <div class="tool-list" @click="logOutClick">退出</div>
    </div>
  </template>
  <style scoped lang="less">
    .nav{
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      box-sizing: border-box;
      padding: 0 10px;
      border-bottom: 1px solid #eeeff1;
      .menu{
        font-size: 24px;
        cursor: pointer;
      }
    }
  </style>
  
