import { FormHelperText } from '@mui/material'
import { FC } from 'react'

export const ErrorMessage: FC<{ error: any; styles?: any }> = ({
  error,
  styles
}) => {
  return (
    error && (
      <FormHelperText
        sx={{
          color: 'error.darker',
          fontWeight: 500,
          position: 'absolute',
          ...styles
        }}
      >
        {error.message}
      </FormHelperText>
    )
  )
}
