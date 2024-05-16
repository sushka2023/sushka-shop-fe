import React from 'react'
import {
  OutlinedInput as OutlinedInputMui,
  OutlinedInputProps
} from '@mui/material'
import { forwardRef } from 'react'

const OutlinedInput = forwardRef<HTMLInputElement, OutlinedInputProps>(
  (props, ref) => {
    return <OutlinedInputMui {...props} ref={ref} />
  }
)

export { OutlinedInput }
