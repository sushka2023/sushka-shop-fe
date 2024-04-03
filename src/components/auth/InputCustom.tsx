import { Field, ErrorMessage } from 'formik'
import { Box } from '@mui/material'
import React, { ChangeEvent } from 'react'
import { styleBoxInput, styleLabel, styleInput } from './style'
interface InputProps {
  name: string
  label: string
  type?: 'text' | 'password' | 'tel' | 'email'
  htmlFor: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  style?: React.CSSProperties
  yourStBox?: React.CSSProperties
  yourStInput?: React.CSSProperties
  yourStLabel?: React.CSSProperties
  disabled?: boolean
}

export const CustomInput: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  value,
  htmlFor,
  yourStBox,
  yourStInput,
  yourStLabel,
  disabled = false
}) => {
  return (
    <Box
      sx={{
        ...styleBoxInput,
        ...yourStLabel,
        opacity: disabled ? 0.7 : 1,
        cursor: disabled ? 'auto' : 'pointer'
      }}
    >
      <label style={{ ...styleLabel, ...yourStBox }} htmlFor={htmlFor}>
        {label}
      </label>
      <Field
        as="input"
        style={{ ...styleInput, ...yourStInput }}
        type={type}
        id={htmlFor}
        name={name}
        placeholder={label}
        value={value}
        disabled={disabled}
      />
      <ErrorMessage name={name} />
    </Box>
  )
}
