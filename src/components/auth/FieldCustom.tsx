import React from 'react'
import { Field } from 'formik'

import { styleInput, styleInputError } from './style'
import { InputProps } from '@mui/material'

type InputFieldProps = InputProps & {
  id: string
  value?: string
  yourStInput?: React.CSSProperties
  error?: string | undefined
  disabled?: boolean
  placeholder?: string
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  id,
  name,
  placeholder,
  value,
  yourStInput = {},
  error,
  disabled = false,
  size
}) => {
  return (
    <Field
      as="input"
      style={{
        ...styleInput,
        ...yourStInput,
        ...(error ? styleInputError : undefined),
        '::placeholder': {
          color: 'red'
        }
      }}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      size={size}
    />
  )
}

export default InputField
