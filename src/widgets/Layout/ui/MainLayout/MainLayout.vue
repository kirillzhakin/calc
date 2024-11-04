<script setup lang="ts">
import { Header, Footer } from '@/widgets'
</script>
<template>
  <div class="container">
    <Header />
    <router-view class="content"></router-view>
    <Footer />
  </div>
</template>
<style lang="scss" scoped>
@use './MainLayout.scss';
</style>
