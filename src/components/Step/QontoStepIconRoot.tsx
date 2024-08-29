import { FC, ReactNode } from 'react'
import { Box } from '@mui/material'
import { OrdersStatuses } from '../../types'
import { statusOrders } from '../../constants/status-orders/status-orders'

type QontoStepIconRootProps = {
  active?: boolean
  status: OrdersStatuses
  children: ReactNode
}

export const QontoStepIconRoot: FC<QontoStepIconRootProps> = ({
  active,
  status,
  children
}) => (
  <Box
    sx={(theme) => ({
      'color':
        theme.palette.mode === 'dark'
          ? theme.palette.grey[200]
          : theme.palette.grey[100],
      'display': 'flex',
      'height': 22,
      'cursor': 'pointer',
      'alignItems': 'center',
      ...(active && {
        color: statusOrders[status].color
      }),
      '& .QontoStepIcon-completedIcon': {
        color: statusOrders[status].color,
        zIndex: 1,
        fontSize: 12
      },
      '& .QontoStepIcon-circle': {
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'currentColor'
      }
    })}
  >
    {children}
  </Box>
)
