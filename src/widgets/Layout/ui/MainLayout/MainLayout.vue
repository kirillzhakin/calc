<script setup lang="ts">
import { Header, Footer } from '@/widgets'
import { Loader } from '@/shared'
import { useCurrenciesStore } from '@/features'
const store = useCurrenciesStore()
if (!store.currenciesDataLength) {
  store.getData()
}
</script>
<template>
  <div class="container">
    <Header />
    <Loader v-if="store.isPending" :active="store.isPending" />
    <router-view v-else class="content"></router-view>
    <Footer />
  </div>
</template>
<style lang="scss" scoped>
@import './MainLayout.scss';
</style>
