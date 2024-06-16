import { useContext } from 'react'
import { Box } from '@mui/material'
import { Button } from '../UI/Button'
import { STEPS } from '../../pages/order-page/constants'
import { btnContainerStyle, btnBackStyle, btnNextStyle } from './style'
import { OrderContext } from '../../pages/order-page'
import ClipLoader from 'react-spinners/ClipLoader'

const StapperButtons = () => {
  const { activeStep, setActiveStep, isLoadingOrder } = useContext(OrderContext)

  const generateButtonContent = () => {
    if (isLoadingOrder) return <ClipLoader size={12} color={'#FFFFFF'} />

    return activeStep === STEPS.length - 1 ? 'Оформити замовлення' : 'Далі'
  }

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

      <Box width="28%" />
      <Button type="submit" fullWidth sx={btnNextStyle}>
        {generateButtonContent()}
      </Button>
    </Box>
  )
}

export default StapperButtons
