<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const getResult = computed(() => {
  const paymentData = route.query.paymentData
  if (paymentData && typeof paymentData === 'string') {
    return Object.entries(JSON.parse(paymentData))
  }
  return []
})
</script>
<template>
  <div class="result">
    <h3 class="result__title">Результат:</h3>
    <ul class="result__list">
      <li v-for="[key, value] in getResult" :key="key" class="result__list-item">
        <template v-if="value && typeof value === 'object'">
          <ul class="result__list">
            <li
              v-for="[deepKey, deepValue] in Object.entries(value)"
              :key="deepKey"
              class="result__list-item"
            >
              <span class="result__key">{{ deepKey }}</span
              >:
              <span>{{ deepValue }}</span>
            </li>
          </ul>
        </template>
        <template v-else>
          <span class="result__key">{{ key }}</span
          >:
          <span>{{ value }}</span>
        </template>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use './ResultData.scss';
</style>
