import { FC, ReactNode } from 'react'
import { Box } from '@mui/material'

type TabPanelProps = {
  children?: ReactNode
  index: number
  value: number
}

export const CustomTabPanel: FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  )
}
