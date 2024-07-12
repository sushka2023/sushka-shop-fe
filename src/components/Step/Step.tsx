import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepConnector, {
  stepConnectorClasses
} from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import CircleIcon from '@mui/icons-material/Circle'
import { Box } from '@mui/material'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import OrderNew from '../../icons/orderNew.svg?react'
import OrderInProgres from '../../icons/orderInProgres.svg?react'
import OrderShipped from '../../icons/orderShipped.svg?react'
import CloseIcon from '@mui/icons-material/Close'
import { ElementType, FC } from 'react'
import { Typography } from '../UI/Typography'

export type Status =
  | 'new'
  | 'in processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

type StatusData = {
  color: string
  text: string
  icon: ElementType
  step: number
}

const statusData: Record<Status, StatusData> = {
  'new': {
    color: '#5D5FEF',
    text: 'Нове',
    icon: OrderNew,
    step: -1
  },
  'in processing': {
    color: '#FCC812',
    text: 'В обробці',
    icon: OrderInProgres,
    step: 0
  },
  'shipped': {
    color: '#5DA9EF',
    text: 'Відправлено',
    icon: OrderShipped,
    step: 1
  },
  'delivered': {
    color: '#77CEBC',
    text: 'Доставлено',
    icon: DoneAllIcon,
    step: 2
  },
  'cancelled': {
    color: '#D21C1C',
    text: 'Скасовано',
    icon: CloseIcon,
    step: -1
  }
}

const QontoConnector = styled(StepConnector)<{
  ownerState: { status: Status }
}>(({ theme, ownerState }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + -13px)',
    right: 'calc(50% + -13px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: statusData[ownerState.status].color
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: statusData[ownerState.status].color
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 2,
    borderRadius: 3,
    width: '58px',
    cursor: 'pointer'
  }
}))

const QontoStepIconRoot = styled('div')<{
  ownerState: { active?: boolean; status: Status }
}>(({ theme, ownerState }) => ({
  'color': theme.palette.mode === 'dark' ? theme.palette.grey[200] : '#eaeaf0',
  'display': 'flex',
  'height': 22,
  'cursor': 'pointer',
  'alignItems': 'center',
  ...(ownerState.active && {
    color: statusData[ownerState.status].color
  }),
  '& .QontoStepIcon-completedIcon': {
    color: statusData[ownerState.status].color,
    zIndex: 1,
    fontSize: 12
  },
  '& .QontoStepIcon-circle': {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  }
}))

interface QontoStepIconProps extends StepIconProps {
  status: Status
}

function QontoStepIcon(props: QontoStepIconProps) {
  const { active, completed, className, status } = props

  return (
    <QontoStepIconRoot ownerState={{ active, status }} className={className}>
      {completed ? (
        <CircleIcon className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  )
}

const steps = ['', '', '']

type StepCustomProps = {
  status: Status
}

export const StepCustom: FC<StepCustomProps> = ({ status }) => {
  const statusInfo = statusData[status]
  const IconComponent = statusInfo.icon

  return (
    <Box
      sx={{
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        cursor: 'pointer',
        gap: 1
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {typeof IconComponent === 'string' ? (
          <img
            src={IconComponent}
            alt="Order Icon"
            style={{
              color: statusInfo.color,
              fill: statusInfo.color
            }}
          />
        ) : (
          <IconComponent
            style={{
              width: '30px',
              height: '30px',
              color: statusInfo.color,
              fill: statusInfo.color
            }}
          />
        )}

        <Typography variant="subtitle1" fontSize={18} color={statusInfo.color}>
          {statusInfo.text}
        </Typography>
      </Box>
      <Stack sx={{ width: '100%' }} spacing={4}>
        <Stepper
          alternativeLabel
          activeStep={statusInfo.step}
          connector={<QontoConnector ownerState={{ status }} />}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel
                StepIconComponent={(props) => (
                  <QontoStepIcon {...props} status={status} />
                )}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </Box>
  )
}
