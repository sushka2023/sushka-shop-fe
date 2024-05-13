import React from 'react'
import {
  OutlinedInput as OutlinedInputMui,
  OutlinedInputProps
} from '@mui/material'

const OutlinedInput = React.forwardRef<HTMLInputElement, OutlinedInputProps>(
  (props, ref) => {
    return <OutlinedInputMui {...props} ref={ref} />
  }
)

export { OutlinedInput }
