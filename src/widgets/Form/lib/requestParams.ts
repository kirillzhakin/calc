interface PaymentData {
  hash_sum: string
  transaction: string
  description: string
  api_key: string
  amount: number
  email: string
  custom_data: {
    initiatorName: string
    collectionTitle: string
  }
}

export const requestWithParams = (params: PaymentData): Promise<PaymentData> => {
  return new Promise((resolve, reject) => {
    try {
      const timeOutTimer = (): number => +(Math.random() * 3).toFixed(3) * 500
      const timer: number = timeOutTimer()
      setTimeout(() => {
        resolve(params)
      }, timer)
    } catch (err) {
      console.error(err)
      reject(err)
    }
  })
}
