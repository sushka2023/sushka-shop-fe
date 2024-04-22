import { useState, Fragment, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { STEPS } from './constants'
import { containerStyle } from './style'
import OrderStepper from '../../components/Order-stepper'
import StapperButtons from '../../components/Stapper-buttons'
import OrderContacts from '../../components/Order-contacts'
import OrderCard from '../../components/Order-card'
import { getBasketItems } from './operation'
import { BasketItemsResponse } from '../../types'

const OrderPage = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [orderList, setOrderList] = useState<BasketItemsResponse[] | null>(null)

  useEffect(() => {
    if (!orderList) {
      ;(async () => {
        try {
          const products = await getBasketItems()
          setOrderList(products)
        } catch (error) {
          console.error('Помилка під час завандаження замовлення:', error)
        }
      })()
    }
  }, [orderList])

  const getStepContent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return <OrderContacts />
      case 1:
        return <div style={{ marginBottom: '500px' }}>Адреса доставки</div>
      case 2:
        return <div style={{ marginBottom: '500px' }}>Оплата</div>
      default:
        break
    }
  }

  return (
    <Box sx={containerStyle}>
      {activeStep === STEPS.length ? (
        <Fragment>{/* notification */}</Fragment>
      ) : (
        <Box pt="50px" sx={{ flexGrow: 1 }}>
          <Grid container width="88%" spacing={0} alignItems="flex-start">
            <Grid item xs={9}>
              <OrderStepper activeStep={activeStep} />
              {getStepContent(activeStep)}
              <StapperButtons
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </Grid>
            <OrderCard orderList={orderList} />
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default OrderPage
