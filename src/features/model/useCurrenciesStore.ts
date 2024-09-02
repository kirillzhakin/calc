import { defineStore } from 'pinia'
import axios from 'axios'
import { CURRENT_PAIR, URL } from '../const'
import { ref, reactive, type Ref, watch } from 'vue'
import { CURRENCY } from '@/widgets'

export const useCurrenciesStore = defineStore('Currencies', () => {
  const isPending: Ref<boolean> = ref(false)
  const currentCurrency: Ref<keyof typeof CURRENCY> = ref(CURRENCY.RUB)
  const currenciesData = reactive<{ [key: string]: number }>({})
  const currenciesDataLength: Ref<number> = ref(0)
  const rateDate = reactive<Record<string, any>>({})

  const clearObject = (obj: Record<string, any>) =>
    Object.keys(obj).forEach((key: string) => delete obj[key])

  const getRateDate = () => {
    const currentPair = CURRENT_PAIR[currentCurrency.value]
    for (const key in currentPair as Record<string, string>) {
      const valuePair = currentPair[key as keyof typeof currentPair]
      rateDate[key] = currenciesData[valuePair].toFixed(2)
    }
  }

  watch(
    () => currentCurrency.value,
    (newVal) => {
      if (newVal) {
        clearObject(rateDate)
        getRateDate()
      }
    }
  )

  const getData = async (): Promise<void> => {
    try {
      isPending.value = true

      const { data } = await axios.get(URL)

      currenciesDataLength.value = Object.entries(data).length as number

      clearObject(currenciesData)
      Object.assign(currenciesData, data)

      getRateDate()
    } catch (error) {
      console.error('Ошибка при загрузке данных', error)
    } finally {
      isPending.value = false
    }
  }
  return {
    isPending,
    currentCurrency,
    currenciesData,
    currenciesDataLength,
    rateDate,
    getData
  }
})
