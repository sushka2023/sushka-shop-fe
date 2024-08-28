import { StepIconProps } from '@mui/material'
import { QontoStepIconRoot } from '../../components/Account-panel/Order-history/style'
import { OrdersStatuses } from '../../types'
import CircleIcon from '@mui/icons-material/Circle'

interface QontoStepIconProps extends StepIconProps {
  status: OrdersStatuses
}

export function QontoStepIcon(props: QontoStepIconProps) {
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
