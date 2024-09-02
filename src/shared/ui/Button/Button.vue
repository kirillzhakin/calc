<script setup lang="ts">
import { TYPE_BUTTON } from './Button.const'

interface ButtonProps {
  color?: string
  background?: string
  padding?: string
  height?: string
  type?: string
  to?: string
  isActive?: boolean
}
withDefaults(defineProps<ButtonProps>(), {
  type: TYPE_BUTTON.BUTTON,
  to: '/',
  isActive: false,
  height: '49px'
})
</script>
<template>
  <button
    v-if="type === TYPE_BUTTON.BUTTON"
    class="button"
    :class="{ button_active: isActive }"
    :style="{ background, color, padding, height }"
  >
    <slot></slot>
  </button>
  <router-link
    v-else
    :to="to"
    class="button"
    :class="{ button_active: isActive }"
    :style="{ background, color, padding, height }"
  >
    <slot></slot>
  </router-link>
</template>

<style lang="scss" scoped>
@import './Button.scss';
</style>
