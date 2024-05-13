import {
  OutlinedInput as OutlinedInputMui,
  OutlinedInputProps
} from '@mui/material'
import { FC } from 'react'

const OutlinedInput: FC<OutlinedInputProps> = ({ ...props }) => {
  return <OutlinedInputMui {...props} />
}

export { OutlinedInput }
