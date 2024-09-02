export const ROUTE_NAME = {
  MAIN: 'main',
  CONVERT: 'convert'
} as const

export const CURRENCY = {
  RUB: 'RUB',
  USD: 'USD',
  EUR: 'EUR'
} as const

export const CURRENCY_LIST: string[] = Object.values(CURRENCY)
