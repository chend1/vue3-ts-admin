<script setup lang="ts">
import Tinymce from '../../../public/tinymce/index.vue'
function saveClick(value: string){
  console.log(value);
  
}
</script>

<template>
  <div class="main">
    <Tinymce @saveClick="saveClick"></Tinymce>
  </div>
</template>

<style lang="less" scoped></style>
