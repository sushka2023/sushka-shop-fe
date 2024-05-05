import { Box, Button, InputLabel, OutlinedInput } from '@mui/material'
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
      <Box display="flex" flexDirection="column" ml={50} width={'400px'}>
        <InputLabel>title</InputLabel>
        <OutlinedInput placeholder="Hint" fullWidth />
      </Box>
      <Box>
        <OutlinedInput error placeholder="text" />
      </Box>
      <Box>
        <Button>BUTTON</Button>
      </Box>
      <Box>
        <Button size="small">BUTTON</Button>
      </Box>
      <Box maxWidth={'400px'} width={'100%'}>
        <Button fullWidth sx={{ backgroundColor: '#FCC812', color: '#fff' }}>
          BUTTON
        </Button>
      </Box>
    </Box>
  )
}

export default OrderPage
