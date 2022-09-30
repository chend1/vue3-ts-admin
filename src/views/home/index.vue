<script setup lang="ts"></script>

<template>
  <div class="main">
    <div class="img" @click="$router.push('/')">
      <img src="@/assets/images/home.gif" alt="" />
    </div>
  </div>
</template>

<style lang="less" scoped>
  .main{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #f0f0f0;
    .img{
      cursor: pointer;
    }
  }
</style>