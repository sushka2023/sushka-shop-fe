import { Radio as RadioMui, RadioProps } from '@mui/material'
import { forwardRef } from 'react'

const Radio = forwardRef<HTMLButtonElement, RadioProps>((props, ref) => {
  return <RadioMui {...props} ref={ref} />
})

export { Radio }
