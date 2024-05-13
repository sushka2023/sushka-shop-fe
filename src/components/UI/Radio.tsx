import { Radio as RadioMui, RadioProps } from '@mui/material'
import { FC } from 'react'

const Radio: FC<RadioProps> = ({ ...props }) => {
  return <RadioMui {...props} />
}

export { Radio }
