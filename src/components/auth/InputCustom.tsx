// CustomInput.tsx
import React from 'react'
import { Box } from '@mui/material'
import { useFormikContext } from 'formik'
import { styleBoxInput } from './style'
import ErrorDisplay from './ErrorCustom'
import { Label } from './LabelCustom'
import InputField from './FieldCustom'

interface InputProps {
  name: string
  label: string
  type?: 'text' | 'password' | 'tel' | 'email'
  htmlFor: string
  value?: string
  yourStBox?: React.CSSProperties
  yourStInput?: React.CSSProperties
}

const CustomInput: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  value,
  htmlFor,
  yourStBox,
  yourStInput
}) => {
  const { errors, touched } = useFormikContext<InputProps>()
  const error =
    touched[name as keyof InputProps] && errors[name as keyof InputProps]
  const styleLabelError = error ? { color: '#D21C1C' } : undefined

  return (
    <Box
      sx={{
        ...styleBoxInput
      }}
    >
      <Label
        htmlFor={htmlFor}
        style={yourStBox}
        errorStyle={styleLabelError}
        hasError={!!error}
      >
        {label}
      </Label>
      <InputField
        type={type}
        id={htmlFor}
        name={name}
        label={label}
        value={value}
        yourStInput={yourStInput}
        error={typeof error === 'string' ? error : undefined}
      />
      {typeof error === 'string' && <ErrorDisplay error={error} />}
    </Box>
  )
}

export default CustomInput
