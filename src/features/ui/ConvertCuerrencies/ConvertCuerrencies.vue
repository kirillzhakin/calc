<script setup lang="ts">
import { Dropdown, Input } from '@/shared'
import { CURRENCY_LIST } from '@/widgets'
import { useConvertStore, VARIANT_SOURCE } from '@/features'
const store = useConvertStore()
</script>
<template>
  <div class="convert">
    <Dropdown :options="CURRENCY_LIST" v-model="store.topCurrencyValue" />
    <Input
      v-model="store.topInputValue"
      @update="(value) => store.getConvertCurrency(value, VARIANT_SOURCE.TOP_INPUT)"
    />
    <Dropdown :options="CURRENCY_LIST" v-model="store.bottomCurrencyValue" />
    <Input
      v-model="store.bottomInputValue"
      @update="(value) => store.getConvertCurrency(value, VARIANT_SOURCE.BOTTOM_INPUT)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './ConvertCuerrencies.scss';
</style>
