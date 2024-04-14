import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { STEPS } from '../../pages/order-page/constants'
import { stepperStyle, stepStyle, stepLabelStyle } from './style'

type Props = {
  activeStep: number
}

const OrderStepper: React.FC<Props> = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep} sx={stepperStyle}>
      {STEPS.map((label) => (
        <Step key={label} sx={stepStyle}>
          <StepLabel sx={stepLabelStyle}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default OrderStepper
