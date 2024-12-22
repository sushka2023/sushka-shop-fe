import { Box, StepIconProps } from '@mui/material'
import { OrdersStatuses } from '../../types'
import CircleIcon from '@mui/icons-material/Circle'
import { QontoStepIconRoot } from '../../components/Step/QontoStepIconRoot'
import { statusOrders } from '../../constants/status-orders/status-orders'
import { FC } from 'react'

interface Props extends StepIconProps {
  status: OrdersStatuses
}

export const QontoStepIcon: FC<Props> = ({ active, completed, status }) => {
  return (
    <QontoStepIconRoot active={active} status={status}>
      {completed ? (
        <CircleIcon
          sx={{
            color: statusOrders[status].color,
            zIndex: 1,
            fontSize: 12
          }}
        />
      ) : (
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: 'currentColor'
          }}
        />
      )}
    </QontoStepIconRoot>
  )
}
