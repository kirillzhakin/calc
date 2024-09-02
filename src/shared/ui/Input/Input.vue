<script setup lang="ts">
import { TYPE_INPUT } from './Input.const'
interface InputProps {
  type?: string
  id?: string
  placeholder?: string
  label?: string
  padding?: string
  height?: string
  error?: string
  modelValue: number
  maxlength?: string
}

withDefaults(defineProps<InputProps>(), {
  type: TYPE_INPUT.NUMBER,
  padding: '0.5rem 0.6rem',
  height: '49px'
})

const emit = defineEmits<{
  (e: 'update', value: number): void
}>()

const handleChange = (event: Event) => {
  const newValue: number = +(event.target as HTMLInputElement).value
  emit('update', newValue)
}
</script>
<template>
  <div class="text-field">
    <label>{{ label }}</label>
    <div class="text-field__container">
      <input
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleChange"
        :style="{ padding, height }"
        :maxlength="maxlength"
        class="text-field__input"
      />
      <span :id="error" class="error error_type_visible">{{ error }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Input.scss';
</style>
