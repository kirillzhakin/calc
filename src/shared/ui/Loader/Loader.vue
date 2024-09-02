<template>
  <div v-if="active" class="loader-wrapper">
    <div class="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
interface LoaderProps {
  active: boolean
  message?: string
}

withDefaults(defineProps<LoaderProps>(), {
  active: false,
  message: ' Загрузка данных...'
})
</script>

<style lang="scss" scoped>
@import './Loader.scss';
</style>
