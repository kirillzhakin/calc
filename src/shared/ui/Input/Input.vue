<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { TYPE_INPUT } from './Input.const'
import { type InputProps } from './Input.types'
import { vMaska } from 'maska/vue'

const { type = TYPE_INPUT.TEXT, errors = [] } = defineProps<InputProps>()

const modelValue = defineModel<string | number>()

const emit = defineEmits(['focus', 'blur'])

const onBlurTimeout = shallowRef<number | null>(null)

const onFocus = (e: Event) => {
  if (onBlurTimeout.value !== null) {
    clearTimeout(onBlurTimeout.value)
  }
  emit('focus', e)
}

const onBlur = (e: Event) => {
  emit('blur', e)
}
const timeoutedOnBlur = (e: Event) => {
  if (onBlurTimeout.value !== null) {
    clearTimeout(onBlurTimeout.value)
  }
  onBlurTimeout.value = setTimeout(() => {
    onBlur(e)
  }, 150)
}

const isError = computed(() => errors && errors.length > 0)

const errorMessage = computed(() => {
  if (!errors) return
  return errors?.[0]?.$message
})
</script>
<template>
  <div class="text-field">
    <label class="text-field__label">{{ label }}</label>
    <div class="text-field__container">
      <input
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :maxlength="maxlength"
        v-model="modelValue"
        v-maska="maska"
        class="text-field__input"
        :class="{
          'text-field_error': isError
        }"
        @focus.stop="onFocus"
        @blur.stop="timeoutedOnBlur"
      />
      <div class="text-field__right">
        <slot name="rigth"></slot>
      </div>
      <span :id="`error_${id}`" class="error error_type_visible">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './Input.scss';
</style>
