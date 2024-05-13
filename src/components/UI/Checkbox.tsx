import { Checkbox as CheckboxMui, CheckboxProps } from '@mui/material'
import { FC } from 'react'

const Checkbox: FC<CheckboxProps> = ({ ...props }) => {
  return <CheckboxMui {...props} />
}

export { Checkbox }
