import {
  Box,
  IconButton,
  InputLabel,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Autocomplete
} from '@mui/material'
import { FormHelperText } from '@mui/material'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import Delete from '../../icons/delete.svg?react'
import { Button } from '../../components/UI/Button'
import { OutlinedInput } from '../../components/UI/Field'
import { Radio } from '../../components/UI/Radio'
import { Checkbox } from '../../components/UI/Checkbox'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
// import { STEPS } from './constants'
// import { containerStyle } from './style'
// import OrderStepper from '../../components/Order-stepper'
// import StapperButtons from '../../components/Stapper-buttons'

const OrderPage = () => {
  const theme = useTheme()
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
  const [checked, setChecked] = useState([true, false])
  const error = 'error'

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]])
  }

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked])
  }

  return (
    <Box>
      {/* <Box sx={containerStyle}>
      <OrderStepper activeStep={activeStep} />
      {activeStep === STEPS.length ? (
        <Box>{/* notification </Box>}
      // ) : (
      //   <Box>
      //     <Box>{getStepContent(activeStep)}</Box>
      //     <StapperButtons
      //       activeStep={activeStep}
      //       setActiveStep={setActiveStep}
      //     />
      //   </Box>
      // )}
    // </Box> */}
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
          {error && (
            <FormHelperText sx={{ color: 'error.darker', fontWeight: 500 }}>
              {error}
            </FormHelperText>
          )}
        </Box>
        <Box>
          <Autocomplete
            popupIcon={
              <ArrowBackIosNewOutlinedIcon
                sx={{ transform: 'rotate(270deg)' }}
              />
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
            sx={{
              width: '40px',
              height: '40px',
              backgroundColor: 'error.lighter'
            }}
          >
            <Delete width={16} height={20} fill={theme.palette.error.darker} />
          </IconButton>
        </Box>
        <Box>
          <Button size="small">BUTTON</Button>
        </Box>
        <Box maxWidth={'400px'} width={'100%'}>
          <Button
            fullWidth
            endIcon={<CreateOutlinedIcon />}
            sx={{ backgroundColor: 'primary.darker', color: '#fff' }}
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
              control={<Radio />}
              label="Нова пошта (відділення)"
            />
            <FormControlLabel
              value="Нова пошта (поштомат)"
              control={<Radio />}
              label="Нова пошта (поштомат)"
            />
            <FormControlLabel
              value="Нова пошта (адресна)"
              control={<Radio />}
              label="Нова пошта (адресна)"
            />
            <FormControlLabel
              value="Укрпошта"
              control={<Radio />}
              label="Укрпошта"
            />
          </RadioGroup>
        </FormControl>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControlLabel
            label="Child 1"
            control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
          />
          <FormControlLabel
            label="Child 2"
            control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default OrderPage
