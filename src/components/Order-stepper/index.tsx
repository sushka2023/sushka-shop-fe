import { useContext } from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { STEPS } from '../../pages/order-page/constants'
import { OrderContext } from '../../pages/order-page'

const OrderStepper = () => {
  const { activeStep } = useContext(OrderContext)!

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
