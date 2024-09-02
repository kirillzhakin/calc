import { defineStore } from 'pinia'
import { ref, type Ref, watch } from 'vue'
import { CURRENCY } from '@/widgets'
import { useCurrenciesStore } from './useCurrenciesStore'
import { VARIANT_SOURCE } from '@/features'

export const useConvertStore = defineStore('Convert', () => {
  const store = useCurrenciesStore()
  const topCurrencyValue: Ref<string> = ref(CURRENCY.RUB)
  const bottomCurrencyValue: Ref<string> = ref(CURRENCY.USD)
  const topInputValue: Ref<number> = ref(1)
  const bottomInputValue: Ref<number> = ref(1)

  const topConvertPair: Ref<string> = ref('')
  const bottomConvertPair: Ref<string> = ref('')
  const topConvertValue: Ref<number> = ref(0)
  const bottomConvertValue: Ref<number> = ref(0)

  const formatPair = (prevValue: string, nextValue: string): string =>
    `${prevValue}-${nextValue}`.toLocaleLowerCase()

  const getConverValue = (): void => {
    topConvertValue.value = store.currenciesData[topConvertPair.value]
    bottomConvertValue.value = store.currenciesData[bottomConvertPair.value]
  }

  const getInputFieldValue = (value: number, input: number): number => {
    return +(value * input).toFixed(2)
  }

  const getConvertCurrency = (value: number, source: string): void => {
    if (source === VARIANT_SOURCE.TOP_INPUT) {
      topInputValue.value = value
      bottomInputValue.value = getInputFieldValue(value, topConvertValue.value)
    }
    if (source === VARIANT_SOURCE.BOTTOM_INPUT) {
      bottomInputValue.value = value
      topInputValue.value = getInputFieldValue(value, bottomConvertValue.value)
    }
  }

  watch(
    () => [topCurrencyValue.value, bottomCurrencyValue.value],
    ([newTopVal, newBottomVal]) => {
      if (newTopVal || newBottomVal) {
        topConvertPair.value = formatPair(topCurrencyValue.value, bottomCurrencyValue.value)
        bottomConvertPair.value = formatPair(bottomCurrencyValue.value, topCurrencyValue.value)
        getConverValue()
        getConvertCurrency(topInputValue.value, VARIANT_SOURCE.TOP_INPUT)
      }
    },
    {
      immediate: true
    }
  )

  return {
    topCurrencyValue,
    bottomCurrencyValue,
    topInputValue,
    bottomInputValue,
    getConvertCurrency
  }
})
