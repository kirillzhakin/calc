<script setup lang="ts">
import { type ButtonProps } from './Button.types'
import { SIZES, THEME_VARIANTS } from '@/shared'

const {
  size = SIZES.NORMAL,
  theme = THEME_VARIANTS.PRIMARY,
  disabled = false
} = defineProps<ButtonProps>()
</script>
<template>
  <button
    class="button"
    :class="{
      [`button_${theme}`]: theme,
      [`button_${size}`]: size,
      button_disabled: disabled
    }"
    :style="{ background, color, padding, height }"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
@use './Button.scss';
</style>
