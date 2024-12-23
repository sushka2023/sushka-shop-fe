import { FC } from 'react'
import { OrdersStatuses } from '../../types'
import { StepConnector, stepConnectorClasses } from '@mui/material'
import { statusOrders } from '../../constants/status-orders/status-orders'

export const QontoConnector: FC<{ status: OrdersStatuses }> = ({ status }) => (
  <StepConnector
    sx={(theme) => ({
      [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + -13px)',
        right: 'calc(50% + -13px)'
      },
      [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          borderColor: statusOrders[status].color
        }
      },
      [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          borderColor: statusOrders[status].color
        }
      },
      [`& .${stepConnectorClasses.line}`]: {
        borderColor:
          theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 2,
        borderRadius: 3,
        width: '49px',
        cursor: 'pointer'
      }
    })}
  />
)
