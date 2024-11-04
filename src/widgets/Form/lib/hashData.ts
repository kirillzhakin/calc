import { sha256 } from 'js-sha256'

export const hashPaymentData = (
  apiKey: string,
  transactionId: string,
  amount: number,
  secretKey: string
): string => {
  return sha256(`${apiKey}${transactionId}${amount * 100}${secretKey}`)
}
