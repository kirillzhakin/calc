<script setup lang="ts">
const getCurrentYear = () => new Date().getFullYear()
</script>
<template>
  <footer class="footer">
    <div class="footer-bottom__copyright">&copy;{{ getCurrentYear() }} Кирилл Жакин</div>
  </footer>
</template>

<style lang="scss" scoped>
@use './Footer.scss';
</style>
