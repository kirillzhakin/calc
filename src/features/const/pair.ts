import { CURRENCY } from '@/widgets'

export const RUB_PAIR = {
  [CURRENCY.EUR]: 'rub-eur',
  [CURRENCY.USD]: 'rub-usd'
} as const

export const USD_PAIR = {
  [CURRENCY.RUB]: 'usd-rub',
  [CURRENCY.EUR]: 'usd-eur'
} as const

export const EUR_PAIR = {
  [CURRENCY.RUB]: 'eur-rub',
  [CURRENCY.USD]: 'eur-usd'
} as const

export const CURRENT_PAIR = {
  [CURRENCY.RUB]: RUB_PAIR,
  [CURRENCY.USD]: USD_PAIR,
  [CURRENCY.EUR]: EUR_PAIR
} as const
