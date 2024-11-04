export const INPUT_LABEL = {
  NUM_CARD: 'Номер карты',
  VALID_PERIOD: 'Срок действия',
  CVV: 'CVV',
  TRANSFER_AMOUNT: 'Сумма перевода',
  YOUR_NAME: 'Ваше имя',
  MSG_TO_RECIPIENT: 'Сообщение получателю'
}

export const INPUT_PLACEHOLDER = {
  VALID_PERIOD: 'ММ / ГГ',
  RUB_SIMBOL: '₽'
}
export const INPUT_MASKA = {
  CARD: '#### #### #### ####',
  PERIOD: '##/##',
  CVV: '###',
  AMOUNT: '#-# ₽'
}

export const INPUT_ERROR = {
  CARD: 'Введите номер карты',
  CARD_LUHN: 'Неверный номер карты',
  PERIOD: 'Введите срок',
  PERIOD_MASK: 'Неверный формат',
  CVV: 'Введите CVV',
  CVV_MASK: 'Введите три цифры',
  AMOUNT: 'Введите сумму',
  AMOUNT_MASK: 'Сумма перевода, не менее 10 руб',
  NAME: 'Введите имя',
  NAME_MASK: 'Имя должно содержать только латинские буквы'
}

// Маска для даты (MM/YY)
export const EXPIRY_DATE_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/

// Маска для CVC (3 цифры)
export const CVV_REGEX = /^\d{3}$/

// Проверяем чтобы поле name содержало только латинские буквы
export const NAME_REGEX = /^[a-zA-Z\s]+$/

export const API_KEY = '316b2be8-3475-4462-bd57-c7794d4bdb53'

export const SECRET_KEY = '1234567890'
