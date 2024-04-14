import { Box, Button } from '@mui/material'
import { STEPS } from '../../pages/order-page/constants'
import { btnContainerStyle, btnBackStyle, btnNextStyle } from './style'

type Props = {
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

const StapperButtons: React.FC<Props> = ({ activeStep, setActiveStep }) => {
  return (
    <Box sx={btnContainerStyle}>
      <Button
        disabled={activeStep === 0}
        onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
        sx={btnBackStyle}
      >
        Повернутись на попередній крок
      </Button>
      <Box sx={{ width: '28%' }} />
      <Button
        onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
        sx={btnNextStyle}
      >
        {activeStep === STEPS.length - 1 ? 'Оформити замовлення' : 'Далі'}
      </Button>
    </Box>
  )
}

export default StapperButtons
