<script setup lang="ts">
import Layout from '@/layout/index.vue'
</script>

<template>
  <div class="main">
    <Layout v-if="$route.meta.isNav"></Layout>
    <RouterView v-else></RouterView>
  </div>
</template>

<style lang="less">
body {
  .main {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
}
</style>
