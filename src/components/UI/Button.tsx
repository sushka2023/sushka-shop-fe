import { Button as ButtonMui, ButtonProps } from '@mui/material'
import { FC } from 'react'

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonMui {...props}>{children}</ButtonMui>
}

export { Button }
