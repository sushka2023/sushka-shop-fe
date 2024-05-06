import {
  Box,
  IconButton,
  InputLabel,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'
import { FormHelperText } from '@mui/material'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import RadioIcon from '../../icons/radio.svg?react'
import RadioChecked from '../../icons/radio-checked.svg?react'
import Delete from '../../icons/delete.svg?react'
import { Button } from '../../components/UI/Button'
import { Autocomplete } from '../../components/UI/Autocomplete'
import { OutlinedInput } from '../../components/UI/Field'
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
  const currencies = ['Львів', 'Харків', 'Київ', 'Вінниця', 'Одесса']
  const error = 'error'
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
    <Box
      mt={20}
      mb={50}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <Box display="flex" flexDirection="column" width={'400px'}>
        <InputLabel>title</InputLabel>
        <OutlinedInput placeholder="Hint" fullWidth />
      </Box>
      <Box>
        <OutlinedInput error placeholder="text" />
        {error && <FormHelperText>{error}</FormHelperText>}
      </Box>
      <Box>
        <Autocomplete
          popupIcon={
            <ArrowBackIosNewOutlinedIcon sx={{ transform: 'rotate(270deg)' }} />
          }
          fullWidth
          options={currencies}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Місто" />
          )}
        />
      </Box>
      <Box>
        <Button>BUTTON</Button>
      </Box>
      <Box>
        <IconButton
          sx={{ width: '40px', height: '40px', backgroundColor: '#ff000026' }}
        >
          <Delete width={16} height={20} fill="red" />
        </IconButton>
      </Box>
      <Box>
        <Button size="small">BUTTON</Button>
      </Box>
      <Box maxWidth={'400px'} width={'100%'}>
        <Button
          fullWidth
          endIcon={<CreateOutlinedIcon />}
          sx={{ backgroundColor: '#FCC812', color: '#fff' }}
        >
          BUTTON
        </Button>
      </Box>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="Нова пошта (відділення)"
            control={
              <Radio icon={<RadioIcon />} checkedIcon={<RadioChecked />} />
            }
            label="Нова пошта (відділення)"
          />
          <FormControlLabel
            value="Нова пошта (поштомат)"
            control={
              <Radio icon={<RadioIcon />} checkedIcon={<RadioChecked />} />
            }
            label="Нова пошта (поштомат)"
          />
          <FormControlLabel
            value="Нова пошта (адресна)"
            control={
              <Radio icon={<RadioIcon />} checkedIcon={<RadioChecked />} />
            }
            label="Нова пошта (адресна)"
          />
          <FormControlLabel
            value="Укрпошта"
            control={
              <Radio icon={<RadioIcon />} checkedIcon={<RadioChecked />} />
            }
            label="Укрпошта"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default OrderPage
