<script setup lang="ts">
import { ref, type Ref, watch } from 'vue'
const props = defineProps<{
  options: string[]
  modelValue: string
  tabindex?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const open = ref(false)
const selected: Ref<string | null> = ref('')

watch(
  () => selected.value,
  () => {
    selected.value = props.modelValue
      ? props.modelValue
      : props.options.length > 0
        ? props.options[0]
        : ''
    emit('update:modelValue', selected.value)
  },
  {
    immediate: true
  }
)
const selectedOption = (option: string): void => {
  selected.value = option
  open.value = false
  emit('update:modelValue', option)
}
</script>
<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="selectedOption(option as string)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Dropdown.scss';
</style>
