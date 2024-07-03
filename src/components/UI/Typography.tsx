import { FC } from 'react'
import { Typography as TypographyMui, TypographyProps } from '@mui/material'
import { GREEN_DARKER } from '../../lib/mui/config/colors'

const Typography: FC<TypographyProps> = ({
  color = GREEN_DARKER,
  variant = 'h4',
  ...props
}) => {
  return <TypographyMui color={color} variant={variant} {...props} />
}

export { Typography }
