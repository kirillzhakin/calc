<script setup lang="ts">
import { useCurrenciesStore } from '@/features'
import { Button } from '@/shared'

const store = useCurrenciesStore()
</script>
<template>
  <div class="rate__wrapper">
    <ui class="rate__list">
      <li class="rate__list-item" v-for="[key, value] of Object.entries(store.rateDate)" :key="key">
        <span> {{ `1 ${key} = ${value} ${store.currentCurrency}` }}</span>
      </li>
    </ui>
    <Button @click="store.getData()" :background="'#f5f5ff'"> Обновить данные </Button>
  </div>
</template>

<style lang="scss" scoped>
@import './CurrencyRate.scss';
</style>
