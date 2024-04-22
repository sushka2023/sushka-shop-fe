import { Typography as TypographyMui, TypographyProps } from '@mui/material'
import { FC } from 'react'

const Typography: FC<TypographyProps> = ({
  fontFamily = 'Open Sans',
  color = 'rgba(86, 115, 67, 1)',
  fontSize = '18px',
  fontWeight = 600,
  ...props
}) => {
  return (
    <TypographyMui
      fontFamily={fontFamily}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      {...props}
    />
  )
}

export { Typography }
