import { Box, Button } from '@mui/material'
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
    <Box mt={20} mb={50} display="flex" gap={2}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Button variant="contained">medium</Button>
        <Button variant="contained" disabled>
          disabled
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Button variant="contained" size="small">
          text
        </Button>
        <Button variant="contained" disabled size="small">
          disabled
        </Button>
      </Box>
    </Box>
  )
}

export default OrderPage
