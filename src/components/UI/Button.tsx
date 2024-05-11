import { FC } from 'react'
import { Button as ButtonMui, ButtonProps } from '@mui/material'

const Button: FC<ButtonProps> = ({ children, ...muiProps }) => {
  return <ButtonMui {...muiProps}>{children}</ButtonMui>
}

export { Button }
