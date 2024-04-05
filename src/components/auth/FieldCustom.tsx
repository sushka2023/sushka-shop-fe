// InputField.tsx
import React from 'react'
import { Field } from 'formik'

import { styleInput, styleInputError } from './style'

interface InputFieldProps {
  type: 'text' | 'password' | 'tel' | 'email'
  id: string
  name: string
  label: string
  value?: string
  yourStInput?: React.CSSProperties
  error?: string | undefined
  disabled?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  id,
  name,
  label,
  value,
  yourStInput,
  error,
  disabled = false
}) => {
  return (
    <Field
      as="input"
      style={{
        ...styleInput,
        ...yourStInput,
        ...(error ? styleInputError : undefined)
      }}
      type={type}
      id={id}
      name={name}
      placeholder={label}
      value={value}
      disabled={disabled}
    />
  )
}

export default InputField
