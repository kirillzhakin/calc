<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import { Loader, Input, Button, THEME_VARIANTS, TYPE_INPUT } from '@/shared'
import {
  INPUT_LABEL,
  INPUT_PLACEHOLDER,
  INPUT_MASKA,
  INPUT_ERROR,
  EXPIRY_DATE_REGEX,
  CVV_REGEX,
  NAME_REGEX,
  API_KEY,
  SECRET_KEY
} from './PayForm.const'
import { luhnAlgorithm, requestWithParams, hashPaymentData } from '@/widgets'
import type { MaskInputOptions } from 'maska'
import { helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router'

interface PayProps {
  initiatorName?: string
  collectionTitle?: string
}

const { initiatorName = 'Иван К.', collectionTitle = 'Экскурсия' } = defineProps<PayProps>()

const router = useRouter()

const emit = defineEmits(['updateLoader'])

const isLoading = shallowRef(false)

const inputValue = reactive({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  amount: 0,
  formatAmount: '',
  name: '',
  message: ''
})

const validValueAmount = (value: string): boolean => +value >= 10

const validateRules = {
  cardNumber: {
    required: helpers.withMessage(INPUT_ERROR.CARD, required),
    luhnValid: helpers.withMessage(INPUT_ERROR.CARD_LUHN, luhnAlgorithm)
  },
  expiryDate: {
    required: helpers.withMessage(INPUT_ERROR.PERIOD, required),
    validExpiryDate: helpers.withMessage(INPUT_ERROR.PERIOD_MASK, helpers.regex(EXPIRY_DATE_REGEX))
  },
  cvv: {
    required: helpers.withMessage(INPUT_ERROR.CVV, required),
    validCvv: helpers.withMessage(INPUT_ERROR.CVV_MASK, helpers.regex(CVV_REGEX))
  },
  amount: {
    required: helpers.withMessage(INPUT_ERROR.AMOUNT, required),
    validValueAmount: helpers.withMessage(INPUT_ERROR.AMOUNT_MASK, validValueAmount)
  },
  name: {
    required: helpers.withMessage(INPUT_ERROR.NAME, required),
    validName: helpers.withMessage(INPUT_ERROR.NAME_MASK, helpers.regex(NAME_REGEX))
  }
}
const validate = useVuelidate(validateRules, inputValue)

const transformToUpper = (): void => {
  inputValue.name = inputValue.name.toUpperCase()
}

const checkValidation = (): void => {
  Object.keys(validateRules).forEach((field) => {
    validate.value[field].$touch()
  })
}

const optionsAmount = reactive<MaskInputOptions>({
  postProcess: (value: string) => {
    if (value) {
      inputValue.amount = Number(value.replace(/\s+/g, ''))
      return `${value} ${INPUT_PLACEHOLDER.RUB_SIMBOL}`
    } else {
      return ''
    }
  },
  number: {
    locale: 'ru',
    fraction: 2,
    unsigned: true
  }
})

const submitPayment = async (): Promise<void> => {
  checkValidation()
  const isValid = validate.value.$invalid
  if (isValid) return
  try {
    isLoading.value = true
    const transactionId = Date.now().toString()

    const hashSum = hashPaymentData(API_KEY, transactionId, inputValue.amount, SECRET_KEY)

    const paymentData = {
      hash_sum: hashSum,
      transaction: transactionId,
      description: `Оплата для ${initiatorName}`,
      api_key: API_KEY,
      amount: inputValue.amount,
      email: '',
      message: inputValue.message,
      custom_data: {
        initiatorName,
        collectionTitle
      }
    }

    const result = await requestWithParams(paymentData)
    console.log('Result:', result)

    router.push({
      name: 'result',
      query: { paymentData: JSON.stringify(result) }
    })
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <Loader v-if="isLoading" :active="isLoading" :message="'Отправка данных...'" />
  <div v-else class="pay-form">
    <h3 class="pay-form__title">{{ initiatorName }} собирает на «{{ collectionTitle }}» </h3>
    <Input
      v-model="inputValue.cardNumber"
      :id="INPUT_LABEL.NUM_CARD"
      :label="INPUT_LABEL.NUM_CARD"
      :maska="INPUT_MASKA.CARD"
      class="pay-form__input"
      :errors="validate.cardNumber.$errors"
      @blur="validate.cardNumber.$touch()"
      @focus="validate.cardNumber.$reset()"
    />
    <div class="pay-form__wrapper">
      <Input
        v-model="inputValue.expiryDate"
        :id="INPUT_LABEL.VALID_PERIOD"
        :label="INPUT_LABEL.VALID_PERIOD"
        :placeholder="INPUT_PLACEHOLDER.VALID_PERIOD"
        :maska="INPUT_MASKA.PERIOD"
        :errors="validate.expiryDate.$errors"
        @blur="validate.expiryDate.$touch()"
        @focus="validate.expiryDate.$reset()"
      />
      <Input
        v-model="inputValue.cvv"
        :id="INPUT_LABEL.CVV"
        :label="INPUT_LABEL.CVV"
        :maska="INPUT_MASKA.CVV"
        :type="TYPE_INPUT.PASSWORD"
        :errors="validate.cvv.$errors"
        @blur="validate.cvv.$touch()"
        @focus="validate.cvv.$reset()"
      />
    </div>
    <Input
      v-model="inputValue.formatAmount"
      :id="INPUT_LABEL.TRANSFER_AMOUNT"
      :label="INPUT_LABEL.TRANSFER_AMOUNT"
      :placeholder="INPUT_PLACEHOLDER.RUB_SIMBOL"
      :maska="optionsAmount"
      class="pay-form__input"
      :errors="validate.amount.$errors"
      @blur="validate.amount.$touch()"
      @focus="validate.amount.$reset()"
    />
    <Input
      v-model="inputValue.name"
      :id="INPUT_LABEL.YOUR_NAME"
      :label="INPUT_LABEL.YOUR_NAME"
      class="pay-form__input"
      @input="transformToUpper"
      :errors="validate.name.$errors"
      @blur="validate.name.$touch()"
      @focus="validate.name.$reset()"
    />
    <Input
      v-model="inputValue.message"
      :id="INPUT_LABEL.MSG_TO_RECIPIENT"
      :label="INPUT_LABEL.MSG_TO_RECIPIENT"
      :maxlength="50"
      class="pay-form__input"
    />
    <div class="pay-form__btns">
      <Button @click="submitPayment">Перевести</Button>
      <Button :theme="THEME_VARIANTS.SECONDARY">Вернуться</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './PayForm.scss';
</style>
