import { FormHelperText } from '@mui/material'
import { CSSProperties, FC } from 'react'

export const ErrorMessage: FC<{ error: any; styles?: CSSProperties }> = ({
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
