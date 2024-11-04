export const luhnAlgorithm = (value: string): boolean => {
  if (!value) return false
  const validString = value.replace(/\s+/g, '')
  let sum = 0
  let shouldDouble = false

  for (let i = validString.length - 1; i >= 0; i--) {
    let digit = parseInt(validString[i], 10)

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }
  return sum % 10 === 0
}
