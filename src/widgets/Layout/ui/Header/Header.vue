<script setup lang="ts">
import { Button, Dropdown, TYPE_BUTTON } from '@/shared'
import { ROUTE_NAME, CURRENCY_LIST } from './Header.const'
import { useRoute } from 'vue-router'
import { useCurrenciesStore } from '@/features'
const store = useCurrenciesStore()
const route = useRoute()
const getActiveRoute = (currentRoute: string): boolean => currentRoute === route.name

</script>
<template>
  <header class="header">
    <nav class="header__navigate">
      <Button :type="TYPE_BUTTON.LINK" :isActive="getActiveRoute(ROUTE_NAME.MAIN)"
        >Курсы валют</Button
      >
      <Button
        :type="TYPE_BUTTON.LINK"
        :to="'convert'"
        :isActive="getActiveRoute(ROUTE_NAME.CONVERT)"
      >
        Конвертация валют
      </Button>
    </nav>
    <div class="header__currecy">
      <p>Основная валюта:</p>
      <Dropdown class="header__dropdown" :options="CURRENCY_LIST" v-model="store.currentCurrency" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import './Header.scss';
</style>
