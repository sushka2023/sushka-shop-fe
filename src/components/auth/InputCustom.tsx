import React from 'react'
import { Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import ErrorDisplay from './ErrorCustom'
import InputField from './FieldCustom'

type InputProps = {
  name: string
  label: string
  type?: 'text' | 'password' | 'tel' | 'email'
  htmlFor: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  yourStBox?: React.CSSProperties
  yourStInput?: React.CSSProperties
  disabled?: boolean
}

const CustomInput: React.FC<InputProps> = (props) => {
  const {
    name,
    label,
    type = 'text',
    value,
    htmlFor,
    yourStBox,
    yourStInput,
    disabled = false
  } = props
  const { errors, touched } = useFormikContext<InputProps>()
  const error =
    touched[name as keyof typeof touched] && errors[name as keyof typeof errors]
  const typeofError = typeof error === 'string'

  const labelStyle = {
    ...(yourStBox ?? {}),
    ...(error ? { color: '#D21C1C' } : {})
  }

  const renderInput = () => (
    <InputField
      type={type}
      id={htmlFor}
      name={name}
      label={label}
      value={value}
      yourStInput={yourStInput}
      error={typeofError ? error : undefined}
      disabled={disabled}
    />
  )

  const renderErrorDisplay = () => typeofError && <ErrorDisplay error={error} />

  return (
    <Typography sx={{ margin: '10px 0' }}>
      <label htmlFor={htmlFor} style={labelStyle} data-has-error={!!error}>
        {label}
      </label>
      {renderInput()}
      {renderErrorDisplay()}
    </Typography>
  )
}

export default CustomInput
