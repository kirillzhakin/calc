import { type Ref } from 'vue'
import type { MaskInputOptions } from 'maska'

interface ValidationError {
  $message: string | Ref<string>
}
export interface InputProps {
  type?: string
  id?: string
  placeholder?: string
  label?: string
  errors?: ValidationError[]
  maxlength?: number
  maska?: string | MaskInputOptions
  autocomplete?: string
}
