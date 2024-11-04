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

const { active = false, message = ' Загрузка данных...' } = defineProps<LoaderProps>()
</script>

<style lang="scss" scoped>
@use './Loader.scss';
</style>
