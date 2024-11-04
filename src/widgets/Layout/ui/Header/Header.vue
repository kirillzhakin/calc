<script setup lang="ts">
import router from '@/router'
import { RouterLink } from 'vue-router'
</script>
<template>
  <header class="header">
    <nav>
      <ul class="header__list-nav">
        <li>
          <RouterLink class="header__title" to="/" activeClass="header__title_active"
            >Сбор средств</RouterLink
          >
        </li>
        <li>
          <RouterLink class="header__title" to="/result" activeClass="header__title_active"
            >Результат</RouterLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use './Header.scss';
</style>
