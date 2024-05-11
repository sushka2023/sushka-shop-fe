import { FC } from 'react'
import {
  Button as ButtonMui,
  ButtonProps as ButtonMuiProps
} from '@mui/material'

type ButtonProps = Omit<ButtonMuiProps, 'type'> & {
  type?: 'submit' | 'button' | 'reset' | undefined
}

const Button: FC<ButtonProps> = ({ children, type, ...muiProps }) => {
  return (
    <ButtonMui {...muiProps} type={type}>
      {children}
    </ButtonMui>
  )
}

export { Button }
