import { InputLabel, OutlinedInput } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'
import { ErrorMessage } from '../Error/Error'
import { FC, Fragment } from 'react'

type InputFieldProps = {
  type: string
  id?: string
  label?: string
  register?: UseFormRegisterReturn
  error?: any
  disabled?: boolean
  placeholder?: string
  defaultValue?: string
  sxInput?: object
  sxLabel?: object
}

const InputField: FC<InputFieldProps> = ({
  id,
  label,
  defaultValue,
  register,
  error,
  disabled = false,
  placeholder,
  type,
  sxInput,
  sxLabel
}) => (
  <Fragment>
    <InputLabel sx={sxLabel}>{label}</InputLabel>
    <OutlinedInput
      id={id}
      defaultValue={defaultValue}
      {...register}
      type={type}
      placeholder={placeholder}
      fullWidth
      error={!!error}
      disabled={disabled}
      sx={sxInput}
    />
    <ErrorMessage error={error} />
  </Fragment>
)

export default InputField
