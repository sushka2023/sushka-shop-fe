import { FC } from 'react'
import Stack from '@mui/material/Stack'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Box } from '@mui/material'
import { Typography } from '../UI/Typography'
import {
  QontoConnector,
  stStepBox,
  stStepContainer
} from '../Account-panel/Order-history/style'
import { OrdersStatuses } from '../../types'
import {
  statusOrders,
  steps
} from '../../constants/status-orders/status-orders'
import { QontoStepIcon } from '../../utils/step-icon/stepIcon'

type StepCustomProps = {
  status: OrdersStatuses
}

export const StepCustom: FC<StepCustomProps> = ({ status }) => {
  const statusInfo = statusOrders[status]
  const IconComponent = statusInfo.icon

  return (
    <Box sx={stStepBox}>
      <Box sx={stStepContainer}>
        <IconComponent
          style={{
            width: '30px',
            height: '30px',
            color: statusInfo.color,
            fill: statusInfo.color
          }}
        />

        <Typography variant="subtitle1" fontSize={18} color={statusInfo.color}>
          {statusInfo.text}
        </Typography>
      </Box>
      <Stack width="100%" spacing={4}>
        <Stepper
          alternativeLabel
          activeStep={statusInfo.step}
          connector={<QontoConnector ownerState={{ status }} />}
        >
          {steps.map((index) => (
            <Step key={index}>
              <StepLabel
                StepIconComponent={(props) => (
                  <QontoStepIcon {...props} status={status} />
                )}
              ></StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </Box>
  )
}
