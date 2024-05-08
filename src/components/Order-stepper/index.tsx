import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { STEPS } from '../../pages/order-page/constants'

type Props = {
  activeStep: number
}

const OrderStepper: React.FC<Props> = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep}>
      {STEPS.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default OrderStepper
