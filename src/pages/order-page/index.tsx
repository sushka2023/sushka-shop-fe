import { Button } from '@mui/material'
// import { useState, Fragment } from 'react'
// import Box from '@mui/material/Box'
// import { STEPS } from './constants'
// import { containerStyle } from './style'
// import OrderStepper from '../../components/Order-stepper'
// import StapperButtons from '../../components/Stapper-buttons'

const OrderPage = () => {
  // const [activeStep, setActiveStep] = useState(0)

  // const getStepContent = (activeStep: number) => {
  //   switch (activeStep) {
  //     case 0:
  //       return <div style={{ marginBottom: '500px' }}>Контактні дані</div>
  //     case 1:
  //       return <div style={{ marginBottom: '500px' }}>Адреса доставки</div>
  //     case 2:
  //       return <div style={{ marginBottom: '500px' }}>Оплата</div>
  //     default:
  //       break
  //   }
  // }

  return (
    // <Box sx={containerStyle}>
    //   <OrderStepper activeStep={activeStep} />
    //   {activeStep === STEPS.length ? (
    //     <Fragment>{/* notification  */}</Fragment>
    //   ) : (
    //     <Fragment>
    //       <Box>{getStepContent(activeStep)}</Box>
    //       <StapperButtons
    //         activeStep={activeStep}
    //         setActiveStep={setActiveStep}
    //       />
    //     </Fragment>
    //   )}
    // </Box>
    <Button variant="contained" size="large" sx={{ marginBottom: '500px' }}>
      test
    </Button>
  )
}

export default OrderPage
