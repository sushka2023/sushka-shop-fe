import { FormHelperText } from '@mui/material'
import { CSSProperties, FC } from 'react'
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'

export type ErrorType =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined

export const ErrorMessage: FC<{ error: ErrorType; styles?: CSSProperties }> = ({
  error,
  styles
}) => {
  if (!error) return null

  const message = (error as FieldError).message || 'An error occurred'

  return (
    <FormHelperText
      sx={{
        color: 'error.darker',
        fontWeight: 500,
        position: 'absolute',
        ...styles
      }}
    >
      {message}
    </FormHelperText>
  )
}
