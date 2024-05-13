import { Box } from '@mui/material'
import { Button } from '../UI/Button'
import { STEPS } from '../../pages/order-page/constants'
import { btnContainerStyle, btnBackStyle, btnNextStyle } from './style'

type Props = {
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

const StapperButtons: React.FC<Props> = ({ activeStep, setActiveStep }) => {
  return (
    <Box sx={btnContainerStyle}>
      <Box>
        <Button
          disabled={activeStep === 0}
          onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
          sx={btnBackStyle}
        >
          Повернутись на попередній крок
        </Button>
      </Box>

      <Box sx={{ width: '28%' }} />
      <Box width="100%" maxWidth="250px">
        <Button
          fullWidth
          onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
          sx={btnNextStyle}
        >
          {activeStep === STEPS.length - 1 ? 'Оформити замовлення' : 'Далі'}
        </Button>
      </Box>
    </Box>
  )
}

export default StapperButtons
