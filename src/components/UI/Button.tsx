import { Button as ButtonMui, ButtonOwnProps } from '@mui/material'
import { FC } from 'react'

const Button: FC<ButtonOwnProps> = ({ children, ...props }) => {
  return <ButtonMui {...props}>{children}</ButtonMui>
}

export { Button }
