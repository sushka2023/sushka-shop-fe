import { Checkbox as CheckboxMui, CheckboxProps } from '@mui/material'
import { forwardRef } from 'react'

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>((props, ref) => {
  return <CheckboxMui {...props} ref={ref} />
})

export { Checkbox }
